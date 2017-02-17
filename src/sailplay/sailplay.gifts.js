import angular from 'angular';

export let SailPlayGifts = angular.module('sailplay.gifts', [])

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
.directive('sailplayGifts', function(SailPlay, SailPlayApi, $q){

  return {

    restrict: 'A',
    replace: false,
    scope: true,
    link: function(scope){

      scope.gifts = SailPlayApi.data('load.gifts.list');

      let user = SailPlayApi.data('load.user.info');

      scope.user = user;
      scope.gift_purchase = function(gift){

        SailPlay.send('gifts.purchase', { gift: gift });

      };

      scope.gift_affordable = function(gift){

        return user() && user().user_points.confirmed >= gift.points;

      };

      scope.$watch(function(){
        return angular.toJson([ scope.gifts(), user() ]);
      },async function(){

        scope.progress = await build_progress(scope.gifts(), user());
        scope.$digest();

      });

      scope.progress = false;

      function build_progress(gifts, user){

        return $q(function (resolve, reject) {

          if(!gifts || gifts.length < 1) {
            scope.progress = false;
            return;
          }

          let target = Math.max.apply(Math,gifts.map(function(o){return o.points;}));

          let progress_value = user && user.user_points.confirmed/(target/100) || 0;

          let progress = {
            items: [],
            plenum: progress_value <= 100 ? progress_value : 100,
            next: {
              item: false,
              offset: 0
            }
          };

          let ProgressItem = function(){

            this.gifts = [];

            this.left = 0;

            this.reached = false;

            this.get_left = function(){

              return this.left + '%';

            }

          };

          gifts.sort(function(a,b){ return a.points > b.points; }).reduce(function(prev_gift, current_gift){

            let item;

            if(!prev_gift) {

              item = new ProgressItem();

              item.gifts.push(current_gift);

              progress.items.push(item);

            }
            else {

              if(Math.abs(prev_gift.points - current_gift.points) < target*0.02){
                item = progress.items[progress.length-1];
                item && item.gifts.push(current_gift);
              }
              else {
                item = new ProgressItem();
                item.gifts.push(current_gift);
                progress.items.push(item);
              }

            }

            item.left = parseInt(current_gift.points)/(parseInt(target)/100);
            item.reached = user && current_gift.points <= user.user_points.confirmed;

            if(user && !item.reached && !progress.next.item){

              progress.next.item = current_gift;
              progress.next.offset = parseInt(current_gift.points) - parseInt(user.user_points.confirmed);

            }


          }, 0);

          resolve(progress);

        });



      }


    }

  };

});

export default SailPlayGifts.name;