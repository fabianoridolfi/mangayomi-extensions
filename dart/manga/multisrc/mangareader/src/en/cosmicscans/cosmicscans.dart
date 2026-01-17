import '../../../../../../../model/source.dart';

Source get cosmicscansSource => _cosmicscansSource;

Source _cosmicscansSource = Source(
  name: "Cosmic Scans",
  baseUrl: "https://cosmicscans.com",
  lang: "en",
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/en/cosmicscans/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "en_us",
);
