angular.module('qui.hire')
  .controller('ApplicantsController', [
    'Applicants',
    'Page',
    '$stateParams',
    'moment',
    function ApplicantsCtrl(Applicants, Page, $stateParams, moment) {
      const vm = this;
      const params = $stateParams;
      vm.buckets = ['Pending Feedback', 'Shortlisted', 'Rejected', 'All', 'Interview'];

      // Set default bucket to ALL
      if (!~vm.buckets.indexOf(params.bucket)) params.bucket = 'All';

      Page.setTitle(`${$stateParams.bucket} Applicants`);
      vm.applicants = []; // collection of applicants
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.params = { start: 0, rows: 15, fl: 'id,name,state_id,state_name,_root_' };
      vm.loadApplicants = function loadApplicants() {
        if (!vm.ui.lazyLoad) return; // if no more applicants to get
        vm.ui = { lazyLoad: false, loading: true };

        if (params.bucket === 'Interview') {
          vm.params.interview_time = [
            moment()
              .startOf('day')
              .toISOString(),

            moment()
              .startOf('day')
              .add(1, 'months')
              .toISOString(),
          ].join(',');
          vm.params.fl += ',interview_time,interview_type';
        } else {
          vm.params.state_id = $stateParams.bucket.replace(' ', '_').toUpperCase();
        }

        Applicants.get(vm.params).then(result => {
          angular.forEach(result, applicant => vm.applicants.push(applicant));

          // data has been loaded
          vm.ui.loading = false;

          // check for returned results count and set lazy loadLoad false if less
          vm.ui.lazyLoad = angular.equals(result.length, vm.params.rows);

          // increment offset for next loading of results
          vm.params.start = vm.params.start + vm.params.rows;
        });
      };

      vm.loadApplicants();
    },
  ]);
