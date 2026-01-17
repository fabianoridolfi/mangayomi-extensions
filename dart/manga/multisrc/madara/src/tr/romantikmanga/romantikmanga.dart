import '../../../../../../../model/source.dart';

Source get romantikmangaSource => _romantikmangaSource;

Source _romantikmangaSource = Source(
  name: "Romantik Manga",
  baseUrl: "https://romantikmanga.com",
  lang: "tr",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/tr/romantikmanga/icon.png",
  dateFormat: "MMM d, yyy",
  dateFormatLocale: "tr",
);
