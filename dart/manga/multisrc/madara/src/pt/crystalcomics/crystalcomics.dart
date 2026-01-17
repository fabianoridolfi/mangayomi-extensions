import '../../../../../../../model/source.dart';

Source get crystalcomicsSource => _crystalcomicsSource;
Source _crystalcomicsSource = Source(
  name: "Crystal Comics",
  baseUrl: "https://crystalcomics.com",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/crystalcomics/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "pt-br",
);
