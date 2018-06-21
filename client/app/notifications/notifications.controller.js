class NotificationController {
  /* @ngInject */
  constructor($http, $state, Session, Auth) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.Auth = Auth;
  }

  $onInit() {
    this.ui = {
      loading: false,
    };
    this.user = this.Session.read('userinfo');
    this.$http
      .get('/emailTemplates')
      .then((emailTemplateMap) => {
        this.preference = emailTemplateMap.data;
      });
  }

  stateChanged(data, enabled) {
    this.data = {
      email_template_id: data.id,
      enabled,
    };
    Object.assign(data, { enabled: !data.enabled });
    this.success = this.error = '';
    this.$http
       .post('/emailPreferences/', this.data)
       .then(() => {
         this.success = 'Email Preference update was successful.';
       })
       .catch(({ err }) => {
         Object.assign(data, { enabled: !data.enabled });
         this.error = err.error_description;
       });
  }
}

export default NotificationController;
