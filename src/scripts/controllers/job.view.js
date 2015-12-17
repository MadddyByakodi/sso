angular.module('qui')
  .controller('JobViewController', [
    'Jobs',
    '$stateParams',
    function JobsCtrl(Jobs, $stateParams) {
      const vm = this;
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = {loading: true};
        Jobs
          .getOne($stateParams.jobId)
          .then(function gotJob(result) {
            vm.data = result.data;

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadJob();
    },
  ]);
