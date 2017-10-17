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

      SailPlayApi.observe('load.gifts.list', gifts => {
        scope.status_gifts = gifts.slice(0, 4);
        process(1999); 
      })

      scope.can_obtain = function(gift_index) {
        return scope[`p${gift_index}_can_obtain`]
      }

      process = function (points) {
        function Mathan(_first_point, _last_point, index, multiplier) {
          let far = _last_point - _first_point + 14; 
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
        } else if (scope.points < scope.status_gifts[1].points) {
          scope.p1_can_obtain = true;
          Mathan(second_point, third_point, 1)          
        } else if (scope.points < scope.status_gifts[2].points) {
          scope.p1_can_obtain = true;
          scope.p2_can_obtain = true;
          Mathan(third_point, fourth_point, 2, third_point - second_point)                      
        } else {
          scope.p1_can_obtain = true;
          scope.p2_can_obtain = true;
          scope.p3_can_obtain = true;
          Mathan(fourth_point, 100, 3, fourth_point - second_point + first_point)
        }
      }
    };
  }
});