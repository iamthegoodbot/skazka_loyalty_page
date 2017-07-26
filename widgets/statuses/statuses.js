import { Widget, WidgetRegister } from '@core/widget';
import StatusesWidgetTemplate from './statuses.html';
import './statuses.less';

Widget.directive('svgImg', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            let url = ''
            if(attrs.src){
              url = scope.$eval(attrs.src)
            } else {
              const item = scope.$eval(attrs.item)
              const user = scope.$parent.user();
              const user_points = user.user_points;
              const points =  user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;
              if(item.points<points){
                url = item.img_active
              } else {
                url = item.img_inactive
              }
            }
                
            element.replaceWith('<object type="image/svg+xml" data="' + url + '"></object>');
            /*
            setTimeout(()=>{
              var svgDoc = document.getElementById(id).contentDocument;
              var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
              styleElement.textContent = "svg { fill: #fff }";
              svgDoc.getElementById("where-to-insert").appendChild(linkElm);
            }, 1000)
            */
        }
    };
});

Widget.factory('badgeProgress', (MAGIC_CONFIG, SailPlayApi) => {
  const obj = {
    _tools: MAGIC_CONFIG.tools,
    _statuses: MAGIC_CONFIG.data.statuses
  }
  

  const _user = SailPlayApi.data('load.user.info');

  obj.get_next_status = function () {

    if(!obj._statuses) return;

    let user = _user();

    if(!user) {
      return {
        status: obj._statuses[0],
        offset: obj._statuses[0].points
      };
    }

    let user_points = user.user_points;
    let points =  user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;
    if (MAGIC_CONFIG.data.purchase_status) {
      points = user.purchases && user.purchases.sum || 0;
      user_points = user.purchases && user.purchases.sum || 0
    }
    let future_statuses = obj._statuses.sort((a, b) => {
      return a.points > b.points;
    }).filter((status) => {
      return status.points > points;
    });

    return {
      status: future_statuses[0],
      offset: future_statuses[0] && future_statuses[0].points - points || 0
    };

  }

  obj.getCurrentStatus = () => {
    if(!obj._statuses) return;
    let user = _user();
    let user_points = user.user_points;
    let points =  user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;    
    const current_statuses = obj._statuses.filter(x=>x.points<=points)
    obj.current_status = current_statuses.reduce((acc, x)=>((acc.points<x.points) ? x : acc))
    return obj.current_status
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
      scope.purchase_status = MAGIC_CONFIG.data.purchase_status;

      scope.get_next_status = badgeProgress.get_next_status
      scope._statuses = badgeProgress._statuses

      scope.badgeProgress = badgeProgress

    }
  }
});
