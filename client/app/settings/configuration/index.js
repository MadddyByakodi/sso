import angular from 'angular';
import uiRouter from 'angular-ui-router';
import DuplicateCheck from './duplicate-check';
import routing from './configuration.routes';

export default angular
  .module('accountsApp.configuration', [uiRouter, DuplicateCheck])
  .config(routing)
  .name;
