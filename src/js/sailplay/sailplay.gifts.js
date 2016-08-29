(function () {

  angular.module('sailplay.gifts', [])

    /**
     * @ngdoc directive
     * @name sailplay.gifts.directive:sailplayGifts
     * @scope
     * @restrict A
     *
     * @description
     * Simple directive for rendering and operating with SailPlay gifts.
     *
     */
    .directive('sailplayGifts', function(SailPlay, SailPlayApi){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.gifts = SailPlayApi.data('load.gifts.list');

          scope.gift_purchase = function(gift){

            SailPlay.send('gifts.purchase', { gift: gift });

          };

        }

      };

    });

}());
