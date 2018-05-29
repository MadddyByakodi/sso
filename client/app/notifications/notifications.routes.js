/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('notifications', {
      url: '/notifications',
      template: '<notifications></notifications>',
      data: { pageTitle: 'Notifications Settings' },
    });
}
