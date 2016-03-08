angular.module('qui.hire')
  .factory('JobFollowers', [
    '$http',
    '$q',
    'APP',
    function JobFollowers($http, $q, APP) {
      const jobFollowersService = {};

      jobFollowersService.getAll = function getAll(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/followers`;
        return $http
          .get(url, { params: params });
      };

      jobFollowersService.create = function create(data, ApplicantId) {
        const url = `${APP.apiServer}/user/jobs/${ApplicantId}/followers`;
        return $http
          .post(url, data);
      };

      return jobFollowersService;
    },
  ]);
