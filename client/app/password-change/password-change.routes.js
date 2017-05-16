/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('password-change', {
      url: '/password_change',
      template: '<password-change></password-change>',
      data: { pageTitle: 'Change password' },
    });
}
