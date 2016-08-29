(function () {

  angular.module('sp.history', [])


    .directive('sailplayHistory', function (sp_api) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');
          scope.history = sp_api.data('load.user.history');

          scope.history_current_page = 0;

          scope.set_current_page = function (page) {
            scope.history_current_page = page;
          };

        }

      };

    })

    .constant('history_texts', {
      "purchase": "Покупка",
      "gift_purchase": "Подарок",
      "badge": "Бейджик",
      "registration": "Регистрация",
      "referral": "Регистрация друга",
      "referred": "Регистрация по приглашению",
      "referred_purchase": "Покупка приглашенного пользователя",
      "promocode": "За ввод промокода",
      "enter_group": "Вступление в группу ",
      "share_purchase": "Рассказ о покупке в ",
      "social_share": "Рассказ в ",
      "share_badge": "Рассказ о бейджике в ",
      "earn_badge": 'Получен бейджик ',
      "custom_action": "Экстра"
    })

    .filter('history_item', function (history_texts) {

      return function (historyItem) {
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
