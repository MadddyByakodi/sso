/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.auth-sign-in', {
      url: '/auth-signin',
      template: '<auth-sign-in></auth-sign-in>',
      data: { pageTitle: 'Sign In' },
    });
}
