import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "menu",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller($rootScope, SailPlay, SailPlayApi, tools) {
    return (scope, elm, attrs) => {
      scope.active = false;
      scope.toggleMenu = () => {
        console.log('toggleMenu', scope.active, !scope.active)
        scope.active = !scope.active
      }
      scope.onClick = item => {
        let element = document.querySelector(item.selector);
        if(scope.active) {
          scope.active = false;
        }
        if (element) {
          let offset =
            element.getBoundingClientRect().top -
            document.body.getBoundingClientRect().top;
          offset -= elm[0].offsetHeight;
          if (tools.get_scroll_top() == offset) return;
          window.scrollTo(0, offset);
        }
      };

      let onBodyClick = e => {
        console.log('onBodyClick')
        if(scope.active) {
          scope.active = false;
          scope.$digest();
        }
      };

      document.body.addEventListener("click", onBodyClick, false);
      document.body.addEventListener("touchstart", onBodyClick, false);

      scope.$on("$destroy", () => {
        document.body.removeEventListener("click", onBodyClick);
        document.body.removeEventListener("touchstart", onBodyClick);
      });
    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
