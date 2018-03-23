import { WidgetRegister } from '@core/widget';
import LeaderboardWidgetTemplate from './leaderboard.html';
import './leaderboard.less';

WidgetRegister({
  id: 'leaderboard',
  template: LeaderboardWidgetTemplate,
  inject: [
    'SailPlayApi'
  ],
  controller: (SailPlayApi) => {
    return (scope, elm, attrs) => {
      scope.data = SailPlayApi.data('leaderboard.load');
    };
  }

});
