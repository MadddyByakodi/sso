angular.module('qui')
  .controller('ApplicantCommentsController', [
    'ApplicantComments',
    '$stateParams',
    function JobsCtrl(ApplicantComments, $stateParams) {
      const vm = this;
      vm.loadApplicantComments = function loadApplicantComments() {
        vm.ui = {loading: true};
        ApplicantComments
          .get($stateParams.applicantId)
          .then(function gotJobComment(result) {
            vm.data = result.data;

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicantComments();
    },
  ]);
