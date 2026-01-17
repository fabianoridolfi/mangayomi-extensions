import '../../../../../../../model/source.dart';

Source get fayscansSource => _fayscansSource;
Source _fayscansSource = Source(
  name: "Fay Scans",
  baseUrl: "https://fayscans.net",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/fayscans/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "pt-br",
);
