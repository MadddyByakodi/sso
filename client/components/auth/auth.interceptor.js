/* @ngInject */
function AuthInterceptor($window, Session, urls) {
  return {
    request(config) {
      const conf = config;

      // handle url request without domain to api server
      if (conf.url[0] === '/') conf.url = `${urls.API_SERVER}/api${conf.url}`;
      if (conf.url[0] === '#') conf.url = `${urls.ACCOUNTS_APP}/api${conf.url.substr(1)}`;

      if (!!conf.ignoreAuthModule) return conf; // don't need token

      // little bit hacky for now => if index is zero only then returns truthy
      if (!conf.url.indexOf(urls.API_SERVER) && !Session.isLoggedIn) {
        const location = $window.location;
        const { pathname, search } = location;

        // redirect to signin for authentication if not loggedIn
        location.href = `${urls.LOGIN}&state=${pathname}${search}`;
        return null;
      }

      const IS_AUTH = conf.url.startsWith(urls.ACCOUNTS_APP);

      // Attach accessToken to api requests
      conf.headers.Authorization = `Bearer ${IS_AUTH
        ? Session.read('auth-oauth').access_token
        : Session.accessToken}`;

      return conf;
    },
  };
}

export default AuthInterceptor;
