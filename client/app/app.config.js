/* @ngInject */
export function routeConfig($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.when('/', '/home');

  $urlRouterProvider.otherwise(($injector, $location) => {
    const url = $location.url();
    if (!['/', '/home'].includes(url)) {
      const user = $injector.get('Session').read('userinfo');
      const location = $injector.get('$window').location;
      const urls = $injector.get('urls');
      if (!user) return $location.url(`/signin?continue=${encodeURIComponent(url)}`);
      switch (user.group_id) {
        case 2:
          location.href = `${urls.PARTNER_APP}${url}`;
          return null;
        case 3: // analytise app
          location.href = `${urls.ANALYTICS_APP}${url}`;
          return null;

        case 4:
        case 8:
        case 9:
          location.href = `${urls.MANAGE_APP}${url}`;
          return null;

        case 5:
          location.href = `${urls.HIRE_APP}${url}`;
          return null;

        default:
          return $location.url('/home');
      }
    }

    return $location.url('/home');
  });

  $locationProvider.html5Mode(true);
}
