angular.module('qui.hire')
  .factory('Jobs', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const jobsService = {};

      jobsService.get = function getJobs(params) {
        const url = `${APP.apiServer}/user/jobs`;
        return $http
          .get(url, { params: params })
          .then(
            function successJobs(response) {
              return response.data;
            },

            function errorJobs(response) {
              return $q.reject(response.data);
            }
          );
      };

      jobsService.getOne = function getJobs(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}`;
        return $http
          .get(url, { params: params })
          .then(
            function successJobs(response) {
              return response.data;
            },

            function errorJobs(response) {
              return $q.reject(response.data);
            }
          );
      };

      jobsService.getApplicants = function getApplicants(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/applicants`;
        return $http
          .get(url, { params: params })
          .then(
            function successJobs(response) {
              return response.data;
            },

            function errorJobs(response) {
              return $q.reject(response.data);
            }
          );
      };

      jobsService.create = function create(data) {
        const url = `${APP.apiServer}/user/jobs`;
        return $http
          .post(url, data)
          .then(
            function successJobs(response) {
              return response.data;
            },

            function errorJobs(response) {
              return $q.reject(response.data);
            }
          );
      };

      return jobsService;
    },
  ]);
