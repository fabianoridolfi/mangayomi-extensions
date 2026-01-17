import '../../../../../../../model/source.dart';

Source get manhuaonlineSource => _manhuaonlineSource;
Source _manhuaonlineSource = Source(
  name: "Manhua Online",
  baseUrl: "https://blog.manhuaonline.org",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/manhuaonline/icon.png",
  dateFormat: "dd 'de' MMMM 'de' yyyy",
  dateFormatLocale: "es",
);
