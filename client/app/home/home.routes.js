/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home></home>',
      data: { pageTitle: 'Home' },
    });
}
