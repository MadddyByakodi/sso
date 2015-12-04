angular.module('qui')
  .controller('AppController', [
    '$scope',
    '$window',
    'Session',
    function AppCtrl($scope, $window, Session) {
      const vm = this;

      // add 'ie' classes to html
      const isIE = !!navigator.userAgent.match(/MSIE/i);
      if (isIE) angular.element($window.document.body).addClass('ie');
      if (isSmartDevice()) angular.element($window.document.body).addClass('smart');

      // config
      vm.app = {
        name: 'QUEZX',
        version: '0.0.1',
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-black',
          asideColor: 'bg-white',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false,
        },
      };

      vm.userinfo = function userinfo() {
        return Session.read('userinfo');
      };

      function isSmartDevice() {
        // Adapted from http://www.detectmobilebrowsers.com
        const ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
    },
  ]);
