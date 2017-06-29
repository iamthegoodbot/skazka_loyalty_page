import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './dates-events.html';
import './dates-events.less';

import angular from 'angular';

Widget.factory('datesFactory', ($rootScope, SailPlayApi, SailPlay) => {
  
  let obj = {
    synced: false
  }

  function getUserDatesFromServer(){
    console.info('hi2')
    SailPlayApi.call("vars.batch", {
      names: [
        "dates_events"
      ]
    })
    SailPlay.on('vars.batch.success', (vars)=>{
      console.info('getting datees')
      obj.vars = vars
      obj.synced = true
      $rootScope.$broadcast('dates-events-get', {})
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
    SailPlayApi.call('vars.add', datesArr, () => {
      $rootScope.$broadcast('dates-events-update', datesArr)
    })
  }

  console.info('hi')

  SailPlay.on('load.user.info.success', getUserDatesFromServer)

//  $rootScope.$on('openProfile', getUserDates)

  obj.getUserDates = getUserDates
  
  return obj
})

WidgetRegister({
  id: 'dates-events',
  template: GiftsTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    'datesFactory'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, datesFactory) {

    return function (scope, elm, attrs) {

      scope.user = SailPlayApi.data('load.user.info');

      scope.modals = {
        confirmed_gift: false,
        selected_gift: false,
        no_points_error: false
      };

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
      

      scope.set_date = function(dateObj) {
        
      }

      scope.get_dates = function() {
        
      }

      scope.delete_date_by_id = function(id) {

      }

      datesFactory.getUserDates().then(res=>{
        console.info(res)
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