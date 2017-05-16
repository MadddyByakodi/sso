import angular from 'angular';
import uiRouter from 'angular-ui-router';
import PasswordReset from './password-reset.component';
import routing from './password-reset.routes';

export default angular
  .module('oauth.password-reset', [uiRouter])
  .config(routing)
  .component('passwordReset', PasswordReset)
  .name;
