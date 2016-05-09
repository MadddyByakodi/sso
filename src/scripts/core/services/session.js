angular.module('qui.core')
  .factory('Session', [
    '$window',
    function Session($window) {
      const sessionService = {};
      const localStorage = $window.localStorage;

      sessionService.create = function create(key, value) {
        localStorage[key] = angular.toJson(value);
      };

      sessionService.read = function read(key) {
        return angular.fromJson(localStorage[key]);
      };

      sessionService.destroy = function destroy() {
        localStorage.clear();
      };

      sessionService.isAuthenticated = function isAuthenticated() {
        return !!(sessionService.read('oauth') && sessionService.read('oauth').access_token);
      };

      sessionService.getAccessToken = function getAccessToken() {
        return sessionService.read('oauth') && sessionService.read('oauth').access_token;
      };

      sessionService.isAuthorized = function isAuthorized(authorizedRoles) {
        let roles = authorizedRoles;
        if (!angular.isArray(roles)) {
          roles = [].push(roles);
        }

        return (sessionService.isAuthenticated() && ~roles.indexOf(sessionService.userRole));
      };

      return sessionService;
    },
  ]);
