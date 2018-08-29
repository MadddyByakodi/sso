import angular from 'angular';
import uiRouter from 'angular-ui-router';
import EmailPreferences from './email-preferences';
import routing from './preferences.routes';

export default angular
  .module('accountsApp.preferences', [uiRouter, EmailPreferences])
  .config(routing)
  .name;
