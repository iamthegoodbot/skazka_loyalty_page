(function () {

  angular.module('sp.profile', [])

    .directive('sailplayProfile', function (sp_api, sp) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');
          scope.gifts = sp_api.data('load.gifts.list');
          scope.limits = [];

          function update() {

            var _gifts = angular.copy(scope.gifts());

            scope.limits = _gifts.filter(function(item){
              return item.category;
            }).map(function (item) {
              return item.points;
            }).reduce(function (a, b) {
              if (a.indexOf(b) < 0)a.push(b);
              return a;
            }, []).sort(function (a, b) {
              return a - b;
            });

          }

          scope.open_profile = function(){
            $('.mb_popup').hide();
            if($('.mb_item_prof').length) {
              $('.mb_item_prof').addClass('act');
            }
            $('.mb_popup_prof').slideDown(function () {
              $("html, body").animate({scrollTop: $(document).height()}, 300);
            });
          };

          scope.progressGiftWidth = function (index, total) {
            return (100 / total) * (index + 1)
          };

          scope.setProgress = function (points) {

            var len = scope.limits.length;

            if (!len || !points) return 0;

            var _progress = 0;

            var step = 100 / len;

            for (var i = 0; i < len; i++) {

              if (points > scope.limits[i]) {

                _progress += step;

              } else {

                _progress += ( scope.limits[i - 1] ? ( (points - scope.limits[i - 1]) * 100 ) / ( scope.limits[i] - scope.limits[i - 1] ) : points * 100 / scope.limits[i] ) / len;

                break;

              }

            }

            return _progress > 100 ? 100 : _progress < 0 ? 0 : _progress;

          };

          scope.getOffsetToGift = function (points) {

            if (!scope.limits.length || (!points && points != 0)) return 0;

            var next = scope.limits.filter(function (item) {
                return points < item;
              })[0] || 0;

            return next ? next - points : next;

          };

          sp.on('load.gifts.list.success', function () {

            update();

          });

        }

      };

    });

}());
