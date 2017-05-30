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
      scope.purchase_status = MAGIC_CONFIG.data.purchase_status;
      scope.show_statuses = false;
      scope.getStatusName = function(index) {
        return scope._statuses[index].status
      }
      scope.getStatusDescription = function(index) {
        return scope._statuses[index].description
      }

      scope.getProgress = (points, statusList) => {
        let value = points;
        let maxPoints = 0;
        
        if (!statusList || !statusList.length) return value;

        let _statusArray = statusList.map((item) => {
          maxPoints += item.points;
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

        // percent
        value = value / maxPoints * 100;
        return {
          width: value + '%'
        }

      };

      scope.generateOffset = function (index, statuses) {
        return {
          left: ((100 / (statuses.length - 1)) * index) + '%'
        }
      };

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
        if (MAGIC_CONFIG.data.purchase_status) {
          points = user.purchases && user.purchases.sum || 0;
          user_points = user.purchases && user.purchases.sum || 0
        }

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
