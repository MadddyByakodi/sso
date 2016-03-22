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

      jobsService.getByIdRaw = function getByIdRaw(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/raw`;
        return $http
          .get(url, { params: params });
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
          .post(url, data);
      };

      jobsService.update = function create(jobId, data) {
        const url = `${APP.apiServer}/user/jobs/${jobId}`;
        return $http
          .put(url, data);
      };

      return jobsService;
    },
  ]);
