angular.module('qui.search')
  .factory('Funcs', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const funcService = {};

      funcService.get = function getFuncs(params) {
        const url = `${APP.apiServer}/search/funcs`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return funcService;
    },
  ]);
