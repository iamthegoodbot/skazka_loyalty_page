(function () {

  angular.module('widgets.badges', [])

    .directive('sailplayMagicBadges', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/badges.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

        }

      };

    })

    .directive('sailplayMagicBadge', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          badge: '='
        },
        templateUrl: '/html/core/widgets/badges.badge.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.on_click = function () {
            attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
          }

        }

      };

    })

    .directive('sailplayMagicBadgeLine', function(MAGIC_CONFIG, SailPlayShare, $window){

      return {

        restrict: "E",
        replace: true,
        scope: {
          line: '=',
          _config: '=config'
        },
        templateUrl: '/html/core/widgets/badges.line.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.badge_selected = false;

          scope.badge_select = function (badge) {
            scope.badge_selected = badge || false;
          };

          scope.badge_share = function (network, badge) {
            SailPlayShare(network, scope._config.texts.share_url || $window.location.href, badge.name, badge.descr, badge.thumbs.url_250x250);
          };

        }

      };

    });

}());
