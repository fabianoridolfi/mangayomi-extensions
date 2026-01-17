const mangayomiSources = [{
    "name": "AnimeUnity",
    "lang": "it",
    "baseUrl": "https://www.animeunity.so",
    "apiUrl": "",
    "iconUrl": "https://www.animeunity.so/apple-touch-icon.png",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.0.2",
    "dateFormat": "",
    "dateFormatLocale": "",
    "pkgPath": "anime/src/it/animeunity.js"
}];

class DefaultExtension extends MProvider {
    constructor () {
        super();
        this.client = new Client();
    }

    localImageUrl(url) {
        //*********************************/
        // Problems with cloudflare
        //
        // let segments = url.split('/').filter(s => s);
        // return `https://img.animeunity.so/anime/${segments.pop()}`
        
        return url;    
    }

    parseStatus(status) {
        return {
            "in corso": 0,
            "terminato": 1,
            "droppato": 3,
            "non rilasciato": 4,
        }[status.toLowerCase()] ?? 5;
    }

    async getPopular(page) {
        const res = await this.client.get(this.source.baseUrl + `/top-anime?page=${page}`);
        const doc = new Document(res.body);

        const animes = JSON.parse(doc.selectFirst('top-anime').attr('animes'))['data'];

        const list = [];
        for (const anime of animes) {
            const name = anime['title_eng'] ?? anime['title_it'] ?? anime['title'];
            const imageUrl = this.localImageUrl(anime['imageurl']);
            const link = `/anime/${anime['id']}-${anime['slug']}`;
            list.push({ name, imageUrl, link });
        }
        return { "list": list, "hasNextPage": true };
    }

    async getLatestUpdates(page) {
        const res = await this.client.get(this.source.baseUrl + `/?page=${page}`);
        const doc = new Document(res.body);

        const itemList = JSON.parse(doc.selectFirst('layout-items').attr('items-json'))['data'];

        const list = [];
        for (const item of itemList) {
            const anime = item['anime'];

            const name = anime['title_eng'] ?? anime['title_it'] ?? anime['title'];
            const imageUrl = this.localImageUrl(anime['imageurl']);
            const link = `/anime/${anime['id']}-${anime['slug']}`;
            list.push({ name, imageUrl, link });
        }

        return { "list": list, "hasNextPage": true };
    }

    async search(query, page, filters) {
        const metaData = await this.client.get(this.source.baseUrl);
        const docMetaData = new Document(metaData.body);

        const token = docMetaData.selectFirst('meta[name="csrf-token"]').attr('content')

        let genres = [];
        let year = false;
        let status = false;
        let type = false;
        let season = false;
        let order = false;

        for (const filter of filters) {
            if (filter.type == "GenresFilter") {
                 genres = filter.state.filter(f => f.state).map(g => JSON.parse(g.value))
            }
            else {
                const value = (filter.values && filter.values[filter.state ?? 0].value) ?? false;
                if(value)
                {
                    if (filter.type == "YearList") {
                        year = value;
                    }
                    else if (filter.type == "StatusList") {
                        status = value;
                    }
                    else if (filter.type == "TypeList") {
                        type = value;
                    }
                    else if (filter.type == "SeasonList") {
                        season = value;
                    }
                    else if (filter.type == "OrderList") {
                        order = value;
                    }
                }
            }
        }

        const headers = {
            "Content-Type": "application/json", 
            "X-Csrf-Token": `${token}`, 
            "X-Requested-With": "XMLHttpRequest"
        };

        const res = await this.client.post(`${this.source.baseUrl}/archivio/get-animes`, headers,
            {
                "title": query,
                "type":type,
                "year":year,
                "order":order,
                "status":status,
                "genres":genres,
                "offset":0,
                "dubbed":false,
                "season":season
            });

        const animes = JSON.parse(res.body)['records'];

        const list = [];
        for (const anime of animes) {
            const name = anime['title_eng'] ?? anime['title_it'] ?? anime['title'];
            const imageUrl = this.localImageUrl(anime['imageurl']);
            const link = `/anime/${anime['id']}-${anime['slug']}`;
            list.push({ name, imageUrl, link });
        }

        return { "list": list, "hasNextPage": false };
    }

    async getDetail(url) {
        const res = await this.client.get(this.source.baseUrl + url);
        const doc = new Document(res.body);
        const detail = {};

        detail.link = url;
        detail.imageUrl = doc.selectFirst('div.cover-wrap > img').attr('src');

        detail.name = doc.selectFirst('h1.title').text.trim();
        detail.description = doc.selectFirst('div.description').text.trim();
        detail.genre = doc.select('a.genre-link').map(g => g.text.trim().replaceAll(",", ""));
        
        const info = doc.selectFirst('div.info-wrapper.anime-info-wrapper');
        {
            const infoKeys = info.select('div.info-item > strong').map(k => k.text.trim());
            const infoValues = info.select('div.info-item > small').map(v => v.text.trim());

            detail.status = this.parseStatus(infoValues[3]);
            detail.author = `${infoValues[6]}`
        }

        const episodes = JSON.parse(doc.selectFirst('video-player').attr('episodes'));
        detail.episodes = episodes.map(e => ({
             name: `Ep. ${e.number}`,
             url: `${url}/${e.id}`
        })).reverse();
        return detail;
    }

    // For anime episode video list
    async getVideoList(url) {
        const res = await this.client.get(this.source.baseUrl + url);
        const doc = new Document(res.body);

        const vixcloudUrl = doc.selectFirst('video-player').attr('embed_url');

        const vixcloudRes = await this.client.get(vixcloudUrl);
        const vixcloudDoc = new Document(vixcloudRes.body);


        const scripts = vixcloudDoc.select('script');
        let downloadUrl = "";

        for (const script of scripts) {
            const content = script.text.trim();
            
            if (content.includes('window.downloadUrl')) {
                
                const match = content.match(/window\.downloadUrl\s*=\s*'(.*?)'/);
                if (match && match[1]) {
                    downloadUrl = match[1];
                    break;
                }
            }
        }

        const videos = [{"url": downloadUrl, "originalUrl": downloadUrl, "quality": null, "headers": null}];
        return videos;
    }

    getFilterList() {
        const yearsRange = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => max - i).map(x => [x, x]);
        return [
            {
                type_name: "GroupFilter",
                type: "GenresFilter",
                name: "Generi",
                state: [
                    ["Action", {"id": 51, "name": "Action"}],
                    ["Adventure",	{"id": 21, "name": "Adventure"}],
                    ["Avant Garde",	{"id": 43, "name": "Avant Garde"}],
                    ["Boys Love",	{"id": 59, "name": "Boys Love"}],
                    ["Comedy", {"id": 37, "name": "Comedy"}],
                    ["Demons", {"id": 13, "name": "Demons"}],
                    ["Drama", {"id": 22, "name": "Drama"}],
                    ["Ecchi", {"id": 5, "name": "Ecchi"}],
                    ["Fantasy", {"id": 9, "name": "Fantasy"}],
                    ["Game", {"id": 44, "name": "Game"}],
                    ["Girls Love", {"id": 58, "name": "Girls Love"}],
                    ["Gore", {"id": 52, "name": "Gore"}],
                    ["Gourmet", {"id": 56, "name": "Gourmet"}],
                    ["Harem", {"id": 15, "name": "Harem"}],
                    ["Hentai", {"id": 4, "name": "Hentai"}],
                    ["Historical", {"id": 30, "name": "Historical"}],
                    ["Horror", {"id": 3, "name": "Horror"}],
                    ["Isekai", {"id": 53, "name": "Isekai"}],
                    ["Josei", {"id": 45, "name": "Josei"}],
                    ["Kids", {"id": 14, "name": "Kids"}],
                    ["Mahou Shoujo", {"id": 57, "name": "Mahou Shoujo"}],
                    ["Martial Arts", {"id": 31, "name": "Martial Arts"}],
                    ["Mecha", {"id": 38, "name": "Mecha"}],
                    ["Military", {"id": 46, "name": "Military"}],
                    ["Music", {"id": 16, "name": "Music"}],
                    ["Mystery", {"id": 24, "name": "Mystery"}],
                    ["Parody", {"id": 32, "name": "Parody"}],
                    ["Police", {"id": 39, "name": "Police"}],
                    ["Psychological", {"id": 47, "name": "Psychological"}],
                    ["Racing", {"id": 29, "name": "Racing"}],
                    ["Reincarnation", {"id": 54, "name": "Reincarnation"}],
                    ["Romance", {"id": 17, "name": "Romance"}],
                    ["Samurai", {"id": 25, "name": "Samurai"}],
                    ["School", {"id": 33, "name": "School"}],
                    ["Sci-fi", {"id": 40, "name": "Sci-fi"}],
                    ["Seinen", {"id": 49, "name": "Seinen"}],
                    ["Shoujo", {"id": 18, "name": "Shoujo"}],
                    ["Shounen", {"id": 34, "name": "Shounen"}],
                    ["Slice of Life", {"id": 50, "name": "Slice of Life"}],
                    ["Space", {"id": 19, "name": "Space"}],
                    ["Sports", {"id": 27, "name": "Sports"}],
                    ["Super Power", {"id": 35, "name": "Super Power"}],
                    ["Supernatural", {"id": 42, "name": "Supernatural"}],
                    ["Survival", {"id": 55, "name": "Survival"}],
                    ["Thriller", {"id": 48, "name": "Thriller"}],
                    ["Vampire", {"id": 20, "name": "Vampire"}]
                ].map(x => ({ type_name: 'CheckBox', name: x[0], value: JSON.stringify(x[1]) }))
            },
            {
                type_name: "SelectFilter",
                type: "YearList",
                name: "Anno di Uscita",
                state: 0,
                values: [
                    ["any", ""], 
                    ...yearsRange(1969, 2027)
                ].map(x => ({ type_name: 'SelectOption', name: `${x[0]}`, value: `${x[1]}` }))
            },
            {
                type_name: "SelectFilter",
                type: "StatusList",
                name: "Stato",
                state: 0,
                values: [
                    ["Any", ""],
                    ["In Corso", "In Corso"],
                    ["Terminato", "Terminato"],
                    ["In Uscita", "In Uscita"],
                    ["Droppato", "Droppato"]
                ].map(x => ({type_name: 'SelectOption', name: x[0], value: x[1] }))
            },
            {
                type_name: "SelectFilter",
                type: "TypeList",
                name: "Tipo",
                state: 0,
                values: [
                    ["Any", ""],
                    ["TV", "TV"],
                    ["TV Short", "TV Short"],
                    ["OVA", "OVA"],
                    ["ONA", "ONA"],
                    ["Special", "Special"],
                    ["Movie", "Movie"]
                ].map(x => ({type_name: 'SelectOption', name: x[0], value: x[1] }))
            },
            {
                type_name: "SelectFilter",
                type: "SeasonList",
                name: "Stagione",
                state: 0,
                values: [
                    ["Any", ""],
                    ["Inverno", "Inverno"],
                    ["Primavera", "Primavera"],
                    ["Estate", "Estate"],
                    ["Autunno", "Autunno"]
                ].map(x => ({type_name: 'SelectOption', name: x[0], value: x[1] }))
            },
            {
                type: "separator",
                type_name: "SeparatorFilter",
            },
            {
                type_name: "SelectFilter",
                type: "OrderList",
                name: "Ordinamento",
                state: 0,
                values: [
                    ["Any", ""],
                    ["Lista A-Z", "Lista A-Z"],
                    ["Lista Z-A", "Lista Z-A"],
                    ["Popolarità", "Popolarità"],
                    ["Valutazione", "Valutazione"]
                ].map(x => ({type_name: 'SelectOption', name: x[0], value: x[1] }))
            }
        ];
    }
}

/***************************************************************************************************
* 
*   mangayomi-js-helpers v1.2
*       
*   # Video Extractors
*       - vidGuardExtractor
*       - doodExtractor
*       - vidozaExtractor
*       - okruExtractor
*       - amazonExtractor
*       - vidHideExtractor
*       - filemoonExtractor
*       - mixdropExtractor
*       - speedfilesExtractor
*       - luluvdoExtractor
*       - burstcloudExtractor (not working, see description)
*   
*   # Video Extractor Wrappers
*       - streamWishExtractor
*       - voeExtractor
*       - mp4UploadExtractor
*       - yourUploadExtractor
*       - streamTapeExtractor
*       - sendVidExtractor
*   
*   # Video Extractor helpers
*       - extractAny
*   
*   # Playlist Extractors
*       - m3u8Extractor
*       - jwplayerExtractor
*   
*   # Extension Helpers
*       - sortVideos()
*   
*   # Uint8Array
*       - Uint8Array.fromBase64()
*       - Uint8Array.prototype.toBase64()
*       - Uint8Array.prototype.decode()
*   
*   # String
*       - String.prototype.encode()
*       - String.decode()
*       - String.prototype.reverse()
*       - String.prototype.swapcase()
*       - getRandomString()
*
*   # Encode/Decode Functions
*       - decodeUTF8
*       - encodeUTF8
*   
*   # Url
*       - absUrl()
*
***************************************************************************************************/

//--------------------------------------------------------------------------------------------------
//  Video Extractors
//--------------------------------------------------------------------------------------------------

async function vidGuardExtractor(url) {
    // get html
    const res = await new Client().get(url);
    const doc = new Document(res.body);
    const script = doc.selectFirst('script:contains(eval)');

    // eval code
    const code = script.text;
    eval?.('var window = {};');
    eval?.(code);
    const playlistUrl = globalThis.window.svg.stream;

    // decode sig
    const encoded = playlistUrl.match(/sig=(.*?)&/)[1];
    const charCodes = [];

    for (let i = 0; i < encoded.length; i += 2) {
        charCodes.push(parseInt(encoded.slice(i, i + 2), 16) ^ 2);
    }

    let decoded = Uint8Array.fromBase64(
        String.fromCharCode(...charCodes))
        .slice(5, -5)
        .reverse();

    for (let i = 0; i < decoded.length; i += 2) {
        let tmp = decoded[i];
        decoded[i] = decoded[i + 1];
        decoded[i + 1] = tmp;
    }

    decoded = decoded.decode();
    return await m3u8Extractor(playlistUrl.replace(encoded, decoded), null);
}

async function doodExtractor(url) {
    const dartClient = new Client({ 'useDartHttpClient': true, "followRedirects": false });
    let response = await dartClient.get(url);
    while ("location" in response.headers) {
        response = await dartClient.get(response.headers.location);
    }
    const newUrl = response.request.url;
    const doodhost = newUrl.match(/https:\/\/(.*?)\//, newUrl)[0].slice(8, -1);
    const md5 = response.body.match(/'\/pass_md5\/(.*?)',/, newUrl)[0].slice(11, -2);
    const token = md5.substring(md5.lastIndexOf("/") + 1);
    const expiry = new Date().valueOf();
    const randomString = getRandomString(10);

    response = await new Client().get(`https://${doodhost}/pass_md5/${md5}`, { "Referer": newUrl });
    const videoUrl = `${response.body}${randomString}?token=${token}&expiry=${expiry}`;
    const headers = { "User-Agent": "Mangayomi", "Referer": doodhost };
    return [{ url: videoUrl, originalUrl: videoUrl, headers: headers, quality: '' }];
}

async function vidozaExtractor(url) {
    let response = await new Client({ 'useDartHttpClient': true, "followRedirects": true }).get(url);
    const videoUrl = response.body.match(/https:\/\/\S*\.mp4/)[0];
    return [{ url: videoUrl, originalUrl: videoUrl, quality: '' }];
}

async function okruExtractor(url) {
    const res = await new Client().get(url);
    const doc = new Document(res.body);
    const tag = doc.selectFirst('div[data-options]');
    const playlistUrl = tag.attr('data-options').match(/hlsManifestUrl.*?(h.*?id=\d+)/)[1].replaceAll('\\\\u0026', '&');
    return await m3u8Extractor(playlistUrl, null);
}

async function amazonExtractor(url) {
    const res = await new Client().get(url);
    const doc = new Document(res.body);
    const videoUrl = doc.selectFirst('video').getSrc;
    return videoUrl ? [{ url: videoUrl, originalUrl: videoUrl, headers: null, quality: '' }] : [];
}

async function vidHideExtractor(url) {
    const res = await new Client().get(url);
    return await jwplayerExtractor(res.body);
}

async function filemoonExtractor(url, headers) {
    headers = headers ?? {};
    headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
    delete headers['user-agent'];
    
    let res = await new Client().get(url, headers);
    const src = res.body.match(/iframe src="(.*?)"/)?.[1];
    if (src) {
        res = await new Client().get(src, {
            'Referer': url,
            'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
            'User-Agent': headers['User-Agent']
        });
    }
    return await jwplayerExtractor(res.body, headers);
}

async function mixdropExtractor(url) {
    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'};
    let res = await new Client({ 'useDartHttpClient': true, "followRedirects": false }).get(url, headers);
    while ("location" in res.headers) {
        res = await new Client({ 'useDartHttpClient': true, "followRedirects": false }).get(res.headers.location, headers);
    }
    const newUrl = res.request.url;
    let doc = new Document(res.body);
    
    const code = doc.selectFirst('script:contains(MDCore):contains(eval)').text;
    const unpacked = unpackJs(code);
    let videoUrl = unpacked.match(/wurl="(.*?)"/)?.[1];

    if (!videoUrl) return [];

    videoUrl = 'https:' + videoUrl;
    headers.referer = newUrl;
    
    return [{url: videoUrl, originalUrl: videoUrl, quality: '', headers: headers}];
}

async function speedfilesExtractor(url) {
    let res = await new Client().get(url);
    let doc = new Document(res.body);
    
    const code = doc.selectFirst('script:contains(var)').text;
    let b64;

    // Get b64
    for (const match of code.matchAll(/(?:var|let|const)\s*\w+\s*=\s*["']([^"']+)/g)) {
        if (match[1].match(/[g-zG-Z]/)) {
            b64 = match[1];
            break;
        }
    }

    // decode b64 => b64
    const step1 = Uint8Array.fromBase64(b64).reverse().decode().swapcase();
    // decode b64 => hex
    const step2 = Uint8Array.fromBase64(step1).reverse().decode();
    // decode hex => b64
    let step3 = [];
    for (let i = 0; i < step2.length; i += 2) {
        step3.push(parseInt(step2.slice(i, i + 2), 16) - 3);
    }
    step3 = String.fromCharCode(...step3.reverse()).swapcase();
    // decode b64 => url
    const videoUrl = Uint8Array.fromBase64(step3).decode();
    
    return [{url: videoUrl, originalUrl: videoUrl, quality: '', headers: null}];
}

async function luluvdoExtractor(url) {
    const client = new Client();    
    const match = url.match(/(.*?:\/\/.*?)\/.*\/(.*)/);
    const headers = {'user-agent': 'Mangayomi'};
    const res = await client.get(`${match[1]}/dl?op=embed&file_code=${match[2]}`, headers);    
    return await jwplayerExtractor(res.body, headers);
}

/** Does not work: Client always sets 'charset=utf-8' in Content-Type. */
async function burstcloudExtractor(url) {
    let client = new Client();
    let res = await client.get(url);

    const id = res.body.match(/data-file-id="(.*?)"/)[1];
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'Referer': url,
    };
    const data = {
        'fileId': id
    };

    res = await client.post(`https://www.burstcloud.co/file/play-request/`, headers, data);
    const videoUrl = res.body.match(/cdnUrl":"(.*?)"/)[1];
    return [{
        url: videoUrl,
        originalUrl: videoUrl,
        headers: { 'Referer': url.match(/.*?:\/\/.*?\//) },
        quality: ''
    }];
}

//--------------------------------------------------------------------------------------------------
//  Video Extractor Wrappers
//--------------------------------------------------------------------------------------------------

_streamWishExtractor = streamWishExtractor;
streamWishExtractor = async (url) => {
    return (await _streamWishExtractor(url, '')).map(v => {
        v.quality = v.quality.slice(3, -1);
        return v;
    });
}

_voeExtractor = voeExtractor;
voeExtractor = async (url) => {
    return (await _voeExtractor(url, '')).map(v => {
        v.quality = v.quality.replace(/Voe: (\d+p?)/i, '$1');
        return v;
    });
}

_mp4UploadExtractor = mp4UploadExtractor;
mp4UploadExtractor = async (url) => {
    return (await _mp4UploadExtractor(url)).map(v => {
        v.quality = v.quality.match(/\d+p/)?.[0] ?? '';
        return v;
    });
}

_yourUploadExtractor = yourUploadExtractor;
yourUploadExtractor = async (url) => {
    return (await _yourUploadExtractor(url))
    .filter(v => !v.url.includes('/novideo'))
    .map(v => {
        v.quality = '';
        return v;
    });
}

_streamTapeExtractor = streamTapeExtractor;
streamTapeExtractor = async (url) => {
    return await _streamTapeExtractor(url, '');
}

_sendVidExtractor = sendVidExtractor;
sendVidExtractor = async (url) => {
    let res = await new Client().get(url);
    var videoUrl, quality;
    try {
        videoUrl = res.body.match(/og:video" content="(.*?\.mp4.*?)"/)[1];
        quality = res.body.match(/og:video:height" content="(.*?)"/)?.[1];
        quality = quality ? quality + 'p' : '';
    } catch (error) {
        
    }
    if (!videoUrl) {
        return _sendVidExtractor(url, null, '');
    }
    return [{url: videoUrl, originalUrl: videoUrl, quality: quality, headers: null}];
}

//--------------------------------------------------------------------------------------------------
//  Video Extractor Helpers
//--------------------------------------------------------------------------------------------------

async function extractAny(url, method, lang, type, host, headers = null) {
    const m = extractAny.methods[method];
    return (!m) ? [] : (await m(url, headers)).map(v => {
        v.quality = v.quality ? `${lang} ${type} ${v.quality} ${host}` : `${lang} ${type} ${host}`;
        return v;
    });
};

extractAny.methods = {
    'amazon': amazonExtractor,
    'burstcloud': burstcloudExtractor,
    'doodstream': doodExtractor,
    'filemoon': filemoonExtractor,
    'luluvdo': luluvdoExtractor,
    'mixdrop': mixdropExtractor,
    'mp4upload': mp4UploadExtractor,
    'okru': okruExtractor,
    'sendvid': sendVidExtractor,
    'speedfiles': speedfilesExtractor,
    'streamtape': streamTapeExtractor,
    'streamwish': vidHideExtractor,
    'vidguard': vidGuardExtractor,
    'vidhide': vidHideExtractor,
    'vidoza': vidozaExtractor,
    'voe': voeExtractor,
    'yourupload': yourUploadExtractor
};

//--------------------------------------------------------------------------------------------------
//  Playlist Extractors
//--------------------------------------------------------------------------------------------------

async function m3u8Extractor(url, headers = null) {
    // https://developer.apple.com/documentation/http-live-streaming/creating-a-multivariant-playlist
    // https://developer.apple.com/documentation/http-live-streaming/adding-alternate-media-to-a-playlist
    // define attribute lists
    const streamAttributes = [
        ['avg_bandwidth', /AVERAGE-BANDWIDTH=(\d+)/],
        ['bandwidth', /\bBANDWIDTH=(\d+)/],
        ['resolution', /\bRESOLUTION=([\dx]+)/],
        ['framerate', /\bFRAME-RATE=([\d\.]+)/],
        ['codecs', /\bCODECS="(.*?)"/],
        ['video', /\bVIDEO="(.*?)"/],
        ['audio', /\bAUDIO="(.*?)"/],
        ['subtitles', /\bSUBTITLES="(.*?)"/],
        ['captions', /\bCLOSED-CAPTIONS="(.*?)"/]
    ];
    const mediaAttributes = [
        ['type', /\bTYPE=([\w-]*)/],
        ['group', /\bGROUP-ID="(.*?)"/],
        ['lang', /\bLANGUAGE="(.*?)"/],
        ['name', /\bNAME="(.*?)"/],
        ['autoselect', /\bAUTOSELECT=(\w*)/],
        ['default', /\bDEFAULT=(\w*)/],
        ['instream-id', /\bINSTREAM-ID="(.*?)"/],
        ['assoc-lang', /\bASSOC-LANGUAGE="(.*?)"/],
        ['channels', /\bCHANNELS="(.*?)"/],
        ['uri', /\bURI="(.*?)"/]
    ];
    const streams = [], videos = {}, audios = {}, subtitles = {}, captions = {};
    const dict = { 'VIDEO': videos, 'AUDIO': audios, 'SUBTITLES': subtitles, 'CLOSED-CAPTIONS': captions };

    const res = await new Client().get(url, headers);
    const text = res.body;

    if (res.statusCode != 200) {
        return [];
    }

    // collect media
    for (const match of text.matchAll(/#EXT-X-MEDIA:(.*)/g)) {
        const info = match[1], medium = {};
        for (const attr of mediaAttributes) {
            const m = info.match(attr[1]);
            medium[attr[0]] = m ? m[1] : null;
        }

        const type = medium.type;
        delete medium.type;
        const group = medium.group;
        delete medium.group;

        const typedict = dict[type];
        if (typedict[group] == undefined)
            typedict[group] = [];
        typedict[group].push(medium);
    }

    // collect streams
    for (const match of text.matchAll(/#EXT-X-STREAM-INF:(.*)\s*(.*)/g)) {
        const info = match[1], stream = { 'url': absUrl(match[2], url) };
        for (const attr of streamAttributes) {
            const m = info.match(attr[1]);
            stream[attr[0]] = m ? m[1] : null;
        }

        stream['video'] = videos[stream.video] ?? null;
        stream['audio'] = audios[stream.audio] ?? null;
        stream['subtitles'] = subtitles[stream.subtitles] ?? null;
        stream['captions'] = captions[stream.captions] ?? null;

        // format resolution or bandwidth
        let quality;
        if (stream.resolution) {
            quality = stream.resolution.match(/x(\d+)/)[1] + 'p';
        } else {
            quality = (parseInt(stream.avg_bandwidth ?? stream.bandwidth) / 1000000) + 'Mb/s'
        }

        // add stream to list
        const subs = stream.subtitles?.map((s) => {
            return { file: s.uri, label: s.name };
        });
        const auds = stream.audio?.map((a) => {
            return { file: a.uri, label: a.name };
        });
        streams.push({
            url: stream.url,
            quality: quality,
            originalUrl: stream.url,
            headers: headers,
            subtitles: subs ?? null,
            audios: auds ?? null
        });
    }
    return streams.length ? streams : [{
        url: url,
        quality: '',
        originalUrl: url,
        headers: headers,
        subtitles: null,
        audios: null
    }];
}

async function jwplayerExtractor(text, headers) {
    // https://docs.jwplayer.com/players/reference/playlists
    const getsetup = /setup\(({[\s\S]*?})\)/;
    const getsources = /sources:\s*(\[[\s\S]*?\])/;
    const gettracks = /tracks:\s*(\[[\s\S]*?\])/;
    const unpacked = unpackJs(text);

    const videos = [], subtitles = [];

    const data = eval('(' + (getsetup.exec(text) || getsetup.exec(unpacked))?.[1] + ')');

    if (data){
        var sources = data.sources;
        var tracks = data.tracks;
    } else {
        var sources = eval('(' + (getsources.exec(text) || getsources.exec(unpacked))?.[1] + ')');
        var tracks = eval('(' + (gettracks.exec(text) || gettracks.exec(unpacked))?.[1] + ')');
    }
    for (t of tracks) {
        if (t.type == "captions") {
            subtitles.push({file: t.file, label: t.label});
        }
    }
    for (s of sources) {
        if (s.file.includes('master.m3u8')) {
            videos.push(...(await m3u8Extractor(s.file, headers)));
        } else if (s.file.includes('.mpd')) {
            
        } else {
            videos.push({url: s.file, originalUrl: s.file, quality: '', headers: headers});
        }
    }
    return videos.map(v => {
        v.subtitles = subtitles;
        return v;
    });
}

//--------------------------------------------------------------------------------------------------
//  Extension Helpers
//--------------------------------------------------------------------------------------------------

function sortVideos(videos) {
    const pref = new SharedPreferences();
    const getres = RegExp('(\\d+)p?', 'i');
    const lang = RegExp(pref.get('lang'), 'i');
    const type = RegExp(pref.get('type'), 'i');
    const res = RegExp(getres.exec(pref.get('res'))[1], 'i');
    const host = RegExp(pref.get('host'), 'i');

    let getScore = (q, hasRes) => {
        const bLang = lang.test(q), bType = type.test(q), bRes = res.test(q), bHost = host.test(q);
        if (hasRes) {
            return bLang * (8 + bType * (4 + bRes * (2 + bHost * 1)));
        } else {
            return bLang * (8 + bType * (4 + (bHost * 3)));
        }
    }

    return videos.sort((a, b) => {
        const resA = getres.exec(a.quality)?.[1];
        const resB = getres.exec(b.quality)?.[1];
        const score = getScore(b.quality, resB) - getScore(a.quality, resA);

        if (score) return score;

        const qA = resA ? a.quality.replace(resA, (9999 - parseInt(resA)).toString()) : a.quality;
        const qB = resA ? b.quality.replace(resB, (9999 - parseInt(resB)).toString()) : b.quality;

        return qA.localeCompare(qB);
    });
}

//--------------------------------------------------------------------------------------------------
//  Uint8Array
//--------------------------------------------------------------------------------------------------

Uint8Array.fromBase64 = function (b64) {
    //        [00,01,02,03,04,05,06,07,08,\t,\n,0b,0c,\r,0e,0f,10,11,12,13,14,15,16,17,18,19,1a,1b,1c,1d,1e,1f,' ', !, ", #, $, %, &, ', (, ), *, +,',', -, ., /, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, :, ;, <,'=', >, ?, @,A,B,C,D,E,F,G,H,I,J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, [, \, ], ^, _, `, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, {, |, }, ~,7f]
    const m = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, 62, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
    let data = [], val = 0, bits = -8
    for (const c of b64) {
        let n = m[c.charCodeAt(0)];
        if (n == -1) break;
        val = (val << 6) + n;
        bits += 6;
        for (; bits >= 0; bits -= 8)
            data.push((val >> bits) & 0xFF);
    }
    return new Uint8Array(data);
}

Uint8Array.prototype.toBase64 = function () {
    const m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let b64 = '', val = 0, bits = -6;
    for (const b of this) {
        val = (val << 8) + b;
        bits += 8;
        while (bits >= 0) {
            b64 += m[(val >> bits) & 0x3F];
            bits -= 6;
        }
    }
    if (bits > -6)
        b64 += m[(val << -bits) & 0x3F];
    return b64 + ['', '', '==', '='][b64.length % 4];
}

Uint8Array.prototype.decode = function (encoding = 'utf-8') {
    encoding = encoding.toLowerCase();
    if (encoding == 'utf-8') {
        return decodeUTF8(this);
    }
    return null;
}

//--------------------------------------------------------------------------------------------------
//  String
//--------------------------------------------------------------------------------------------------

String.prototype.encode = function (encoding = 'utf-8') {
    encoding = encoding.toLowerCase();
    if (encoding == 'utf-8') {
        return encodeUTF8(this);
    }
    return null;
}

String.decode = function (data, encoding = 'utf-8') {
    encoding = encoding.toLowerCase();
    if (encoding == 'utf-8') {
        return decodeUTF8(data);
    }
    return null;
}

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
}

String.prototype.swapcase = function () {
    const isAsciiLetter = /[A-z]/;
    const result = [];
    for (const l of this)
        result.push(isAsciiLetter.test(l) ? String.fromCharCode(l.charCodeAt() ^ 32) : l);
    return result.join('');
}

function getRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 61);
        result += chars[random];
    }
    return result;
}

//--------------------------------------------------------------------------------------------------
//  Encode/Decode Functions
//--------------------------------------------------------------------------------------------------

function decodeUTF8(data) {
    const codes = [];
    for (let i = 0; i < data.length;) {
        const c = data[i++];
        const len = (c > 0xBF) + (c > 0xDF) + (c > 0xEF);
        let val = c & (0xFF >> (len + 1));
        for (const end = i + len; i < end; i++) {
            val = (val << 6) + (data[i] & 0x3F);
        }
        codes.push(val);
    }
    return String.fromCharCode(...codes);
}

function encodeUTF8(string) {
    const data = [];
    for (const c of string) {
        const code = c.charCodeAt(0);
        const len = (code > 0x7F) + (code > 0x7FF) + (code > 0xFFFF);
        let bits = len * 6;

        data.push((len ? ~(0xFF >> len + 1) : (0)) + (code >> bits));
        while (bits > 0) {
            data.push(0x80 + ((code >> (bits -= 6)) & 0x3F))
        }
    }
    return new Uint8Array(data);
}

//--------------------------------------------------------------------------------------------------
//  Url
//--------------------------------------------------------------------------------------------------

function absUrl(url, base) {
    if (url.search(/^\w+:\/\//) == 0) {
        return url;
    } else if (url.startsWith('/')) {
        return base.slice(0, base.lastIndexOf('/')) + url;
    } else {
        return base.slice(0, base.lastIndexOf('/') + 1) + url;
    }
}