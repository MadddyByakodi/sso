import angular from 'angular';
import 'angular-http-auth';
import Session from './session';
import AUTH_EVENTS from './auth.constant';
import AuthService from './auth.service';
import AuthInterceptor from './auth.interceptor';
import authConfig from './auth.config';

export default angular
  .module('accountsApp.auth', [Session, 'http-auth-interceptor'])
  .constant('AUTH_EVENTS', AUTH_EVENTS)
  .service('Auth', AuthService)
  .factory('AuthInterceptor', AuthInterceptor)
  .config(authConfig)
  .name;
