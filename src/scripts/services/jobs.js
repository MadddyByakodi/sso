angular.module('qui')
  .factory('Jobs', [
    '$http',
    '$q',
    '$log',
    'APP',
    'Session',
    function Jobs($http, $q, $log, APP, Session) {
      const jobsService = {};

      jobsService.get = function getJobs(params) {
        const url = `${APP.apiServer}/quarc/client/${Session.read('userinfo').id}/postedjobs`;
        return $http
          .get(url, {params: params})
          .then(
            function successJobs(response) {
              $log.info(response);
              return response.data;
            },

            function errorJobs(response) {
              $log.error(response);
              return $q.reject(response.data);
            }
          );
      };

      return jobsService;
    },
  ]);
