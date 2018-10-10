import angular from 'angular';
import uiRouter from 'angular-ui-router';
import LoginComponent from './login.component';
import routing from './login.routes';

export default angular
  .module('oauth.login', [uiRouter])
  .config(routing)
  .component('login', LoginComponent)
  .name;
