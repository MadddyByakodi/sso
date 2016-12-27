angular.module('qui.accounts')
  .controller('LogoutController', [
    '$window',
    '$stateParams',
    '$rootScope',
    '$state',
    '$q',
    'Auth',
    'AUTH_EVENTS',
    function LogoutController($window, $stateParams, $rootScope, $state, $q, Auth, AUTH_EVENTS) {
      const vm = this;
      const location = $window.location;
      vm.init = function logout() {
        // Try to logout
        Auth.logout()
          .then(
            () => {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              if ($stateParams.continue) {
                let continueUrl = $stateParams.continue;
                if (continueUrl[0] === '/') {
                  continueUrl = location.hostname + $stateParams.continue;
                }

                location.href = continueUrl;
                return;
              }

              location.href = `${location.hostname}/home`;
            },

            () => {
              $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
              if ($stateParams.continue) {
                let continueUrl = $stateParams.continue;
                if (continueUrl[0] === '/') {
                  continueUrl = location.hostname + $stateParams.continue;
                }

                location.href = continueUrl;
                return;
              }

              location.href = `${location.hostname}/home`;
            }
          );
      };
    },
  ]);
