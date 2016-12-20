(function () {

  angular.module('widgets.leaderboard', [])

    .directive('sailplayMagicLeaderboard', function(MAGIC_CONFIG, SailPlayApi){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/leaderboard.html',
        link: function(scope, elm, attrs){

          scope.data = SailPlayApi.data('leaderboard.load');

        }

      };

    });

}());
