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

      scope.custom_action_cb = function(){
        window.setTimeout(()=>{
          SailPlayApi.call('load.user.info', { all: 1 }, ()=>{});
          SailPlayApi.call('load.actions.custom.list', ()=>{})
          SailPlayApi.call('load.user.history', ()=>{});
        }, 2000)
      }

      SailPlay.on('actions.perform.success', function(){
        scope.$apply(function(){
          scope.action_selected = false;
        });
        window.setTimeout(()=>{
          SailPlayApi.call('load.user.info', { all: 1 }, ()=>{});
          SailPlayApi.call('load.actions.list', ()=>{});
          SailPlayApi.call('load.user.history', ()=>{});
        }, 2000)
      });

      scope.action_custom_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
        scope.action_custom_selected = action || false;

      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };

    }

  }

});