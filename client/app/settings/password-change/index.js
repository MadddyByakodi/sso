import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './password-change.routes';
import PasswordChangeComponent from './password-change.component';

export default angular
  .module('accountsApp.password-change', [uiRouter])
  .config(routing)
  .component('passwordChange', PasswordChangeComponent)
  .name;
