angular.module('qui.core')
  .constant('AUTH_EVENTS', {
    loginConfirmed: 'event:auth-loginConfirmed',
    loginCancelled: 'event:auth-loginCancelled',
    logoutConfirmed: 'event:auth-logoutConfirmed',
    loginRequired: 'event:auth-loginRequired',
    forbidden: 'event:auth-forbidden',
  })
  .factory('Auth', [
    '$http',
    '$q',
    '$log',
    'Session',
    'APP',
    function Auth($http, $q, $log, Session, APP) {
      const authService = {};
      let refreshingToken = false;

      authService.login = function login(credentials) {
        return $http
          .post('/api/login', credentials, { ignoreAuthModule: true })
          .then(res => Session.create('oauth', res.data))
          .catch(res => {
            Session.destroy();
            return $q.reject(res.data);
          });
      };

      authService.refreshToken = function refreshToken() {
        // To Save Multiple Async RefreshToken Request
        if (refreshingToken) {
          $log.error('Multiple refresh request');
          return $q.reject({ error: 'Multiple refresh request' });
        }

        refreshingToken = true; // Set refresh_token reuqest tracker flag
        return $http
          .post(
            '/api/refresh',
            { refresh_token: Session.read('oauth').refresh_token },
            { ignoreAuthModule: true }
          )
          .then(res => {
            Session.create('oauth', res.data);
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return res.data;
          })
          .catch(res => {
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            return $q.reject(res.data);
          });
      };

      authService.logout = function logout() {
        const url = '/api/logout';
        return $http
          .post(url, { access_token: Session.getAccessToken() })
          .then(res => {
            // Destroy Session data
            Session.destroy();
            return res.data;
          })
          .catch(res => {
            Session.destroy();
            return $q.reject(res.data);
          });
      };

      authService.setSessionData = function gInfo() {
        return $q.all([
          $http
            .get(`${APP.apiServer}/user`)
            .then(res => Session.create('userinfo', res.data)),

          $http
            .get(`${APP.apiServer}/user/states`)
            .then(res => Session.create('states', res.data)),
        ]);
      };

      return authService;
    },
  ]);
