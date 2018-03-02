import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "gifts",
  template: Template,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {
      scope.show_success = false;
      scope.show_gift = false;
      scope.gifts = SailPlayApi.data("load.gifts.list");
      scope.CIRCLE_R = 140;

      scope.getGift = gift => {
        SailPlay.send('gifts.purchase', {gift: gift});
      };

      scope.onChange = () => {
        let offset = elm[0].getBoundingClientRect().top-document.body.getBoundingClientRect().top;
        window.scrollTo(0, offset);
      };

      $rootScope.$on("gift:state", (e, state) => {
        scope.show_gift = state && angular.copy(state);
      });

      scope.getGiftProgress = (points, gift) => {
        let val = 0;
        let progress = 0;

        if (points) {
          val = parseInt(points / gift.points * 100);
        }

        if (isNaN(val)) {
          val = 100;
        } else {
          let r = scope.CIRCLE_R;
          let c = Math.PI * (r * 2);

          if (val < 0) {
            val = 0;
          }
          if (val > 100) {
            val = 100;
          }

          progress = (100 - val) / 100 * c;
        }

        return progress;
      };

      SailPlay.on('gifts.purchase.success', (res) => {
        $rootScope.$apply(() => {
          scope.show_gift = false;
          scope.show_success = true;
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
