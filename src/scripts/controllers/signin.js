angular.module('qui')
  .controller('SigninFormController', [
    '$rootScope',
    '$state',
    '$q',
    'Auth',
    'AUTH_EVENTS',
    function SigninCtrl($rootScope, $state, $q, Auth, AUTH_EVENTS) {
      const vm = this;
      vm.user = {};
      vm.authError = null;
      vm.signin = function signin() {
        vm.authError = null;

        // Try to login
        Auth.login({username: vm.user.username, password: vm.user.password})
          .then(
            function handleLogin() {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            },

            function handleError(error) {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              vm.authError = error.message;
              const err = new Error(error.message);
              return $q.reject(err.message);
            }
          )
          .then(function setSession() {
            return Auth.setSessionData()
              .then(function openApp() {
                return $state.go('app.jobs.list');
              });
          });
      };
    },
  ]);
