import '../../../../../../../model/source.dart';

Source get taurusfansubSource => _taurusfansubSource;

Source _taurusfansubSource = Source(
  name: "Taurus Fansub",
  baseUrl: "https://taurusfansub.com",
  lang: "es",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/taurusfansub/icon.png",
  dateFormat: "dd/MM/yyy",
  dateFormatLocale: "es",
);
