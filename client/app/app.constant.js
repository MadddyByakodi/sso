import angular from 'angular';
import moment from 'moment';

// eslint-disable-next-line angular/window-service
const { host, protocol } = window.location;
const PREFIX = `${protocol}//${host.substr(0, host.indexOf('-') + 1)}`;
let DOMAIN = `${host.substr(host.indexOf('.') + 1)}`;
const IS_DEV = DOMAIN.includes(':');
DOMAIN = IS_DEV ? 'quezx.test' : DOMAIN;

const API_SERVER = IS_DEV ? 'http://localhost:3000' : `${PREFIX}api.${DOMAIN}`;
const HIRE_APP = `${PREFIX}hire.${DOMAIN}`;
const PARTNER_APP = `${PREFIX}partner.${DOMAIN}`;
const MANAGE_APP = `${PREFIX}manage.${DOMAIN}`;
const ACCOUNTS_APP = `${PREFIX}accounts.${DOMAIN}`;
const ANALYTICS_APP = `${PREFIX}analytics.${DOMAIN}`;
const BILLING_APP = `${PREFIX}billing.${DOMAIN}`;

const constants = angular
  .module('accountsApp.constants', [])
  .constant('moment', moment)
  .constant('urls', {
    API_SERVER,
    HIRE_APP,
    PARTNER_APP,
    MANAGE_APP,
    ACCOUNTS_APP,
    ANALYTICS_APP,
    BILLING_APP,
  })
  .constant('SSO_APPS', ['analyticsquezx', 'billingquezx']);

export default constants.name;
