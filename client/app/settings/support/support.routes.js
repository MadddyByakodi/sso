/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.support', {
      url: '/support',
      template: '<support></support>',
      data: { pageTitle: 'Support' },
    });
}
