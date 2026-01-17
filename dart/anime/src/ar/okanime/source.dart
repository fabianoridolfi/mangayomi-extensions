import '../../../../../model/source.dart';

Source get okanimeSource => _okanimeSource;
const _okanimeVersion = "0.0.6";
const _okanimeSourceCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/ar/okanime/okanime.dart";
Source _okanimeSource = Source(
  name: "Okanime",
  baseUrl: "https://www.okanime.xyz",
  lang: "ar",
  typeSource: "single",
  iconUrl: "$rawRepoUrl/$branchName/dart/anime/src/ar/okanime/icon.png",
  sourceCodeUrl: _okanimeSourceCodeUrl,
  version: _okanimeVersion,
  itemType: ItemType.anime,
);
