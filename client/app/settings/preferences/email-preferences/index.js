import angular from 'angular';
import uiRouter from 'angular-ui-router';
import EmailPreferencesComponent from './email-preferences.component';
import routing from './email-preferences.routes';


// noinspection JSAnnotator
export default angular
  .module('accountsApp.emailPreferences', [uiRouter])
  .config(routing)
  .component('emailPreferences', EmailPreferencesComponent)
  .name;
