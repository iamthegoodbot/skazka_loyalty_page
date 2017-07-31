import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

Widget.filter('profileFields', function () {
  return (fields, groupFields)=>{
    return fields.filter((field)=>groupFields
        .some((x)=>x==field.name))
  }
})

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope'],
  controller: function ($rootScope) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.default_avatar = DefaultAvatarImage;
      $rootScope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      })
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){

          scope.profile.show_fill_profile = state || false;

        }
      };

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
