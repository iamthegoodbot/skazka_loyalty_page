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

      scope.purchase_sum = MAGIC_CONFIG.data.purchase_sum;

      scope.ready = false;
      scope.currentTab = 1
      scope.window = window;
      scope.confirmedPurchases = 0;
      scope.returnedPurchases = 0;
      scope.returnedPurchasesSum = 0;
      scope.originPurchaseSum = 0;
      scope.user = SailPlayApi.data('load.user.info');
      scope.isUpdated = false;
      scope.newChildren = [];

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
          days: ("" + parseInt("0" + duration.asDays())).slice(-3),
          hours: ("" + parseInt("0" + duration.hours())).slice(-2),
          minutes: ("" + parseInt("0" + duration.minutes())).slice(-2),
          seconds: ("" + parseInt("0" + duration.seconds())).slice(-2)
        }
      }

      scope.timerObject = getTimerDiff()
      $interval(() => {
        scope.timerObject = getTimerDiff()
      }, 1000)

      scope.historyState = 'default'; // or purchase

      $rootScope.isFirstTime = true;

      scope.purchaseHistory = function (id, date) {
        SailPlayApi.call('purchases.info', { id }, (arg) => {
        });
        scope.cartDate = date
      }

      scope.getHistory = (history) => {
        if(!history) return [];
        return history.filter(item=>item.action=='purchase')
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
      
      scope.addChild = (list, el) => {
        if(el && el[0] && el[1] && el[2]) {
          list.push({birth_date:el})
          scope.newChildren = [];
        }
      }

      scope.getPurchaseOffset = () => {
        return scope.purchase_sum - scope.originPurchaseSum
      }

      scope.getTimerPopupText = () => {
        if(scope.user().purchases.sum >= scope.purchase_sum) {
          return $interpolate(scope.widget.texts.timer.final_hover)(scope)  
        } else {
          return $interpolate(scope.widget.texts.timer.hover)(scope)
        }
      }

      scope.getScorePopupText = () => {
        return $interpolate(scope.widget.texts.bottom_navbar.score_hover)(scope)
      }

      scope.getPercentPopupText = () => {
        if(scope.user().purchases.sum >= scope.purchase_sum) {
          return $interpolate(scope.widget.texts.bottom_navbar.final_percent_hover)(scope)  
        } else {
          return $interpolate(scope.widget.texts.bottom_navbar.percent_hover)(scope)
        }
      }

      scope.getFirstTimeMenuPopupText = () => {
        return $interpolate(scope.widget.texts.bottom_navbar.first_time)(scope)
      }  

      scope.getPercents = (user) => {
        if(!user || !user.purchases) return 0;
        let percents = parseInt(scope.originPurchaseSum / scope.purchase_sum * 100);
        return percents > 100 ? 100 : (percents < 0 ? 0 : percents)
      }

      scope.$on('mobile-navbar:click', function(e, data){
          scope.currentTab = data.tab || 1;
      });

      scope.$on('profile:updated', function() {
        scope.isUpdated = true;
        setTimeout(()=>{
          scope.isUpdated = false;
          scope.$digest();
        }, 2000)
      })

      scope.onTabChange = tab => {
        $rootScope.$broadcast('tab:change', {
            tab
        })
      }

      scope.goTab = tab => {
        if($rootScope.isFirstTime){
          tab = 2;
        }
        if(!scope.user()) {
          tab = 1;
        }
        scope.currentTab = tab
        window.scroll(0, 0)
        scope.onTabChange(tab)
      }

      scope.focusInput = item => {
        if(item.variable && item.value) {
          setTimeout(() => {
            let el = document.getElementById(`id_${item.variable}`);
            el && el.focus();
          }, 100)
        }
      }

      scope.$on('isProfileFilled', function(e, state){
        if(state) {
          $rootScope.isFirstTime = false;
        }
      })

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

              if(scope.widget.options.returnedPurchaseVar) {
                SailPlay.send('vars.batch',
                {names: [scope.widget.options.returnedPurchaseVar]},
                (vars_res) => {
                  scope.$apply(() => {
                    if (vars_res.status === 'ok' && vars_res.vars && vars_res.vars[0]) {
                      let returnedPurchaseVar = vars_res.vars.filter(item => item.name == scope.widget.options.returnedPurchaseVar)[0];
                      if (returnedPurchaseVar) {
                        let returned = JSON.parse(returnedPurchaseVar.value || '{}')
                        let return_sum = 0;
                        let return_count = 0;
                        angular.forEach(returned, item => {
                          return_count++;
                          return_sum += parseInt(item.price || 0)
                        })
                        scope.returnedPurchases = return_count;
                        scope.returnedPurchasesSum = return_sum;
                        scope.originPurchaseSum = user.purchases.sum - scope.returnedPurchasesSum;
                        scope.originPurchaseSum = scope.originPurchaseSum < 0 ? 0 : scope.originPurchaseSum;
                      }
                    }
                  });
                });
              }  else if(scope.widget.options.returnedPurchaseTag) {
                let returnedPurchaseTag = tags_res.tags.filter(item => item.tag == scope.widget.options.returnedPurchaseTag)[0];
                if (returnedPurchaseTag) scope.returnedPurchases = returnedPurchaseTag.calculated_value
              }

              if(tags_res.tags.filter(item => item.tag == FILL_PROFILE_TAG)[0]) {
                $rootScope.isFirstTime = false;
              }
              if($rootScope.isFirstTime) {
                scope.currentTab = 2;
                $rootScope.$broadcast('tab:change', {tab: 2})
              }
              scope.ready = true;
            } else {
              scope.ready = true;
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
