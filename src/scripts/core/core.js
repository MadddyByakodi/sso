angular
  .module('qui.core', [
    'qui.search',
    'qui.constant',
    'qui.components',
    'http-auth-interceptor',
  ])
  .config([
    '$locationProvider',
    function quiConfig($locationProvider) {
      $locationProvider.html5Mode(true);
    },
  ]);
