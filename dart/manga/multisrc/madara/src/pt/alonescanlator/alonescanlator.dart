import '../../../../../../../model/source.dart';

Source get alonescanlatorSource => _alonescanlatorSource;
Source _alonescanlatorSource = Source(
  name: "Alone Scanlator",
  baseUrl: "https://alonescanlator.com.br",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/alonescanlator/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "pt-br",
);
