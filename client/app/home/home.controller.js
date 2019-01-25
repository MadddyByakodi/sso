class HomeController {
  /* @ngInject */
  constructor($window, $location, $stateParams, Session, urls, SSO_APPS) {
    this.$window = $window;
    this.$location = $location;
    this.Session = Session;
    this.urls = urls;
    this.$stateParams = $stateParams;
    this.SSO_APPS = SSO_APPS;
  }

  $onInit() {
    const quarcUser = this.Session.read('userinfo');
    const accountsUser = this.Session.read('auth-userinfo');
    const user = quarcUser || accountsUser;
    const { location } = this.$window;
    const { HIRE_APP, MANAGE_APP, PARTNER_APP } = this.urls;
    if (!user) return {};

    const onlyAuthLoginFound = (!quarcUser && accountsUser);
    const IS_SSO = this.SSO_APPS
      .includes(this.$stateParams.client_id) || onlyAuthLoginFound;

    // Central OAuth
    if (IS_SSO) {
      const APP_NAME = this.$stateParams.client_id.replace('quezx', '_app').toUpperCase();
      return (location.href = this.href(this.$stateParams.client_id, this.urls[APP_NAME]));
    }

    // Quarc OAuth
    switch (user.group_id) {
      case 2:
        return (location.href = this.href('partnerquezx', PARTNER_APP));
      case 4:
      case 8:
      case 9:
        return (location.href = this.href('managequezx', MANAGE_APP));

      case 5:
        return (location.href = this.href('hirequezx', HIRE_APP));

      default:
        return {};
    }
  }

  href(clientId, baseUrl) {
    return this.$location
      .path('/authorise')
      .search({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: `${baseUrl}/access/oauth`,
      })
      .absUrl();
  }
}

export default HomeController;
