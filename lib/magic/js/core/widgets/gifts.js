(function () {

  angular.module('widgets.gifts', [])

    .directive('sailplayMagicGifts', function (MAGIC_CONFIG, SailPlayApi, SailPlay, $rootScope) {

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/gifts.html',
        link: function (scope, elm, attrs) {

          scope.user = SailPlayApi.data('load.user.info');

          scope._tools = MAGIC_CONFIG.tools;

          scope.gift_unconfirm = function () {
            scope.confirmed_gift = scope.selected_gift = scope.no_points_error = scope.order_gift = false;
          };

          scope.gift_unconfirm();

          scope.gift_select = function (gift) {
            scope.selected_gift = gift || false;
          };
          
          scope.is_order_gift = function (gift) {
            if (!MAGIC_CONFIG || !MAGIC_CONFIG.data.gifts || !MAGIC_CONFIG.data.gifts.category_order_gifts) return;
            var access_list = MAGIC_CONFIG.data.gifts.category_order_gifts;
            return gift && access_list.indexOf(gift.category) != -1
          };

          scope.gift_confirm = function () {

            if (scope.is_order_gift(scope.selected_gift)) {

              if (!scope.user()) {

                SailPlay.authorize('remote');

              } else if (scope.user().user_points.confirmed < scope.selected_gift.points) {

                scope.selected_gift = false;
                scope.confirmed_gift = false;
                scope.order_gift = false;
                scope.no_points_error = true;

              }

              scope.confirmed_gift = false;

              scope.order_gift = angular.copy(scope.selected_gift);

              scope.selected_gift = false;

            } else {

              scope.confirmed_gift = scope.selected_gift;

              if (!scope.user()) {

                SailPlay.authorize('remote');

              }

              else if (scope.user().user_points.confirmed < scope.confirmed_gift.points) {

                scope.confirmed_gift = false;
                scope.no_points_error = true;

              }

              scope.selected_gift = false;

            }

          };

          SailPlay.on('gifts.purchase.success', function (res) {

            $rootScope.$broadcast('notifier:notify', {

              header: scope._tools.notifier.texts.congratulations,
              body: (res.coupon_number && (scope._config.texts.coupon_number + ' ' + res.coupon_number)) || res.success_message || scope._config.texts.gift_received

            });

            scope.gift_unconfirm();

            $rootScope.$apply();

          });

          SailPlay.on('gift.purchase.error', function (error) {
            console.dir(error);
            $rootScope.$broadcast('notifier:notify', {

              header: scope._tools.notifier.texts.error,
              body: error.message || scope._config.errors.gift_received_error

            });

            scope.gift_unconfirm();

            $rootScope.$apply();

          });


        }

      };

    });

}());
