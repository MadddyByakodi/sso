angular.module('qui')
  .factory('Applicants', [
    '$http',
    '$q',
    '$log',
    'APP',
    'Session',
    function Applicants($http, $q, $log, APP, Session) {
      const applicantsService = {};

      applicantsService.get = function get(params) {
        const url = `${APP.apiServer}/quarc/client/${Session.read('userinfo').id}/allapplicants`;
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
