import '../../../../../model/source.dart';

Source get atsumaruSource => _atsumaruSource;
const _atsumaruVersion = "1.0.1";
const _atsumaruSourceCodeUrl =
    "$rawRepoUrl/$branchName/dart/manga/src/en/Atsumaru/atsumaru.dart";
const _atsumaruIconUrl =
    "$rawRepoUrl/$branchName/dart/manga/src/en/Atsumaru/icon.png";
Source _atsumaruSource = Source(
  name: "Atsumaru",
  baseUrl: "https://atsu.moe",
  apiUrl: "https://atsu.moe/api",
  lang: "en",
  typeSource: "single",
  iconUrl: _atsumaruIconUrl,
  sourceCodeUrl: _atsumaruSourceCodeUrl,
  itemType: ItemType.manga,
  version: _atsumaruVersion,
  dateFormat: "MMM dd yyyy",
  dateFormatLocale: "en",
);
