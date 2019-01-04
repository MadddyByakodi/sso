import angular from 'angular';

class SessionService {
  /* @ngInject */
  constructor($window) {
    this.localStorage = $window.localStorage;
  }

  get isLoggedIn() {
    const quarc = !!(this.read('oauth') && this.read('oauth').access_token);
    const accounts = !!(this.read('auth-oauth') && this.read('auth-oauth').access_token);
    return quarc || accounts;
  }

  get accessToken() {
    if (!this.isLoggedIn) return new Error('AccessToken not found');
    return this.read('oauth').access_token;
  }

  create(key, value) {
    this.localStorage[key] = angular.toJson(value);
  }

  read(key) {
    return angular.fromJson(this.localStorage[key]);
  }

  remove(key) {
    return this.localStorage.removeItem(key);
  }

  destroy() {
    this.localStorage.clear();
  }
}

export default SessionService;
