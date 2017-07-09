import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './dates-events.html';
import './dates-events.less';

import angular from 'angular';

Widget.factory('datesFactory', ($rootScope, SailPlayApi, SailPlay) => {
  
  let obj = {
    synced: false
  }

  function getUserDatesFromServer(){
    SailPlayApi.call("vars.batch", {
      names: [
        "dates_events"
      ]
    }, (vars)=>{
      console.log(vars)
      if(vars.vars && vars.vars.length){
        const parsedArr = JSON.parse(vars.vars[0].value)
        console.info('getting datees', vars)
        obj.vars = vars
        obj.synced = true
        $rootScope.$broadcast('dates-events-get', parsedArr)
      } else {
        $rootScope.$broadcast('dates-events-get', [])
      }
    })
  }

  function getUserDates(){
    const p = new Promise((success,failure)=>{
      if(obj.synced){
        success(obj.vars)          
      } else {
        $rootScope.$on('dates-events-get', (ev, vars) => {
          success(vars)
        })
      }
    })
    return p
  }

  function setUserDates(datesArr, cb){
    const datesArrAsString = angular.toJson(datesArr)
    SailPlayApi.call('vars.add', {custom_vars: {'dates_events': datesArrAsString}}, () => {
      $rootScope.$broadcast('dates-events-update', datesArr)
    })
  }


  SailPlay.on('load.user.info.success', getUserDatesFromServer)

//  $rootScope.$on('openProfile', getUserDates)

  obj.getUserDates = getUserDates
  obj.setUserDates = setUserDates
  
  return obj
})

WidgetRegister({
  id: 'dates-events',
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

      scope.user = SailPlayApi.data('load.user.info');

      scope.show_events = false

      scope.isFormOpened = false

      scope.$on('dates-open', (ev, isOpen)=>{
        if(isOpen){
          scope.show_events = true
        }
      })

      /*
        example date

        dateObj = {
          
          id: Number,
          name: String,
          secondName: String,
          date: Date,
          relation: String,
          email_notify: Bool,
          sms_notify: Bool

        }
      */
      /*
      scope.dates = [
        {
          id: 1,
          name: 'qweqw',
          secondName: 'qweqwe',
          date: moment(),
          relation: "123",
          email_notify: true,
          sms_notify: false
        }
      ]
      */

      scope.canSubmit = false

      scope.dates = []

      scope.relationOptions = [
        'Мама',
        'Папа',
        'Сын',
        'Дочь',
        'Брат',
        'Сестра',
        'Тётя',
        'Дядя',
        'Двоюродный брат',
        'Двоюродная сестра',
        'Бабушка',
        'Дедушка',
        'Друг',
        'Подруга',
        'Свой вариант'
      ]

      scope.getNextId = function(){
        const dates = scope.dates
        if(dates !== void 0 && dates.length>0){
          const idsArr = dates.map(x=>x.id)
          const max = Math.max(...idsArr)          
          return max+1
        } else {
          return 1
        }
      }

      const defalt = {
        id: void 0,
        name: '',
        secondName: '',
        date: [],
        relation: '',
        email_notify: false,
        sms_notify: false
      }

      scope.newDate = angular.copy(defalt)

      scope.customRelation = ''

      function isDateValid(){
        return (scope.newDate.name != '' && scope.newDate.secondName != '' && scope.newDate.relation != '' && ((scope.newDate.relation != 'Свой вариант') || (scope.customRelation != '')) && scope.newDate.date.length === 3)
      }

      scope.$watch('newDate', function(newValue, oldValue) {
        if(isDateValid()){
          scope.canSubmit = true
        } else {
          scope.canSubmit = false
        }
      }, true)

      scope.$watch('customRelation', function(newValue, oldValue) {
        if(isDateValid()){
          scope.canSubmit = true
        } else {
          scope.canSubmit = false
        }
      })

      scope.createDate = function(){
        if(scope.newDate.name && scope.newDate.secondName && scope.newDate.relation && isDateValid()){
          const dateAsIsoString = moment().set({'year': scope.newDate.date[2], 'month': scope.newDate.date[1]-1, 'date': scope.newDate.date[0]}).toISOString()
          let relation = ''
          if(scope.newDate.relation == 'Свой вариант'){
            relation = scope.customRelation
          } else {
            relation = scope.newDate.relation
          }
          const newDate = {...scope.newDate, date: dateAsIsoString, id: scope.getNextId(), relation}
          
          scope.dates = scope.dates.concat(newDate)
          datesFactory.setUserDates(scope.dates)
          scope.customRelation = ''
          scope.newDate = angular.copy(defalt)
        }
      }

      scope.$on('dates-events-get', (ev, datesArr) => {
        if(typeof datesArr === 'object'){
          scope.dates = datesArr
        }
      })

      scope.delete_date_by_id = function(id) {
        console.info(id)
        const withoutDeleted = scope.dates.filter(x=>x.id!==id)
        scope.dates = withoutDeleted
        datesFactory.setUserDates(scope.dates)
      }

      datesFactory.getUserDates().then(res=>{
      })
      

    }

  }
});

/*

Widget.provider('GiftsWidget', function () {

  let gift_types = [];

  const get_gift_type_config = (type_id) => {
    return gift_types.filter((gift_type) => {
      return gift_type.id === type_id;
    })[0];
  };

  return {
    register: function (config) {

      const unique = !get_gift_type_config(config.id);
      unique && gift_types.push(config);

    },
    $get: function () {

      return {
        types: gift_types,
        get_type: get_gift_type_config
      }

    }
  };

});

export const GiftTypeRegister = function (config) {

  Widget.config(function (GiftsWidgetProvider) {
    GiftsWidgetProvider.register(config);
  })

};

Widget.directive('giftType', function (GiftsWidget, $injector, $compile) {
  return {
    restrict: 'A',
    scope: {
      types: '=',
      gift: '='
    },
    link: function (scope, elm) {

      scope.$watch(() => {
        return angular.toJson([ scope.types, scope.gift ]);
      }, function (data) {

        data = angular.fromJson(data);

        let types = data[0];

        let gift = data[1];

        elm.html('');

        if(!types || !gift) return;

        let gift_type_options = types.filter((gift_type) => {
          return gift_type.categories && gift_type.categories.indexOf(gift.category) >= 0;
        })[0];

        if(!gift_type_options) return;

        let gift_type_config = GiftsWidget.get_type(gift_type_options.id);

        let gift_type_scope = scope.$new();

        gift_type_scope.options = angular.copy(gift_type_options);

        gift_type_scope.gift = angular.copy(gift);

        gift_type_config.controller.$inject = gift_type_config.inject || [];

        $injector.invoke(gift_type_config.controller)(gift_type_scope, elm);

        elm.append($compile(gift_type_config.template)(gift_type_scope));

      });

    }
  };
});

Widget.directive('magicGift', function($timeout){
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, elm, attrs){
      if (scope.$last) {

        $timeout(function () {

          var slides = elm[0].parentElement.querySelectorAll('[data-magic-slide]');
          var wrapper = elm[0].parentElement.parentElement.parentElement;

          if (!slides.length) return;

          angular.forEach(slides, function (slide) {
            slide.style.width = '';
          });

          var _width = slides[0].offsetWidth || 0;

          _width = _width ? _width + 30 : 0;

          var _limits = {
            min: 1,
            max: 4
          };

          if (!_width) return;

          var _wrap_width = wrapper.offsetWidth;

          var _count_show = Math.floor(_wrap_width / _width) > _limits.max ? Math.floor(_wrap_width / _width) < _limits.min ? _limits.min : Math.floor(_wrap_width / _width) : Math.floor(_wrap_width / _width);

          if (!_count_show) return;

          _width = Math.floor(_wrap_width / _count_show);

          angular.forEach(slides, function (slide) {
            slide.style.width = (_width - 30) + 'px';
          });

        }, 200);

      }
    }
  }
});

*/