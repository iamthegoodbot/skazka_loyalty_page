import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './gifts.html';
import './gifts.less';

import angular from 'angular';

WidgetRegister({
  id: 'gifts',
  template: GiftsTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      scope.user = SailPlayApi.data('load.user.info');

      scope.modals = {
        confirmed_gift: false,
        selected_gift: false,
        no_points_error: false
      };

      scope.gift_unconfirm = function(){

        scope.modals.confirmed_gift = scope.modals.selected_gift = scope.modals.no_points_error = false;

      };

      scope.gift_unconfirm();

      scope.gift_select = function(gift){
        scope.modals.selected_gift = gift || false;
      };

      scope.gift_confirm = function(){

        scope.modals.confirmed_gift = scope.modals.selected_gift;

        if(!scope.user()){

          SailPlay.authorize('remote');

        }

        else if(scope.user().user_points.confirmed < scope.modals.confirmed_gift.points){

          scope.modals.confirmed_gift = false;
          scope.modals.no_points_error = true;

        }

        scope.modals.selected_gift = false;

      };

      SailPlay.on('gifts.purchase.success', function(res){

        $rootScope.$broadcast('notifier:notify', {

          header: scope.widget.texts.purchase_success_header,
          body: (res.coupon_number && (scope.widget.texts.coupon_number + ' ' + res.coupon_number)) ||  res.success_message || scope.widget.texts.gift_received

        });

        scope.gift_unconfirm();

        $rootScope.$apply();

      });

      SailPlay.on('gift.purchase.error', function(error){
        console.dir(error);
        $rootScope.$broadcast('notifier:notify', {

          header: scope.widget.texts.purchase_error_header,
          body: error.message || scope.widget.texts.gift_received_error

        });

        scope.gift_unconfirm();

        $rootScope.$apply();

      });

    };

  }
});

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
      console.log('registered gift types: ', gift_types);

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

        console.log('gift type data', data);
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
            console.log("SLIDE:", slide);
            slide.style.width = (_width - 30) + 'px';
          });

        }, 200);

      }
    }
  }
});