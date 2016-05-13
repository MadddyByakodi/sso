angular.module('qui.hire')
  .controller('AppController', [
    '$window',
    '$uibModal',
    'Session',
    'User',
    'Applicants',
    'Page',
    '$state',
    '$rootScope',
    'APP',
    function AppCtrl($window, $uibModal, Session, User, Applicants, Page, $state, $rootScope, APP) {
      const vm = this;

      // config
      vm.app = {
        name: 'QUEZX',
        version: '0.0.1',
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-white',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-dark bg-gd-dk',
          headerFixed: true,
          asideFixed: true,
          asideFolded: true,
          asideDock: true,
          container: false,
          offScreen: false, // flag for show of sidebar for mobile view
          mobileHeader: false, // flag to show header Nav and Search in mobile view
          changePassword: `${APP.accountsServer}/password_change`,
        },
      };

      // keeps track of state change and hides sidebar view for mobile
      /* eslint angular/on-watch: 0 */
      $rootScope.$on('$stateChangeStart', () => {
        vm.app.settings.offScreen = false;
        vm.app.settings.mobileHeader = false;
      });

      vm.Page = Page; // Set Page title
      vm.$state = $state; // Set Page title

      // Applicant search related Functions
      vm.Applicants = {
        select: function gotoApplicant($item) {
          vm.Applicants.searchText = '';
          $state.go('app.applicant.view', { applicantId: $item.id });
        },

        get: function searchApplicants(searchText) {
          return Applicants
            .get({ start: 0, rows: 15, fl: 'id,name', q: searchText });
        },

        noResults: false,
        loadingRegions: false,
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
        return $state.is('app.jobs.applicants') ||
          $state.is('app.jobs.manage') ||
          $state.is('app.jobs.view') ||
          $state.is('app.jobs.edit');
      };

      vm.downloadApplicant = function downloadApplicant(ids) {
        // ApplicantIds is array contatining applicant id to download cvs
        $uibModal.open({
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
      };

      vm.changeState = function changeState(applicant, stateId, jobId) {
        // ApplicantIds is array contatining applicant id to download cvs
        const modalInstance = $uibModal.open({
          templateUrl: 'html/modal.change.state.html',
          controller: 'ChangeStateController',
          controllerAs: 'ChangeState',
          bindToController: 'true',
          size: 'md',
          resolve: { applicant, stateId, jobId },
        });

        const resume = applicant;
        modalInstance.result.then(data => {
          $rootScope.$broadcast('ApplicantStateChangeSuccess', data);
          resume.state_id = data.state_id;
          resume.state_name = vm.states[data.state_id].name;
        });
      };
    },
  ]);
