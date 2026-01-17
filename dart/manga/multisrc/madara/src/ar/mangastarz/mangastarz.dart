import '../../../../../../../model/source.dart';

Source get mangastarzSource => _mangastarzSource;
Source _mangastarzSource = Source(
  name: "Manga Starz",
  baseUrl: "https://manga-starz.com",
  lang: "ar",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/ar/mangastarz/icon.png",
  dateFormat: "d MMMM، yyyy",
  dateFormatLocale: "ar",
);
