import angular from 'angular';
import Template from './template.html';
import './style.less';

export let Modal = angular.module('magic.tools.modal', [])

.directive('magicModal', function($parse, tools, MAGIC_CONFIG){

  return {
    restrict: 'E',
    replace: true,
    template: Template,
    scope: {
      config: '=?',
      onClose: '=?',
      preventClose: '=?'
    },
    transclude: {
      'title': '?magicModalTitle',
      'body': '?magicModalBody',
      'footer': '?magicModalFooter',
    },
    link: function(scope, elm, attrs){

      scope._modal_config = MAGIC_CONFIG.tools.modal;

      scope.show = false;

      scope.close = function(){
        $parse(attrs.show).assign(scope.$parent, false);
        // scope.$eval(attrs.onClose);
        scope.onClose && scope.onClose();
      };

      elm.on('click', function(e){
        if(e.target === elm[0] && !scope.preventClose){
          scope.$apply(function () {
            scope.close();
          });
        }
      });

      scope.$watch(function(){
        return angular.toJson([scope.$parent.$eval(attrs.show)]);
      }, function(){
        let new_value = scope.$parent.$eval(attrs.show);
        scope.show = new_value;
        tools.body_lock(new_value);
      });

    }
  };

});

export default Modal.name;
