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
      
      SailPlayApi.call("vars.batch", ['threshold', 'quarter_revenue'], (res) => {
        for (let i in res.vars) { scope[res.vars[i].name] = res.vars[i].value } 

        var maxLinePercent = 96,
            maxLine = (parseInt(scope.threshold) || 0) * 2,
            percent = (parseInt(scope.quarter_revenue) || 0) / maxLine * maxLinePercent;
        
        scope.leftBarWidth = percent < 48 ? `${percent}%` : '48%';
        scope.rightBarWidth = percent < 48 ? "0" : `${percent - 48}%`
        scope.$apply();        
      })

          
      scope.toLocaleString = (data_string) => {
        var int = parseInt(data_string);
        return int.toLocaleString('en').replace(/ /g, ', ')        
      }          
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