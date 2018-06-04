import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';

const widget = {
  id: "pivko_quests",
  template: Template,
  defaults: defaults,
  inject: ["MAGIC_CONFIG", "SailPlay", "SailPlayQuests"],
  controller(MAGIC_CONFIG, SailPlay, SailPlayQuests) {
    return (scope, elm, attrs) => {

      scope.quests = new SailPlayQuests();

      scope.quests_utils = {
        custom: {
          current: false,
          close: () => {
            scope.quests_utils.custom.current = false;
          },
          open: (quest) => {
            scope.quests_utils.custom.current = quest;
          }
        }
      };

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
