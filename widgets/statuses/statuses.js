import { WidgetRegister } from '@core/widget';
import StatusesWidgetTemplate from './statuses.html';
import './statuses.less';

WidgetRegister({
  id: 'statuses',
  template: StatusesWidgetTemplate,
  inject: ['MAGIC_CONFIG'],
  controller: function (MAGIC_CONFIG) {
    return function (scope) {

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = MAGIC_CONFIG.data.statuses;

    }
  }
});
