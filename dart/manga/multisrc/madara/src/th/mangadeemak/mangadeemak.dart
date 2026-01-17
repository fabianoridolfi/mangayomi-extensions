import '../../../../../../../model/source.dart';

Source get mangadeemakSource => _mangadeemakSource;
Source _mangadeemakSource = Source(
  name: "MangaDeemak",
  baseUrl: "https://mangadeemak.com",
  lang: "th",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/th/mangadeemak/icon.png",
  dateFormat: "d MMMM yyyy",
  dateFormatLocale: "th",
);
