angular.module('qui.hire')
  .factory('Summary', [
    '$http',
    '$q',
    'APP',
    function Summary($http, $q, APP) {
      const summaryService = {};

      summaryService.get = function getSummary(params) {
        const url = `${APP.apiServer}/user/job/dashboard`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      summaryService.getPipeline = function getPipeline(params) {
        const url = `${APP.apiServer}/user/job/pipeline`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return summaryService;
    },
  ]);
