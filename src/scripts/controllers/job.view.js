angular.module('qui')
  .controller('JobViewController', [
    'Jobs',
    '$stateParams',
    '$sce',
    function JobsCtrl(Jobs, $stateParams, $sce) {
      const vm = this;
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = { loading: true };
        Jobs
          .getOne($stateParams.jobId)
          .then(function gotJob(result) {
            vm.data = result.data;
            vm.responsibility = $sce.trustAsHtml(result.data.responsibility);
            vm.interview_addr = $sce.trustAsHtml(result.data.interview_addr);

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadJob();
    },
  ]);
