/* globals ga:false */
angular.module('qui.core')
  .factory('User', [
    'Session',
    function Auth(Session) {
      const userService = {
        userinfo: Session.read('userinfo'),
        states: Session.read('states'),
      };

      // User based google analytics for authenticated user
      if (angular.isFunction(ga) && Session.isAuthenticated() && userService.userinfo.id) {
        ga('set', 'userId', userService.userinfo.id);
      }

      return userService;
    },
  ]);
