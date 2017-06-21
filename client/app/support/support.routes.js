/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('support', {
      url: '/support',
      template: '<support></support>',
      data: { pageTitle: 'Support' },
    });
}
