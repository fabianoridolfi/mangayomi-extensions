import '../../../../../../../model/source.dart';

Source get ladyestelarscanSource => _ladyestelarscanSource;

Source _ladyestelarscanSource = Source(
  name: "Lady Estelar Scan",
  baseUrl: "https://ladyestelarscan.com.br",
  lang: "pt-BR",

  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/ladyestelarscan/icon.png",
  dateFormat: "dd/MM/yyyy",
  dateFormatLocale: "pt-br",
);
