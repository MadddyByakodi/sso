angular.module('qui.accounts')
  .controller('AuthoriseController', [
    'OAuthorise',
    '$location',
    '$window',
    'Session',
    'APP',
    function AuthoriseController(OAuthorise, $location, $window, Session, APP) {
      const vm = this;
      const user = Session.read('userinfo');
      const params = $location.search();
      const location = $window.location;

      const apps = {
        2: ['partnerquezx', 'partnerwordpress', 'chatquezx', 'qdesktop'],
        4: ['managequezx', 'chatquezx'],
        5: ['hirequezx', 'chatquezx'],
        8: ['managequezx', 'chatquezx'],
        9: ['managequezx', 'chatquezx'],
      };

      // Handle redirect for internal user from hire and partner app
      if (~[4, 8, 9].indexOf(user.group_id) && (params.client_id !== 'managequezx')) {
        location.href = `${APP.manageServer}${params.state}`;
        return;
      }

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
        data.allow = allow ? 'true' : 'false';
        OAuthorise
          .post(data)
          .then(res => (location.href = res.data));
      };
    },
  ]);
