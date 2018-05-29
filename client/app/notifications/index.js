import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NotificationsComponent from './notifications.component';
import routing from './notifications.routes';


// noinspection JSAnnotator
export default angular
  .module('accountsApp.notifications', [uiRouter])
  .config(routing)
  .component('notifications', NotificationsComponent)
  .name;
