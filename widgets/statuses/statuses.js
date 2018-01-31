import { WidgetRegister, Widget } from '@core/widget';
import StatusesWidgetTemplate from './statuses.html';
import './statuses.less';
import moment from 'moment';

Widget.factory('badgeProgress', (MAGIC_CONFIG, SailPlayApi) => {
  const obj = {
    _tools: MAGIC_CONFIG.tools,
    _statuses: MAGIC_CONFIG.data.statuses
  }


  const _user = SailPlayApi.data('load.user.info');
  const _history = SailPlayApi.data('load.user.history');

  obj.get_next_status = function () {

    if(!obj._statuses) return;

    let user = _user();

    if(!user) {
      return {
        status: obj._statuses[0],
        offset: obj._statuses[0].sum
      };
    }

    let sum =  obj.getSum();
    
    let future_statuses = obj._statuses.sort((a, b) => {
      return a.sum > b.sum;
    }).filter((status) => {
      return status.sum > sum;
    });

    return {
      status: future_statuses[0],
      offset: future_statuses[0] && future_statuses[0].sum - sum || 0
    };

  }

  obj.getCurrentStatus = () => {
    if(!obj._statuses) return;
    let user = _user();
    let sum =  obj.getSum();
    const current_statuses = obj._statuses.filter(x=>x.sum<=sum)
    obj.current_status = current_statuses.pop();
    return obj.current_status
  }

  obj.getSum = () => {
    let history = _history();
    if(!history || !history.length) return 0;
    let now = moment();
    let purchases = history.filter(item => {
      return item.action=='purchase'&&moment(item.action_date).isSameOrAfter(now, 'month')
    })
    let sum = purchases.reduce((prev, next)=> {
      return prev+next.price
    }, 0);
    return sum

  }

  return obj
})


WidgetRegister({
  id: 'statuses',
  template: StatusesWidgetTemplate,
  inject: [
    'MAGIC_CONFIG',
    'SailPlayApi',
    'badgeProgress'
  ],
  controller: function (MAGIC_CONFIG, SailPlayApi, badgeProgress) {
    return function (scope) {

      scope.user = SailPlayApi.data('load.user.info');
      scope.history = SailPlayApi.data('load.user.history');

      scope.purchase_status = MAGIC_CONFIG.data.purchase_status;
      scope.sum = badgeProgress.getSum();

      scope.get_next_status = badgeProgress.get_next_status
      scope.getCurrentStatus = badgeProgress.getCurrentStatus
      scope._statuses = badgeProgress._statuses

      scope.$watch(()=> {
        return angular.toJson([scope.history()])
      }, ()=> {
        scope.sum = badgeProgress.getSum();
      })

      scope.badgeProgress = badgeProgress

    }
  }
});
