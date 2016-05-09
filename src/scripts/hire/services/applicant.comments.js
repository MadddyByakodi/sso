angular.module('qui.hire')
  .factory('ApplicantComments', [
    '$http',
    '$q',
    'APP',
    function ApplicantComments($http, $q, APP) {
      const applicantCommentService = {};

      applicantCommentService.get = function getApplicantComments(applicantId, params) {
        const url = `${APP.apiServer}/user/job/applicants/${applicantId}/comments`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      applicantCommentService.set = function setApplicantComments(applicantId, data) {
        const url = `${APP.apiServer}/user/job/applicants/${applicantId}/comments`;
        return $http
          .post(url, data)
          .then(res => res.data, err => $q.reject(err.data));
      };

      return applicantCommentService;
    },
  ]);
