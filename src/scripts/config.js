angular.module('qui')
  .constant('APP', {
    apiServer: 'http://localhost:3001',
  })
  .config([
    '$locationProvider',
    function quiConfig($locationProvider) {
      $locationProvider.html5Mode(true);
    },
  ]);
