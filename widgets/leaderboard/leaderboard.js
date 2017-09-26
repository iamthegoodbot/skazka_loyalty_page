import { WidgetRegister } from '@core/widget';
import LeaderboardWidgetTemplate from './leaderboard.html';
import './leaderboard.less';

WidgetRegister({
  id: 'leaderboard',
  template: LeaderboardWidgetTemplate,
  inject: [
    'SailPlay'
  ],
  controller: (SailPlay) => {
    return (scope, elm, attrs) => {
      scope.top9 = []
      scope.currentUser = void 0
      scope.isInTop9 = false
      SailPlay.on('leaderboard.load.success',(data)=>{
        scope.top9 = []
        scope.currentUser = void 0
        scope.isInTop9 = true
        data.members.members.forEach(x=>{
          if(x.is_current_user === true) {
            scope.currentUser = x
          }
          if (x.rank<10) {
            scope.top9.push(x)
          }
        })
        if(scope.currentUser && scope.currentUser.rank<10){
          scope.isInTop9 = true
        } else if(scope.currentUser){
          scope.isInTop9 = false
          scope.top9[8] = scope.currentUser
        }
        scope.$apply()
      })
      //scope.data = SailPlayApi.data('leaderboard.load');
    };
  }

});
