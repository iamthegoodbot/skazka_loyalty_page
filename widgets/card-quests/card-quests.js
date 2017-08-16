import { Widget, WidgetRegister } from '@core/widget';
import CardQuestsTemplate from './card-quests.html';
import './card-quests.less';
import 'core-js/fn/array/find.js'

Widget.filter(()=>{})

WidgetRegister({

  id: 'card-quests',
  template: CardQuestsTemplate,
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

      const actionId = scope.share_action_id = scope.widget.share_custom_action_id

      $rootScope.$on('openShareAction', ()=>{
        const shareAction = SailPlayApi.data('load.actions.custom.list')()
          .find(x=>x.id==actionId)
        if(shareAction){
          scope.action_custom_select(shareAction)
        }
      })

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

    }

  }

});