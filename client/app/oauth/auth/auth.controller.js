class LoginController {
  /* @ngInject */
  constructor($http, $state, $location, $rootScope, Auth, AUTH_EVENTS, Session) {
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
  }

/* eslint max-len:0 */
  $onInit() {
    this.user = 'manjeshpv@gmail.com';
    this.error = null;
    this.validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  }

  signin() {
    this.error = null;
    if (+this.user) {
      this.error = [
        'Please enter valid email id, ',
        'If you are facing any issues please drop an email support@quezx.com.',
      ].join('');
      return false;
    }

    if (this.validator.test(this.user)) {
      this.data = {
        number: null,
        email: this.user,
      };
    } else {
      this.error = [
        'Please enter valid email id, ',
        'If you are facing any issues please drop an email support@quezx.com.',
      ].join('');
      return false;
    }

    return this.$http
      .post('#/users/magiclink', this.data, {
        ignoreAuthModule: true,
      })
      .then(() => {
        this.$state.go('oauth.success');
        return true;
      })
      .catch(() => {
        this.error = 'Oops ! Something went wrong. ';
        return false;
      });
  }
}

export default LoginController;
