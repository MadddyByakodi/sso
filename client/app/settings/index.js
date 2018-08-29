import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Settings from './settings.component';
import routing from './settings.routes';
import PasswordChange from './password-change';
import Support from './support';
import Configuration from './configuration';
import Preferences from './preferences';

export default angular
  .module('accountsApp.settings', [uiRouter, PasswordChange, Support, Configuration, Preferences])
  .config(routing)
  .component('settings', Settings)
  .name;
