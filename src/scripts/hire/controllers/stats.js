angular.module('qui.hire')
  .controller('StatsController', [
    function StatsCtrl() {
      const vm = this;
      vm.subNav = ['By Job Description', 'By Owner', 'By Project'];
      vm.nav = {
        'app.stats.candidate': 'Candidates',
        'app.stats.conversion': 'Conversion Rates',
        'app.stats.pipespeed': 'Pipeline Speed',
        'app.stats.pipeline': 'Existing Pipeline',
      };
    },
  ]);
