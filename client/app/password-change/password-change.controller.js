class PasswordChangeController {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.data = { old_password: '', password: '' };
  }

  match(confirmPassword) {
    confirmPassword
      .$setValidity('match', this.data.password === this.confirm_password);
  }

  change() {
    this.success = this.error = '';
    this.$http
      .put('/users/password', this.data)
      .then(() => {
        this.success = 'Password update was successful.';
        this.data.old_password = this.data.password = this.confirm_password = '';
      })
      .catch(({ data }) => (this.error = data.error_description));
  }
}

export default PasswordChangeController;
