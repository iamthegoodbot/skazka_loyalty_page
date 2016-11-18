(function () {

  angular.module('widgets.statuses', [])

    .directive('sailplayMagicStatuses', function(MAGIC_CONFIG){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/statuses.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope._statuses = MAGIC_CONFIG.data.statuses;

        }

      };

    });

}());
