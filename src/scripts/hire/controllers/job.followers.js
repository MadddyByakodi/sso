angular.module('qui.hire')
  .controller('JobFollowersController', [
    'JobFollowers',
    'Users',
    '$stateParams',
    function JobFollowersCtrl(JobFollowers, Users, $stateParams) {
      const vm = this;
      vm.followers = [];
      vm.add = function addFollower(user) {
        JobFollowers
          .add($stateParams.jobId, vm.data)
          .then(f => {
            const follower = f;
            follower.data.user = user;
            vm.followers.push(follower.data);

            // Reset model data
            delete vm.Users.selected;
            delete vm.Users.model;
            delete vm.data.user_id;
            vm.inviteUserData = {};
            vm.showInviteUser = false;
          });
      };

      JobFollowers
        .getAll($stateParams.jobId)
        .then(x => (vm.followers = x.data));

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
        Users.getAll({ q: '' }).then(r => (vm.Users.all = r.data.items));
      };

      vm.inviteUser = function inviteUser() {
        Users.create(vm.inviteUserData).then(res => {
          vm.data = {
            user_id: res.data.id,
            follower_access_id: vm.inviteUserData.follower_access_id,
          };

          vm.add(res.data);
        });
      };
    },
  ]);
