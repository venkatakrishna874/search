// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  cleanws: 'https://synthory-d.am.lilly.com:9090/jws/rest-v0/util/convert/clean',
  experimentNames: 'https://synthory-d.am.lilly.com:8080/v0/rxns/experiment-names',
  getRuidInfo: 'https://synthory.am.lilly.com:7200/DynamicWebServices/rest/rxndb/GetInfoFromRuid',
  getVaultNames: 'https://synthory-d.am.lilly.com:8080/v0/rxns/vaults',
  labNames: 'https://synthory-d.am.lilly.com:8080/v0/rxns/labs',
  molconvertws: 'https://synthory-d.am.lilly.com:9090/jws/rest-v0/util/calculate/molExport',
  notebookPages: 'https://synthory-d.am.lilly.com:8080/v0/rxns/notebook-pages',
  rxnsSearchHitCount: 'https://synthory-d.am.lilly.com:8080/v0/rxns/search-hit-count',
  rxnsSearch: 'https://synthory-d.am.lilly.com:8080/v0/rxns/search',
  ruidDetailsPage: 'https://synthory-d.am.lilly.com:8443/#/ruid-search?ruid=',
  stoichiometryTableInfo: 'https://synthory.am.lilly.com:7200/DynamicWebServices/rest/rxndb/GetComponentsByRuids',
  userInfo: 'https://synthory-d.am.lilly.com:8443/user-info',
  yields: 'https://synthory-d.am.lilly.com:8080/v0/rxns/yields'
};
