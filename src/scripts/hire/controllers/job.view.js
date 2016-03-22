angular.module('qui.hire')
  .controller('JobViewController', [
    'Jobs',
    'Page',
    '$stateParams',
    '$sce',
    function JobViewCtrl(Jobs, Page, $stateParams, $sce) {
      const vm = this;
      vm.buckets = ['Pending Feedback', 'Shortlisted', 'Rejected', 'All', 'Interview'];

      // Set default bucket to ALL
      if (!~vm.buckets.indexOf($stateParams.bucket)) $stateParams.bucket = 'All';
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = { loading: true };
        Jobs
          .getOne($stateParams.jobId)
          .then(result => {
            Page.setTitle(`${result.role} - ${result.client_name}`);
            vm.data = result;
            vm.responsibility = $sce.trustAsHtml(result.responsibility);
            vm.perks = $sce.trustAsHtml(result.perks);
            vm.interview_addr = $sce.trustAsHtml(result.interview_addr);
            vm.interview_place_direction = $sce.trustAsHtml(result.interview_place_direction);

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadJob();
    },
  ]);
