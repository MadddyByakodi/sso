angular.module('qui')
  .factory('ChangeState', [
    '$http',
    '$q',
    'APP',
    function ChangeState($http, $q, APP) {
      const changeStateService = {};

      changeStateService.set = function setState(applicantId, data) {
        const url = `${APP.apiServer}/user/job/applicants/${applicantId}/state`;
        return $http
          .put(url, data)
          .then(
            function successChangeState(response) {
              return response.data;
            },

            function errorChangeState(response) {
              return $q.reject(response.data);
            }
          );
      };

      return changeStateService;
    },
  ]);
