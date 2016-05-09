angular.module('qui.search')
  .factory('Skills', [
    '$http',
    '$q',
    'APP',
    function Jobs($http, $q, APP) {
      const skillService = {};

      skillService.get = function getSkills(params) {
        const url = `${APP.apiServer}/search/skills`;
        return $http
          .get(url, { params })
          .then(res => res.data, err => $q.reject(err.data));
      };

      skillService.create = function createSkill(data) {
        const url = `${APP.apiServer}/skills`;
        return $http
          .post(url, data)
          .then(res => res.data, err => $q.reject(err.data));
      };

      return skillService;
    },
  ]);
