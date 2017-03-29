angular.module('qui.accounts')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function quiStateConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise(($injector, $location) => {
        const url = $location.url();
        if (!['/', '/home'].includes(url)) {
          const user = $injector.get('Session').read('userinfo');
          const location = $injector.get('$window').location;
          const APP = $injector.get('APP');
          if (!user) return $location.url(`/signin?continue=${encodeURIComponent(url)}`);
          switch (user.group_id) {
            case 2:
              location.href = `${APP.partnerServer}${url}`;
              return null;
            case 4:
            case 8:
            case 9:
              location.href = `${APP.manageServer}${url}`;
              return null;
            case 5:
              location.href = `${APP.hireServer}${url}`;
              return null;
            default:
              return $location.url('/home');
          }
        }

        return $location.url('/home');
      });

      $stateProvider
        .state('oauth', {
          url: '',
          template: '<div ui-view class="fade-in-right-big smooth"></div>',
        })
        .state('oauth.signin', {
          url: '/signin',
          templateUrl: 'html/signin.html',
        })
        .state('oauth.password-reset', {
          url: '/password_reset',
          template: '<password-reset></password-reset>',
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
          url: '/logout?continue',
          templateUrl: 'html/accounts.logout.html',
        })
        .state('app.authorise', {
          url: '/authorise',
          templateUrl: 'html/accounts.authorise.html',
        })
        .state('app.password-change', {
          url: '/password_change',
          template: '<password-change></password-change>',
        })
        .state('app.home', {
          url: '/home',
          templateUrl: 'html/accounts.home.html',
        });
    },
  ]);
