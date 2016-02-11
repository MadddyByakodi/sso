angular.module('qui.accounts')
  .factory('OAuthorise', [
    '$http',
    'APP',
    '$httpParamSerializer',
    function OAuthorise($http, APP, $httpParamSerializer) {
      const authoriseService = {};

      authoriseService.get = function get(params) {
        const url = `${APP.apiServer}/authorise`;
        return $http
          .get(url, { params: params });
      };

      authoriseService.post = function post(data) {
        const req = {
          method: 'POST',
          url: `${APP.apiServer}/authorise`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: $httpParamSerializer(data),
        };

        return $http(req);
      };

      return authoriseService;
    },
  ]);
