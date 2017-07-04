import {Widget} from '@core/widget';
import PointsStatusTemplate from './points-status.html';
import HistoryPaginationTemplate from './history_pagination.html';
import './points-status.less';

/*
action
:
"purchase"
action_date
:
"2017-06-28T15:52:18.754"
debited_points_delta
:
10
id
:
93695456
is_completed
:
true
name
:
"Покупка"
order_num
:
"test_points_deduction"
points_delta
:
8
price
:
85
store_department_id
:
3489
*/

function tryExtractJsonFromExtraName(nameField){
  // Some of extra actions has json in it's name field, and some doesn't
  let nameJson = ""
  let hasJson = true
  try {
    nameJson = JSON.parse(nameField)
    hasJson = nameJson.promo_name !== void 0
  } catch(e) {
    hasJson = false
  }
  return {
    hasJson,
    nameJson
  }
}

Widget.filter('get_bonus_name', function () {
  return function (item) {

    if(item.action=="extra"){
      const parseResult = tryExtractJsonFromExtraName(item.name)
      if(parseResult.hasJson){
        const name = parseResult.nameJson.promo_name
        return name
      } else {
        return item.name
      }
    } else {
      return item.name
    }
    
  }
})

Widget.filter('get_bonus_expiration', function (moment) {
  return function (item) {

    if(item.action=="extra"){
      const parseResult = tryExtractJsonFromExtraName(item.name)
      if(parseResult.hasJson){
        const expiration_date = "До " + moment(item.action_date).add(parseResult.nameJson.expiration_period, "days").format('D MMM Y')
        console.log(expiration_date)
        return expiration_date
      } else {
        return ""
      }
    } else {
      return ""
    }
    
  }
})

Widget.filter('get_bonus_add', function () {
  return function (item) {

    if(item){
      if(item.points_delta > 0){
        return "+" + item.points_delta
      } else {
        return 0
      }
    }

    return 'no number'
    
  }
})

Widget.filter('get_bonus_sub', function () {
  return function (item) {

    if(item){
      if(item.points_delta < 0){
        return item.points_delta
      } else if(item.action == "purchase") {
        return -item.debited_points_delta
      } else {
        return 0
      }
    }

    return 'no number'
    
  }
})


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

      scope.$on('history-open', (ev, isOpen)=>{
        if(isOpen){
          scope.history = true
        }
      })

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