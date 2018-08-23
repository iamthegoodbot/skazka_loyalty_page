import {
  Widget
} from "@core/widget";
import Template from "./template.html";
import "./style.less";


const widget = {
  id: "ryonet_status_bar",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG", '$interpolate'],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG, $interpolate) {
    return (scope, elm, attrs) => {

      scope.show_list = false;
      scope.currentStatus = null;
      scope.nextStatus = null;
      scope.list = scope.widget.options.list;

      scope.statusText = (text) => {
        return $interpolate(text)(scope);
      };

      const tags = scope.list.filter(item => item.tag).map(item => item.tag);
      scope.currentStatus = scope.list.find(item => !item.tag);
      if (tags.length) {
        SailPlayApi.call('tags.exist', {
          tags
        }, res => {
          let recieved = res.tags
            .filter(item => item.exist)
            .map(item => scope.list.find(status => status.tag === item.name));
          if (recieved.length) {
            scope.currentStatus = recieved.length && recieved.pop();
            scope.nextStatus = recieved.length && recieved.shift();
          }
        })
      }

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});