angular.module('qui.hire')
  .controller('JobFollowersController', [
    'JobFollowers',
    'Users',
    '$stateParams',
    function JobFollowersCtrl(JobFollowers, Users, $stateParams) {
      const vm = this;
      vm.followers = [];
      vm.add = function addFollower() {
        JobFollowers
          .add($stateParams.jobId, vm.data)
          .then(follower => {
            follower.data.user = vm.Users.selected;
            vm.followers.push(follower.data);

            // Reset model data
            delete vm.Users.selected;
            delete vm.Users.model;
            delete vm.data.user_id;
          });
      };

      JobFollowers
        .getAll($stateParams.jobId)
        .then(x => vm.followers = x.data);

      vm.Users = {
        all: '',
        list: function searchUser() {
          return vm.Users.all.filter(u => !vm.followers.some(f => f.user.id === u.id));
        },

        select: function selectUser($item) {
          vm.data.user_id = $item.id;
          vm.Users.selected = $item; // to pre inset in list of followers
        },
      };

      vm.getAllUser = function getAllUser() {
        Users.getAll({ q: '' }).then(r => vm.Users.all = r.data.items);
      };
    },
  ]);
