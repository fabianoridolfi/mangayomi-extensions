import '../../../../../../../model/source.dart';

Source get manhuathaiSource => _manhuathaiSource;
Source _manhuathaiSource = Source(
  name: "ManhuaThai",
  baseUrl: "https://www.manhuathai.com",
  lang: "th",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/th/manhuathai/icon.png",
  dateFormat: "d MMMM yyyy",
  dateFormatLocale: "th",
);
