import '../../../../../model/source.dart';

Source get animesaturn => _animesaturn;
const _animesaturnVersion = "0.0.55";
const _animesaturnCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/it/animesaturn/animesaturn.dart";
Source _animesaturn = Source(
  name: "AnimeSaturn",
  baseUrl: "https://www.animesaturn.cx",
  lang: "it",
  typeSource: "single",
  iconUrl: "$rawRepoUrl/$branchName/dart/anime/src/it/animesaturn/icon.png",
  sourceCodeUrl: _animesaturnCodeUrl,
  version: _animesaturnVersion,
  itemType: ItemType.anime,
);
