import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope', 'moment', 'SailPlay', 'SailPlayApi', '$interval'],
  controller: function ($rootScope, moment, SailPlay, SailPlayApi, $interval) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.currentTab = 1

      scope.default_avatar = DefaultAvatarImage;
      $rootScope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      });
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){

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
      $interval(()=>{
        scope.timerObject = getTimerDiff()
      } ,1000)

      scope.historyState = 'default'; // or purchase

      scope.isFirstTime = true;

      scope.purchaseHistory = function(id, date){
        SailPlayApi.call('purchases.info', {id}, (arg)=>{
        });
        scope.cartDate = date
      }

      scope.resetHistoryState = function(){
        scope.historyState = 'default'
      }

      SailPlay.on('purchases.info.success', (res)=>{
        console.info(res)
        if(res.status=='ok'){
          scope.cart = res.cart.cart
          scope.historyState = 'purchase'
          console.log(scope.cart)
        }
      })

    }

  }

};

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
