import '../../../../../model/source.dart';

Source get animeunity => _animeunity;
const _animeunityVersion = "0.0.1";
const _animeunityCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/it/animeunity/animeunity.dart";
Source _animeunity = Source(
  name: "AnimeUnity",
  baseUrl: "https://www.animeunity.so",
  lang: "it",
  typeSource: "single",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/anime/src/it/animeunity/icon.png",
  sourceCodeUrl: _animeunityCodeUrl,
  version: _animeunityVersion,
  itemType: ItemType.anime,
);
