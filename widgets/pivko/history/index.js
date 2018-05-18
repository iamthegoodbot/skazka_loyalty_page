import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';

const widget = {
  id: "pivko_history",
  template: Template,
  defaults: defaults,
  inject: ["MAGIC_CONFIG", "SailPlay", "SailPlayProfileHistory"],
  controller(MAGIC_CONFIG, SailPlay, SailPlayProfileHistory) {
    return (scope, elm, attrs) => {

      scope.history = new SailPlayProfileHistory();

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
