import '../../../../../model/source.dart';

Source get gogoanimeSource => _gogoanimeSource;
const _gogoanimeVersion = "0.1.2";
const _gogoanimeSourceCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/en/gogoanime/gogoanime.dart";
Source _gogoanimeSource = Source(
  name: "Gogoanime",
  baseUrl: "https://anitaku.to",
  lang: "en",
  typeSource: "single",
  iconUrl: "$rawRepoUrl/$branchName/dart/anime/src/en/gogoanime/icon.png",
  sourceCodeUrl: _gogoanimeSourceCodeUrl,
  version: _gogoanimeVersion,
  itemType: ItemType.anime,
);
