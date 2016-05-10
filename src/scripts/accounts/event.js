angular.module('qui.accounts')
  .run([
    '$rootScope',
    'Auth',
    'authService',
    'AUTH_EVENTS',
    'Session',
    '$state',
    '$location',
    function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $location) {
      /* eslint angular/on-watch: 0 */

      const encodedContinue = encodeURIComponent($location.url());

      // In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', (event, next) => {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'oauth')) {
          $location
            .url(`${$state.href('oauth.signin')}?continue=${encodedContinue}`);
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        if (Session.isAuthenticated() && (next.name === 'oauth.signin')) {
          event.preventDefault();
          $state.go('app.home');
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, (event, data) => {
        angular.noop(event);
        angular.noop(data);
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

              err => {
                if (err.status === 400) {
                  Session.destroy();
                  $location
                    .url(`${$state.href('oauth.signin')}?continue=${encodedContinue}`);
                }
              }
            );
        }
      });
    },
  ]);
