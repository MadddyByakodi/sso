angular.module('qui')
  .factory('User', [
    'Session',
    function Auth(Session) {
      const userService = {
        userinfo: Session.read('userinfo'),
        states: Session.read('states'),
      };
      return userService;
    },
  ]);
