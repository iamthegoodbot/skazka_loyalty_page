(function () {

  angular.module('sailplay.history', [])

    /**
     * @ngdoc directive
     * @name sailplay.history.directive:sailplayHistory
     * @scope
     * @restrict A
     *
     * @description
     * Simple directive for rendering and operating with SailPlay user's history.
     *
     */
    .directive('sailplayHistory', function(SailPlayApi){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.history = SailPlayApi.data('load.user.history');

          scope.history_current_page = 0;

          scope.set_current_page = function(page){
            scope.history_current_page = page;
          };

        }

      };

    })

    .service('history_texts', function($rootScope){

      return $rootScope.locale.history_items;

    })

    .filter('history_item', function(history_texts) {

      return function(historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_texts.gift_purchase + ': ' + historyItem.name;
          case 'event':
            return historyItem.name || history_texts.custom_action;
          case 'extra':
            return historyItem.name || history_texts.custom_action;
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_texts.enter_group + historyItem.social_type;
              case 'purchase':
                return history_texts.share_purchase + historyItem.social_type;
              case 'partner_page':
                return history_texts.social_share + historyItem.social_type;
              case 'badge':
                return history_texts.share_badge + historyItem.social_type;
            }
        }
        return history_texts[historyItem.action];
      }
    });

}());
