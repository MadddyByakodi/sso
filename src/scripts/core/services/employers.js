  angular.module('qui.search')
  .factory('Employers', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const employerService = {};

      employerService.get = function getEmployers(params) {
        const url = `${APP.apiServer}/search/employers`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return employerService;
    },
  ]);
