import angular from 'angular';
import WidgetTemplate from './widget.html';
import './widget.less';

export let Widget = angular.module('magic.tools.widget', [])

.directive('widget', function ($compile, MagicWidget, $injector, $templateRequest, $http) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      widget: '='
    },
    template: WidgetTemplate,
    link: (scope, elm, attrs) => {

      let widget_wrapper = angular.element(elm[0].querySelector('[data-widget-wrapper]'));

      scope.$watch('widget', (widget) => {

        if(!widget) return;

        widget_wrapper.html('');

        const WIDGET_CONFIG = MagicWidget.get_widget_config(widget.id);

        if(!WIDGET_CONFIG) {
          throw `Widget with id: ${widget.id} not registered!`;
        }

        let widget_scope = scope.$new();

        widget_scope.widget = widget;

        function ResolveTemplate(){
          return new Promise((resolve, reject) => {
            if(scope.widget.customize && scope.widget.customize.templateUrl) {
              $templateRequest(scope.widget.customize.templateUrl).then(resolve, reject);
            } else {
              resolve(WIDGET_CONFIG.template)
            }
          })
        }

        function ResolveController(){
          return new Promise((resolve, reject) => {
            if(scope.widget.customize && scope.widget.customize.controllerUrl) {
              $http.get(scope.widget.customize.controllerUrl).then(res => {
                let remoteCtrl;
                try {
                  remoteCtrl = eval(res.data);
                } catch(e) {
                  // console.log('Wrong customize controller');
                }
                if(!remoteCtrl) return reject();
                WIDGET_CONFIG.controller.$inject = remoteCtrl.inject || [];
                resolve(remoteCtrl.controller)
              }, reject);
            } else {
              WIDGET_CONFIG.controller.$inject = WIDGET_CONFIG.inject || [];
              resolve(WIDGET_CONFIG.controller)
            }
          })
        }

        async function ResolveWidget() {
          const getTemplate = await ResolveTemplate();
          const getController = await ResolveController();
          try {
            widget_wrapper.append($compile(getTemplate)(widget_scope));
            $injector.invoke(getController)(widget_scope, widget_wrapper, attrs);
          } catch(e) {
            // console.log('ResolveWidget issue', e)
          }
        }

        return ResolveWidget()

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

