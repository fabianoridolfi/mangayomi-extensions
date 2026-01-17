import '../../../../../../../model/source.dart';

Source get hwagoSource => _hwagoSource;
Source _hwagoSource = Source(
  name: "Hwago",
  baseUrl: "https://hwago01.xyz",
  lang: "id",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/id/hwago/icon.png",
  dateFormat: "d MMMM yyyy",
  dateFormatLocale: "en",
);
