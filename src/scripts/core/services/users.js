angular.module('qui.search')
  .factory('Users', [
    '$http',
    '$q',
    'APP',
    function Users($http, $q, APP) {
      const userService = {};

      userService.getAll = function getUsers(params) {
        return $http
          .get(`${APP.apiServer}/search/users`, { params });
      };

      return userService;
    },
  ]);
