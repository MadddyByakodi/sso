import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AuthoriseComponent from './authorise.component';
import routing from './authorise.routes';

export default angular
  .module('accountsApp.authorise', [uiRouter])
  .config(routing)
  .component('authorise', AuthoriseComponent)
  .name;
