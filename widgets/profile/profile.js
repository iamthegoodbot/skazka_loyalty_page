import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$timeout',
    'MAGIC_CONFIG'
  ],
  controller: function (SailPlay, SailPlayApi, $timeout, MAGIC_CONFIG) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.default_avatar = DefaultAvatarImage;

      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){

          scope.profile.show_fill_profile = state || false;

        }
      };

      scope.share_action_id = MAGIC_CONFIG.data.share_custom_action_id

      console.log(scope.share_action_id)

      scope.openShareAction = ()=>{
        const actionId = scope.share_action_id
        scope.$emit('openShareAction', actionId)
      }

      scope.isShareActionAvaliable = false

      SailPlayApi.on('load.actions.custom.list.success', (data)=>{
        const actionId = scope.share_action_id
        const shareAction = data
          .find(x=>x.id==actionId)
        if(shareAction){
          scope.isShareActionAvaliable = shareAction.is_available_for_user
        } else {
          scope.isShareActionAvaliable = false
        }
        scope.$apply()
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
