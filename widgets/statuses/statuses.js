import { WidgetRegister } from '@core/widget';
import StatusesWidgetTemplate from './statuses.html';
import './statuses.less';

WidgetRegister({
  id: 'statuses',
  template: StatusesWidgetTemplate,
  inject: [
    'MAGIC_CONFIG',
    'SailPlayApi'
  ],
  controller: function (MAGIC_CONFIG, SailPlayApi) {
    return function (scope) {

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = MAGIC_CONFIG.data.statuses;

      scope.user = SailPlayApi.data('load.user.info');

      scope.get_next_status = function () {

        if(!scope._statuses) return;

        let user = scope.user();

        if(!user) {
          return {
            status: scope._statuses[0],
            offset: scope._statuses[0].points
          };
        }

        let user_points = user.user_points;
        let points =  user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;

        let future_statuses = scope._statuses.sort((a, b) => {
          return a.points > b.points;
        }).filter((status) => {
          return status.points > points;
        });

        return {
          status: future_statuses[0],
          offset: future_statuses[0] && future_statuses[0].points - points || 0
        };

      }

    }
  }
});
