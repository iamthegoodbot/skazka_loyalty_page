import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './gifts-card.html';
import './gifts-card.less';

import angular from 'angular';

WidgetRegister({
  id: 'gifts-card',
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