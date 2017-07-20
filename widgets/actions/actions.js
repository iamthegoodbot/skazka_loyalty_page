import { WidgetRegister } from '@core/widget';
import ActionsWidgetTemplate from './actions.html';
import './actions.less';

WidgetRegister({

  id: 'actions',
  template: ActionsWidgetTemplate,
  inject: [
    'tools',
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (tools, SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.action_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

        scope.action_selected = action || false;

      };

      scope.open_profile = function() {
        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');        
        $rootScope.$broadcast('openProfile')
      }

      SailPlay.on('actions.perform.success', function(){
       scope.$apply(function(){
         scope.action_selected = false;
       });
      });

      scope.action_custom_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
        scope.action_custom_selected = action || false;

      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };

      scope.$watch('action_custom_selected', function(new_val, old_val){
        // if user close popup, update actions list
        if(old_val && !new_val){
          SailPlayApi.call('load.actions.custom.list');
        }
      });

    }

  }

});