angular.module('qui.search')
  .factory('Regions', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const regionService = {};

      regionService.get = function getRegions(params) {
        const url = `${APP.apiServer}/search/regions`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return regionService;
    },
  ]);
