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
        return $http
          .post('/api/refresh', {refresh_token: Session.read('oauth').refresh_token})
          .then(function tokenRefreshed(response) {
            Session.create('oauth', response.data);
            return response.data;
          },

          function tokenRefreshError(response) {
            Session.destroy('oauth');
            return $q.reject(response.data);
          });
      };

      authService.logout = function logout() {
        const url = '/api/logout';
        return $http
          .post(url, {access_token: Session.getAccessToken()})
          .then(
            function logoutSuccess(response) {
              // Destroy Session data
              Session.destroy();
              return response.data;
            },

            function logoutError(response) {
              Session.destroy();
              return $q.reject(response.data);
            }
          );
      };

      authService.forgotpass = function forgotpass(username) {
        const url = '/api/forgotpass';
        return $http
          .post(url, {username: username})
          .then(
            function forgotpassSuccess(response) {
              return response.data;
            },

            function forgotpassError(response) {
              return $q.reject(response.data);
            }
          );
      };

      authService.setSessionData = function gInfo() {
        return $q.all([
          $http
            .get(APP.apiServer + '/userinfo')
            .then(function userinfoSuccess(response) {
              return Session.create('userinfo', response.data);
            }),

          $http
            .get(APP.apiServer + '/quarc/state')
            .then(function statesSuccess(response) {
              return Session.create('states', response.data.data);
            }),
        ]);
      };

      return authService;
    },
  ]);
