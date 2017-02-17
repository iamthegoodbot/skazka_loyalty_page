import angular from 'angular';
import WidgetTemplate from './widget.html';
import './widget.less';

export let Widget = angular.module('magic.tools.widget', [])

.directive('widget', function ($compile, MagicWidget, $injector, SailPlayApi) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      widget: '='
    },
    template: WidgetTemplate,
    link: (scope, elm, attrs) => {
      let widget_wrapper = angular.element(elm[0].querySelector('[data-widget-wrapper]'));
      console.dir(widget_wrapper);

      scope.$watch('widget', (widget) => {

        if(!widget) return;

        widget_wrapper.html('');

        const WIDGET_CONFIG = MagicWidget.get_widget_config(widget.id);

        if(!WIDGET_CONFIG) {
          throw `Widget with id: ${widget.id} not registered!`;
        }

        let widget_scope = scope.$new();

        widget.user = SailPlayApi.data('load.user.info');
        widget_scope.widget = widget;

        WIDGET_CONFIG.controller.$inject = WIDGET_CONFIG.inject || [];

        $injector.invoke(WIDGET_CONFIG.controller)(widget_scope, widget_wrapper, attrs);

        widget_wrapper.append($compile(WIDGET_CONFIG.template)(widget_scope));

      })

    }
  };
})

.directive('widgetStyle', function(tools, $document){

  return {

    restrict: 'E',
    replace: true,
    template: '<style></style>',
    scope: {
      widget: '=?'
    },
    link: function(scope, element, attrs){

      scope.$watch('widget', (widget) => {
        if(!widget) return;

        element[0].type = 'text/css';

        let prefix = '.spm_wrapper .spm_tools_widget' + (widget.id ? '.' + widget.id : '');

        let css_string = tools.stringify_widget_css(prefix, widget.styles);

        if (element[0].styleSheet){
          element[0].styleSheet.cssText = css_string;
        } else {
          element[0].appendChild($document[0].createTextNode(css_string));
        }
      });

    }

  };

});

export default Widget.name;

