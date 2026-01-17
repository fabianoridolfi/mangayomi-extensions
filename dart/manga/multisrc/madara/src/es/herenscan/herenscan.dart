import '../../../../../../../model/source.dart';

Source get herenscanSource => _herenscanSource;
Source _herenscanSource = Source(
  name: "HerenScan",
  baseUrl: "https://herenscan.com",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/herenscan/icon.png",
  dateFormat: "d 'de' MMM 'de' yyy",
  dateFormatLocale: "es",
);
