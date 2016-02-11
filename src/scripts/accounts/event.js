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

      // In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', function handleStateChange(event, next) {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'oauth')) {
          const encodedContinue = encodeURIComponent($location.url());
          $location
            .url(`${$state.href('oauth.signin')}?continue=${encodedContinue}`);
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        if (Session.isAuthenticated() && (next.name === 'oauth.signin')) {
          event.preventDefault();
          $state.go('app.home');
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess(event, data) {
        angular.noop(event);
        angular.noop(data);
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
              angular.noop(error);
            }
          );
        }
      });
    },
  ]);
