angular.module('qui')
  .factory('moment', [
    '$window',
    function Jobs($window) {
      return $window.moment;
    },
  ]);
