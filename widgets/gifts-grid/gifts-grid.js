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
    '$timeout',
    '$filter'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, $timeout, $filter) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // Grid blocks array
      scope.blocks = [];

      scope.gifts = [];

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

      scope.block_size = block_size;

      scope.check_user_tags = () => {
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
          });
        }
      };

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
        gifts = $filter('filter')(gifts, scope.filter);
        gifts = $filter('orderBy')(gifts, scope.orderBy);
        len = Math.ceil(gifts.length / scope.block_size);
        i = 0;
        do {
          if (i == (len - 1)) {
            page = gifts.slice(scope.block_size * i);
          } else {
            page = gifts.slice(scope.block_size * i, scope.block_size * i + scope.block_size);
          }
          scope.blocks.push(page);
          i++;
        } while (len && i != len);
        if (!scope.blocks[scope.state]) {
          while (scope.state == 0 || (!scope.blocks[scope.state] || !scope.blocks[scope.state].length)) {
            scope.state--;
          }
        }
      };

      /**
       * Watch gift list, and prepare it for grid
       */
      SailPlayApi.observe('load.gifts.list', gifts => {
        scope.gifts = gifts;
        scope.getBlocks();
      });

      SailPlayApi.observe('load.user.info', () => {
        scope.check_user_tags();
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

      scope.open = gift => {
        if (!gift) return;
        if (scope.isAvailableGift(gift)) {
          scope.selected_gift = gift;
        } else {
          scope.isNotAvailableGift(gift);
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

      scope.check_user_tags();

      if (scope.widget.options && scope.widget.options.media_grid_size) {
        let render_timeout = null;
        let render_time = 50;
        let on_resize = () => {
          if (render_timeout) $timeout.cancel(render_timeout);
          let width = window.innerWidth;
          let media_size = block_size;
          let rules = Object.keys(scope.widget.options.media_grid_size).map(rule => parseInt(rule)).reverse();
          angular.forEach(rules, (rule_width) => {
            if (rule_width >= width) {
              media_size = scope.widget.options.media_grid_size[rule_width];
            }
          });
          if (scope.block_size == media_size) return;
          render_timeout = $timeout(() => {
            scope.$apply(() => {
              scope.block_size = media_size;
              scope.getBlocks();
            });
          }, render_time);
        };
        angular.element(window).bind('resize', on_resize);

        on_resize();
      }


    };

  }

});