angular.module('qui')
  .factory('Funcs', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const funcService = {};

      funcService.get = function getFuncs(params) {
        const url = `${APP.apiServer}/quarc/func`;
        return $http
          .get(url, {params: params})
          .then(
            function successFuncs(response) {
              return response.data;
            },

            function errorFuncs(response) {
              return $q.reject(response.data);
            }
          );
      };

      return funcService;
    },
  ]);
