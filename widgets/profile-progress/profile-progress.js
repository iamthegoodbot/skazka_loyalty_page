import { WidgetRegister } from '@core/widget';
import ProfileRegisterTemplate from './profile-progress.html';
import './profile-progress.less'

WidgetRegister({
  id: "profile-progress",
  template: ProfileRegisterTemplate,
  inject: ['$timeout'],
  controller: ($timeout) => {
    return (scope) => {
      var hint_hide_timeout;

      scope.show_hint = false;
      scope.toggleHint = () => {
        scope.show_hint = !scope.show_hint;
        if (hint_hide_timeout) $timeout.cancel(hint_hide_timeout)
        hint_hide_timeout = $timeout(() => scope.show_hint = false, 10000)
      }
      scope.hideHint = () => { 
        scope.show_hint = false;
        $timeout.cancel(hint_hide_timeout);
      }
    };
  }
})