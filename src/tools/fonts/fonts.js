import angular from 'angular';
import FontsTemplate from './fonts.html';
import './fonts.less';

export let Fonts = angular.module('magic.tools.fonts', [])

.directive('fonts', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: false,
    template: FontsTemplate
  };
});

export default Fonts.name;
