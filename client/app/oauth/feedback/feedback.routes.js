/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.feedback', {
      url: '/feedbacks',
      abstract: true,
      template: '<div ui-view=""></div>',
    });
}
