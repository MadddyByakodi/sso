angular.module('qui')
  .controller('AppController', [
    '$window',
    '$uibModal',
    'Session',
    'User',
    '$state',
    function AppCtrl($window, $uibModal, Session, User, $state) {
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
          navbarHeaderColor: 'bg-white',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: true,
          container: false,
        },
      };

      vm.interviewUI = {
        5: {
          icon: 'phone',
          color: 'success',
        },
        8: {
          icon: 'user',
          color: 'warning',
        },
        17: {
          icon: 'skype',
          color: 'info',
        },
      };

      vm.userinfo = User.userinfo;
      vm.states = User.states;
      vm.showNavJobs = function showNavJobs() {
        return $state.is('app.applicants') || $state.is('app.jobs.manage');
      };

      vm.downloadApplicant = function downloadApplicant(ids) {
        // ApplicantIds is array contatining applicant id to download cvs
        const modalInstance = $uibModal.open({
          templateUrl: 'html/modal.download.cv.html',
          controller: 'DownloadCVController',
          controllerAs: 'DownloadCV',
          size: 'sm',
          resolve: {
            ApplicantIds: function ApplicantIds() {
              return ids;
            },
          },
        });

        modalInstance.result.then(function success() {
          // console.log(type);
        });
      };

      vm.changeState = function changeState(applicant, stateId) {
        // ApplicantIds is array contatining applicant id to download cvs
        const modalInstance = $uibModal.open({
          templateUrl: 'html/modal.change.state.html',
          controller: 'ChangeStateController',
          controllerAs: 'ChangeState',
          bindToController: 'true',
          size: 'md',
          resolve: {
            applicant: applicant,
            state_id: stateId,
          },
        });

        modalInstance.result.then(function success(data) {
          applicant.state_id = data.state_id;
          applicant.state_name = vm.states[data.state_id].name;
        });
      };

      function isSmartDevice() {
        // Adapted from http://www.detectmobilebrowsers.com
        const ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
    },
  ]);
