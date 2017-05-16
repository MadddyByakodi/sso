import angular from 'angular';
import uiRouter from 'angular-ui-router';
import HomeComponent from './home.component';
import routing from './home.routes';

export default angular
  .module('accountsApp.home', [uiRouter])
  .config(routing)
  .component('home', HomeComponent)
  .name;
