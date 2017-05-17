class PasswordResetController {
  /* @ngInject */
  constructor($http, urls) {
    this.$http = $http;
    this.urls = urls;
  }

  $onInit() {
    this.data = { email_id: '' };
    this.error = null;
  }

  reset() {
    this.success = this.error = '';
    this.$http
    .post(`${this.urls.API_SERVER}/password_reset`, this.data, {
      ignoreAuthModule: true,
    })
    .then(() => {
      this.success = `Password reset mail sent to ${this.data.email_id}`;
      this.data.email_id = '';
    })
    .catch(({ data }) => (this.error = data.error_description));
  }
}

export default PasswordResetController;
