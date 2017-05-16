/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth', {
      abstract: true,
      url: '',
      template: '<div ui-view class="fade-in-right-big smooth"></div>',
    });
}
