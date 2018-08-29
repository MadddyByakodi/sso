/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.preferences.email-preferences', {
      url: '/email-preferences',
      template: '<email-preferences></email-preferences>',
      data: { pageTitle: 'Email Preferences' },
    });
}
