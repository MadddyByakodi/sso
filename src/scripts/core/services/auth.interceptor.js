angular
  .module('qui.core')
  .factory('AuthInterceptor', [
    '$rootScope',
    '$q',
    'AUTH_EVENTS',
    'Session',
    function AuthIterceptor($rootScope, $q, AUTH_EVENTS, Session) {
      return {
        request: function request(config) {
          const conf = config;
          if (Session.isAuthenticated()) {
            conf.headers.Authorization = `Bearer ${Session.getAccessToken()}`;
          }

          return conf;
        },
      };
    },
  ])
  .config([
    '$httpProvider',
    function httpIntercept($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    },
  ]);
