import angular from 'angular';
import BaseSixtyFourInput from './base-sixty-four-input.directive';

export default angular
  .module('accountsApp.base-sixty-four-input', [])
  .directive('baseSixtyFourInput', BaseSixtyFourInput)
  .name;
