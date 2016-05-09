angular.module('qui.accounts')
  .controller('SigninFormController', [
    '$rootScope',
    '$state',
    '$location',
    '$q',
    'Auth',
    'AUTH_EVENTS',
    'Page',
    function SigninFormCtrl($rootScope, $state, $location, $q, Auth, AUTH_EVENTS, Page) {
      const vm = this;
      Page.setTitle('Sign In');
      vm.user = { username: '', password: '' };
      vm.authError = null;
      vm.signin = function signin() {
        vm.authError = null;

        // Try to login
        Auth.login({ username: vm.user.username, password: vm.user.password })
          .then(
            () => {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              Auth.setSessionData().then(() => {
                if ($location.search().continue) return $location.url($location.search().continue);
                return $location.path($state.href('app.home'));
              });
            },

            err => {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              vm.authError = err.error_description;
            }
          );
      };
    },
  ]);
