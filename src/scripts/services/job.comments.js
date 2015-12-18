angular.module('qui')
  .factory('JobComments', [
    '$http',
    '$q',
    'User',
    'APP',
    function JobComments($http, $q, User, APP) {
      const jobCommentService = {};

      jobCommentService.get = function getJobComments(jobId, params) {
        const url = `${APP.apiServer}/quarc/job/${jobId}/comments`;
        return $http
          .get(url, {params: params})
          .then(
            function successGetJobComments(response) {
              return response.data;
            },

            function errorGetJobComments(response) {
              return $q.reject(response.data);
            }
          );
      };

      jobCommentService.set = function setJobComments(jobId, data) {
        const url = `${APP.apiServer}/quarc/job/${jobId}/comments`;
        return $http
          .post(url, data)
          .then(
            function successSetJobComments(response) {
              return response.data;
            },

            function errorSetJobComments(response) {
              return $q.reject(response.data);
            }
          );
      };

      return jobCommentService;
    },
  ]);
