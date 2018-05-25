import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';
// import DefaultAvatarImage from './avatar.gif';

const widget = {
  id: "pivko_profile",
  template: Template,
  defaults: defaults,
  inject: ["SailPlayProfile", "MAGIC_CONFIG", "SailPlayProfileForm", "SailPlayStatuses"],
  controller(SailPlayProfile, MAGIC_CONFIG, SailPlayProfileForm, SailPlayStatuses) {
    return (scope, elm, attrs) => {

      scope.profile = new SailPlayProfile();

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.profile_form);

      scope.profile_form_utils = {

        show: false,
        open: () => {
          scope.profile_form_utils.show = true;
        },
        close: (form) => {
          scope.profile_form.revert(form);
          scope.profile_form_utils.show = false;
        },
        complete(e, data) {
          if (data && data.status == "error") {
            scope.$emit('notifier:notify', {
              header: scope.widget.texts.error,
              body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
            });
          }
          scope.profile_form_utils.show = false;
          scope.$apply();
        }

      };

      scope.statuses = new SailPlayStatuses.TYPES[scope.widget.options.statuses.type](scope.widget.options.statuses);

      console.log(scope.statuses);
      // scope.default_avatar = DefaultAvatarImage;

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
