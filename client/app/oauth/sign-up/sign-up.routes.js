/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth.sign-up', {
      url: '/signup?{signup_code:int}&email&invite&cid',
      template: '<sign-up></sign-up>',
      data: { pageTitle: 'Sign Up' },
    });
}
