import { WidgetRegister } from '@core/widget';
import ProfileRegisterTemplate from './profile-progress.html';
import './profile-progress.less'

WidgetRegister({
  id: "profile-progress",
  template: ProfileRegisterTemplate,
  inject: ['$timeout', '$rootScope', 'SailPlayApi'],
  controller: ($timeout, $rootScope, SailPlayApi) => {
    return (scope) => {
      var hint_hide_timeout;

      scope.showHistory = () => {
        $rootScope.$broadcast('showHistory')
      }
      
      scope.lineData = function(){
        return {"status": "ok", "threshold": "200000", "quarter_revenue": "53240"};
      }

      var maxLinePercent = 96,
          maxLine = scope.lineData().threshold * 2,
          percent = scope.lineData().quarter_revenue / maxLine * maxLinePercent;
          
      scope.toLocaleString = (data_string) => {
        var int = parseInt(data_string);
        return int.toLocaleString('en').replace(/ /g, ', ')        
      }          
      scope.leftBarWidth = percent < 48 ? `${percent}%` : '48%';
      scope.rightBarWidth = percent < 48 ? "0" : `${percent - 48}%`
      scope.user = SailPlayApi.data('load.user.info');
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