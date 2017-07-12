import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './feedback.routes';
import FeedbackNew from './feedback-new';

export default angular
  .module('accountsApp.feedback', [uiRouter, FeedbackNew])
  .config(routing)
  .name;
