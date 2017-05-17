class SignInController {
  /* @ngInject */
  constructor($state, $location, $rootScope, Auth, AUTH_EVENTS) {
    this.$state = $state;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.Auth = Auth;
    this.AUTH_EVENTS = AUTH_EVENTS;
  }

  $onInit() {
    this.user = { username: '', password: '' };
    this.error = null;
  }

  signin() {
    this.error = null;
    const { username, password } = this.user;

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

export default SignInController;
