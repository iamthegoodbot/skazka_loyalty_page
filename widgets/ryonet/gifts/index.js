import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "ryonet_gifts",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {
      scope.show_success = false;
      scope.show_gift = false;
      scope.purchased_gift = false;

      scope.getGift = gift => {
        SailPlay.send('gifts.purchase', {gift: gift});
      };

      scope.onChange = () => {
      };

      $rootScope.$on("gift:state", (e, state) => {
        // if(state){
        //   scope.getGift(angular.copy(state));
        // }
        scope.show_gift = state && angular.copy(state);
      });

      SailPlay.on('gifts.purchase.success', (res) => {
        $rootScope.$apply(() => {
          scope.show_gift = false;
          scope.show_success = true;
          scope.purchased_gift = res;
        });
      });

      SailPlay.on('gift.purchase.error', (error) => {
        $rootScope.$apply(() => {
          scope.show_gift = false;
          scope.show_success = false;
          $rootScope.$broadcast('notifier:notify', {
            header: widget.texts.modals.error.title,
            body: error.message || widget.texts.modals.error.body
          });
        });
      });


    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
