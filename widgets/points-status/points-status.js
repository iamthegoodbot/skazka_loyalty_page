import {Widget} from '@core/widget';
import PointsStatusTemplate from './points-status.html';
import HistoryPaginationTemplate from './history_pagination.html';
import './points-status.less';

const PointsStatus = {

  id: 'points-status',
  template: PointsStatusTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // History popup
      scope.history = false;

      /**
       * Calculating progress
       */
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

    };

  }

};

Widget.config((MagicWidgetProvider) => {
  MagicWidgetProvider.register(PointsStatus);
});

Widget.run(($templateCache) => {
  $templateCache.put('points_status.history_pagination', HistoryPaginationTemplate);
});