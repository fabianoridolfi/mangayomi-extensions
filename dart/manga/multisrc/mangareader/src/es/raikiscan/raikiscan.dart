import '../../../../../../../model/source.dart';

Source get raikiscanSource => _raikiscanSource;

Source _raikiscanSource = Source(
  name: "Raiki Scan",
  baseUrl: "https://raikiscan.com",
  lang: "es",
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/es/raikiscan/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "en_us",
);
