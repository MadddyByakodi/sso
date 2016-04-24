angular.module('qui.hire')
  .controller('ApplicantViewController', [
    'Applicants',
    'Page',
    '$stateParams',
    'Session',
    'APP',
    '$sce',
    function ApplicantViewCtrl(Applicants, Page, $stateParams, Session, APP, $sce) {
      const vm = this;
      vm.data = {};
      vm.trustSrc = function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
      };

      vm.resumeSrc = `${APP.apiServer}/user/job/applicants/${
        $stateParams.applicantId
      }/resume?access_token=${Session.getAccessToken()}`;
      vm.loadApplicant = function loadApplicant() {
        vm.ui = { loading: true };
        Applicants
          .getOne($stateParams.applicantId)
          .then(function gotApplicant(result) {
            vm.data = result;
            Page.setTitle(vm.data.name);

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicant();
    },
  ]);
