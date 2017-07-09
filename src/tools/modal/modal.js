import angular from 'angular';
import ModalTemplate from './modal.html';
//import './modal.less';

export let Modal = angular.module('magic.tools.modal', [])

.directive('magicModal', function($parse, tools, MAGIC_CONFIG, SailPlayApi){

  return {
    restrict: 'E',
    replace: true,
    template: ModalTemplate,
    scope: {
      config: '=?'
    },
    transclude: true,
    link: function(scope, elm, attrs){

      scope._modal_config = MAGIC_CONFIG.tools.modal;

      scope.show = false;

      scope.close = function(){
        $parse(attrs.show).assign(scope.$parent, false);
        const parentScope = scope.$parent.$parent

        if(attrs.onClose){
          parentScope[attrs.onClose]()
        }
        scope.$eval(attrs.onClose);
      };

      elm.on('click', function(e){
        if(e.target === elm[0]){
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
