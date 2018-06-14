class AuthService {
  /* @ngInject */
  constructor($q, $log, $http, urls, authService, Session) {
    this.refreshingToken = false;
    this.$q = $q;
    this.$log = $log;
    this.$http = $http;
    this.urls = urls;
    this.authService = authService;
    this.Session = Session;
    this.apiUrl = `${urls.API_SERVER}/api`;
    this.authUrl = `${urls.API_SERVER}/applications/accounts/api`;
  }

  login(credential) {
    return this
      .$http
      .post(`${this.urls.API_SERVER}/oauth/token`, credential, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest(obj) {
          return Object
            .keys(obj)
            .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
            .join('&');
        },
        ignoreAuthModule: true,
      })
      .then(res => this.Session.create('oauth', res.data))
      .catch(res => {
        this.Session.destroy();
        return this.$q.reject(res);
      });
  }

  refreshToken() {
    // To Save Multiple Async RefreshToken Request
    if (this.refreshingToken) {
      this.$log.warn('Refresh token request already sent.');
      return this.$q.reject({ warning: 'Refresh token request already sent.' });
    }

    this.refreshingToken = true; // Set refresh_token reuqest tracker flag
    return this
      .$http
      .post(
        `${this.authUrl}/refresh`,
        { refresh_token: this.Session.read('oauth').refresh_token },
        { ignoreAuthModule: true }
      )
      .then(res => {
        this.Session.create('oauth', res.data);
        this.refreshingToken = false; // reset refresh_token reuqest tracker flag

        return this // confirm login and replace token in buffered requests
          .authService
          .loginConfirmed('success', config => {
            const conf = config;
            conf.headers.Authorization = `Bearer ${this.Session.accessToken}`;
            return conf;
          });
      })
      .catch(err => {
        this.refreshingToken = false; // reset refresh_token reuqest tracker flag
        this.$log.error('Refresh token failed', err);
        return this.$q.reject(err); // expired token or some other problem
      });
  }

  logout() {
    return this
      .$http
      .post(`${this.authUrl}/logout`, { access_token: this.Session.accessToken })
      .then(res => {
        // Destroy Session data
        this.Session.destroy();
        return res;
      })
      .catch(res => {
        this.Session.destroy();
        return this.$q.reject(res);
      });
  }

  setSessionData() {
    return this
      .$q
      .all([
        this
          .$http
          .get(`${this.apiUrl}/users/me`)
          .then(res => this.Session.create('userinfo', res.data)),

        // User states not required
      ]);
  }
}

export default AuthService;
