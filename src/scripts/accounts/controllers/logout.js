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
              const next = $stateParams.continue || '/home';
              location.href = next[0] === '/'
                ? `${location.origin}${next}`
                : next;
              return $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            },

            () => {
              const next = $stateParams.continue || '/home';
              location.href = next[0] === '/'
                ? `${location.origin}${next}`
                : next;
              return $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            }
          );
      };
    },
  ]);
