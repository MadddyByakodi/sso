angular.module('qui.hire')
  .factory('Jobs', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const jobsService = {};

      jobsService.get = function getJobs(params) {
        const url = `${APP.apiServer}/user/jobs`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      jobsService.getOne = function getJobs(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      jobsService.getByIdRaw = function getByIdRaw(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/raw`;
        return $http
          .get(url, { params });
      };

      jobsService.getApplicants = function getApplicants(jobId, params) {
        const url = `${APP.apiServer}/user/jobs/${jobId}/applicants`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      jobsService.create = function create(data) {
        const url = `${APP.apiServer}/user/jobs`;
        return $http
          .post(url, data);
      };

      jobsService.update = function create(jobId, data) {
        const url = `${APP.apiServer}/user/jobs/${jobId}`;
        return $http
          .put(url, data);
      };

      jobsService.payment = () => $http.get(`${APP.apiServer}/user/payment`);

      return jobsService;
    },
  ]);
