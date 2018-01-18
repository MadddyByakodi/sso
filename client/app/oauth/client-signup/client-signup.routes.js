/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.client-signup', {
      url: '/client-signup/{type:int}/:userId',
      template: '<client-signup></client-signup>',
      data: { pageTitle: 'Client Signup' },
    });
}
