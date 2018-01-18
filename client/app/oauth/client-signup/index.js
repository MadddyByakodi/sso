import angular from 'angular';
import uiRouter from 'angular-ui-router';
import vcRecaptcha from 'angular-recaptcha';
import clientSignup from './client-signup.component';
import routing from './client-signup.routes';

export default angular
  .module('oauth.client-signup', [uiRouter, vcRecaptcha])
  .config(routing)
  .component('clientSignup', clientSignup)
  .name;
