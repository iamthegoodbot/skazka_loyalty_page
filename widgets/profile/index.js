import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const DEFAULT_SUM_PURCHASE_EVENT = 10000017;
const widget = {
  id: "profile",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;

      $rootScope.$on("profile:state", (e, state) => {
        scope.show_profile = state;
      });

      $rootScope.$on("history:state", (e, state) => {
        scope.show_history = state;
      });

      $rootScope.$on("status:state", (e, state) => {
        let offset = elm[0].getBoundingClientRect().top-document.body.getBoundingClientRect().top;
        let menuBlock = document.querySelector(scope.widget.options.menu_selector)
        if(menuBlock) {
          offset -= menuBlock.offsetHeight;
        } 
        window.scrollTo(0, offset);
        scope.show_status = state;
      });

      scope.onSaveProfile = (e, data) => {
        if(data && data.status == "error"){
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.error,
            body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
          });
        } 
        scope.show_profile = false;
        scope.$apply();
      };

      scope.getLeftForStatus = (sum, badge) => {
        if (badge.rules && badge.rules.length) {
          let needSum = 0;
          badge.rules.forEach(rule => {
            if (
              rule.event_id ==
              (scope.widget.options.events.SUM_PURCHASE ||
                DEFAULT_SUM_PURCHASE_EVENT)
            ) {
              needSum = rule.value_to_success;
            }
          });
          return needSum ? parseInt(needSum - sum) : null;
        }
      };
    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
