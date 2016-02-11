angular.module('qui.hire')
  .controller('ForgotpassController', [
    'Auth',
    function orgotpassCtrl(Auth) {
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
