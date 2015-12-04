angular.module('qui')
  .factory('Jobs', [
    '$http',
    '$q',
    '$log',
    'APP',
    'Session',
    function Jobs($http, $q, $log, APP, Session) {
      const jobsService = {};

      jobsService.get = function getJobs() {
        return $http
          .get(APP.apiServer + '/quarc/client/' + Session.read('userinfo').id + '/postedjobs')
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
