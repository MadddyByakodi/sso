class SupportController {
  /* @ngInject */
  constructor($state, $http, Session) {
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.EM = {};

    this
      .$http
      .get(`/clients/${this.user.client_id}`, {
        params: { fl: 'EngagementManager' },
      })
      .then(({ data: { EngagementManager } }) => {
        this.EM = EngagementManager;
      });
  }
}

export default SupportController;
