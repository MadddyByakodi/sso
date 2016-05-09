angular.module('qui.hire')
  .factory('JobComments', [
    '$http',
    '$q',
    'APP',
    function JobComments($http, $q, APP) {
      const jobCommentService = {};

      jobCommentService.get = function getJobComments(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/comments`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      jobCommentService.set = function setJobComments(jobId, data) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/comments`;
        return $http
          .post(url, data)
          .then(res => res.data, err => $q.reject(err.data));
      };

      return jobCommentService;
    },
  ]);
