class SignUpController {
  /* @ngInject */
  constructor($http, $state, $location, $stateParams, Auth, $rootScope, AUTH_EVENTS) {
    this.$http = $http;
    this.$state = $state;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;

    this.Auth = Auth;
    this.AUTH_EVENTS = AUTH_EVENTS;
  }

  $onInit() {
    this.data = {};
  }

  signup() {
    return this.$http
      .post('/users/signup', this.data, {
        ignoreAuthModule: true,
        params: this.$stateParams,
      })
      .then(() => this.signin());
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
