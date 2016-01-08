angular.module('qui')
  .factory('Summary', [
    '$http',
    '$q',
    'APP',
    function Summary($http, $q, APP) {
      const summaryService = {};

      summaryService.get = function getSummary(params) {
        const url = `${APP.apiServer}/quarc/client/summary`;
        return $http
          .get(url, { params: params })
          .then(
            function successSummary(response) {
              return response.data;
            },

            function errorSummary(response) {
              return $q.reject(response.data);
            }
          );
      };

      summaryService.getPipeline = function getPipeline(params) {
        const url = `${APP.apiServer}/quarc/client/summary/pipeline`;
        return $http
          .get(url, { params: params })
          .then(
            function successPipeline(response) {
              return response.data;
            },

            function errorPipeline(response) {
              return $q.reject(response.data);
            }
          );
      };

      return summaryService;
    },
  ]);
