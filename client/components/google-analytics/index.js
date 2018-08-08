import angular from 'angular';
import uiRouter from 'angular-ui-router';
import GoogleAnalyticsService from './google-analytics.service';

export default angular
  .module('accountsApp.google-analytics', [uiRouter])
  .service('GoogleAnalytics', GoogleAnalyticsService)
  .name;
