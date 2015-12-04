angular.module('qui')
  .run([
    '$rootScope',
    '$state',
    '$stateParams',
    function quiRun($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    },
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function quiStateConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/access/signin');

      $stateProvider
        .state('access', {
          url: '/access',
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
        })
        .state('access.signin', {
          url: '/signin',
          templateUrl: 'html/signin.html',
        })
        .state('access.forgotpass', {
          url: '/forgotpass',
          templateUrl: 'html/forgotpass.html',
        })
        .state('access.404', {
          url: '/404',
          templateUrl: 'html/404.html',
        })
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'html/app.html',
        })
        .state('app.dashboard', {
          url: '/dashboard',
          templateUrl: 'html/dashboard.html',
        })
        .state('app.jobs', {
          url: '/jobs',
          templateUrl: 'html/jobs.html',
        });
    },
  ]);
