import '../../../../../../../model/source.dart';

Source get mangascantradSource => _mangascantradSource;
Source _mangascantradSource = Source(
  name: "Manga-Scantrad",
  baseUrl: "https://manga-scantrad.io",
  lang: "fr",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/fr/mangascantrad/icon.png",
  dateFormat: "d MMM yyyy",
  dateFormatLocale: "fr",
);
