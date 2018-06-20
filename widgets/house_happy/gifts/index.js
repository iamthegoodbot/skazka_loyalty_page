import {
  Widget
} from "@core/widget";
import Template from "./template.html";
import "./style.less";

const widget = {
  id: "house_happy_gifts",
  template: Template,
  inject: ["$rootScope", "SailPlay", "$interpolate"],
  controller($rootScope, SailPlay, $interpolate) {
    return (scope, elm, attrs) => {
      scope.show_gift = false;
      scope.requested_gift = false;
      scope.request_message = '';

      SailPlay.on('gifts.purchase.success', (res) => {
        $rootScope.$apply(() => {
          let data = {};
          let d = new Date();
          data[`${scope.show_gift.name} response ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`] = scope.request_message;
          data.response = scope.request_message;
          data.sku = res.gift_sku
          SailPlay.send('vars.add', {custom_vars: data}, vars_res => {
            $rootScope.$apply(() => {
              if (vars_res && vars_res.status == 'ok') {
                scope.requested_gift = angular.copy(scope.show_gift);
                scope.show_gift = false;
              } else {
                $rootScope.$broadcast('notifier:notify', {
                  header: widget.texts.modals.error.title,
                  body: vars_res.message || widget.texts.modals.error.body
                });
              }
            })
          });

        });
      });

      SailPlay.on('gift.purchase.error', (error) => {
        $rootScope.$apply(() => {
          scope.show_gift = false;
          scope.requested_gift = false;
          $rootScope.$broadcast('notifier:notify', {
            header: widget.texts.modals.error.title,
            body: error.message || widget.texts.modals.error.body
          });
        });
      });


      scope.getGift = gift => {
        if (!gift || !scope.request_message || !scope.request_message.length) return;
        SailPlay.send('gifts.purchase', {
          gift: gift
        });
      };

      $rootScope.$on("gift:state", (e, state) => {
        scope.show_gift = state && angular.copy(state);
        scope.request_message = '';
      });

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});