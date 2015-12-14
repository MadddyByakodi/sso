angular.module('qui')
  .factory('ChangeState', [
    '$http',
    '$q',
    'APP',
    function ChangeState($http, $q, APP) {
      const changeStateService = {};

      changeStateService.set = function setState(applicantId, data) {
        const url = `${APP.apiServer}/quarc/applicant/${applicantId}/state`;
        return $http
          .post(url, data)
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
