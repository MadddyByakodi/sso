angular.module('qui.accounts')
  .controller('HomeController', [
    'APP',
    '$window',
    'Session',
    function HomeController(APP, $window, Session) {
      const user = Session.read('userinfo');
      const location = $window.location;
      switch (user.group_id) {
        case 2:
          location.href = APP.partnerLogin;
          break;
        case 4:
        case 8:
        case 9:
          location.href = APP.manageLogin;
          break;
        case 5:
          location.href = APP.hireLogin;
          break;
        default:
          break;
      }
    },
  ]);
