class AppController {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;

    this.app = {
      name: 'Accounts | QuezX',
      version: '1.0.0',
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-primary',
        navbarCollapseColor: 'bg-info',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: true,
        asideFolded: false,
        asideDock: true,
        container: false,
        offScreen: false, // flag for show of sidebar for mobile view
        mobileHeader: false, // flag to show header Nav and Search in mobile view
      },
    };
  }

  $onInit() {
    // keeps track of state change and hides sidebar view for mobile
    /* eslint angular/on-watch: 0 */
    this.appClass = {
      'app-header-fixed': true,
      'app-aside-fixed': true,
      'app-aside-folded': this.app.settings.asideFolded,
      'app-aside-dock': this.app.settings.asideDock,
      container: false,
    };
  }
}

export default AppController;
