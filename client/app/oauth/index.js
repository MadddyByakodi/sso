import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SignIn from './sign-in';
import PasswordReset from './password-reset';
import FourOFour from './four-o-four';
import routing from './oauth.routes';

export default angular
  .module('accountsApp.oauth', [uiRouter, SignIn, PasswordReset, FourOFour])
  .config(routing)
  .name;
