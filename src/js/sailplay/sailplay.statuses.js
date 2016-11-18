(function () {

  angular.module('sailplay.statuses', [])

    .directive('sailplayStatuses', function (SailPlayApi) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = SailPlayApi.data('load.user.info');

          scope.generateOffset = function (index, statuses) {
            return {
              left: ((100 / (statuses.length - 1)) * index) + '%'
            }
          };

          scope.getProgress = function (user_points, statuses) {

            if (!user_points || !statuses) return;

            var status_points = statuses.map(function (item) {
              return item.points
            });

            var points = user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;

            if (status_points[status_points.length - 1] && (points > status_points[status_points.length - 1])) {
              return {
                width: '100%'
              };
            }

            var multiplier = 100 / (status_points.length - 1);

            var state = 0;

            for (var i = 1, len = status_points.length; i < len; i++) {
              if (points >= status_points[i]) {
                state++;
              }
            }
            var current = 0;

            var total = status_points[0];

            if (state === 0) {
              return {
                width: '0%'
              };
            } else {
              current = (points - status_points[state]);
              total = status_points[state + 1] ? (status_points[state + 1] - status_points[state]) : status_points[state];
            }

            return {
              width: parseInt((current * 100 / total / 100 * 10) + (state * multiplier)) + '%'
            };

          };


        }

      };

    })


}());
