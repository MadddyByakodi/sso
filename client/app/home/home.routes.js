/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home?app',
      template: '<home></home>',
      data: { pageTitle: 'Home' },
    });
}
