angular.module('qui')
  .factory('Followers', [
    '$http',
    '$q',
    '$log',
    'APP',
    'User',
    function Followers($http, $q, $log, APP, User) {
      const followersService = {};

      followersService.getOne = function getFollowers(applicantId, params) {
        const url = APP.apiServer + '/quarc/follower/' + applicantId + '/' + User.userinfo.id;
        return $http
          .get(url, { params: params })
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

      return followersService;
    },
  ]);
