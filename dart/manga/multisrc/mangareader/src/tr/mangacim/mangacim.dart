import '../../../../../../../model/source.dart';

Source get mangacimSource => _mangacimSource;

Source _mangacimSource = Source(
  name: "Mangacim",
  baseUrl: "https://www.mangacim.com",
  lang: "tr",
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/tr/mangacim/icon.png",
  dateFormat: "MMM d, yyy",
  dateFormatLocale: "tr",
);
