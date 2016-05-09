angular.module('qui.accounts')
  .directive('passwordChange', [
    function passwordChange() {
      return {
        restrict: 'EA',
        templateUrl: '/html/accounts.password-change.html',
        controllerAs: 'Password',
        controller: [
          'APP',
          '$http',
          function Password(APP, $http) {
            const vm = this;
            vm.password = '';
            vm.data = { old_password: '', password: '' };
            vm.match = (confirmPassword) => confirmPassword
              .$setValidity('match', vm.data.password === vm.confirm_password);

            vm.change = () => (vm.success = vm.error = '') || $http
              .put(`${APP.apiServer}/user/password`, vm.data)
              .then(() => {
                vm.success = 'Password update was successful.';
                vm.data.old_password = vm.data.password = vm.confirm_password = '';
              })
              .catch(res => vm.error = res.data.error_description);
          },
        ],
      };
    },
  ]);
