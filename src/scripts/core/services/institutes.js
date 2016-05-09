angular.module('qui.search')
  .factory('Institutes', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const instituteService = {};

      instituteService.get = function getInstitutes(params) {
        const url = `${APP.apiServer}/search/institutes`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return instituteService;
    },
  ]);
