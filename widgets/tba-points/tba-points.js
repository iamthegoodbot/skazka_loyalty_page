import { WidgetRegister } from '@core/widget';
import Template from './tba-points.html';
import './tba-points.less';

WidgetRegister({
  id: 'tba-points',
  template: Template,
  inject: ['SailPlayApi'],
  controller: function (SailPlayApi) {
    return (scope) => {

      SailPlayApi.observe('load.user.info', user => {
        scope.points = user.user_points.total;
      })

      SailPlayApi.observe('load.user.history', history => {
        let last_purchase;
        for (let item of history) {
          if (item.action == 'purchase') {
            last_purchase = item;
            break;
          }
        }

        var date1 = new Date(last_purchase.action_date);
        date1.setDate(date1.getDate() + (scope.widget.days_left || 690))
        var date2 = new Date();
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        scope.days_left = diffDays;
      })

      SailPlayApi.observe('load.gifts.list', gifts => {
        scope.status_gifts = gifts.slice(0, 4);
        process();
      })

      scope.can_obtain = function (gift_index) {
        return scope[`p${gift_index}_can_obtain`]
      }

      process = function (points) {
        function Mathan(_first_point, _last_point, index, multiplier) {
          let far = _last_point - _first_point + (index > 0 ? 14 : 0);
          let percent = scope.points / scope.status_gifts[index].points * 100;
          let progress = Math.floor(far * percent / 100);
          if (multiplier) progress += multiplier;
          if (progress < _first_point) scope.progress = _first_point;
          else scope.progress = Math.floor(far * percent / 100) + (multiplier || 0);
          scope.arrow_progress = scope.progress * 360 / 100;
        }

        if (points) scope.points = points

        const first_point = 5;
        const second_point = 20;
        const third_point = 71;
        const fourth_point = 87;

        if (scope.points < scope.status_gifts[0].points) {
          Mathan(first_point, second_point, 0)
          scope.points_to_go = scope.status_gifts[0].points - scope.points
        } else if (scope.points < scope.status_gifts[1].points) {
          scope.p1_can_obtain = true;
          Mathan(second_point, third_point, 1)
          scope.points_to_go = scope.status_gifts[1].points - scope.points
        } else if (scope.points < scope.status_gifts[2].points) {
          scope.p1_can_obtain = true;
          scope.p2_can_obtain = true;
          Mathan(third_point, fourth_point, 2, third_point - second_point)
          scope.points_to_go = scope.status_gifts[2].points - scope.points
        } else if (scope.points < scope.status_gifts[3].points) {
          scope.p1_can_obtain = true;
          scope.p2_can_obtain = true;
          scope.p3_can_obtain = true;
          Mathan(fourth_point, 100, 3, fourth_point - second_point + first_point)
          scope.points_to_go = scope.status_gifts[3].points - scope.points

        } else {
          scope.p1_can_obtain = true;
          scope.p2_can_obtain = true;
          scope.p3_can_obtain = true;
          scope.p4_can_obtain = true;
          scope.points_to_go = 0;
          scope.progress = 100;
          scope.arrow_progress = 0;
        }
      }
    };
  }
});