/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.auth', {
      url: '/auth',
      template: '<auth></auth>',
      data: { pageTitle: 'Auth' },
    });
}
