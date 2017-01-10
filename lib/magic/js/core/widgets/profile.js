(function () {

  angular.module('widgets.profile', [])

    .directive('sailplayMagicProfile', function(MAGIC_CONFIG){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/profile.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.show_history = false;

          scope.show_fill_profile = false;

          scope.fill_profile = function(state){

            scope.show_fill_profile = state || false;

          };

        }

      };

    });

}());
