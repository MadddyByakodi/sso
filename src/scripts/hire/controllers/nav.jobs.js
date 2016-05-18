angular.module('qui.hire')
  .controller('NavJobsController', [
    'Jobs',
    '$state',
    '$scope',
    '$filter',
    function NavJobsCtrl(Jobs, $state, $scope, $filter) {
      const vm = this;
      vm.jobHref = function jobHref(jobId) {
        const states = ['app.jobs.manage', 'app.jobs.view', 'app.jobs.edit'];
        const name = ~states.indexOf($state.current.name) ? $state.current.name : states[0];
        return $state.href(name, { jobId });
      };

      vm.jobs = []; // collection of jobs
      vm.closed = []; // closed jobs
      vm.open = []; // open jobs
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.params = { start: 0, rows: 15, fl: 'id,role,job_status,owner_id' }; // GET query params
      vm.loadJobs = function loadJobs() {
        if (!vm.ui.lazyLoad) return; // if no more jobs to get
        vm.ui = { lazyLoad: false, loading: true };

        Jobs
          .get(vm.params)
          .then(result => {
            // if no jobs uploaded ever redirect to welcome
            if (!(vm.params.start || result.length)) return $state.go('app.welcome');
            angular.forEach(result, job => {
              vm.jobs.push(job);
              return (job.job_status === 'Closed' ? vm.closed : vm.open).push(job);
            });

            // data has been loaded
            vm.ui.loading = false;

            // check for returned results count and set lazy loadLoad false if less
            vm.ui.lazyLoad = angular.equals(result.length, vm.params.rows);
            if (!vm.ui.lazyLoad) vm.searchText = { role: '' }; // all jobs loaded show in UI

            // increment offset for next loading of results
            vm.params.start = vm.params.start + vm.params.rows;
            return vm.loadJobs();
          });
      };

      vm.loadJobs();

      $scope.$watch(() => vm.searchText, () => {
        const open = vm.jobs.filter(x => x.job_status !== 'Closed');
        const closed = vm.jobs.filter(x => x.job_status === 'Closed');
        vm.open = $filter('filter')(open, vm.searchText);
        vm.closed = $filter('filter')(closed, vm.searchText);

        vm.collapse = (vm.closed.length && vm.searchText.role) ?
          { open: false, closed: false } :
          { open: false, closed: true };
      }, true);
    },
  ]);
