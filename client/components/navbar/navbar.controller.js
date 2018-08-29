class NavbarController {
  /* @ngInject */
  constructor($window, Auth, Session, urls) {
    this.$window = $window;
    this.Auth = Auth;
    this.Session = Session;
    this.ACCOUNTS_LOGOUT = `${urls.ACCOUNTS_APP}/logout`;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    const { whatBlocked = [] } = this.user || {};
    const [state] = whatBlocked.map((x) => x.state);

    this.pageName = state === 'password-change' ? '/settings/password_change' : '/dashboard';
  }

  logout() {
    const { location } = this.$window;

    // Initiate logout
    this
      .Auth
      .logout()
      .then(
        () => (location.href = this.ACCOUNTS_LOGOUT), // Success
        () => (location.href = this.ACCOUNTS_LOGOUT) // Error logging out
      );
  }
}

export default NavbarController;
