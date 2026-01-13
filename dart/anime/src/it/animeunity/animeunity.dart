import 'package:mangayomi/bridge_lib.dart';
import 'dart:convert';

class AnimeUnity extends MProvider {
  AnimeUnity({required this.source});

  MSource source;

  final Client client = Client();

  @override
  Future<MPages> getPopular(int page) async {       
    final res =
        (await client.get(
          Uri.parse("${source.baseUrl}/top-anime?page=$page"),
        )).body;

    List<MManga> animeList = [];

    final json = xpath(
      res,
      '//top-anime/@animes',
    );

    Map<String, dynamic> jsonData = jsonDecode(json[0]);
    List animes = jsonData['data'];

    for (var anime in animes) {
      MManga a = MManga();
      
      a.name = anime['title'] ?? anime['title_it'] ?? anime['title_eng'];
      a.imageUrl = localImageUrl(anime['imageurl']);
      a.link = '/anime/${anime['id']}-${anime['slug']}';
      animeList.add(a);
    }

    return MPages(animeList, true);
  }

  @override
  Future<MPages> getLatestUpdates(int page) async {
    final res =
        (await client.get(
          Uri.parse("${source.baseUrl}/?page=$page"),
        )).body;

    List<MManga> animeList = [];

    final json = xpath(
      res,
      '//layout-items/@items-json',
    );

    Map<String, dynamic> jsonData = jsonDecode(json[0]);
    List data = jsonData['data'];

    for (var animeData in data) {
      MManga a = MManga();

      final anime = animeData['anime'];

      a.name = a.name = anime['title'] ?? anime['title_it'] ?? anime['title_eng'];
      a.imageUrl = localImageUrl(anime['imageurl']);
      a.link = '/anime/${anime['id']}-${anime['slug']}';
      animeList.add(a);
    }

    return MPages(animeList, true);
  }

  @override
  Future<MPages> search(String query, int page, FilterList filterList) async {
    final filters = filterList.filters;

    final metaData =
        (await client.get(
          Uri.parse("${source.baseUrl}"),
        )).body;

    final token = xpath(
      metaData,
      '//meta[@name="csrf-token"]/@content',
    );

    final headers = {
      "Content-Type": "application/json", 
      "X-Csrf-Token": token[0], 
      "X-Requested-With": "XMLHttpRequest"};    

    List genres = [];
    var year = false;
    var status = false;
    var type = false;
    var season = false;
    var order = false;

    for (var filter in filters) {
        if (filter.type == "GenresFilter") {
          List<dynamic> gg = filter.state as List<dynamic>;
          for (var g in gg) {
            if(g.state)
            {
              genres.add(jsonDecode(g.value));
            }
          }
        }
        else if (filter.type == "YearList") {
          final y = filter.values[filter.state].value;
          if(y.isNotEmpty){
            year = y;
          }
        }
        else if (filter.type == "StatusList") {
          final s = filter.values[filter.state].value;
          if(s.isNotEmpty){
            status = s;
          }
        }
        else if (filter.type == "TypeList") {
          final t = filter.values[filter.state].value;
          if(t.isNotEmpty){
            type = t;
          }
        }
        else if (filter.type == "SeasonList") {
          final s = filter.values[filter.state].value;
          if(s.isNotEmpty){
            season = s;
          }
        }
        else if (filter.type == "OrderList") {
          final o = filter.values[filter.state].value;
          if(o.isNotEmpty){
            order = o;
          }
        }
    }

    final body = {
      "title": query.isEmpty ? false : query,
      "type":type,
      "year":year,
      "order":order,
      "status":status,
      "genres":genres,
      "offset":0,
      "dubbed":false,
      "season":season
    };  

    final ress =
        (await client.post(
          Uri.parse("${source.baseUrl}/archivio/get-animes"),
          headers: headers,
          body: jsonEncode(body)
        )).body;

    Map<String, dynamic> jsonRecords = jsonDecode(ress);
    List animes = jsonRecords['records'];

    List<MManga> animeList = [];

   for (var anime in animes) {
      MManga a = MManga();

      a.name = a.name = anime['title'] ?? anime['title_it'] ?? anime['title_eng'];
      a.imageUrl = localImageUrl(anime['imageurl']);
      a.link = '/anime/${anime['id']}-${anime['slug']}';
      animeList.add(a);
    }  

    return MPages(animeList, query.isEmpty);
  }


  String localImageUrl(String imageUrl) {

    //*********************************/
    // Problem with cloudflare
    //
    // final List<String> segments = [];
    // for (final part in imageUrl.split('/')) {
    //   if (part.isNotEmpty) {
    //     segments.add(part);
    //   }
    // }
    //
    // return "https://img.animeunity.so/anime/${segments.last}";

    return imageUrl;
  }

  @override
  List<dynamic> getFilterList() {
    return [
      HeaderFilter("Ricerca"),
      GroupFilter("GenresFilter", "Generi", [
        CheckBoxFilter("Action", jsonEncode({"id": 51, "name": "Action"})),
        CheckBoxFilter("Adventure",	jsonEncode({"id": 21, "name": "Adventure"})),
        CheckBoxFilter("Avant Garde",	jsonEncode({"id": 43, "name": "Avant Garde"})),
        CheckBoxFilter("Boys Love",	jsonEncode({"id": 59, "name": "Boys Love"})),
        CheckBoxFilter("Comedy", jsonEncode({"id": 37, "name": "Comedy"})),
        CheckBoxFilter("Demons", jsonEncode({"id": 13, "name": "Demons"})),
        CheckBoxFilter("Drama", jsonEncode({"id": 22, "name": "Drama"})),
        CheckBoxFilter("Ecchi", jsonEncode({"id": 5, "name": "Ecchi"})),
        CheckBoxFilter("Fantasy", jsonEncode({"id": 9, "name": "Fantasy"})),
        CheckBoxFilter("Game", jsonEncode({"id": 44, "name": "Game"})),
        CheckBoxFilter("Girls Love", jsonEncode({"id": 58, "name": "Girls Love"})),
        CheckBoxFilter("Gore", jsonEncode({"id": 52, "name": "Gore"})),
        CheckBoxFilter("Gourmet", jsonEncode({"id": 56, "name": "Gourmet"})),
        CheckBoxFilter("Harem", jsonEncode({"id": 15, "name": "Harem"})),
        CheckBoxFilter("Hentai", jsonEncode({"id": 4, "name": "Hentai"})),
        CheckBoxFilter("Historical", jsonEncode({"id": 30, "name": "Historical"})),
        CheckBoxFilter("Horror", jsonEncode({"id": 3, "name": "Horror"})),
        CheckBoxFilter("Isekai", jsonEncode({"id": 53, "name": "Isekai"})),
        CheckBoxFilter("Josei", jsonEncode({"id": 45, "name": "Josei"})),
        CheckBoxFilter("Kids", jsonEncode({"id": 14, "name": "Kids"})),
        CheckBoxFilter("Mahou Shoujo", jsonEncode({"id": 57, "name": "Mahou Shoujo"})),
        CheckBoxFilter("Martial Arts", jsonEncode({"id": 31, "name": "Martial Arts"})),
        CheckBoxFilter("Mecha", jsonEncode({"id": 38, "name": "Mecha"})),
        CheckBoxFilter("Military", jsonEncode({"id": 46, "name": "Military"})),
        CheckBoxFilter("Music", jsonEncode({"id": 16, "name": "Music"})),
        CheckBoxFilter("Mystery", jsonEncode({"id": 24, "name": "Mystery"})),
        CheckBoxFilter("Parody", jsonEncode({"id": 32, "name": "Parody"})),
        CheckBoxFilter("Police", jsonEncode({"id": 39, "name": "Police"})),
        CheckBoxFilter("Psychological", jsonEncode({"id": 47, "name": "Psychological"})),
        CheckBoxFilter("Racing", jsonEncode({"id": 29, "name": "Racing"})),
        CheckBoxFilter("Reincarnation", jsonEncode({"id": 54, "name": "Reincarnation"})),
        CheckBoxFilter("Romance", jsonEncode({"id": 17, "name": "Romance"})),
        CheckBoxFilter("Samurai", jsonEncode({"id": 25, "name": "Samurai"})),
        CheckBoxFilter("School", jsonEncode({"id": 33, "name": "School"})),
        CheckBoxFilter("Sci-fi", jsonEncode({"id": 40, "name": "Sci-fi"})),
        CheckBoxFilter("Seinen", jsonEncode({"id": 49, "name": "Seinen"})),
        CheckBoxFilter("Shoujo", jsonEncode({"id": 18, "name": "Shoujo"})),
        CheckBoxFilter("Shounen", jsonEncode({"id": 34, "name": "Shounen"})),
        CheckBoxFilter("Slice of Life", jsonEncode({"id": 50, "name": "Slice of Life"})),
        CheckBoxFilter("Space", jsonEncode({"id": 19, "name": "Space"})),
        CheckBoxFilter("Sports", jsonEncode({"id": 27, "name": "Sports"})),
        CheckBoxFilter("Super Power", jsonEncode({"id": 35, "name": "Super Power"})),
        CheckBoxFilter("Supernatural", jsonEncode({"id": 42, "name": "Supernatural"})),
        CheckBoxFilter("Survival", jsonEncode({"id": 55, "name": "Survival"})),
        CheckBoxFilter("Thriller", jsonEncode({"id": 48, "name": "Thriller"})),
        CheckBoxFilter("Vampire", jsonEncode({"id": 20, "name": "Vampire"})),
      ]),
      SelectFilter("YearList", "Anno di Uscita", 0, [
        SelectFilterOption("Any", ""),
        for (var i = 2027; i >= 1969; i--)
          SelectFilterOption(i.toString(), i.toString()),
      ]),
      SelectFilter("StatusList", "Stato", 0, [
        SelectFilterOption("Any", ""),
        SelectFilterOption("In Corso", "In Corso"),
        SelectFilterOption("Terminato", "Terminato"),
        SelectFilterOption("In Uscita", "In Uscita"),
        SelectFilterOption("Droppato", "Droppato"),
      ]),
      SelectFilter("TypeList", "Stato", 0, [
        SelectFilterOption("Any", ""),
        SelectFilterOption("TV", "TV"),
        SelectFilterOption("TV Short", "TV Short"),
        SelectFilterOption("OVA", "OVA"),
        SelectFilterOption("ONA", "ONA"),
        SelectFilterOption("Special", "Special"),
        SelectFilterOption("Movie", "Movie"),
      ]),
      SelectFilter("SeasonList", "Stagione", 0, [
        SelectFilterOption("Any", ""),
        SelectFilterOption("Inverno", "Inverno"),
        SelectFilterOption("Primavera", "Primavera"),
        SelectFilterOption("Estate", "Estate"),
        SelectFilterOption("Autunno", "Autunno"),
      ]),
      SeparatorFilter(),
      SelectFilter("OrderList", "Ordinamento", 0, [
        SelectFilterOption("Any", ""),
        SelectFilterOption("Lista A-Z", "Lista A-Z"),
        SelectFilterOption("Lista Z-A", "Lista Z-A"),
        SelectFilterOption("Popolarità", "Popolarità"),
        SelectFilterOption("Valutazione", "Valutazione"),
      ]),
    ];
  }


AnimeUnity main(MSource source) {
  return AnimeUnity(source: source);
}
