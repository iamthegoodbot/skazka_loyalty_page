import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import default_avatar from './avatar.gif'

const widget = {
  id: "bootstrap_profile",
  template: Template,
  inject: ["$rootScope", "SailPlayProfileForm"],
  controller($rootScope, SailPlayProfileForm) {
    return (scope, elm, attrs) => {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.show_text = false;
      scope.lock_profile = false;
      scope.menu_active = false;
      scope.default_avatar = default_avatar;

      scope.force_fill_profile = false;

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.config);

      scope.$on('sailplay-login-success', () => {

        if(scope.widget.options.fill_profile_required) {

          scope.profile_form.completed().then((is_completed) => {

            if(!is_completed) {

              scope.force_fill_profile = true;
              scope.show_profile = true;

              scope.lock_profile = true;

            }

          });

        }

      });

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
        else {
          scope.lock_profile = false;
          scope.force_fill_profile = false;
        }
        scope.show_profile = false;
        scope.$apply();
      };

      let closeMenu = () => {
        if(scope.force_fill_profile) return;
        scope.$apply(() => {
          scope.menu_active = false;
        })
      };

      document.body.addEventListener('click', closeMenu);

      // $timeout(() => {
      //   if(scope.widget.options.fill_profile_required && !scope.sailplay.fill_profile.form.valid()) {
      //
      //     $rootScope.$broadcast('profile:state', true);
      //
      //   }
      // }, 10);



      scope.$on('$destroy', () => {
        document.body.removeEventListener('click', closeMenu)
      })

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
