import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "profile",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.show_text = false;
      scope.lock_profile = false;
      scope.menu_active = false;

      $rootScope.$on("text:state", (e, state) => {
        scope.show_text = state;
      });

      $rootScope.$on("info:state", (e, state) => {
        scope.show_info = state;
      });

      $rootScope.$on("profile:state", (e, state, lock) => {
        scope.show_profile = state;
        scope.lock_profile = lock;
      });

      $rootScope.$on("history:state", (e, state) => {
        scope.show_history = state;
      });

      scope.onSaveProfile = (e, data) => {
        if (data && data.status == "error") {
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.error,
            body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
          });
        }
        scope.show_profile = false;
        scope.$apply();
      };

      let closeMenu = () => {
        console.log('closeMenu', scope.menu_active)
        scope.$apply(() => {
          scope.menu_active = false;
        })
      }

      document.body.addEventListener('click', closeMenu)

      scope.$on('$destroy', () => {
        document.body.removeEventListener('click', closeMenu)
      })

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
