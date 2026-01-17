import '../../../../../../../model/source.dart';

Source get lilyumfansubSource => _lilyumfansubSource;
Source _lilyumfansubSource = Source(
  name: "LilyumFansub",
  baseUrl: "https://lilyumfansub.com.tr",
  lang: "tr",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/tr/lilyumfansub/icon.png",
  dateFormat: "MMMM dd yyyy",
  dateFormatLocale: "tr",
);
