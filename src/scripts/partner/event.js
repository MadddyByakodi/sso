angular.module('qui.partner')
  .run([
    '$rootScope',
    'Auth',
    'authService',
    'AUTH_EVENTS',
    'Session',
    '$state',
    '$window',
    'APP',
    function handleEvents(
      $rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, APP
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

        if (Session.isAuthenticated() && (next.name === 'access.oauth')) {
          event.preventDefault();
          $state.go('app.dashboard');
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginRequired, () => {
        if (Session.isAuthenticated()) {
          // Refresh token autimatically if token expires
          Auth
            .refreshToken()
            .then(() => authService.loginConfirmed('success', config => {
              const conf = config;
              conf.headers.Authorization = `Bearer ${Session.getAccessToken()}`;
              return conf;
            }));
        }
      });
    },
  ]);
