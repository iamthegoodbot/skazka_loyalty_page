import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';


Widget.factory('isProfileFilled', ($rootScope, SailPlayApi, SailPlay) => {
  return window.setTimeout(()=>{
    SailPlayApi.call("tags.exist", { tags: ["Клиент заполнил профиль"] }, (obj)=>{
        console.info(obj)
        if(obj.tags[0].exist){
          $rootScope.$broadcast('isProfileFilled', true)
        } else {
          $rootScope.$broadcast('isProfileFilled', false)
        }
      }
    )
  }, 1000)

  /*
  $rootScope.$on('isProfileFilled', (event, isProfileFilled)=>{

  });
  */
})

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope', '$interval','isProfileFilled'],
  controller: function ($rootScope, $interval) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      // state default or phone
      scope.formState = 'default'

      scope.phoneMask = { '7': /7/,'9': /\d/, 'A': /[a-zA-Z]/, '*': /[a-zA-Z0-9]/ }

      scope.default_avatar = DefaultAvatarImage;
      scope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      })
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){

          scope.profile.show_fill_profile = state || false;

        }
      }

      scope.timer = void 0
      scope.timerEndCb = void 0
      scope.timerVal = 0
      scope.timerStart = (seconds, endCb) => {
        $interval.cancel(scope.timer)
        scope.timerVal = seconds
        scope.timerEndCb = endCb
        scope.timer = $interval(()=>{
          if(scope.timerVal < 0) {
            scope.timerEndCb & scope.timerEndCb()
            $interval.cancel(scope.timer)
          } else {
            scope.timerVal--
          }
        },1000)
        return scope.timer
      }

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
