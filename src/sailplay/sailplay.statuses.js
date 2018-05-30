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
    offset_to(status){
      return status.sum - this.sum();
    }
    progress() {

      if(this.list.length < 1) return 0;

      let purchases_sum = this.sum();

      let last_status = angular.copy(this.list).sort((a, b) => {
        return b.sum - a.sum;
      })[0];

      // console.log(purchases_sum);
      // console.log(last_status);


      if (purchases_sum > last_status.sum) {
        return 100
      }

      let multiplier = 100 / (this.list.length - 1);

      let state = 0;

      for (let i = 1, len = this.list.length; i < len; i++) {

        if (purchases_sum >= this.list[i].sum) {
          state++;
        }
      }

      let current = 0;

      let total = last_status.sum;

      if (state === 0) {
        current = purchases_sum;
        total = this.list[state + 1].sum;
      } else {
        current = (purchases_sum - this.list[state].sum);
        total = this.list[state + 1] ? (this.list[state + 1].sum - this.list[state].sum) : this.list[state].sum;
      }

      return parseInt((current * 100 / total / (this.list.length - 1)) + (state * multiplier));

    }
  }

});

SailPlayStatuses.service('SailPlayStatuses', function (SailPlayStatusesLastMonth) {

  this.TYPES = {
    last_month: SailPlayStatusesLastMonth
  };

});

export default SailPlayStatuses.name;