import { WidgetRegister, Widget } from '@core/widget';
import BadgesWidgetTemplate from './badges.html';
import BadgesBadgeTemplate from './badges.badge.html';
import BadgesLineTemplate from './badges.line.html';
import './badges.less';

WidgetRegister({
  id: 'badges',
  inject: [
    'parallaxHelper'
  ],
  template: BadgesWidgetTemplate,
  controller: (parallaxHelper) => {
    return (scope, elm, attrs) => {
      scope.background = parallaxHelper.createAnimator(-0.2);
      scope.background2 = parallaxHelper.createAnimator(-0.4);
    }
  }
});

Widget.directive('sailplayMagicBadge', function(MAGIC_CONFIG, tools){

  return {

    restrict: "E",
    replace: true,
    scope: {
      badge: '='
    },
    template: BadgesBadgeTemplate,
    link: function(scope, elm, attrs){

      scope._tools = MAGIC_CONFIG.tools;

      scope.on_click = function () {
        attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
      }

    }

  };

});

Widget.directive('sailplayMagicBadgeLine', function(MAGIC_CONFIG, SailPlayShare, $window){

  return {

    restrict: "E",
    replace: true,
    scope: {
      line: '=',
      _config: '=config'
    },
    template: BadgesLineTemplate,
    link: function(scope, elm, attrs){

      scope._tools = MAGIC_CONFIG.tools;

      scope.badge_selected = false;

      scope.badge_select = function (badge) {
        scope.badge_selected = badge || false;
      };

      scope.badge_share = function (network, badge) {
        SailPlayShare(network, scope._config.texts.share_url || $window.location.href, badge.name, badge.descr, badge.thumbs.url_250x250);
      };

      scope.getLineLength = (line) => {
        if(!line){
          return 0;
        }
        const receivedArray = line.filter(x=>x.is_received)
        if (receivedArray.length === 0) {
          return '0% 180%'
        } else {
          return ((receivedArray.length-1) * 50 + 30) +'% 180%'
        }
      }

    }

  };

});