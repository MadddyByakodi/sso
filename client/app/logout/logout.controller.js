class LogoutController {
  /* @ngInject */
  constructor($window, $stateParams, $rootScope, Auth, AUTH_EVENTS) {
    this.$window = $window;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.Auth = Auth;
    this.AUTH_EVENTS = AUTH_EVENTS;
  }

  $onInit() {
    return this.Auth
      .logout()
      .then(() => {
        const { location } = this.$window;
        const next = this.$stateParams.continue || '/home';
        location.href = next.slice(0, 1) === '/'
          ? `${location.origin}${next}`
          : next;
        return this.$rootScope.$broadcast(this.AUTH_EVENTS.logoutSuccess);
      }, () => {
        const next = this.$stateParams.continue || '/home';
        location.href = next.slice(0, 1) === '/'
          ? `${location.origin}${next}`
          : next;
        return this.$rootScope.$broadcast(this.AUTH_EVENTS.logoutFailed);
      });
  }
}

export default LogoutController;
