angular.module('qui.search', [])
  .factory('Degrees', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const degreeService = {};

      degreeService.get = function getDegrees(params) {
        const url = `${APP.apiServer}/search/degrees`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return degreeService;
    },
  ]);
