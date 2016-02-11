angular
  .module('qui.core', [
    'qui.search',
    'qui.constant',
    'qui.components',
    'http-auth-interceptor',
  ])
  .constant('APP', {
    apiServer: '//api.quezx.dev',
    accountsServer: '//accounts.quezx.dev',
    hireServer: '//hire.quezx.dev',
    hireLogin: '//accounts.quezx.dev/authorise?client_id=quezxrecruiterappid&response_type=code&' +
    'redirect_uri=http://hire.quezx.dev/access/oauth&state=yo',
  })
  .config([
    '$locationProvider',
    function quiConfig($locationProvider) {
      $locationProvider.html5Mode(true);
    },
  ]);
