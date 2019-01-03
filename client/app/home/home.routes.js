/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home?app,client_id,client_secret,redirect_uri,continue,response_type',
      template: '<home></home>',
      data: { pageTitle: 'Home' },
    });
}
