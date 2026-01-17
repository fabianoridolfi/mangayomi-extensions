import '../../../../../../model/source.dart';

Source get wiflixSource => _wiflixSource;

Source _wiflixSource = Source(
  name: "Wiflix",
  baseUrl: "https://wiflix-hd.vip",
  lang: "fr",
  typeSource: "datalifeengine",
  itemType: ItemType.anime,
  iconUrl:
      "$rawRepoUrl/$branchName/dart/anime/multisrc/datalifeengine/src/wiflix/icon.png",
);
