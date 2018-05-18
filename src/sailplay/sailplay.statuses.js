import angular from 'angular';

export let SailPlayStatuses = angular.module('sailplay.statuses', []);

SailPlayStatuses.service('SailPlayStatusesLastMonth', function (SailPlayApi) {

  return class SailPlayStatusesLastMonth {
    constructor(config) {

      this.user = SailPlayApi.data('load.user.info');

      this.history = SailPlayApi.data('load.user.history');

      this.list = config.list || [];

    }
    current() {
      if(!this.list) return;
      let sum =  this.sum();
      const current_statuses = this.list.filter(x=>x.sum<=sum);

      // console.log(current_statuses);
      // this.current = current_statuses.pop();
      return current_statuses[current_statuses.length - 1];
    }
    next() {

      if(!this.list) return;

      let user = this.user();

      if(!user) {
        return {
          status: this.list[0],
          offset: this.list[0].sum
        };
      }

      let sum =  this.sum();

      let future_statuses = this.list.sort((a, b) => {
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
      let now = new Date();

      let purchases = history.filter(item => {
        let purchase_date = new Date(item.action_date);
        // console.log(purchase_date.getFullYear(), now.getFullYear(), purchase_date.getMonth(), now.getMonth());
        return item.action === 'purchase' && purchase_date.getFullYear() === now.getFullYear() && purchase_date.getMonth() === now.getMonth();
      });

      // console.log(purchases);

      let sum = purchases.reduce((prev, next)=> {
        return prev+next.price
      }, 0);

      // console.log(sum);

      return sum

    }
    offset(index) {
      return ((100 / (this.list.length - 1)) * index);
    }
    progress() {

      if(!this.user() || this.list.length < 1) return;

      let user_points = this.user().user_points;

      let status_points = this.list.map(function (item) {
        return item.sum
      });

      if(status_points[0] !== 0) {
        return 0
      }

      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      let points;

      if (isNumeric(user_points)) points = user_points;

      else points = user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;

      if (status_points[status_points.length - 1] && (points > status_points[status_points.length - 1])) {
        return 100
      }

      let multiplier = 100 / (status_points.length - 1);

      let state = 0;

      for (let i = 1, len = status_points.length; i < len; i++) {
        if (points >= status_points[i]) {
          state++;
        }
      }

      let current = 0;

      let total = status_points[0];

      if (state === 0) {
        current = points;
        total = status_points[state + 1];
      } else {
        current = (points - status_points[state]);
        total = status_points[state + 1] ? (status_points[state + 1] - status_points[state]) : status_points[state];
      }

      return parseInt((current * 100 / total / (status_points.length - 1)) + (state * multiplier));

    }
  }

});

SailPlayStatuses.service('SailPlayStatuses', function (SailPlayStatusesLastMonth) {

  this.TYPES = {
    last_month: SailPlayStatusesLastMonth
  };

});

export default SailPlayStatuses.name;