angular.module('qui.partner')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function quiStateConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('/', '/app/dashboard');
      $urlRouterProvider.otherwise('/access/404');
      $stateProvider
        .state('access', {
          url: '/access',
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
        })
        .state('access.oauth', {
          url: '/oauth',
          templateUrl: 'html/oauth.quezx.html',
        })
        .state('access.404', {
          url: '/404',
          templateUrl: 'html/partner.404.html',
        })
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'html/hire.app.html',
        })
        .state('app.dashboard', {
          url: '/dashboard',
          templateUrl: 'html/dashboard.html',
        });
    },
  ]);
