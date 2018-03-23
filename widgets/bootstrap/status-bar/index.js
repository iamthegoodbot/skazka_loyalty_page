import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "status-bar",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG", '$interpolate'],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG, $interpolate) {
    return (scope, elm, attrs) => {

      scope.show_list = false;
      scope.currentStatus = null;
      scope.nextStatus = null;
      scope.list = scope.widget.options.list;
      scope.toNext = 0;

      scope.statusText = (text) => {
        return $interpolate(text)(scope);
      };

      SailPlayApi.observe('load.user.info', user => {
        if (!user) return;
        let user_points = user.user_points.confirmed;
        scope.currentStatus = scope.list.filter(status => status.points <= user_points).pop();
        scope.nextStatus = scope.list.filter(status => status.points > user_points).shift();
        scope.toNext = scope.nextStatus ? scope.nextStatus.points - user_points : null;
      });

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
