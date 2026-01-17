import '../../../../../../../model/source.dart';

Source get nirvanamangaSource => _nirvanamangaSource;
Source _nirvanamangaSource = Source(
  name: "Nirvana Manga",
  baseUrl: "https://nirvanamanga.com",
  lang: "tr",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/tr/nirvanamanga/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "tr",
);
