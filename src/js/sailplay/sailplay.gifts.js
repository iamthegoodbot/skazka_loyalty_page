(function () {

  angular.module('sailplay.gifts', [])

  /**
   * @ngdoc directive
   * @name sailplay.gifts.directive:sailplayGifts
   * @scope
   * @restrict A
   *
   * @description
   * Simple directive for rendering and operating with SailPlay gifts.
   *
   */
    .directive('sailplayGifts', function (SailPlay, SailPlayApi) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.gifts = SailPlayApi.data('load.gifts.list');

          var user = SailPlayApi.data('load.user.info');

          scope.gift_purchase = function (gift) {

            SailPlay.send('gifts.purchase', {gift: gift});

          };

          scope.gift_affordable = function (gift) {
            return user() && user().user_points.confirmed >= gift.points;
          };

          scope.$watch(function () {
            return angular.toJson([scope.gifts(), user()]);
          }, function () {

            build_progress();

          });

          scope.progress = false;

          function build_progress() {

            if (!scope.gifts() || scope.gifts().length < 1) {
              scope.progress = false;
              return;
            }

            var target = Math.max.apply(Math, scope.gifts().map(function (o) {
              return o.points;
            }));

            var progress_value = user() && user().user_points.confirmed / (target / 100) || 0;

            scope.progress = {
              items: [],
              plenum: progress_value <= 100 ? progress_value : 100,
              next: {
                item: false,
                offset: 0
              }
            };

            var ProgressItem = function () {

              this.gifts = [];

              this.left = 0;

              this.reached = false;

              this.get_left = function () {

                return this.left + '%';

              }

            };

            scope.gifts().sort(function (a, b) {
              return a.points > b.points;
            }).reduce(function (prev_gift, current_gift) {

              var item;

              if (!prev_gift) {

                item = new ProgressItem();

                item.gifts.push(current_gift);

                scope.progress.items.push(item);

              }
              else {

                if (Math.abs(prev_gift.points - current_gift.points) < target * 0.02) {
                  item = scope.progress.items[scope.progress.length - 1];
                  item && item.gifts.push(current_gift);
                }
                else {
                  item = new ProgressItem();
                  item.gifts.push(current_gift);
                  scope.progress.items.push(item);
                }

              }

              item.left = parseInt(current_gift.points) / (parseInt(target) / 100);
              item.reached = user() && current_gift.points <= user().user_points.confirmed;

              if (user() && !item.reached && !scope.progress.next.item) {

                scope.progress.next.item = current_gift;
                scope.progress.next.offset = parseInt(current_gift.points) - parseInt(user().user_points.confirmed);

              }


            }, 0);

          }


        }

      };

    })

    .directive('sailplayOrderGift', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi) {

      return {
        restrict: 'A',
        scope: false,
        link: function (scope, elm, attrs) {

          var config = JSON.parse(attrs.config || 'false');

          scope.sailplay = scope.sailplay || {};

          scope.gift_id = {};

          scope.sailplay.order_gift = {
            config: config,
            form: config.fields
          };

          if (!config) {
            console.error('Provide order_form_config');
          }

          scope.sailplay.order_gift.submit = function (form, gift, callback) {

            if (!form || !form.$valid || !gift) {
              return;
            }

            var vars = {};

            angular.forEach(scope.sailplay.order_gift.form, function(item){
              vars[item.name] = item.value;
            });

            SailPlay.send('vars.add', {custom_vars: vars}, function (vars_res) {

              if (vars_res.status === 'ok') {

                callback && callback(gift);
                scope.$apply();

              } else {

                $rootScope.$broadcast('notifier:notify', {
                  header: $rootScope.locale.error,
                  body: user_res.message || $rootScope.locale.notifications.default_error
                });
                scope.$apply();

              }

            });

          };

        }

      };

    })

}());
