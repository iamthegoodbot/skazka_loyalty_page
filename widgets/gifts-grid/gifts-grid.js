import {WidgetRegister} from '@core/widget';
import GiftsGridTemplate from './gifts-grid.html';
import './gifts-grid.less';

WidgetRegister({

  id: 'gifts-grid',
  template: GiftsGridTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // Grid blocks array
      scope.blocks = [];

      // Current state of grid
      scope.state = 0;

      // Grid block size
      const block_size = scope.widget.options && scope.widget.options.grid_size || 6;

      // Local variable for preparing grid data
      let i = 0, page = null, len = 0;

      /**
       * Watch gift list, and prepare it for grid
       */
      SailPlayApi.observe('load.gifts.list').then((gifts) => {
        scope.blocks = [];
        if (!gifts) return
        len = Math.ceil(gifts.length / block_size);
        i = 0;
        do {
          if (i == (len - 1)) {
            page = gifts.slice(block_size * i);
          } else {
            page = gifts.slice(block_size * i, block_size);
          }
          scope.blocks.push(page);
          i++;
        } while (i != len);
      });

      /**
       * Change grid page
       * @param action
       */
      scope.move = (action) => {
        if (!scope.blocks[scope.state + action]) return;
        scope.state += action;
      };

      /**
       * Getting gift
       * @param gift
       */
      scope.gift_confirm = (gift) => {

        if (!scope.user()) SailPlay.authorize('remote');

        else if (scope.user().user_points.confirmed < gift.points) {

          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_error_header,
            body: scope.widget.texts.no_points_message || res.success_message
          });

          scope.selected_gift = null;

        } else if (scope.user().user_points.confirmed >= gift.points) {
          SailPlay.send('gifts.purchase', {gift: gift});
        }

      };

      /**
       * Track success gift purchase
       */
      SailPlay.on('gifts.purchase.success', (res) => {
        $rootScope.$apply(() => {
          scope.selected_gift = null;
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_success_header,
            body: (res.coupon_number && (scope.widget.texts.coupon_number + ' ' + res.coupon_number)) || res.success_message || scope.widget.texts.gift_received
          });
        });
      });

      /**
       * Track error gift purchase
       */
      SailPlay.on('gift.purchase.error', (error) => {
        $rootScope.$apply(() => {
          scope.selected_gift = null;
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_error_header,
            body: error.message || scope.widget.texts.gift_received_error
          });
        });
      });


    };

  }

});