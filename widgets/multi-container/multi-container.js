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

    return 'Загрузка'
    
  };
});

WidgetRegister({
  id: 'multi-container',
  template: GiftsTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    'datesFactory', 
    'moment'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, datesFactory, moment) {

    return function (scope, elm, attrs) {

      scope.user = SailPlayApi.data('load.user.info')

      SailPlay.on('load.user.info.success', ()=>{
        scope.$apply()
        scope.user = SailPlayApi.data('load.user.info')
      })

      scope.currentDate = {}



      scope.$on('dates-events-get', (ev, datesArr) => {
        if(typeof datesArr === 'object'){
          scope.currentDate = getCurrentDate(datesArr)
          scope.$apply()
          console.info(scope.currentDate.name)
        }
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

      function getCurrentDate(items) {
        const currentYear = moment().year()
        const nextYear = moment().year()+1
        const now = moment()
        const nowTimestamp = now.valueOf()
        const nowAfterYearTimestamp = moment().set('year', nextYear).valueOf()
        function getNextBirthday(momentDate){
          const inCurrentYear = moment(momentDate).set('year', currentYear)
          const inCurrentYearTimestamp = inCurrentYear.valueOf()
          console.log(moment(nowTimestamp).isSame(moment(inCurrentYear), '') )
          if(now.isSame(inCurrentYear, 'day') && now.isSame(inCurrentYear, 'month')){
            return 'today'
          } else if(nowTimestamp > inCurrentYear){
            const inNextYear = moment(momentDate).set('year', nextYear).valueOf()
            return inNextYear
          } else {
            return inCurrentYear
          }
        }
        const deflt = {
          date: moment().set('year', 3000).valueOf(),
          displayDate: '',
          name: '',
          isDefault: true
        }

        if(items){

          const res = items.reduce((acc,v,k) => {
            
            const nextBirthdayTimestamp = getNextBirthday(moment(v.date))

            if(nextBirthdayTimestamp === 'today'){
              return {
                today: true,
                date: nextBirthdayTimestamp,
                displayDate: moment(nextBirthdayTimestamp).toISOString(),
                name: v.name,
                isDefault: false
              }
            } else if(nextBirthdayTimestamp < acc.date){
              return {
                date: nextBirthdayTimestamp,
                displayDate: moment(nextBirthdayTimestamp).toISOString(),
                name: v.name,
                isDefault: false
              }
            } else {
              return acc
            }
          }, deflt)
        


          const displayDate = moment(res.displayDate).fromNow()

          return {...res, displayDate}
        }

        return deflt
        
      }

    }

  }
});