import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

function tryExtractJsonFromExtraName(nameField){
  // Some of extra actions has json in it's name field, and some doesn't
  let nameJson = ""
  let hasJson = true
  try {
    nameJson = JSON.parse(nameField)
    hasJson = nameJson.promo_name !== void 0
  } catch(e) {
    hasJson = false
  }
  return {
    hasJson,
    nameJson
  }
}

Widget.filter('get_bonus_name', function (MAGIC_CONFIG) {

  const dictonary = MAGIC_CONFIG.data.history_dictonary 

  return function (item) {

    if(item.action=="extra"){
      const parseResult = tryExtractJsonFromExtraName(item.name)
      if(parseResult.hasJson){
        const name = parseResult.nameJson.promo_name
        return name
      } else {
        return item.name
      }
    } else if (item.hasOwnProperty('social_type')){
      if(dictonary[item.social_type][item.social_action]){
        return dictonary[item.social_type][item.social_action]        
      } else {
        return dictonary.default_name
      }

    } else if (item.action=="purchase"){
      return item.order_num ? 'Purchase - ' + item.order_num : 'Purchase'
    } else {
      return item.name
    }
    
  }
})

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope', 'badgeProgress', 'SailPlay'],
  controller: function ($rootScope, badgeProgress, SailPlay) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.currentStatus = badgeProgress

      scope.show_login = false;

      scope.default_avatar = DefaultAvatarImage;
      $rootScope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      })
      $rootScope.$on('closeProfile', () => {
        scope.profile.show_fill_profile = false;
      })
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){

          scope.profile.show_fill_profile = state || false;

        }
      }

      scope.overview = {
        show: false,
        open: function() {
          scope.overview.show = true;
        },
        hide: function() {
          scope.overview.show = false;
        }
      }

      SailPlay.on('login.success', ()=>{
        scope.show_login = false;
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
