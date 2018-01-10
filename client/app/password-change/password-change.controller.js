class PasswordChangeController {
  /* @ngInject */
  constructor($http, $state, Session, Auth) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.Auth = Auth;
  }

  $onInit() {
    this.ui = {
      loading: false,
    };
    this.user = this.Session.read('userinfo');
    const { whatBlocked = [] } = this.user || {};
    const [state] = whatBlocked.map((x) => x.state);
    this.isPasswordBlock = state === 'password-change';
    this.data = { old_password: '', password: '' };
  }

  match(confirmPassword) {
    confirmPassword
      .$setValidity('match', this.data.password === this.confirm_password);
  }

  change() {
    this.ui.loading = true;
    this.success = this.error = '';
    this.$http
      .put('/users/password', this.data)
      .then(() => this.isPasswordBlock && this.Auth.setSessionData())
      .then(() => {
        this.ui.loading = false;
        this.success = 'Password update was successful.';
        this.data.old_password = this.data.password = this.confirm_password = '';
        if (this.isPasswordBlock) this.$state.go('home');
      })
      .catch(({ data }) => (this.error = data.error_description));
  }
}

export default PasswordChangeController;
