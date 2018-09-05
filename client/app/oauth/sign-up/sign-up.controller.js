class SignUpController {
  /* @ngInject */
  constructor($http, $state, $location, $stateParams, Auth, $rootScope, AUTH_EVENTS, urls) {
    this.$http = $http;
    this.$state = $state;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.Auth = Auth;
    this.AUTH_EVENTS = AUTH_EVENTS;
    this.urls = urls;
  }

  $onInit() {
    this.data = {};
    this.ui = { loading: false };
    this.disableSignup = false;
    const encCid = this.$stateParams.cid;
    if (encCid) {
      this
        .$http
        .get('/users/verifyByEmail', {
          params: { email: this.$stateParams.email },
          ignoreAuthModule: true,
        })
        .then(({ data }) => {
          if (data) location.href = `${this.urls.PARTNER_APP}/accept-invite/${encCid}`;
        })
        .catch(() => (this.disableSignup = true));
    }
  }

  signup() {
    this.ui.loading = true;
    return this.$http
      .post('/users/signup', this.data, {
        ignoreAuthModule: true,
        params: this.$stateParams,
      })
      .then(() => {
        this.ui.loading = false;
        this.signin();
      })
      .catch(() => (this.ui.loading = false));
  }

  signin() {
    this.error = null;
    const { password } = this.data;
    const { email: username } = this.$stateParams;

    // Try to login
    this.Auth
      .login({ username, password })
      .then(() => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.Auth.setSessionData().then(() => {
          const { $location, $state } = this;
          if ($location.search().continue) return $location.url($location.search().continue);
          return $location.path($state.href('home'));
        });
      }, ({ data }) => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed);
        this.error = data.error_description;
      });
  }
}

export default SignUpController;
