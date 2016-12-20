import { WidgetRegister } from '@core/widget';
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

      scope.gift_unconfirm = function(){

        scope.confirmed_gift = scope.selected_gift = scope.no_points_error = false;

      };

      scope.gift_unconfirm();

      scope.gift_select = function(gift){
        scope.selected_gift = gift || false;
      };

      scope.gift_confirm = function(){

        scope.confirmed_gift = scope.selected_gift;

        if(!scope.user()){

          SailPlay.authorize('remote');

        }

        else if(scope.user().user_points.confirmed < scope.confirmed_gift.points){

          scope.confirmed_gift = false;
          scope.no_points_error = true;

        }

        scope.selected_gift = false;

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

// (function () {
//
//   angular.module('widgets.gifts', [])
//
//     .directive('sailplayMagicGifts', function(MAGIC_CONFIG, SailPlayApi, SailPlay, $rootScope){
//
//       return {
//
//         restrict: "E",
//         replace: true,
//         scope: {
//           _config: '=?config'
//         },
//         templateUrl: '/html/core/widgets/gifts.html',
//         link: function(scope, elm, attrs){
//
//
//
//         }
//
//       };
//
//     });
//
// }());
