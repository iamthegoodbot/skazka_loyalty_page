(function () {

  angular.module('magic.profile', [])

    .directive('sailplayMagicProfile', function(){

      return {

        restrict: "E",
        replace: true,
        scope: true,
        templateUrl: '/html/profile/profile.html',
        link: function(scope, elm, attrs){

        }

      };

    });

}());
