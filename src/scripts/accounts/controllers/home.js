angular.module('qui.accounts')
  .controller('HomeController', [
    'APP',
    '$window',
    'Session',
    function HomeController(APP, $window, Session) {
      const user = Session.read('userinfo');
      if (user.group_id === 5) $window.location.href = APP.hireLogin;
      if (user.group_id === 2) $window.location.href = APP.partnerLogin;
    },
  ]);
