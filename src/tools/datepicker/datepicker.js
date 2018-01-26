import angular from 'angular';
import DatePickerTemplate from './datepicker.html';

export let ToolsDatepicker = angular.module('ui.datepicker', [])

  .service('dateService', function () {

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

  .directive('datePicker', function (dateService, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: DatePickerTemplate,
      scope: {
        model: '=',
        lang: '=?',
        disabled: '=?'
      },
      link: function (scope) {

        scope.date = $rootScope.MAGIC_CONFIG.tools.date;
        scope.days = dateService.days;
        scope.years = dateService.years;
        scope.active = null;

        scope.range = function (start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

        function onClick(e) {
          scope.active = false;
          scope.$digest()
        }

        document.body.addEventListener('click', onClick)

      }
    }

  });

export default ToolsDatepicker.name;