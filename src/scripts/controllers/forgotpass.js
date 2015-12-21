angular.module('qui')
  .controller('ForgotpassController', [
    'Auth',
    function SigninCtrl(Auth) {
      const vm = this;
      vm.showSuccessAlert = false;
      vm.forgotpass = function forgotpass() {
        Auth.forgotpass(vm.user.username)
          .then(function mailSent() {
            vm.showSuccessAlert = true;
          });
      };
    },
  ]);
