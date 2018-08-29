import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './support.routes';
import Support from './support.component';

export default angular
  .module('accountsApp.support', [uiRouter])
  .config(routing)
  .component('support', Support)
  .name;
