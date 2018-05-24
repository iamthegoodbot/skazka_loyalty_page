import { Widget } from "@core/widget";
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
          scope.requested_gift = angular.copy(scope.show_gift);
          scope.show_gift = false;
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
        let data = {};
        let name_of_variable = $interpolate(scope.widget.options.variable_template)(gift);
        if (!name_of_variable) {
          console.error('Wrong name of variable');
          return;
        }
        data[name_of_variable] = scope.request_message;
        SailPlay.send('vars.add', {custom_vars: data}, vars_res => {
          $rootScope.$apply(() => {
            scope.requested_gift = false;
            if (vars_res && vars_res.status == 'ok') {
              SailPlay.send('gifts.purchase', {gift: gift});
            } else {
              $rootScope.$broadcast('notifier:notify', {
                header: widget.texts.modals.error.title,
                body: vars_res.message || widget.texts.modals.error.body
              });
            }
          })
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
