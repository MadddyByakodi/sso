angular.module('qui')
  .controller('JobsManageController', [
    'Jobs',
    '$stateParams',
    '$filter',
    function JobsManageCtrl(Jobs, $stateParams, $filter) {
      const vm = this;
      vm.applicants = []; // collection of applicants
      vm.job = {}; // Job applied by applicant initialized
      vm.ui = {lazyLoad: true, loading: false}; // ui states
      vm.params = {start: 0, rows: 15}; // GET query params
      vm.loadApplicants = function loadApplicants() {
        if (!vm.ui.lazyLoad) return; // if no more jobs to get
        vm.ui = {lazyLoad: false, loading: true};
        Jobs.getApplicants($stateParams.jobId, vm.params).then(function applicantsList(result) {
          angular.forEach(result.data, function iterateApplicants(applicant) {
            vm.applicants.push(applicant);
          });

          // data has been loaded
          vm.ui.loading = false;

          // check for returned results count and set lazy loadLoad false if less
          vm.ui.lazyLoad = angular.equals(result.data.length, vm.params.rows) ? true : false;

          // increment offset for next loading of results
          vm.params.start = vm.params.start + vm.params.rows;
        });
      };

      vm.loadApplicants(); // get applicants

      vm.loadJob = function loadJob() {
        Jobs.getOne($stateParams.jobId, {fl: 'id,role'}).then(function getJob(response) {
          vm.job = response.data;
        });
      };

      vm.loadJob(); // get job details

      // returns array containing resultkey of search result
      vm.getApplicants = function getApplicant(criteria = {}, returnkey = 'id') {
        return $filter('filter')(vm.applicants, criteria)
          .map(function checkedApplicant(applicant) {
            return applicant[returnkey];
          });
      };

      // sets value
      vm.setChecked = function setChecked(state) {
        angular.forEach(vm.applicants, function checked(value, key) {
          vm.applicants[key].checked = state;
        });
      };
    },
  ]);
