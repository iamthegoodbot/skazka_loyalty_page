import { WidgetRegister } from '@core/widget';
import ImageStatusesWidgetTemplate from './image-statuses.html';
import './image-statuses.less';

WidgetRegister({
  id: 'image-statuses',
  template: ImageStatusesWidgetTemplate,
  inject: [
    'MAGIC_CONFIG',
    'SailPlayApi'
  ],
  controller: function (MAGIC_CONFIG, SailPlayApi) {
    return function (scope) {

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = scope.widget.options.statuses || [];

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

      };

      scope.is_active_status = function (status) {
        let user = scope.user();
        if(!user) return false;
        return status.points <= user.user_points.confirmed + user.user_points.spent + user.user_points.spent_extra;
      };

      scope.get_status_image = (status) => {

        return scope.is_active_status(status) && status.image_active || status.image;

      };

      scope.getProgress = (points, statusList) => {

        let value = 0;

        if (!statusList || !statusList.length) return value;

        let _statusArray = statusList.map((item) => {
          return item.points
        });

        if (_statusArray[_statusArray.length - 1] <= points) return '100%';

        let step = (100 / _statusArray.length).toFixed(1);

        let state = 0;

        for (let i = 0, len = _statusArray.length; i < len; i++) {
          if (points < _statusArray[i]) {
            state = i;
            break;
          }
        }

        value = step * state;

        if (state != 0) {
          value += (points - _statusArray[state - 1]) * 100 / (_statusArray[state] - _statusArray[state - 1]) / _statusArray.length;
        } else {
          value += (points * 100 / _statusArray[state]) / _statusArray.length;
        }

        value = value > 100 ? 100 : value < 0 ? 0 : value;

        console.log('VALUE', value)
        return value + '%'

      };    

    }
  }
});
