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
        disabled: '=?',
        callback: '&?'
      },
      link: function (scope) {

        scope.date = $rootScope.MAGIC_CONFIG.tools.date;
        scope.days = dateService.days;
        scope.years = dateService.years;
        scope.active = null;

        if(!scope.model) {
          scope.model = [null, null, null];
        }

        scope.range = function (start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };
        
        scope.open = type => {
          let prev = scope.active;
          $rootScope.$broadcast('datePicker:close');
          scope.active = prev == type ? null : type;
        }

        function onClick(e) {
          $rootScope.$apply(function(){
            scope.active = false;
            $rootScope.$broadcast('datePicker:close');
          })
        }

        $rootScope.$on('datePicker:close', function(){
          scope.active = false;
        })

        scope.$watchCollection('model', function(){
          if(scope.model && scope.model[0] && scope.model[1] && scope.model[2]) {
            scope.callback && scope.callback(scope.model)
          }
        })

        document.body.addEventListener('click', onClick)

      }
    }

  });

export default ToolsDatepicker.name;