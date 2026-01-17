import '../../../../../../../model/source.dart';

Source get patimangaSource => _patimangaSource;
Source _patimangaSource = Source(
  name: "Pati Manga",
  baseUrl: "https://www.patimanga.com",
  lang: "tr",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/tr/patimanga/icon.png",
  dateFormat: "MMMM d, yyy",
  dateFormatLocale: "tr",
);
