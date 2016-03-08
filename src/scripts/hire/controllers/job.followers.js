angular.module('qui.hire')
  .controller('JobFollowersController', [
    'JobFollowers',
    '$state',
    function JobFollowersCtrl(JobFollowers, $state) {
      const vm = this;
      vm.followers = [];

      JobFollowers
        .getAll($state.params.jobId)
        .then(x => vm.followers = x.data);
    },
  ]);
