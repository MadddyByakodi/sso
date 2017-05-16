/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.four-o-four', {
      template: '<four-o-four></four-o-four>',
      data: { pageTitle: '404 Not found' },
    });
}
