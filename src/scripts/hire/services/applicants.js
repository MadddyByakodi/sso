angular.module('qui.hire')
  .factory('Applicants', [
    '$http',
    '$q',
    'APP',
    function Applicants($http, $q, APP) {
      const applicantsService = {};

      applicantsService.get = function get(params) {
        const url = `${APP.apiServer}/user/job/applicants`;
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

      applicantsService.getOne = function getOne(applicantId, params) {
        const url = `${APP.apiServer}/user/job/applicants/${applicantId}`;
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

      return applicantsService;
    },
  ]);
