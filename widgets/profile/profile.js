import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

const ProfileWidget = {

    id: 'profile',
    template: WidgetProfileTemplate,
    inject: ['SailPlay', '$rootScope'],
    controller: function(SailPlay, $rootScope) {

        return function(scope, elm, attrs) {

            // scope._tools = MAGIC_CONFIG.tools;

            scope.default_avatar = DefaultAvatarImage;
            $rootScope.$on('openProfile', () => {
                scope.profile.show_fill_profile = true;
            })
            scope.profile = {
                history: false,
                show_fill_profile: false,
                promocodes: false,
                fill_profile: function(state) {

                    scope.profile.show_fill_profile = state || false;

                }
            };

            scope.promocodes_status = []
            scope.show_promocodes = true

            SailPlay.on('vars.batch.success', function(res) {
                let parsed = res.vars
                parsed = parsed.find(function(item) { return item.name == 'promocodes_status' })
                if (parsed) {
                    parsed = parsed.value.replaceAll("NaN", "-1")
                    parsed = JSON.parse(parsed)
                    for (let i in parsed) {
                        if (parsed[i][1] == -1) {
                            parsed[i][1] = "Not used"
                        } else if (i[2] != -1) {
                            parsed[i][1] = "Used on " + parsed[i][2]
                        } else {
                            parsed[i][1] = "Used"
                        }
                    }
                    scope.promocodes_status = parsed
                }

                if (res.vars.find(function(item) { return item.name == 'show_promocodes' }))
                    scope.show_promocodes = true
            });

        }

    }

};

Widget.config(function(MagicWidgetProvider) {

    MagicWidgetProvider.register(ProfileWidget);

});

Widget.run(function($templateCache) {
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