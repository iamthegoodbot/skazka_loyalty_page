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
        /*var dataz = {
          'members': {
            'members': [{"member": "46550514", "score": 10725.0, "pic": "//sailplays3.cdnvideo.ru/media/users/user/e589bc45837e7a94a9dcf5daf0ab45eb.100x100.jpg", "full_name": "David Korff", "rank": 1}, {"member": "44827159", "score": 6353.0, "pic": null, "full_name": "Beverly Dietzen", "rank": 2}, {"member": "46550270", "score": 3907.0, "pic": null, "full_name": "Michael Hirsch", "rank": 3}, {"is_current_user": true, "member": "41281744", "score": 2262.0, "pic": null, "full_name": "Donovan Farmer", "rank": 4}, {"member": "41283883", "score": 1215.0, "pic": null, "full_name": "Christina Skibinsky", "rank": 5}, {"member": "41271579", "score": 450.0, "pic": null, "full_name": "Marka Sawyer", "rank": 6}, {"member": "46549856", "score": 428.0, "pic": null, "full_name": "Derek Canale", "rank": 7}, {"member": "41287390", "score": 410.0, "pic": null, "full_name": "Aron Hammett", "rank": 8}, {"member": "41287020", "score": 400.0, "pic": null, "full_name": "cimone kamei", "rank": 9}, {"member": "41285824", "score": 382.0, "pic": null, "full_name": "Jiping Huang", "rank": 10}, {"member": "46549849", "score": 250.0, "pic": null, "full_name": "Justin Park", "rank": 11}, {"member": "41286852", "score": 249.0, "pic": null, "full_name": "Samson Garner", "rank": 12}, {"member": "51526352", "score": 248.0, "pic": null, "full_name": "Michael Hutsell", "rank": 13}, {"member": "41280106", "score": 247.0, "pic": null, "full_name": "Josh Gaynor", "rank": 14}, {"member": "52496421", "score": 245.0, "pic": null, "full_name": "Xiufang Zheng", "rank": 15}, {"member": "46550294", "score": 244.0, "pic": null, "full_name": "Polly Howard", "rank": 16}, {"member": "41281143", "score": 238.0, "pic": null, "full_name": "Onur Ozkoc", "rank": 17}, {"member": "41281228", "score": 229.0, "pic": null, "full_name": "Debbie Gilchrest", "rank": 18}, {"member": "41282900", "score": 228.0, "pic": null, "full_name": "Andrew Scharf", "rank": 19}, {"member": "51320163", "score": 215.0, "pic": null, "full_name": "Mike Guerriero", "rank": 20}, {"member": "46549857", "score": 192.0, "pic": null, "full_name": "Mike Scilingo", "rank": 21}, {"member": "41279699", "score": 187.0, "pic": null, "full_name": "Iris Doss-Hines", "rank": 22}, {"member": "47107106", "score": 186.0, "pic": null, "full_name": "Mark Dugan", "rank": 23}, {"member": "41285579", "score": 184.0, "pic": null, "full_name": "Derek Van Atta", "rank": 24}, {"member": "41281659", "score": 183.0, "pic": null, "full_name": "Lonnie Birmingham", "rank": 25}, {"member": "41280968", "score": 178.0, "pic": null, "full_name": "Leslie Tatum", "rank": 26}, {"member": "46549851", "score": 165.0, "pic": null, "full_name": "Karen Malchow", "rank": 27}, {"member": "44821004", "score": 159.0, "pic": null, "full_name": "Cindy Sjoblom", "rank": 28}, {"member": "41279985", "score": 157.0, "pic": null, "full_name": "S.R. Burzynski", "rank": 29}, {"member": "41285190", "score": 153.0, "pic": "//sailplays3.cdnvideo.ru/media/users/user/53acdc9b5b178eed37c9894b631dc556.100x100.jpg", "full_name": "rachel rosenfeld", "rank": 30}, {"member": "50874958", "score": 25.0, "pic": null, "full_name": "William Gebhard", "rank": 240}, {"pic": "//sailplays3.cdnvideo.ru/media/users/user/b360edabbfa3f84ba6150e4d99efb43d.100x100.jpg", "rank": 241, "member": "50818046", "score": 25.0, "full_name": "test test"}]
          }
        }*/
        scope.top9 = []
        scope.currentUser = void 0
        scope.isInTop9 = false
        data.members.members.forEach(x=>{
          if(x.is_current_user === true) {
            scope.currentUser = x
          }
          if (x.rank<10) {
            scope.top9.push(x)
          }
        })
        if(scope.currentUser.rank<10){
          scope.isInTop9 = true
        } else {
          scope.isInTop9 = false
          scope.top9[8] = scope.currentUser
        }
        scope.$apply()
      })
      //scope.data = SailPlayApi.data('leaderboard.load');
    };
  }

});
