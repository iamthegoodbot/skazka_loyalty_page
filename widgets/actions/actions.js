import { WidgetRegister } from '@core/widget';
import ActionsWidgetTemplate from './actions.html';
import './actions.less';

WidgetRegister({

  id: 'actions',
  template: ActionsWidgetTemplate,
  inject: [
    'tools'
  ],
  controller: function (tools) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.action_select = function (action) {

        scope.action_selected = action || false;

      };

      scope.action_custom_select = function (action) {

        scope.action_custom_selected = action || false;

      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };

    }

  }

});