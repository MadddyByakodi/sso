import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SignInComponent from './sign-in.component';
import routing from './sign-in.routes';

export default angular
  .module('oauth.sign-in', [uiRouter])
  .config(routing)
  .component('signIn', SignInComponent)
  .name;
