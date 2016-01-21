angular.module('qui')
  .run([
    '$rootScope',
    'Auth',
    'authService',
    'AUTH_EVENTS',
    'Session',
    '$state',
    '$log',
    function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $log) {
      /* eslint angular/on-watch: 0 */

      // In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', function handleStateChange(event, next) {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'access')) {
          event.preventDefault();
          $state.go('access.signin');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        if (Session.isAuthenticated() && (next.name === 'access.signin')) {
          event.preventDefault();
          $state.go('app.dashboard');
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess(event, data) {
        $log.info(event);
        $log.info(data);
      });

      $rootScope.$on(AUTH_EVENTS.loginRequired, function loginRequired() {
        if (Session.isAuthenticated()) {
          // Refresh token autimatically if token expires
          Auth.refreshToken().then(
            function gotRefreshToken() {
              authService.loginConfirmed('success', function updateConfig(config) {
                config.headers.Authorization = 'Bearer ' + Session.getAccessToken();
                return config;
              });
            },

            function errRefreshToken(error) {
              $log.error(error);
            }
          );
        }
      });
    },
  ]);
