angular.module('qui')
  .controller('ApplicantsController', [
    'Applicants',
    '$stateParams',
    'moment',
    function JobsCtrl(Applicants, $stateParams, moment) {
      const vm = this;
      vm.buckets = ['Pending Feedback', 'Shortlisted', 'Rejected', 'All', 'Interview'];

      // Set default bucket to ALL
      if (!~vm.buckets.indexOf($stateParams.bucket)) $stateParams.bucket = 'All';
      vm.applicants = []; // collection of applicants
      vm.ui = {lazyLoad: true, loading: false}; // ui states
      vm.params = {start: 0, rows: 15, fl: 'id,name,state_id,state_name,_root_'}; // GET query params
      vm.loadApplicants = function loadApplicants() {
        if (!vm.ui.lazyLoad) return; // if no more applicants to get
        vm.ui = {lazyLoad: false, loading: true};

        if ($stateParams.bucket === 'Interview') {
          vm.params.interview_time = [
            moment().startOf('day').toISOString(),
            moment().startOf('day').add(1, 'months').toISOString(),
          ].join(',');
          vm.params.fl += ',interview_time,interview_type';
        } else {
          vm.params.state_id = $stateParams.bucket.replace(' ', '_').toUpperCase();
        }

        Applicants.get(vm.params).then(function jobList(result) {
          angular.forEach(result.data, function iterateJobs(applicant) {
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

      vm.loadApplicants();
    },
  ]);
