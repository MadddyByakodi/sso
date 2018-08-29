/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.preferences', {
      abstract: true,
      url: '/preferences',
      template: '<div ui-view=""></div>',
    });
}
