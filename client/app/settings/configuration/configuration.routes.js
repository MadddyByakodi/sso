/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('settings.configuration', {
      abstract: true,
      url: '/configuration',
      template: '<div ui-view=""></div>',
    });
}
