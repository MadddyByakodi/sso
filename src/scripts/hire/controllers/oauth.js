angular.module('qui.hire')
  .controller('OAuthController', [
    'Auth',
    '$location',
    '$window',
    '$state',
    function OAuthCtrl(Auth, $location, $window, $state) {
      const vm = this;
      const query = $location.search();
      if (query.error) {
        vm.authErr = {
          error: query.error,
          error_description: query.error_description,
          code: query.code,
        };
        return;
      }

      if (query.code) {
        Auth.login({ code: query.code }).then(() => {
          Auth.setSessionData().then(() => {
            const location = $window.location;
            location.href = $state.href(
              'app.jobs.applicants', { bucket: 'All' }, { absolute: true }
            );
          });
        });

        return;
      }

      $state.go('app.jobs.applicants');
    },
  ]);
