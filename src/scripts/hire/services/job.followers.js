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
          .get(url, { params });
      };

      jobFollowersService.add = function add(jobId, data) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/followers`;
        return $http
          .post(url, data);
      };

      return jobFollowersService;
    },
  ]);
