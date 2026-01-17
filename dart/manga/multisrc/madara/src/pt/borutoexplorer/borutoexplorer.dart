import '../../../../../../../model/source.dart';

Source get borutoexplorerSource => _borutoexplorerSource;
Source _borutoexplorerSource = Source(
  name: "Boruto Explorer",
  baseUrl: "https://leitor.borutoexplorer.com.br",
  lang: "pt-br",
  isNsfw: false,
  typeSource: "madara",
  iconUrl:
      "$rawRepoUrl/$branchName/dart/manga/multisrc/madara/src/pt/borutoexplorer/icon.png",
  dateFormat: "dd 'de' MMMMM 'de' yyyy",
  dateFormatLocale: "pt-br",
);
