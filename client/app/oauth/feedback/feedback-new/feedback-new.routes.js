/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.feedback.new', {
      url: '/{id:int}?user_id',
      template: '<feedback-new></feedback-new>',
      data: { pageTitle: 'New feedback' },
    });
}
