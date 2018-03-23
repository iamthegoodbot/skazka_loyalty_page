import { Widget } from '@core/widget';
import Template from './template.html';
import BadgeTemplate from './_badge.html';
import LineTemplate from './_line.html';
import './style.less';

const widget = {
  id: 'bootstrap.badges',
  template: Template,
  inject: ['$rootScope', 'SailPlay', 'SailPlayApi', 'MAGIC_CONFIG'],
  controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return (scope, elm, attrs) => {

    };
  }
};

Widget.directive('sailplayMagicBadge', function(MAGIC_CONFIG, tools){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      badge: '='
    },
    template: BadgeTemplate,
    link: function(scope, elm, attrs){

      scope._tools = MAGIC_CONFIG.tools;

      scope.on_click = function () {
        attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
      }

    }
  }
});

Widget.directive('sailplayMagicBadgeLine', function(MAGIC_CONFIG, SailPlayShare, $window){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      line: '=',
      _config: '=config'
    },
    template: LineTemplate,
    link: function(scope, elm, attrs){

      scope._tools = MAGIC_CONFIG.tools;

      scope.badge_selected = false;

      scope.badge_select = function (badge) {
        return;
        scope.badge_selected = badge || false;
      };

      scope.badge_share = function (network, badge) {
        SailPlayShare(network, scope._config.texts.share_url || $window.location.href, badge.name, badge.descr, badge.thumbs.url_250x250);
      };

    }

  }
});

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(widget);
});
