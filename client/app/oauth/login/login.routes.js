/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.login', {
      url: '/login',
      template: '<login></login>',
      data: { pageTitle: 'Login' },
    });
}
