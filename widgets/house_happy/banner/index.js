import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "house_happy_banner",
  template: Template,
  inject: [],
  controller() {}
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
