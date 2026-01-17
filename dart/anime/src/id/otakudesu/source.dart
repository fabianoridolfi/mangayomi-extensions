import '../../../../../model/source.dart';

Source get otakudesu => _otakudesu;
const _otakudesuVersion = "0.0.6";
const _otakudesuCodeUrl =
    "$rawRepoUrl/$branchName/dart/anime/src/id/otakudesu/otakudesu.dart";
Source _otakudesu = Source(
  name: "OtakuDesu",
  baseUrl: "https://otakudesu.cloud",
  lang: "id",
  typeSource: "single",
  iconUrl: "$rawRepoUrl/$branchName/dart/anime/src/id/otakudesu/icon.png",
  sourceCodeUrl: _otakudesuCodeUrl,
  version: _otakudesuVersion,
  itemType: ItemType.anime,
);
