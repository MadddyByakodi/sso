angular.module('qui.hire')
  .controller('JobsController', [
    'Summary',
    'Page',
    '$state',
    function JobsCtrl(Summary, Page, $state) {
      const vm = this;
      Page.setTitle('Posted Jobs');
      vm.jobs = []; // collection of jobs
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.params = {
        start: 0, rows: 15, fl: 'id,role,user_id,job_status_id', mincount: 0,
        state_id: '1,4,5,8,9,10,17,19,20,22,23,24,25,33,34,35,36',
      }; // GET query params

      vm.loadJobs = function loadJobs() {
        if (!vm.ui.lazyLoad) return; // if no more jobs to get
        vm.ui = { lazyLoad: false, loading: true };

        Summary
          .getPipeline(vm.params)
          .then(result => {
            // if no jobs uploaded ever redirect to welcome
            if (!(vm.params.start || result.length)) return $state.go('app.welcome');

            angular.forEach(result, job => vm.jobs.push(job));

            // data has been loaded
            vm.ui.loading = false;

            // check for returned results count and set lazy loadLoad false if less
            vm.ui.lazyLoad = angular.equals(result.length, vm.params.rows);

            // increment offset for next loading of results
            return (vm.params.start = vm.params.start + vm.params.rows);
          });
      };

      vm.loadJobs();
    },
  ]);
