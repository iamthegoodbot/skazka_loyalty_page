import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "house_happy_badges",
  template: Template,
  inject: [],
  controller() {
    return (scope) => {
      scope.blank_elements = new Array(10);
    }
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
