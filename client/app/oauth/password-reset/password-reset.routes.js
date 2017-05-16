/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.password-reset', {
      url: '/password_reset',
      template: '<password-reset></password-reset>',
      data: { pageTitle: 'Reset password' },
    });
}
