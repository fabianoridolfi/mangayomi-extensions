import '../../../../../../../model/source.dart';

Source get mangareadSource => _mangareadSource;

Source _mangareadSource = Source(
  name: "Manga Read",
  baseUrl: "https://mangaread.co",
  lang: "en",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/en/mangaread/icon.png",
  dateFormat: "yyyy-MM-dd",
  dateFormatLocale: "en_us",
);
