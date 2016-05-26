angular.module('qui.accounts')
  .controller('AuthoriseController', [
    'OAuthorise',
    '$location',
    '$window',
    'Session',
    function AuthoriseController(OAuthorise, $location, $window, Session) {
      const vm = this;
      const user = Session.read('userinfo');
      const params = $location.search();

      const apps = {
        2: ['partnerquezx', 'partnerwordpress'],
        4: ['managequezx'],
        5: ['hirequezx'],
      };

      if (!~(apps[user.group_id] || []).indexOf(params.client_id)) {
        vm.error = 'Access Denied!';
        return;
      }

      OAuthorise.get(params)
        .then(res => {
          vm.app = res.data;
          vm.done(true);
        })
        .catch(res => (vm.error = res.data.error));

      vm.done = function done(allow) {
        const data = params;
        const location = $window.location;
        data.allow = allow ? 'true' : 'false';
        OAuthorise
          .post(data)
          .then(res => (location.href = res.data));
      };
    },
  ]);
