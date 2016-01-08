angular.module('qui')
  .controller('ApplicantViewController', [
    'Applicants',
    '$stateParams',
    'Session',
    'APP',
    '$sce',
    function JobsCtrl(Applicants, $stateParams, Session, APP, $sce) {
      const vm = this;
      vm.data = {};
      vm.trustSrc = function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
      };

      vm.resumeSrc = `${APP.apiServer}/quarc/applicant/${$stateParams.applicantId}/viewcv?access_token=${Session.getAccessToken()}`;
      vm.loadApplicant = function loadApplicant() {
        vm.ui = { loading: true };
        Applicants
          .getOne($stateParams.applicantId)
          .then(function gotApplicant(result) {
            vm.data = result.data;

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicant();
    },
  ]);
