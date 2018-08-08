class GoogleAnalyticsService {
  /* @ngInject */
  constructor($window) {
    this.$window = $window;
    const [prefix,, domain] = this.$window.location.hostname.split('.');
    this.prefix = 'dev_';

    if (prefix.includes('staging')) this.prefix = 'staging_';
    else if (domain === 'com') this.prefix = '';
  }

  sendEvent(category, action, label) {
    this.$window.ga(
      'send', 'event',
      `${this.prefix}${category}`,
      `${this.prefix}${action}`,
      `${this.prefix}${label}`
    );
  }
}

export default GoogleAnalyticsService;
