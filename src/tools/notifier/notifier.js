import angular from 'angular';
import NotifierTemplate from './notifier.html';
import './notifier.less';

export let Notifier = angular.module('magic.tools.notifier', [])

.directive('notifier', function(MAGIC_CONFIG){

  return {

    restrict: 'E',
    replace: true,
    scope: true,
    template: NotifierTemplate,
    link: function(scope){

      scope._notifier_config = MAGIC_CONFIG.tools.notifier;

      scope._tools = MAGIC_CONFIG.tools;

      let new_data = {

        header: '',
        body: ''

      };

      scope.$on('notifier:notify', function(e, data){

        scope.data = data;
        scope.show_notifier = true;
        scope.$digest();
        console.log('notifier: ' + data.body);

      });

      scope.reset_notifier = function(){
        scope.data = angular.copy(new_data);
        scope.show_notifier = false;
      };

      scope.reset_notifier();

    }

  }

});

export default Notifier.name;