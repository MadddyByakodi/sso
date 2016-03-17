angular.module('qui.hire')
  .controller('DashboardController', [
    'Page',
    'Summary',
    'Applicants',
    'moment',
    function DashboardCtrl(Page, Summary, Applicants, moment) {
      const vm = this;
      Page.setTitle('Dashboard');
      vm.getSummary = function getSummary() {
        Summary.get({ state_id: '1,5,8,9,17' })
          .then(function gotSummary(response) {
            vm.summary = {
              cv: response[1] || 0,
              interview: response[9] || 0,
              await_interview: [
                response[5] || 0,
                response[8] || 0,
                response[17] || 0,
              ].reduce((a, b) => a + b),
            };

            vm.chart = {
              labels: ['Awaiting Interviews', 'AF on CV', 'AF on Interview'],
              data: [vm.summary.await_interview, vm.summary.cv, vm.summary.interview],
            };
          });
      };

      vm.getSummary();

      vm.getPipeline = function getPipeline() {
        Summary.getPipeline()
          .then(function gotPipeline(response) {
            vm.pipeline = response;
          });
      };

      vm.getPipeline();

      vm.getInterviews = function getInterviews() {
        Applicants.get({
          fl: 'id,name,interview_type,interview_time,state_id,_root_',
          sort: 'interview_time ASC',
          interview_time: [
            moment().startOf('day').toISOString(),
            moment().endOf('week').toISOString(),
          ].join(','),
        }).then(function gotInterviews(response) {
          vm.interviews = response && response.filter(i => {
            // hide interview if
            //   - current state is not an interview
            //   ---- AND
            //   - interview time is not in between current time and tommorow
            const hideInterview =
              !~[5, 8, 9].indexOf(i.interview_type) &&
              !(
                moment(i.interview_time).isAfter(moment()) &&
                moment(i.interview_time).isBefore(moment().startOf('day').add(2, 'days'))
              );
            if (hideInterview) return false;
            return true;
          });
        });
      };

      vm.getInterviews();
    },
  ]);
