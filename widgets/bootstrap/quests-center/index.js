import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "bootstrap_quests_center",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller($rootScope, SailPlay, SailPlayApi, tools) {
    return (scope, elm, attrs) => {
      scope.show_success = false;

      scope.custom = {
        selected: false,
        select: (action) => {
          scope.custom.selected = action;
        }
      };

      scope.action_styles = action_data => {
        return (
          action_data &&
          action_data.styles &&
          tools.stringify_widget_css("", action_data.styles)
        );
      };

      SailPlay.on('actions.perform.success', res => {
        scope.$apply(function() {
          scope.show_success = true;
          scope.custom.selected = false;
        });
      });
    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
