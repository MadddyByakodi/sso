angular.module('qui')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    refreshTokenSuccess: 'auth-token-refresh-success',
    refreshedTokenFailed: 'auth-token-refresh-failed',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
  })
  .factory('Auth', [
    '$http',
    '$q',
    'Session',
    'APP',
    function Auth($http, $q, Session, APP) {
      const authService = {};

      authService.login = function login(credentials) {
        return $http
          .post('/api/login', credentials)
          .then(
            function signinSuccess(response) {
              return Session.create('oauth', response.data);
            },

            function signinFailure(response) {
              Session.destroy();
              const err = new Error(response.data.error);
              return $q.reject(err);
            }
          );
      };

      authService.refreshToken = function refreshToken() {
        Session.destroy('oauth');
        return $http
          .post('/api/refresh', {refresh_token: Session.read('oauth').refresh_token})
          .then(function tokenRefreshed(response) {
            Session.create('oauth', response.data);
            return response.data;
          },

          function tokenRefreshError(response) {
            return $q.reject(response.data);
          });
      };

      authService.setSessionData = function getUserInfo() {
        return $http
          .get(APP.apiServer + '/userinfo')
          .then(function userinfoSuccess(response) {
            return Session.create('userinfo', response.data);
          });
      };

      return authService;
    },
  ]);
