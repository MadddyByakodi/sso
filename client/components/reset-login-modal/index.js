import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import ResetLoginModalService from './reset-login-modal.service';

export default angular
  .module('accountsApp.resetLoginModal', [uiBootstrap])
  .service('ResetLoginModal', ResetLoginModalService)
  .name;
