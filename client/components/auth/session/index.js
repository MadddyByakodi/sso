import angular from 'angular';
import SessionService from './session.service';

export default angular
  .module('accountsApp.session', [])
  .service('Session', SessionService)
  .name;
