import '../../../../../../../model/source.dart';

Source get manhwafullSource => _manhwafullSource;

Source _manhwafullSource = Source(
  name: "Manhwafull",
  baseUrl: "https://manhwafull.com",
  lang: "en",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/en/manhwafull/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "en_us",
);
