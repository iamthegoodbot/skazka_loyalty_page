import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './multi-container.html';

import angular from 'angular';


Widget.filter('phonenumber', function () {
  return function (item) {

    if(item){
      const ccode = "+" + item.slice(0,1)
      const quoted = " (" + item.slice(1, 4) + ") "
      const remaining = item.slice(4, 7) + " " + item.slice(7, 9) + " " + item.slice(9)
    
      return ccode+quoted+remaining
    }

    return 'no number'
    
  };
});



WidgetRegister({
  id: 'multi-container',
  template: GiftsTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {


      scope.user = SailPlayApi.data('load.user.info')

      SailPlay.on('load.user.info.success', ()=>{
        scope.$apply()
        scope.user = SailPlayApi.data('load.user.info')
      })

      scope.openHistory = function(ev){
        $rootScope.$broadcast('history-open', true)
      }

      scope.openDates = function(ev){
        $rootScope.$broadcast('dates-open', true)
      }

      scope.openEditProfile = function(ev){
        $rootScope.$broadcast('openProfile', true)
      }

    }

  }
});