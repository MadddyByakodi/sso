angular.module('qui.accounts')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function quiStateConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('oauth', {
          url: '/oauth',
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
        })
        .state('oauth.signin', {
          url: '/signin',
          templateUrl: 'html/signin.html',
        })
        .state('oauth.forgotpass', {
          url: '/forgotpass',
          templateUrl: 'html/forgotpass.html',
        })
        .state('oauth.404', {
          url: '/404',
          templateUrl: 'html/accounts.404.html',
        })
        .state('app', {
          abstract: true,
          url: '',
          templateUrl: 'html/accounts.app.html',
        })
        .state('app.logout', {
          url: '/logout',
          templateUrl: 'html/accounts.logout.html',
        })
        .state('app.authorise', {
          url: '/authorise',
          templateUrl: 'html/accounts.authorise.html',
        })
        .state('app.update-password', {
          url: '/update-password',
          template: '<update-password></update-password>',
        })
        .state('app.home', {
          url: '/home',
          templateUrl: 'html/accounts.home.html',
        });
    },
  ]);
