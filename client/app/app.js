import './app.scss';
import angular from 'angular';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngAnimate from 'angular-animate';
// import ngMessages from 'angular-messages';

import { routeConfig } from './app.config';

import AppComponent from './app.component';
import constants from './app.constant';
import events from './app.event';
import setupGAnalytics from './app.ga.js';

import Auth from '../components/auth';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import UpdateTitle from '../components/update-title';

import OAuth from './oauth';
import Home from './home';
import Authorise from './authorise';
import PasswordChange from './password-change';
import Logout from './logout';

setupGAnalytics('UA-52116787-5');  // Google Analytics
angular
  .module('accountsApp', [
    uiRouter, uiBootstrap, Navbar, Footer, constants, Auth, UpdateTitle,
    OAuth, Home, Authorise, PasswordChange, Logout,
  ])
  .component('accountsApp', AppComponent)
  .config(routeConfig)
  .run(events);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['accountsApp'], {
      strictDi: true,
    });
  });
