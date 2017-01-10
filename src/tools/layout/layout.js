import angular from 'angular';
import LayoutTemplate from './layout.html';
import './layout.less';

export let Layout = angular.module('magic.tools.layout', [])

.directive('layout', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      widgets: '=?'
    },
    template: LayoutTemplate,
    link: function (scope, elm, attrs) {



    }
  };
});

export default Layout.name;
