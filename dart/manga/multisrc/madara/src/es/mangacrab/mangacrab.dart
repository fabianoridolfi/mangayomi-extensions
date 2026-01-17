import '../../../../../../../model/source.dart';

Source get mangacrabSource => _mangacrabSource;
Source _mangacrabSource = Source(
  name: "Manga Crab",
  baseUrl: "https://mangacrab.org",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/mangacrab/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "es",
);
