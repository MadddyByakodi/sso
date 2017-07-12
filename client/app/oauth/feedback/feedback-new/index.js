import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FeedbackNewComponent from './feedback-new.component';
import routing from './feedback-new.routes';

export default angular
  .module('accountsApp.feedback-new', [uiRouter])
  .config(routing)
  .component('feedbackNew', FeedbackNewComponent)
  .name;
