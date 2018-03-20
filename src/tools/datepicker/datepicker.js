import angular from "angular";
import Template from "./datepicker.html";

export let ToolsDatepicker = angular
  .module("ui.datepicker", [])

  .service("dateService", function() {
    var self = this;

    self.days = {
      1: 31,
      2: 29,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };

    var current_year = new Date().getFullYear();
    var arr = [];
    for (var i = 90; i > 0; i--) {
      arr.push(current_year - i);
    }

    self.years = arr.reverse();

    return this;
  })

  .directive("datePicker", ['$locale', 'dateService', '$rootScope', function($locale, dateService, $rootScope) {
    return {
      restrict: "E",
      replace: true,
      template: Template,
      scope: true,
      require: "ngModel",
      link: function(scope, elm, attrs, ngModel) {
        scope.date = $rootScope.MAGIC_CONFIG.tools.date;
        scope.days = dateService.days;
        scope.years = dateService.years;
        scope.focused = false;
        scope.months = $locale.DATETIME_FORMATS.MONTH;

        scope.range = function(start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

        ngModel.$formatters.push(function(modelValue) {
          return modelValue
            ? angular
                .copy(modelValue)
                .split("-")
                .reverse()
                .map(item => parseInt(item))
            : ["", "", ""];
        });

        ngModel.$render = function() {
          scope.model = angular.copy(ngModel.$viewValue);
        };

        ngModel.$parsers.push(function(viewValue) {
          return (
            viewValue &&
            angular
              .copy(viewValue)
              .reverse()
              .join("-")
          );
        });

        ngModel.$validators.required = function(modelValue, viewValue) {
          var valid = true;
          angular.forEach(viewValue, function(val) {
            if (!val || val === "") valid = false;
          });
          return valid;
        };

        scope.$watchCollection("model", function() {
          ngModel.$setViewValue(angular.copy(scope.model));
        });

        let onBodyClick = () => {
          scope.focused = false;
          scope.$digest();
        };

        document.body.addEventListener("click", onBodyClick, true);

        scope.$on("$destroy", () => {
          document.body.removeEventListener("click", onBodyClick);
        });

      }
    };
  }]);

export default ToolsDatepicker.name;
