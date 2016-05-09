angular.module('qui.search')
  .factory('Industries', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const industryService = {};

      industryService.get = function getIndustries(params) {
        const url = `${APP.apiServer}/search/industries`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return industryService;
    },
  ]);
