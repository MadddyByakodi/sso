/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.sign-in', {
      url: '/signin?code',
      template: '<sign-in></sign-in>',
      data: { pageTitle: 'Sign In' },
    });
}
