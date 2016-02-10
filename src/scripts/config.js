angular.module('qui')
  .constant('APP', {
    apiServer: '//api.quezx.dev',
  })
  .config([
    '$locationProvider',
    function quiConfig($locationProvider) {
      $locationProvider.html5Mode(true);
    },
  ]);
