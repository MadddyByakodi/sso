class HomeController {
  /* @ngInject */
  constructor($window, $location, Session, urls) {
    this.$window = $window;
    this.$location = $location;
    this.Session = Session;
    this.urls = urls;
  }

  $onInit() {
    const user = this.Session.read('userinfo');
    const { location } = this.$window;
    const { HIRE_APP, MANAGE_APP, PARTNER_APP, ANALYTICS_APP } = this.urls;
    if (!user) return {};

    switch (user.group_id) {
      case 2:
        return (location.href = this.href('partnerquezx', PARTNER_APP));
      case 3:
        return (location.href = this.href('analyticsquezx', ANALYTICS_APP));
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
