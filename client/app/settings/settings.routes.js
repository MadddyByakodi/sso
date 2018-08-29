/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings', {
      abstract: true,
      url: '/settings',
      template: '<settings></settings>',
      data: { pageTitle: 'Settings' },
    });
}
