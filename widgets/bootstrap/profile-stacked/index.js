import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';
import DefaultAvatarImage from './avatar.gif';

const widget = {
  id: "bootstrap_profile_stacked",
  template: Template,
  defaults: defaults,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.lock_profile = false;
      scope.show_learn_more = false;

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

      scope.open_learn_more = () => {

        scope.show_learn_more = true;

      };

      scope.default_avatar = DefaultAvatarImage;

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
