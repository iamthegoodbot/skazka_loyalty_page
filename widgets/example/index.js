import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';

const widget = {
  id: "example",
  template: Template,
  defaults: defaults,
  inject: ["MAGIC_CONFIG", "SailPlay"],
  controller(MAGIC_CONFIG, SailPlay) {
    return (scope, elm, attrs) => {



    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
