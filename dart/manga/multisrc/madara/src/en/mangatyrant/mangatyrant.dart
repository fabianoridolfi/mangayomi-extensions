import '../../../../../../../model/source.dart';

Source get mangatyrantSource => _mangatyrantSource;

Source _mangatyrantSource = Source(
  name: "MangaTyrant",
  baseUrl: "https://mangatyrant.com",
  lang: "en",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/en/mangatyrant/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "en_us",
);
