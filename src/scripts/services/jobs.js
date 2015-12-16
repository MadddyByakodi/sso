angular.module('qui')
  .factory('Jobs', [
    '$http',
    '$q',
    '$log',
    'APP',
    'User',
    function Jobs($http, $q, $log, APP, User) {
      const jobsService = {};

      jobsService.get = function getJobs(params) {
        const url = `${APP.apiServer}/quarc/client/${User.userinfo.id}/postedjobs`;
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

      jobsService.getApplicants = function getJobs(jobId, params) {
        const url = `${APP.apiServer}/quarc/client/${User.userinfo.id}/postedjobs/${jobId}/appliedapplicants`;
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

      jobsService.create = function create(data) {
        const url = `${APP.apiServer}/quarc/client/${User.userinfo.id}/uploadjd`;
        return $http
          .post(url, data)
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
