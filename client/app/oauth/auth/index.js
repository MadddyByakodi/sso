import angular from 'angular';
import uiRouter from 'angular-ui-router';
import LoginComponent from './auth.component';
import routing from './auth.routes';

export default angular
  .module('oauth.auth', [uiRouter])
  .config(routing)
  .component('auth', LoginComponent)
  .name;
