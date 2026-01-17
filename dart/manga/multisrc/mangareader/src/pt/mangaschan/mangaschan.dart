import '../../../../../../../model/source.dart';

Source get mangaschanSource => _mangaschanSource;
Source _mangaschanSource = Source(
  name: "Mangás Chan",
  baseUrl: "https://mangaschan.net",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/pt/mangaschan/icon.png",
  dateFormat: "MMMMM dd, yyyy",
  dateFormatLocale: "pt-br",
);
