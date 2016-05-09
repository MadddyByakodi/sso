angular.module('qui.hire')
  .run([
    '$rootScope',
    'Auth',
    'authService',
    'AUTH_EVENTS',
    'Session',
    '$state',
    '$window',
    'APP',
    '$uibModal',
    function handleEvents(
      $rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, APP, $uibModal
    ) {
      /* eslint angular/on-watch: 0 */
      const location = $window.location;

      // In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', (event, next) => {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'access')) {
          event.preventDefault();
          location.href = APP.hireLogin;
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginRequired, () => {
        if (Session.isAuthenticated()) {
          // Refresh token autimatically if token expires
          Auth
            .refreshToken()
            .then(
              () => authService.loginConfirmed(
                'success',
                config => {
                  const conf = config;
                  conf.headers.Authorization = `Bearer ${Session.getAccessToken()}`;
                  return conf;
                }
              ),

              () => $uibModal.open({
                animation: true,
                templateUrl: 'html/modal.reauth.html',
                controller: function reauth() {
                  const vm = this;
                  vm.href = APP.accountsServer;
                },

                controllerAs: 'ReAuth',
                backdrop: 'static',
              })
            );
        }
      });
    },
  ]);
