import '../../../../../../../model/source.dart';

Source get wonderlandscanSource => _wonderlandscanSource;

Source _wonderlandscanSource = Source(
  name: "Wonderland Scan",
  baseUrl: "https://wonderlandscan.com",
  lang: "pt-BR",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/wonderlandscan/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "pt-br",
);
