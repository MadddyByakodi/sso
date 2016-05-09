angular.module('qui.accounts')
  .controller('HomeController', [
    'APP',
    '$window',
    'Session',
    function HomeController(APP, $window, Session) {
      const user = Session.read('userinfo');
      const location = $window.location;
      if (user.group_id === 5) location.href = APP.hireLogin;
      if (user.group_id === 2) location.href = APP.partnerLogin;
    },
  ]);
