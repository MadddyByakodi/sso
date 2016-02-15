angular.module('qui.hire')
  .controller('JobsController', [
    'Summary',
    'Page',
    function JobsCtrl(Summary, Page) {
      const vm = this;
      Page.setTitle('Posted Jobs');
      vm.jobs = []; // collection of jobs
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.params = {
        start: 0, rows: 15, fl: 'id,role,job_status_id', mincount: 0,
        state_id: '1,4,5,8,9,10,17,19,20,22,23,24,25,33,34,35,36',
      }; // GET query params

      vm.loadJobs = function loadJobs() {
        if (!vm.ui.lazyLoad) return; // if no more jobs to get
        vm.ui = { lazyLoad: false, loading: true };
        Summary.getPipeline(vm.params).then(function jobList(result) {
          angular.forEach(result, function iterateJobs(job) {
            vm.jobs.push(job);
          });

          // data has been loaded
          vm.ui.loading = false;

          // check for returned results count and set lazy loadLoad false if less
          vm.ui.lazyLoad = angular.equals(result.length, vm.params.rows) ? true : false;

          // increment offset for next loading of results
          vm.params.start = vm.params.start + vm.params.rows;
        });
      };

      vm.loadJobs();
    },
  ]);
