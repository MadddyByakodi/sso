angular.module('qui.hire')
  .factory('Followers', [
    '$http',
    '$q',
    'APP',
    function Followers($http, $q, APP) {
      const followersService = {};

      followersService.getOne = function getFollowers(applicantId, params) {
        const url = `${APP.apiServer}/quarc/applicant/${applicantId}/followers`;
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

      followersService.create = function create(data, ApplicantId) {
        const url = `${APP.apiServer}/quarc/applicant/${ApplicantId}/followers`;
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

      return followersService;
    },
  ]);
