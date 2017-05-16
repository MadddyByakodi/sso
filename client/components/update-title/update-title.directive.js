/* @ngInject */
function updateTitle($rootScope, $timeout, $state) {
  return function link(scope, element) {
    /* eslint angular/on-watch: 0 */
    const defaultTitle = 'Accounts';

    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      const title = (toState.data && toState.data.pageTitle) || defaultTitle;

      $timeout(() => element.text(`${title} | QuezX Accounts`), 0, false);
    });

    $rootScope.$on('UpdateTitle', (event, data) => {
      const pageTitle = $state.current.data && $state.current.data.pageTitle;
      const title = data || defaultTitle;
      const subtitle = (pageTitle && ` – ${pageTitle} `) || ' ';
      $timeout(() => element.text(`${title}${subtitle}| QuezX Accounts`), 0, false);
    });
  };
}

export default updateTitle;
