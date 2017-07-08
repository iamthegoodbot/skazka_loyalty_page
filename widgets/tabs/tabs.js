import { Widget } from '@core/widget';
import WidgetTabsTemplate from './tabs.html'
import './tabs.less';

const TabsWidget = {

  id: 'tabs',
  template: WidgetTabsTemplate,
  inject: ['$rootScope', 'SailPlayApi'],
  controller: function ($rootScope, SailPlayApi) {
    return function (scope, elm, attrs) {

      scope.active_tab = scope.widget.options.widgets[0].id;

    }
  }

};

Widget.config(function (MagicWidgetProvider) {
  MagicWidgetProvider.register(TabsWidget);
});
