import '../../../../../../../model/source.dart';

Source get lscansSource => _lscansSource;
Source _lscansSource = Source(
  name: "L Scans",
  baseUrl: "https://lscans.com",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/lscans/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "en",
);
