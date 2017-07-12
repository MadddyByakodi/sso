import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SignIn from './sign-in';
import SignUp from './sign-up';
import PasswordReset from './password-reset';
import FourOFour from './four-o-four';
import Feedback from './feedback';
import routing from './oauth.routes';

export default angular
  .module('accountsApp.oauth', [uiRouter, SignIn, SignUp, PasswordReset, FourOFour, Feedback])
  .config(routing)
  .name;
