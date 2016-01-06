angular.module('qui')
  .run([
    '$rootScope',
    'Auth',
    'AUTH_EVENTS',
    'Session',
    '$state',
    '$log',
    function handleEvents($rootScope, Auth, AUTH_EVENTS, Session, $state, $log) {
      /* eslint angular/on-watch: 0 */

      // In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', function handleStateChange(event, next) {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'access')) {
          event.preventDefault();
          $state.go('access.signin');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess(event, data) {
        $log.info(event);
        $log.info(data);
      });

      $rootScope.$on(AUTH_EVENTS.notAuthenticated, function notAuthenticated() {
        if (Session.isAuthenticated()) {
          // Refresh token autimatically if token expires
          Auth.refreshToken().then(
            function gotRefreshToken() {
              $rootScope.$broadcast(AUTH_EVENTS.refreshTokenSuccess);
            },

            function errRefreshToken(error) {
              $log.error(error);
              $rootScope.$broadcast(AUTH_EVENTS.refreshTokenFailed);
            }
          );
        }
      });
    },
  ]);
