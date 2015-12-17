angular.module('qui')
  .factory('Applicants', [
    '$http',
    '$q',
    '$log',
    'APP',
    'User',
    function Applicants($http, $q, $log, APP, User) {
      const applicantsService = {};

      applicantsService.get = function get(params) {
        const url = `${APP.apiServer}/quarc/client/${User.userinfo.id}/allapplicants`;
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

      applicantsService.getOne = function getOne(applicantId, params) {
        const url = `${APP.apiServer}/quarc/applicant/${applicantId}/`;
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

      return applicantsService;
    },
  ]);
