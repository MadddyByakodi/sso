angular.module('qui.accounts')
  .controller('LogoutController', [
    '$rootScope',
    '$state',
    '$q',
    'Auth',
    'AUTH_EVENTS',
    function LogoutController($rootScope, $state, $q, Auth, AUTH_EVENTS) {
      const vm = this;
      vm.init = function logout() {
        // Try to logout
        Auth.logout()
          .then(
            function handleLogin() {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              return $state.go('oauth.signin');
            },

            function handleError() {
              $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
              return $state.go('oauth.signin');
            }
          );
      };
    },
  ]);