import '../../../../../model/source.dart';

Source get kisskhSource => _kisskhSource;
const _kisskhVersion = "0.0.7";
const _kisskhSourceCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/en/kisskh/kisskh.dart";
Source _kisskhSource = Source(
  name: "KissKH",
  baseUrl: "https://kisskh.co",
  lang: "en",
  typeSource: "single",
  iconUrl: "$rawRepoUrl/$branchName/dart/anime/src/en/kisskh/icon.png",
  sourceCodeUrl: _kisskhSourceCodeUrl,
  version: _kisskhVersion,
  itemType: ItemType.anime,
);
