angular.module('qui')
  .factory('DownloadCV', [
    '$http',
    '$q',
    'APP',
    function DownloadCV($http, $q, APP) {
      const downloadCVService = {};

      downloadCVService.get = function get(params) {
        const url = `${APP.apiServer}/quarc/applicant/download`;
        return $http
          .get(url, {params: params})
          .then(
            function successDegrees(response) {
              return response.data;
            },

            function errorDegrees(response) {
              return $q.reject(response.data);
            }
          );
      };

      downloadCVService.getOne = function getOne(applicantId, params) {
        const url = `${APP.apiServer}/quarc/applicant/${applicantId}/download`;
        return $http
          .get(url, {params: params})
          .then(
            function successDegrees() {
              return angular.noop();
            },

            function errorDegrees(response) {
              return $q.reject(response.data);
            }
          );
      };

      return downloadCVService;
    },
  ]);
