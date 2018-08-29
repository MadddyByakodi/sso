class SettingsController {
  /* @ngInject */
  constructor($state, $http, Session) {
    this.Session = Session;
    this.$state = $state;
    this.$http = $http;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.collapse = {
      prefs: false,
      config: false,
    };

    this.duplicate();
  }

  duplicate() {
    this
      .$http
      .get('/public_clients/globalDuplication', {
        params: {
          client_id: this.user.client_id,
        },
      })
      .then(({ data }) => {
        const name = this.$state.current.name;
        this.showConfig = !!data;
        this.collapse.config = !!((name === 'settings.duplicate-check') && this.showConfig);
      });
  }

  openCollapse(type) {
    Object.keys(this.collapse).map(key => (this.collapse[key] = (key === type)
      ? !this.collapse[key]
      : false));
  }
}

export default SettingsController;
