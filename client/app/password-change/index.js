import angular from 'angular';
import uiRouter from 'angular-ui-router';
import PasswordChangeComponent from './password-change.component';
import routing from './password-change.routes';

export default angular
  .module('accountsApp.password-change', [uiRouter])
  .config(routing)
  .component('passwordChange', PasswordChangeComponent)
  .name;
