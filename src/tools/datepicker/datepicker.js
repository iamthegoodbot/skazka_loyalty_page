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

    self.months = {
      en: {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      },
      ru: {
        1: "Январь",
        2: "Февраль",
        3: "Март",
        4: "Апрель",
        5: "Мая",
        6: "Июнь",
        7: "Июль",
        8: "Август",
        9: "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь"
      }
    };

    return this;

  })

  .directive('datePicker', function (dateService) {
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

        scope.days = dateService.days;
        scope.months = scope.lang ? (dateService.months[scope.lang] || dateService.months['ru']) : dateService.months['ru'];
        scope.years = dateService.years;

        scope.range = function (start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

      }
    }

  });

export default ToolsDatepicker.name;