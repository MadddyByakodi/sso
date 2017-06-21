import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Support from './support.component';
import routing from './support.routes';

export default angular
  .module('accountsApp.support', [uiRouter])
  .config(routing)
  .component('support', Support)
  .name;
