import angular from 'angular';
import NavbarComponent from './navbar.component';

export default angular
  .module('accountsApp.navbar', [])
  .component('navbar', NavbarComponent)
  .name;
