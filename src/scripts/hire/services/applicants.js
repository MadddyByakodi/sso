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
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      applicantsService.getOne = function getOne(applicantId, params) {
        const url = `${APP.apiServer}/user/job/applicants/${applicantId}`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      return applicantsService;
    },
  ]);
