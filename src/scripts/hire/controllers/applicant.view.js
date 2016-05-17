angular.module('qui.hire')
  .controller('ApplicantViewController', [
    'Applicants',
    'Jobs',
    'Page',
    '$stateParams',
    'Session',
    'APP',
    '$sce',
    function ApplicantViewCtrl(Applicants, Jobs, Page, $stateParams, Session, APP, $sce) {
      const vm = this;
      const root = '_root_';
      vm.data = {};
      vm.job = {};
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
          .then(result => {
            vm.data = result;
            Page.setTitle(vm.data.name);

            // Get job role for applicant
            Jobs.getOne(result[root], { fl: 'role' }).then(res => (vm.job = res));

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicant();
    },
  ]);
