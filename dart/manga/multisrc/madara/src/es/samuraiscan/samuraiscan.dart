import '../../../../../../../model/source.dart';

Source get samuraiscanSource => _samuraiscanSource;

Source _samuraiscanSource = Source(
  name: "SamuraiScan",
  baseUrl: "https://samuraiscan.com",
  lang: "es",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/samuraiscan/icon.png",
  dateFormat: "MMMM d, yyyy",
  dateFormatLocale: "es",
);
