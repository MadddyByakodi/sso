
class AuthSignInController {
  /* @ngInject */
  constructor(
    $window, $state, $location, $rootScope, Auth, AUTH_EVENTS, Session, urls, ResetLoginModal
  ) {
    this.$window = $window;
    this.$state = $state;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.Auth = Auth;
    this.urls = urls;
    this.AUTH_EVENTS = AUTH_EVENTS;
    this.Session = Session;
    this.ResetLoginModalService = ResetLoginModal;
  }

  $onInit() {
    this.error = null;
    this.user = {
      username: this.$state.params.username || '',
      password: this.$state.params.password || '',
    };

    if (this.$state.params.code || (this.$state.params.username && this.$state.params.username)) {
      return this.signin(this.$state.params.code);
    }

    this.show = true;
    return null;
  }

  signin() {
    this.error = null;
    const { username, password } = this.user;

    const options = { username, password };


    // Try to login
    this.Auth
      .authLogin(options)
      .then(() => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.Auth.setAuthSessionData().then(() => {
          const { $location, $state } = this;

          if ($location.search().continue) return $location.url($location.search().continue);
          return $location.path($state.href('home'));
        });
      }, ({ data, status }) => {
        this.show = true;
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed);
        this.error = data.error_description;
        if (status === 409) {
          this.ResetLoginModalService.open(data)
            .then(() => this.signin(undefined, true));
        }
      });
  }
}

export default AuthSignInController;

