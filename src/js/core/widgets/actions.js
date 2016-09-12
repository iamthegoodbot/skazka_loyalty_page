(function () {

  angular.module('widgets.actions', [])

    .directive('sailplayMagicActions', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/actions.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.action_selected = false;
          scope.action_custom_selected = false;

          scope.action_select = function(action){

            scope.action_selected = action || false;

          };

          scope.action_custom_select = function(action){

            scope.action_custom_selected = action || false;

          };

          scope.action_styles = function(action_data){
            return action_data.styles && tools.stringify_widget_css('', action_data.styles);
          };

        }

      };

    });

}());
