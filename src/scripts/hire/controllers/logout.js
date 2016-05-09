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
        const location = $window.location;
        Auth.logout()
          .then(
            () => {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              location.href = `${APP.accountsServer}/logout`;
            },

            () => {
              $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
              location.href = `${APP.accountsServer}/logout`;
            }
          );
      };
    },
  ]);
