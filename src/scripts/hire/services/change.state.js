angular.module('qui.hire')
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
          .then(res => res.data, err => $q.reject(err.data));
      };

      return changeStateService;
    },
  ]);
