import '../../../../../../../model/source.dart';

Source get skymangasSource => _skymangasSource;
Source _skymangasSource = Source(
  name: "SkyMangas",
  baseUrl: "https://skymangas.com",
  lang: "es",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/es/skymangas/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "es",
);
