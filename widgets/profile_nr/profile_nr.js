import { Widget } from '@core/widget';
import WidgetProfileNrTemplate from './profile_nr.html'
import HistoryNrPaginationTemplate from './history_pagination.html';
import './profile_nr.less';

const ProfileNrWidget = {

  id: 'profile_nr',
  template: WidgetProfileNrTemplate,
  inject: ['$rootScope', 'SailPlayApi'],
  controller: function ($rootScope, SailPlayApi) {
    return function (scope, elm, attrs) {

      scope.$on('open_profile_modal', () => {
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
  MagicWidgetProvider.register(ProfileNrWidget);
});

Widget.run(function ($templateCache) {
  $templateCache.put('profile_nr.history_pagination', HistoryNrPaginationTemplate);
});