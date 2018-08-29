/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.password-change', {
      url: '/password-change',
      template: '<password-change></password-change>',
      data: { pageTitle: 'Settings - Change password' },
    });
}
