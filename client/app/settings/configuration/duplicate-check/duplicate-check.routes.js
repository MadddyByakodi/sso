/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.configuration.duplicate-check', {
      url: '/duplicate-check?status=false',
      template: '<duplicate-check></duplicate-check>',
      data: { pageTitle: 'Settings -Duplicate Check' },
    });
}
