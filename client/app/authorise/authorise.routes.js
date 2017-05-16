/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('authorise', {
      url: '/authorise?client_id&response_type&redirect_uri&state',
      template: '<authorise></authorise>',
      params: { state: '/' },
      data: { pageTitle: 'Authentication in progress' },
    });
}
