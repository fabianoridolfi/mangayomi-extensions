import '../../../../../../../model/source.dart';

Source get mangasnosekaiSource => _mangasnosekaiSource;
Source _mangasnosekaiSource = Source(
  name: "Mangas No Sekai",
  baseUrl: "https://mangasnosekai.com",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/mangasnosekai/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "es",
);
