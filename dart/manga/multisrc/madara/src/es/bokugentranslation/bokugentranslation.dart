import '../../../../../../../model/source.dart';

Source get bokugentranslationSource => _bokugentranslationSource;
Source _bokugentranslationSource = Source(
  name: "BokugenTranslation",
  baseUrl: "https://bokugents.com",
  lang: "es",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/es/bokugentranslation/icon.png",
  dateFormat: "MMMM dd, yyyy",
  dateFormatLocale: "es",
);
