import '../../../../../../../model/source.dart';

Source get unitoonSource => _unitoonSource;
Source _unitoonSource = Source(
  name: "Unitoon",
  baseUrl: "https://lectorunitoon.com",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/unitoon/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "es",
);
