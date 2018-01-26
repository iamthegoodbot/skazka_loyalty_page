import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope', 'moment', 'SailPlay', 'SailPlayApi', '$interval', '$interpolate', 'MAGIC_CONFIG'],
  controller: function ($rootScope, moment, SailPlay, SailPlayApi, $interval, $interpolate, MAGIC_CONFIG) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      const FILL_PROFILE_TAG = MAGIC_CONFIG.data.profile_update_tags.profile_general;

      scope.currentTab = 1
      scope.window = window;
      scope.confirmedPurchases = 0;
      scope.returnedPurchases = 0;

      scope.default_avatar = DefaultAvatarImage;
      $rootScope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      });
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function (state) {

          scope.profile.show_fill_profile = state || false;

        }
      };

      var timerEnd = scope.widget.timerEnd;

      function getTimerDiff() {
        var diff = moment(timerEnd).diff(moment(), 'milliseconds');
        var duration = moment.duration(diff);
        return {
          days: ("0" + parseInt(duration.asDays())).slice(-2),
          hours: ("0" + parseInt(duration.hours())).slice(-2),
          minutes: ("0" + parseInt(duration.minutes())).slice(-2),
          seconds: ("0" + parseInt(duration.seconds())).slice(-2)
        }
      }

      scope.timerObject = getTimerDiff()
      $interval(() => {
        scope.timerObject = getTimerDiff()
      }, 1000)

      scope.historyState = 'default'; // or purchase

      scope.isFirstTime = true;

      scope.purchaseHistory = function (id, date) {
        SailPlayApi.call('purchases.info', { id }, (arg) => {
        });
        scope.cartDate = date
      }

      scope.resetHistoryState = function () {
        scope.historyState = 'default'
      }

      SailPlay.on('purchases.info.success', (res) => {
        if (res.status == 'ok') {
          scope.cart = res.cart.cart
          scope.historyState = 'purchase'
        }
      })

      scope.getScorePopupText = () => {
        return $interpolate(scope.widget.texts.bottom_navbar.score_hover)(scope)
      }

      scope.getPercents = () => {
        if(!scope.confirmedPurchases && !scope.returnedPurchases) return 100
        if(!scope.confirmedPurchases && scope.returnedPurchases) return 0
        return parseInt(scope.confirmedPurchases / (scope.confirmedPurchases + scope.returnedPurchases) * 100)
      }

      scope.$on('mobile-navbar:click', function(e, data){
          scope.currentTab = data.tab || 1;
      });

      scope.onTabChange = tab => {
        $rootScope.$broadcast('tab:change', {
            tab
        })
      }

      scope.$watch(() => {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, (new_val, old_val) => {

        let user = SailPlayApi.data('load.user.info')();
        if (!user) return;

        if(user && user.purchases)
        scope.confirmedPurchases = user.purchases.count;

        SailPlay.send('tags.list',
          { user: { phone: user.user.phone }, params: { show_calculated_values: 1 } },
          (tags_res) => {
            scope.$apply(() => {
              if (tags_res.status === 'ok' && tags_res.tags.length) {
                // let confirmedPurchasesTag = tags_res.tags.filter(item => item.tag == scope.widget.options.confirmedPurchasesTag)[0];
                // if (confirmedPurchasesTag) scope.confirmedPurchases = confirmedPurchasesTag.calculated_value
                let returnedPurchaseTag = tags_res.tags.filter(item => item.tag == scope.widget.options.returnedPurchaseTag)[0];
                if (returnedPurchaseTag) scope.returnedPurchases = returnedPurchaseTag.calculated_value
                if(tags_res.tags.filter(item => item.tag == FILL_PROFILE_TAG)[0]) {
                  scope.isFirstTime = false;
                }
              }
            });
          });

      });

    }

  }

};

Widget.filter('activeItems', () => {
  return (items) => items.filter(item=>item.value).length
})

Widget.config(function (MagicWidgetProvider) {

  MagicWidgetProvider.register(ProfileWidget);

});

Widget.run(function ($templateCache) {
  $templateCache.put('profile.history_pagination', HistoryPaginationTemplate);
});

// .directive('sailplayMagicProfile', function(MAGIC_CONFIG){
//
//   return {
//
//     restrict: "E",
//     replace: true,
//     scope: {
//       _config: '=?config'
//     },
//     templateUrl: '/html/core/widgets/profile.html',
//     link: function(scope, elm, attrs){
//
//       scope._tools = MAGIC_CONFIG.tools;
//
//       scope.show_history = false;
//
//       scope.show_fill_profile = false;
//
//       scope.fill_profile = function(state){
//
//         scope.show_fill_profile = state || false;
//
//       };
//
//     }
//
//   };
//
// });
