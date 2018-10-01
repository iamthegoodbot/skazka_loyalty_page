import angular from 'angular';
import ModalTemplate from './modal.html';
import './modal.less';
import close_image from './close.png';

export let Modal = angular.module('magic.tools.modal', [])

.directive('magicModal', function($parse, tools, MAGIC_CONFIG){

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

      scope.close_image = close_image;

      scope.close = function(){
        $parse(attrs.show).assign(scope.$parent, false);
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
