import {
  Widget
} from "@core/widget";
import Template from "./template.html";
import "./style.less";
import default_avatar from './avatar.gif'
import defaults from './defaults.json';
import PaginationTemplate from './pagination.html';

const widget = {
  id: "jardin_profile",
  template: Template,
  defaults: defaults,
  inject: ["SailPlayProfile", "SailPlayProfileHistory", "SailPlayProfileForm", "SailPlayStatuses"],
  controller(SailPlayProfile, SailPlayProfileHistory, SailPlayProfileForm, SailPlayStatuses) {
    return (scope, elm, attrs) => {

      // Profile part
      scope.profile = new SailPlayProfile();
      scope.profile_form = new SailPlayProfileForm(scope.widget.options.profile_form);
      scope.profile_form_utils = {

        show: false,
        error: '',
        open: () => {
          scope.profile_form_utils.show = true;
        },
        close: (form) => {
          scope.profile_form.revert(form);
          scope.profile_form_utils.show = false;
        },
        complete(e, data) {

          if (data && data.status == "error") {

            scope.profile_form_utils.error = scope.widget.options.texts.errors[data.status_code || data.message] || data.message;

          } else {
            scope.profile_form_utils.show = false;
            scope.profile_form_utils.error = '';
          }
          scope.$apply();
        }

      };

      // Status part
      scope.statuses = new SailPlayStatuses.TYPES[scope.widget.options.statuses.type](scope.widget.options.statuses);
      scope.statuses_utils = {
        show: false,
        open: () => {
          scope.statuses_utils.show = true;
        },
        close: (form) => {
          scope.statuses_utils.show = false;
        },
      }

      // History part
      scope.history = new SailPlayProfileHistory();
      scope.history_utils = {
        show: false,
        open: () => {
          scope.history_utils.show = true;
        },
        close: (form) => {
          scope.history_utils.show = false;
        },
      };


    };
  }
};

Widget.run(function ($templateCache) {
  $templateCache.put("jardin.history.pagination", PaginationTemplate);
});

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});