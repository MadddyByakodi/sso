angular.module('qui')
  .controller('JobsController', [
    'Jobs',
    function JobsCtrl(Jobs) {
      const vm = this;
      vm.jobs = [];

      Jobs.get().then(function jobList(result) {
        vm.jobs = result.data;
      });
    },
  ]);
