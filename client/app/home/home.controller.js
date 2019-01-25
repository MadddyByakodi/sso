class HomeController {
  /* @ngInject */
  constructor($window, $location, $stateParams, Session, urls) {
    this.$window = $window;
    this.$location = $location;
    this.Session = Session;
    this.urls = urls;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    const user = this.Session.read('userinfo');
    const { location } = this.$window;
    if (!user) return {};

    const APP_NAME = this.$stateParams.client_id.replace('quezx', '_app').toUpperCase();
    return (location.href = this.href(this.$stateParams.client_id, this.urls[APP_NAME]));
  }

  href(clientId, baseUrl) {
    return this.$location
      .path('/authorise')
      .search({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: `${baseUrl}/${clientId === 'accountsquezx' ? 'signin' : 'access/oauth'}`,
      })
      .absUrl();
  }
}

export default HomeController;
