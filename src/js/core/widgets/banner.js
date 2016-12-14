(function () {

  angular.module('widgets.banner', [])

    .directive('sailplayMagicBanner', function(MAGIC_CONFIG, SailPlayApi){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/banner.html',
        link: function(scope, elm, attrs){

        }

      };

    });

}());
