import '../../../../../../../model/source.dart';

Source get flamescansfrSource => _flamescansfrSource;
Source _flamescansfrSource = Source(
  name: "Legacy Scans",
  baseUrl: "https://legacy-scans.com",
  lang: "fr",
  isNsfw: false,
  typeSource: "mangareader",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/mangareader/src/fr/flamescansfr/icon.png",
  dateFormat: "MMMM d, yyyy",
  dateFormatLocale: "fr",
);
