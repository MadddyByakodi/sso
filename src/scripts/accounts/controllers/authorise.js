angular.module('qui.accounts')
  .controller('AuthoriseController', [
    'OAuthorise',
    '$location',
    '$window',
    function AuthoriseController(OAuthorise, $location, $window) {
      const vm = this;

      OAuthorise.get($location.search())
        .then(res => {
          vm.app = res.data;
          vm.done(true);
        })
        .catch(res => (vm.error = res.data.error));

      vm.done = function done(allow) {
        const data = $location.search();
        const location = $window.location;
        data.allow = allow ? 'true' : 'false';
        OAuthorise
          .post(data)
          .then(res => (location.href = res.data));
      };
    },
  ]);
