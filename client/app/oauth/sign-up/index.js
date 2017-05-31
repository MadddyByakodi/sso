import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SignUpComponent from './sign-up.component';
import routing from './sign-up.routes';

export default angular
  .module('accountsApp.sign-up', [uiRouter])
  .config(routing)
  .component('signUp', SignUpComponent)
  .name;
