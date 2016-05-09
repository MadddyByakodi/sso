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
          .get(url, { params });
      };

      authoriseService.post = function post(data) {
        // attach state to query params so it can be return on success.
        const state = data.state ? `?state=${data.state}` : '';
        const req = {
          method: 'POST',
          url: `${APP.apiServer}/authorise${state}`,
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
