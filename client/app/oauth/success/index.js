import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Success from './success.component';
import routing from './success.route';

export default angular
  .module('oauth.success', [uiRouter])
  .config(routing)
  .component('success', Success)
  .name;
