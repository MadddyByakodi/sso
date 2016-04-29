angular.module('qui.accounts')
  .directive('updatePassword', [
    function updatePassword() {
      return {
        restrict: 'EA',
        templateUrl: '/html/accounts.update-password.html',
        controllerAs: 'Password',
        controller: [
          'Password',
          (Password) => {
            const vm = this;
            vm.update = () => Password
              .update(vm.data)
              .then(() => {
                vm.success = 'Password update was successful.';
                vm.data = {};
              })
              .catch(res => vm.error = res.data.error_description);
          },
        ],
      };
    },
  ]);
