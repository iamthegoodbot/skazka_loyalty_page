import {WidgetRegister} from '@core/widget';
import GiftsGridTemplate from './gifts-grid.html';
import './gifts-grid.less';

WidgetRegister({

  id: 'gifts-grid',
  template: GiftsGridTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    'parallaxHelper'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, parallaxHelper) {

    return function (scope, elm, attrs) {

      scope.background = parallaxHelper.createAnimator(-0.2);
      scope.background2 = parallaxHelper.createAnimator(-0.4);

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // Grid blocks array
      scope.blocks = [];

      scope.gifts = [];

      scope.showMore = false

      scope.filter = scope.widget.options && scope.widget.options.filter || {};

      scope.orderBy = scope.widget.options && scope.widget.options.orderBy || 'points';

      // Current state of grid
      scope.state = 0;

      scope.check_categories = false;

      scope.user_categories = [];

      // Grid block size
      const block_size = scope.widget.options && scope.widget.options.grid_size || 6;

      const available_categories = scope.widget.options && scope.widget.options.available_categories || [];

      const categories = scope.widget.options && scope.widget.options.categories || [];

      if (!available_categories.length) {
        scope.check_categories = true;
      } else {
        SailPlay.send('tags.exist', {tags: categories.filter(item => available_categories.indexOf(item.id) !== -1).map(item => item.tag)}, tags_res => {
          if (tags_res && tags_res.status === 'ok') {
            scope.check_categories = true;
            scope.user_categories = tags_res.tags;
            scope.$digest();
          } else {
            console.error('Tags exit error. Response: ', tags_res)
          }
          scope.getBlocks();
          scope.$digest();
        });
      }

      function replaceVariables(str, data) {
        if (!str || !data) return;
        var re;
        for (var field in data) {
          re = new RegExp('%%' + field + '%%', "g");
          str = str.replace(re, data[field]);
        }
        return str;
      }

      scope.isNotAvailableGift = gift => {
        if (!gift || !scope.user()) return;
        let status = categories.filter(item => item.id == gift.category)[0];
        let obj = {
          tag_id: status && status.id,
          status_name: status && status.name,
          tag_name: status && status.tag
        };
        $rootScope.$broadcast('notifier:notify', {
          header: replaceVariables(scope.widget.texts.no_available_category.header, obj),
          body: replaceVariables(scope.widget.texts.no_available_category.body, obj)
        });
      };

      scope.isAvailableGift = gift => {
        if (!gift || !scope.check_categories) return false;
        let category = categories.filter(category => category.id == gift.category)[0];
        if (scope.check_categories && (!gift.category || !category)) {
          return true;
        }
        let checked = scope.user_categories.filter(tag => {
          return tag.name == category.tag && tag.exist
        })[0];
        return scope.check_categories && checked;
      };

      // Local variable for preparing grid data
      let i = 0, page = null, len = 0;

      scope.getBlocks = () => {
        scope.blocks = [];
        if (!scope.gifts && !scope.gifts.length && scope.check_categories) return;
        let gifts = angular.copy(scope.gifts);
        let block_len = block_size == 'all' ? gifts.length : block_size;
        len = Math.ceil(gifts.length / block_len);
        i = 0;
        do {
          if (i == (len - 1)) {
            page = gifts.slice(block_len * i);
          } else {
            page = gifts.slice(block_len * i, block_len * i + block_len);
          }
          scope.blocks.push(page);
          i++;
        } while (len && i != len);
      };

      /**
       * Watch gift list, and prepare it for grid
       */
      SailPlayApi.observe('load.gifts.list', gifts => {
        scope.gifts = gifts;
        scope.getBlocks();
        scope.$digest();
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

        if (!scope.user()) SailPlay.authorize('remote', {widget: 'gifts-grid', action: 'gift_confirm'});

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

      scope.open = gift => {
        if (!gift) return;
        if (scope.isAvailableGift(gift)) {
          scope.selected_gift = gift;
        } else {
          scope.isNotAvailableGift(gift);
        }
      };

      const giftSuccessTemplate = `
        <div class="gifts_grid__item"
           data-ng-class="{
           'gift-available': isAvailableGift(gift),
           'gift-unavailable': !isAvailableGift(gift),
           'gift-points-not-enough': user()
           }">

          <img class="gifts_grid__item-img gift_img"
               data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}"
               alt="{{ gift.name }}">

          <span class="gifts_grid__item-name gift_name" data-ng-bind="gift.name"></span>

          <a class="gifts_grid__item-button button_primary" href="#"
             data-ng-click="$event.preventDefault();open(gift)"
               data-ng-bind="(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))"></a>

        </div>
      `

      /**
       * Track success gift purchase
       */
      SailPlay.on('gifts.purchase.success', (res) => {
        $rootScope.$apply(() => {
          //scope.selected_gift = null;
          scope.giftSuccess = true
          SailPlayApi.call('load.gifts.list');
          SailPlayApi.call('load.user.info');
          /*
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_success_header,
            body: (res.coupon_number && (scope.widget.texts.coupon_number + ' ' + res.coupon_number)) || res.success_message || scope.widget.texts.gift_received
          });*/
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