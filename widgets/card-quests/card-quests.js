import { WidgetRegister } from '@core/widget';
import CardQuestsTemplate from './card-quests.html';
import './card-quests.less';

WidgetRegister({

  id: 'card-quests',
  template: CardQuestsTemplate,
  inject: [
    'tools',
    'SailPlayApi',
    'SailPlay'
  ],
  controller: function (tools, SailPlayApi, SailPlay) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.filter = scope.widget.options && scope.widget.options.filter || {};

      scope.action_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

        scope.action_selected = action || false;

      };

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