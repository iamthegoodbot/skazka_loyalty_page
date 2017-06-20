import {Widget, WidgetRegister} from '@core/widget';
import HcProfileWidgetTemplate from './hc_profile.html';
import HcHistoryPaginationTemplate from './history_pagination.html';
import './hc_profile.less';

WidgetRegister({
  id: 'hc_profile',
  template: HcProfileWidgetTemplate,
  inject: [
    'SailPlayApi',
    '$timeout'
  ],
  controller: (SailPlayApi, $timeout) => {
    return (scope, elm, attrs) => {

      scope.status_list = [];

      let status_list = angular.copy(scope.widget.options.status).sort((a, b) => a.points - b.points);

      let tags = status_list.map(status => status.tag);

      scope.getValue = field => {
        return field.data.filter(item => item.value == field.value)[0]
      };

      scope.checkStatus = () => {
        SailPlayApi.call('tags.exist', {tags: tags}, res => {
          scope.$apply(() => {
            if (res && res.tags) {

              scope.status_list = status_list.map(status => {
                let current_status = status;
                if (res.tags.filter(tag => tag.name == current_status.tag && tag.exist)[0]) {
                  current_status.received = true;
                } else {
                  current_status.received = false;
                }
                return current_status;
              });

            }
          });
        });
      };

      scope.getCurrentStatus = status_list => {
        let list = status_list.filter(status => status.received);
        return list.length ? list[list.length - 1] : null;
      };

      scope.getStatus = status => {
        status.received = true;
        SailPlayApi.call('tags.add', {tags: [status.tag]}, res => {
          scope.$apply(() => {
            if (res && res.status == 'ok') {
              $timeout(() => {
                SailPlayApi.call('load.user.info', {all: 1, purchases: 1}, () => {
                  scope.checkStatus();
                });
              }, 1000);
            }
          });
        });
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
          value += (points - _statusArray[state - 1]) * 100 / (_statusArray[state] - _statusArray[state - 1]) / (_statusArray.length + 1);
        } else {
          value += (points * 100 / _statusArray[state]) / (_statusArray.length + 1);
        }

        value = value > 100 ? 100 : value < 0 ? 0 : value;

        return value + '%'

      };

      scope.$watch(() => {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, (new_val, old_val) => {
        if (new_val) {
          scope.checkStatus();
        }
      });

    };
  }

});


Widget.run(function ($templateCache) {
  $templateCache.put('hc_profile.history_pagination', HcHistoryPaginationTemplate);
});
