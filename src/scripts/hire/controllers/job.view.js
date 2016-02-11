angular.module('qui.hire')
  .controller('JobViewController', [
    'Jobs',
    'Page',
    '$stateParams',
    '$sce',
    function JobViewCtrl(Jobs, Page, $stateParams, $sce) {
      const vm = this;
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = { loading: true };
        Jobs
          .getOne($stateParams.jobId)
          .then(function gotJob(result) {
            Page.setTitle(`${result.role} - ${result.client_name}`);
            vm.data = result;
            vm.responsibility = $sce.trustAsHtml(result.responsibility);
            vm.interview_addr = $sce.trustAsHtml(result.interview_addr);

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadJob();
    },
  ]);
