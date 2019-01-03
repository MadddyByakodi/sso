
class SignInController {
  /* @ngInject */
  constructor(
    $window, $state, $location, $q, $rootScope, Auth, AUTH_EVENTS, Session, urls, ResetLoginModal
  ) {
    this.$window = $window;
    this.$state = $state;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$q = $q;
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

    this.GOOGLE_LOGIN_BUTTON = this.$state.params.client_id === '';

    if (this.$state.params.code || (this.$state.params.username && this.$state.params.username)) {
      return this.signin(this.$state.params.code);
    }

    this.show = true;
    return null;
  }

  signin(code, forceLogin = false) {
    this.error = null;
    const { username, password } = this.user;

    const IS_QDESKTOP = (this.$location.search().continue || '').includes('qdesktop')
      || this.$window.innnerWidth === 400;

    const options = { username, password, forceLogin };

    if (!IS_QDESKTOP) options.singleSession = true;
    if (forceLogin) options.force = true;

    // Try to login
    this.$q.all([
      this.Auth
        .authLogin(code ? { grant_type: 'google', code } : options),
      this.Auth
        .login(code ? { grant_type: 'google', code } : options),
    ])
      .then(() => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.Auth.setSessionData().then(() => {
          const { $location, $state } = this;
          const { whatBlocked = [] } = this.Session.read('userinfo') || {};
          const [state] = whatBlocked.map((x) => x.state);
          if (state === 'password-change') return $state.go(state);

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

export default SignInController;
