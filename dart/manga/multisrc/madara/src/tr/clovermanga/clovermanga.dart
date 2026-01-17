import '../../../../../../../model/source.dart';

Source get clovermangaSource => _clovermangaSource;

Source _clovermangaSource = Source(
  name: "Clover Manga",
  baseUrl: "https://webtoonhatti.me",
  lang: "tr",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/tr/clovermanga/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "tr",
);
