import '../../../../../../../model/source.dart';

Source get senpaiedicionesSource => _senpaiedicionesSource;
Source _senpaiedicionesSource = Source(
  name: "Senpai Ediciones",
  baseUrl: "https://senpaiediciones.com",
  lang: "es",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/es/senpaiediciones/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "es",
);
