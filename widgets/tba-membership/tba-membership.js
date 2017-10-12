import { WidgetRegister } from '@core/widget';
import TbaMembershipWidgetTemplate from './tba-membership.html';
import './tba-membership.less';

WidgetRegister({
  id: 'tba-membership',
  template: TbaMembershipWidgetTemplate,
  inject: [
    'SailPlayApi',
    'MAGIC_CONFIG'
  ],
  controller: function (SailPlayApi, MAGIC_CONFIG) {
    return (scope) => {
      scope.statuses = MAGIC_CONFIG.data.statuses;

      SailPlayApi.observe('load.user.info', user => {
        scope.purchases_sum = user.purchases.sum;
      })

      scope.need_to_silver = scope.statuses[1].points;
      scope.need_to_gold = scope.statuses[2].points;      

      scope.get_status_progress = function (points) {
        if (scope.purchases_sum == undefined)
          return

        const first_point = 10;
        const second_point = 40;
        const third_point = 100;

        if (points)
          scope.purchases_sum = points

        if (scope.purchases_sum < scope.statuses[1].points) { // 1500
          let far = second_point - first_point;
          let percent = scope.purchases_sum / scope.statuses[1].points * 100;

          return `${(far * percent / 100) + 10}%`
        } else if (scope.purchases_sum >= scope.statuses[2].points) {
          scope.second_active = true;
          scope.third_active = true;          
          return `100%`
        } else {
            scope.second_active = true;
            let far = third_point - second_point;
            let percent = scope.purchases_sum / scope.statuses[2].points * 100;

          return `${(far * percent / 100) + first_point + 8}%`
        }
      }
    };
  }
});