import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Login from './login';
import Auth from './auth';
import PasswordReset from './password-reset';
import Success from './success';
import FourOFour from './four-o-four';
import Feedback from './feedback';
import ClientSignup from './client-signup';
import routing from './oauth.routes';

export default angular
  .module('accountsApp.oauth', [
    uiRouter, SignIn, SignUp, Success, Login, PasswordReset, FourOFour, Feedback, ClientSignup,
    Auth,
  ])
  .config(routing)
  .name;
