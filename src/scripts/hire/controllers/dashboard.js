angular.module('qui.hire')
  .controller('DashboardController', [
    'Page',
    'Summary',
    'Applicants',
    'moment',
    function DashboardCtrl(Page, Summary, Applicants, moment) {
      const vm = this;
      vm.aftime = { days: 0, hours: 0, raw: 0 }; // average feeback default values
      Page.setTitle('Dashboard');
      vm.getSummary = function getSummary() {
        Summary.get({ state_id: '1,5,8,9,17' })
          .then(({ aftime, states }) => {
            vm.summary = {
              cv: states[1] || 0,
              interview: states[9] || 0,
              await_interview: [
                states[5] || 0,
                states[8] || 0,
                states[17] || 0,
              ].reduce((a, b) => a + b),
            };

            const days = Math.floor(aftime);
            const hours = Math.round((aftime - days) * 24);
            vm.aftime = { days, hours, raw: aftime };

            vm.chart = {
              labels: ['Awaiting Interviews', 'AF on CV', 'AF on Interview'],
              data: [vm.summary.await_interview, vm.summary.cv, vm.summary.interview],
            };
          });
      };

      vm.getSummary();
      vm.pipeParams = { start: 0, rows: 15 };
      vm.pipeUI = { lazyLoad: true, loading: false };
      vm.getPipeline = function getPipeline() {
        vm.pipeUI = { lazyLoad: false, loading: true };
        Summary.getPipeline(vm.pipeParams)
          .then(response => {
            vm.pipeline = (vm.pipeline || [])
              .concat(!response ? [] : response);

            // data has been loaded
            vm.pipeUI = {
              lazyLoad: angular.equals(response.length, vm.pipeParams.rows),
              loading: false,
            };

            // increment offset for next loading of results
            vm.pipeParams.start = vm.pipeParams.start + vm.pipeParams.rows;
          });
      };

      vm.getPipeline();
      vm.interviewsParams = {
        fl: 'id,name,interview_type,interview_time,state_id,_root_',
        sort: 'interview_time ASC',
        interview_time: [
          moment().startOf('day').toISOString(),
          moment().startOf('day').add(7, 'days')
            .toISOString(),
        ].join(','),
        start: 0, rows: 15,
      };
      vm.interviewsUI = { lazyLoad: true, loading: false };
      vm.getInterviews = function getInterviews() {
        vm.interviewsUI = { lazyLoad: false, loading: true };
        Applicants.get(vm.interviewsParams).then(response => {
          vm.interviews = (vm.interviews || []).concat(
            !response ? [] : response.filter(i => {
              // hide interview if
              //   - current state is not an interview
              //   ---- AND
              //   - interview time is not in between current time and tommorow
              const hideInterview =
                !~[5, 8, 17].indexOf(i.state_id) &&
                !(
                  moment(i.interview_time).isAfter(moment()) &&
                  moment(i.interview_time).isBefore(moment().startOf('day').add(2, 'days'))
                );
              if (hideInterview) return false;
              return true;
            })
          );

          // data has been loaded
          vm.interviewsUI = {
            lazyLoad: angular.equals(response.length, vm.interviewsParams.rows),
            loading: false,
          };

          // increment offset for next loading of results
          vm.interviewsParams.start = vm.interviewsParams.start + vm.interviewsParams.rows;
        });
      };

      vm.getInterviews();
    },
  ]);
