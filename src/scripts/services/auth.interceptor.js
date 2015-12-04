angular.module('qui')
  .factory('AuthInterceptor', [
    '$rootScope',
    '$q',
    'AUTH_EVENTS',
    'Session',
    function AuthIterceptor($rootScope, $q, AUTH_EVENTS, Session) {
      return {
        request: function request(config) {
          if (Session.isAuthenticated()) {
            config.headers.Authorization = 'Bearer ' + Session.getAccessToken();
          }

          return config;
        },

        responseError: function responseError(response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout,
          }[response.status], response);
          return $q.reject(response);
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
