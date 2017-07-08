import { WidgetRegister, Widget } from '@core/widget';
import CardQuestsTemplate from './card-quests.html';
import './card-quests.less';

Widget.filter('removePrefix', function () {
  return function (name) {
    if(name.indexOf('[event]') == 0){
      return name.slice(7)
    } else {
      return name
    }
  };
});

Widget.filter('onlyEvents', function () {
  return function (items) {
    return items && items.filter(x=>x.name.indexOf('[event]') == 0)
  };
});

Widget.filter('withoutEvents', function () {
  return function (items) {
    return items && items.filter(x=>x.name.indexOf('[event]') != 0)
  };
});

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

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', {widget: 'card-quests', action: 'action_select'});
        scope.action_selected = action || false;

      };

      SailPlay.on('actions.perform.success', function(){
       scope.$apply(function(){
         scope.action_selected = false;
       });
      });

      scope.action_custom_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', {widget: 'card-quests', action: 'action_custom_select'});
        scope.action_custom_selected = action || false;

      };

      scope.$watch('action_custom_selected', function(new_val, old_val){
        // if user close popup, update actions list
        if(old_val && !new_val){
          SailPlayApi.call('load.actions.custom.list');
        }
      });

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };

    }

  }

});