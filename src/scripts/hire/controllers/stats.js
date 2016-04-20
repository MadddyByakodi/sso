angular.module('qui.hire')
  .controller('StatsController', [
    'APP',
    'Session',
    function StatsCtrl(APP, Session) {
      const vm = this;
      vm.subNav = ['By Job Description', 'By Owner'];
      vm.nav = {
        'app.stats.candidate': 'Candidates',

        // 'app.stats.conversion': 'Conversion Rates',
        // 'app.stats.pipespeed': 'Pipeline Speed',
        // 'app.stats.pipeline': 'Existing Pipeline',
      };
      vm.download = `${APP.apiServer}/user/job/download?access_token=${Session.getAccessToken()}`;
    },
  ]);
