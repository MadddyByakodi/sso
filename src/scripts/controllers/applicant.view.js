angular.module('qui')
  .controller('ApplicantViewController', [
    'Applicants',
    '$stateParams',
    function JobsCtrl(Applicants, $stateParams) {
      const vm = this;
      vm.data = {};
      vm.loadApplicant = function loadApplicant() {
        vm.ui = {loading: true};
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
