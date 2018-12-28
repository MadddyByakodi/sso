import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AuthSigninComponent from './auth-signin.component';
import routing from './auth-signin.routes';

export default angular
  .module('oauth.auth-sign-in', [uiRouter])
  .config(routing)
  .component('authSignIn', AuthSigninComponent)
  .name;
