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

        }

      };

    })

    .directive('sailplayMagicBadgeLine', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          line: '='
        },
        templateUrl: '/html/core/widgets/badges.line.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

        }

      };

    });

}());
