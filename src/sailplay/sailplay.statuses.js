import angular from 'angular';
import moment from 'moment';


export let SailPlayStatuses = angular.module('sailplay.statuses', []);

SailPlayStatuses.service('SailPlayStatusesLastMonth', function (SailPlayApi) {

  return class SailPlayStatusesLastMonth {
    constructor(config) {

      this.user = SailPlayApi.data('load.user.info');

      this.history = SailPlayApi.data('load.user.history');

      this.statuses = config.statuses || [];

    }
    next_status() {

      if(!this.statuses) return;

      let user = this.user();

      if(!user) {
        return {
          status: this.statuses[0],
          offset: this.statuses[0].sum
        };
      }

      let sum =  this.sum();

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
    sum() {
      let history = this.history();
      if(!history || !history.length) return 0;
      let now = new Date().getTime();
      let purchases = history.filter(item => {
        return item.action=='purchase'&&moment(item.action_date).isSameOrAfter(now, 'month')
      })
      let sum = purchases.reduce((prev, next)=> {
        return prev+next.price
      }, 0);
      return sum

    }
  };

});

SailPlayStatuses.service('SailPlayStatuses', function () {


});

export default SailPlayStatuses.name;