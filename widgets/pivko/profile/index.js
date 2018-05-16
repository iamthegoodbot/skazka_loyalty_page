import { Widget } from "@core/widget";
import Template from "./template.html";
import "./style.less";
import defaults from './defaults.json';
// import DefaultAvatarImage from './avatar.gif';

const widget = {
  id: "pivko_profile",
  template: Template,
  defaults: defaults,
  inject: ["SailPlayProfile", "MAGIC_CONFIG", "SailPlayProfileForm"],
  controller(SailPlayProfile, MAGIC_CONFIG, SailPlayProfileForm) {
    return (scope, elm, attrs) => {

      scope.profile = new SailPlayProfile();

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.profile_form);

      // scope.default_avatar = DefaultAvatarImage;

    };
  }
};

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
