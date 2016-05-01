angular.module('qui.accounts')
  .directive('updatePassword', [
    function updatePassword() {
      return {
        restrict: 'EA',
        templateUrl: '/html/accounts.update-password.html',
        controllerAs: 'Password',
        controller: [
          'APP',
          '$http',
          function Password(APP, $http) {
            const vm = this;
            vm.update = '';
            vm.data = { current: '', update: '' };
            vm.match = (confirm) => confirm
              .$setValidity('match', vm.data.update === vm.confirm);

            vm.update = () => (vm.success = vm.error = '') || $http
              .put(`${APP.apiServer}/user/password`, vm.data)
              .then(() => {
                vm.success = 'Password update was successful.';
                vm.data.current = vm.data.update = vm.confirm = '';
              })
              .catch(res => vm.error = res.data.error_description);
          },
        ],
      };
    },
  ]);
