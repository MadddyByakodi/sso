angular.module('qui.accounts')
  .directive('passwordReset', [
    function passwordReset() {
      return {
        restrict: 'EA',
        templateUrl: '/html/accounts.password-reset.html',
        controllerAs: 'Password',
        controller: [
          'APP',
          '$http',
          function Password(APP, $http) {
            const vm = this;
            vm.data = { email_id: '' };
            vm.testEmail = (email) => email
              .$setValidity('valid', /\S+@\S+\.\S+/.test(vm.data.email_id));

            vm.reset = () => (vm.success = vm.error = '') || $http
              .post(`${APP.apiServer}/password_reset`, vm.data)
              .then(() => {
                vm.success = `Password reset mail sent to ${vm.data.email_id}`;
                vm.data.email_id = '';
              })
              .catch(res => (vm.error = res.data.error_description));
          },
        ],
      };
    },
  ]);
