(function () {

  angular.module('sp.gifts', [])

    .constant('giftAccessTag', 'Доступны подарки')

    .constant('giftsIcons', {
      724 : 'dist/img/category/it.png',
      734 : 'dist/img/category/all.png',
      735 : 'dist/img/category/other.png',
      736 : 'dist/img/category/food.png',
      737 : 'dist/img/category/letters.png'
    })

    .directive('sailplayGifts', function (sp, sp_api, $timeout, $rootScope, $filter, giftAccessTag, giftsIcons) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope, element) {

          scope.gifts = sp_api.data('load.gifts.list');
          scope.categories = sp_api.data('load.gifts.categories');
          scope.user = sp_api.data('load.user.info');
          scope.exist = sp_api.data('tags.exist');
          scope.gifts_by_category = {};
          scope.active_category = 0;
          scope.show_gifts = [];

          scope.hasGift = function (item) {
            return item.length
          };

          scope.notEmpty = function (item) {
            return item.count
          };

          var loaded = 0;

          sp.on('load.gifts.categories.success', function () {
            loaded++;
            sort_gift_by_category();
          });

          sp.on('load.gifts.list.success', function () {
            loaded++;
            sort_gift_by_category();
          });

          scope.get_icon = function(id){

            return giftsIcons[id] || {};

          };

          scope.set_category = function (id) {

            id = id || 0;
            scope.active_category = id;
            scope.set_position();
            scope.current_position = 0;
            scope.show_gifts = scope.gifts_by_category[scope.active_category] || [];

            setTimeout(function(){
              $(window).trigger('resize');
            }, 100);

          };

          scope.left = 0;

          scope.current_position = 0;

          scope.show_left = false;
          scope.show_right = true;


          // Переделать
          scope.set_position = function (position) {

            $('.bon_item').css('width', '');

            var _width = $('.bon_item').eq(0).width() || 0;

            _width = _width ? _width + 30 : 0;

            var _limits = {
              min: 1,
              max: 4
            };

            if (!_width) return;

            var _wrap_width = $('.bon_slide_cat_item_wrap').width();

            var _count_show = Math.floor(_wrap_width / _width) > _limits.max ? Math.floor(_wrap_width / _width) < _limits.min ? _limits.min : Math.floor(_wrap_width / _width) : Math.floor(_wrap_width / _width);

            if (!_count_show) return;

            _width = Math.floor(_wrap_width / _count_show);

            $('.bon_item').css('width', _width - 30);

            var _max = Math.ceil(scope.show_gifts.length - _count_show);

            var _current = scope.current_position;

            var _next = _current;

            if (position == 'left') {

              _next = _current - 1 < 0 ? 0 : _current - 1;

            } else if (position == 'right') {

              _next = _current + 1 > _max ? _max : _current + 1;

            }

            scope.show_right = true;
            scope.show_left = true;

            if(_next == _max) {
              scope.show_right = false;
            }

            if(_next == 0) {
              scope.show_left = false;
            }

            if(_count_show > scope.show_gifts.length) {
              scope.show_right = false;
            }

            scope.current_position = _next;

            scope.left = '-' + (_next * _width) + 'px';

          };

          scope.complete_gift_open = function(){

            if (scope.user().user_points.confirmed < scope.gift_more.points) {

              scope.close_gift();

              scope.complete_gift_close();

              $(element).find('.bns_overlay_gift_not_points').fadeIn();

              return;

            }

            $('.bns_overlay_gift_complete').fadeIn();
          };

          scope.complete_gift_close = function(){
            $('.bns_overlay_gift_complete').fadeOut();
          };

          $(window).resize(function () {

            scope.set_position();
            scope.$digest();

          });

          function sort_gift_by_category() {

            if (loaded != 2)return;

            $rootScope.$apply(function () {

              scope.gifts_by_category = {};

              loaded = 0;

              scope.gifts_by_category['0'] = scope.gifts();

              scope.set_category();

              scope.categories().forEach(function (category) {

                scope.gifts_by_category[category.id] = scope.gifts().filter(function (gift) {

                  return category.id == gift.category;

                });

                category.count = scope.gifts_by_category[category.id].length;

              });

            });

          }

          sp.on('gift.purchase.error', function (res) {

            $rootScope.$broadcast('notifier:notify', {

              header: 'Ошибка!',
              body: res.message || 'К сожалению, вы не получили подарок'

            });

            $rootScope.$apply();

          });


          scope.open_gift = function (gift) {

            if (scope.exist && scope.exist()) {

              var _access_tag = scope.exist().tags.filter(function (item) {
                return item.name == giftAccessTag
              })[0];

              if (_access_tag.exist) {

                scope.gift_more = gift || null;

                $(element).find('.bns_overlay_gift').fadeIn();

              } else {

                $timeout(function () {

                  $rootScope.$broadcast('notifier:notify', {

                    body: 'Получение подарков доступно только проверенным временем пользователям, через 30 дней с момента регистрации.'

                  });

                }, 100);

              }

            }


          };

          scope.close_gift = function () {

            $(element).find('.bns_overlay_gift').fadeOut();

          };

          scope.gift_purchase = function (gift) {

            scope.close_gift();

            scope.complete_gift_close();

            sp.send('gifts.purchase', {gift: gift});

          };

          sp.on('gifts.purchase.success', function (res) {

            var _header = 'Спасибо! Вы выбрали подарок!';
            var _body = (res.coupon_number ? 'Номер вашего купона: ' + res.coupon_number + '. ' : '') + 'С Вашего бонусного счета было списано ' + res.points_delta + ' ' + $filter('sailplay_pluralize')(res.points_delta, 'балл,балла,баллов') + '. Подробная информация по получению подарка направлена Вам на электронную почту.'

            $rootScope.$broadcast('notifier:notify', {

              header: _header,
              body: _body

            });

            scope.$apply(function () {

              sp_api.call('load.gifts.categories');
              sp_api.call('load.user.info', {all: 1});
              sp_api.call('load.gifts.list', {verbose: 1});
              sp_api.call('load.user.history');

            });

          });


        }

      };

    });

}());
