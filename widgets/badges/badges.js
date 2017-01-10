import { WidgetRegister, Widget } from '@core/widget';
import BadgesWidgetTemplate from './badges.html';
import BadgesBadgeTemplate from './badges.badge.html';
import BadgesLineTemplate from './badges.line.html';
import './badges.less';

WidgetRegister({
  id: 'badges',
  template: BadgesWidgetTemplate,
  controller: () => {
    return (scope, elm, attrs) => {

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

    }

  };

});