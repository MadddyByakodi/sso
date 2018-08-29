import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './duplicate-check.routes';
import DuplicateCheck from './duplicate-check.component';

export default angular
  .module('accountsApp.duplicate-check', [uiRouter])
  .config(routing)
  .component('duplicateCheck', DuplicateCheck)
  .name;
