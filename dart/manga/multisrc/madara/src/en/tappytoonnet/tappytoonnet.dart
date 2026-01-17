import '../../../../../../../model/source.dart';

Source get tappytoonnetSource => _tappytoonnetSource;
Source _tappytoonnetSource = Source(
  name: "TappyToon.Net",
  baseUrl: "https://tappytoon.net",
  lang: "en",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/en/tappytoonnet/icon.png",
  dateFormat: "MMMM d, yyyy",
  dateFormatLocale: "en_us",
);
