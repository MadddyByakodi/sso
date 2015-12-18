angular.module('qui')
  .controller('JobCommentsController', [
    'JobComments',
    '$stateParams',
    function JobsCtrl(JobComments, $stateParams) {
      const vm = this;
      vm.loadJobComments = function loadJobComments() {
        vm.ui = {loading: true};
        JobComments
          .get($stateParams.jobId)
          .then(function gotJobComment(result) {
            vm.data = result.data;

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadJobComments();
    },
  ]);
