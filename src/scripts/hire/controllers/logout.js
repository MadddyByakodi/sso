angular.module('qui.hire')
  .controller('LogoutController', [
    '$rootScope',
    '$state',
    '$q',
    'Auth',
    'AUTH_EVENTS',
    'APP',
    '$window',
    function LogoutController($rootScope, $state, $q, Auth, AUTH_EVENTS, APP, $window) {
      const vm = this;
      vm.init = function logout() {
        // Try to logout
        Auth.logout()
          .then(
            function handleLogin() {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              $window.location.href = `${APP.accountsServer}/logout`;
            },

            function handleError() {
              $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
              $window.location.href = `${APP.accountsServer}/logout`;
            }
          );
      };
    },
  ]);
