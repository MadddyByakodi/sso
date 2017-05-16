class AuthoriseController {
  /* @ngInject */
  constructor($window, $location, $http, Session, urls) {
    this.$window = $window;
    this.$location = $location;
    this.$http = $http;
    this.Session = Session;
    this.urls = urls;
  }

  $onInit() {
    const user = this.Session.read('userinfo');
    const params = this.$location.search();
    const { location } = this.$window;

    const apps = {
      2: [
        'partnerquezx', 'partnerwordpress', 'chatquezx', 'qdesktop',
        'searchquezx', 'adminquezx', 'accessquezx', 'qdesklive',
      ],
      4: ['managequezx', 'chatquezx', 'searchquezx', 'adminquezx', 'qdesklive'],
      5: ['hirequezx', 'chatquezx', 'searchquezx', 'adminquezx', 'qdesklive'],
      8: ['managequezx', 'chatquezx', 'searchquezx', 'adminquezx', 'qdesklive'],
      9: ['managequezx', 'chatquezx', 'searchquezx', 'adminquezx', 'qdesklive'],
    };

    // Handle redirect for internal user from hire and partner app
    if ([4, 8, 9].includes(user.group_id) && !apps[4].includes(params.client_id)) {
      location.href = `${this.urls.MANAGE_APP}${params.state}`;
      return null;
    }

    if (
      !(apps[user.group_id] || []).includes(params.client_id) ||
      (!user.admin_flag && (params.client_id === 'adminquezx'))
    ) return (this.error = 'Access Denied!');

    const url = `${this.urls.API_SERVER}/authorise`;
    return this
      .$http
      .get(url, { params })
      .then(() => this
        .$http
        .post(url, Object.assign(params, { allow: 'true' })))
      .then(({ data }) => (location.href = data))
      .catch(({ data }) => (this.error = data.error));
  }
}

export default AuthoriseController;
