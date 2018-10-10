/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.success', {
      url: '/success',
      template: '<success></success>',
      data: { pageTitle: 'success' },
    });
}
