import angular from 'angular';
import NgPagination from 'angular-utils-pagination';
import UIMask from 'angular-ui-mask';
import Layout from './layout/layout';
import Widget from './widget/widget';
import Notifier from './notifier/notifier'
import MagicModal from './modal/index';
import Fonts from './fonts/fonts';
import DatePicker from './datepicker/datepicker';
import Pagination from './pagination/index';
import MagicModalCenter from './modal-center/index';

export let Tools = angular.module('magic.tools', [
  NgPagination,
  UIMask,
  Fonts,
  Layout,
  Widget,
  Notifier,
  MagicModal,
  MagicModalCenter,
  DatePicker,
  Pagination
])

.filter('tools', function (MAGIC_CONFIG, $parse) {

  return function (key) {
    return $parse(key)(MAGIC_CONFIG.tools) || '';
  }

})

// Can't find something like this
.filter('interpolateString', function($interpolate){
  return (template, scope) => {
    return $interpolate(template)(scope);
}
})

.config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
  uiMaskConfigProvider.maskDefinitions({'_': /[0-9]/});
  uiMaskConfigProvider.clearOnBlur(true);
  uiMaskConfigProvider.addDefaultPlaceholder(false);
  uiMaskConfigProvider.clearOnBlurPlaceholder(true);
  // uiMaskConfigProvider.eventsToHandle([null, null, null, 'focus']);
}])

.directive('overlayClick', function(){

  return {
    restrict: 'A',
    replace: false,
    scope: false,
    link: function(scope, elm, attrs){

      elm.on('click', function(e){
        if(e.target === elm[0]){
          scope.$apply(function () {
            scope.$eval(attrs.overlayClick);
          });
        }
      });

    }
  };

})

.controller('slick_config', function($scope){

  $scope.gift_slider_config = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 150,
    infinite: false,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  $scope.action_slider_config = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 150,
    infinite: false,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

})

.filter('ngRepeatByNumber', function(){
  return function(num) {
    return new Array(num);   
  }
})

.directive('slickCarousel', function ($compile, $timeout) {
  return {
    restrict:'A',
    link: function (scope, element, attrs) {

      scope.hidden = true;

      var $element = $(element);

      function toggle(state){

        if(state){
          $element.css('opacity', 1);
        }
        else {
          $element.css('opacity', 0);
        }

      }

      var options = scope.$eval(attrs.options) || {
          infinite: false,
          nextArrow: '<img class="slider_arrow right" src="dist/img/right.png"/>',
          prevArrow: '<img class="slider_arrow left" src="dist/img/left.png"/>',
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1190,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 880,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        };

      scope.process = false;

      scope.$watchCollection(function(){
        return $element.find('[data-slick-slide]').not('.ng-hide');
      }, function(){
        if(!scope.process){
          scope.process = true;
          toggle(false);
          if($element.hasClass('slick-initialized')){
            $element.slick('removeSlide', null, null, true);
            $element.slick('unslick');
          }
          $timeout(function(){

            $element.slick(options);
            $element.slick('slickUnfilter');
            $element.slick('slickFilter', ':not(.ng-hide)');
            toggle(true);
            scope.process = false;
          }, 500);
        }

      });

      //var parent = $(element).parent();
      //console.dir(parent);



    }

  };
})

//.directive('phoneMask', function($timeout){
//
//  return {
//    restrict: 'A',
//    require: 'ngModel',
//    link: function(scope, elm, attrs, ngModel){
//
//      function valid_phone(value){
//
//        return value && /^[0-9]{11}$/.test(value);
//
//      }
//
//      ngModel.$render = function(){
//
//        ngModel.$setValidity('phone', valid_phone(ngModel.$modelValue));
//
//        $(elm).unmask();
//        $(elm).val(ngModel.$modelValue);
//        $(elm).mask(attrs.phoneMask || '+7(000) 000-00-00',
//          {
//            placeholder: attrs.placeholder || "+7(___)___-__-__",
//            onComplete: function(cep) {
//              ngModel.$setViewValue(cep);
//              ngModel.$setValidity('phone', true);
//              scope.$digest();
//            },
//            onChange: function(cep){
//              var value = (cep || '').replace(/\D/g,'');
//              if(!valid_phone(cep)){
//                ngModel.$setViewValue('');
//                ngModel.$setValidity('phone', false);
//                scope.$digest();
//              }
//            },
//            onInvalid: function(val, e, f, invalid, options){
//              ngModel.$setViewValue('');
//              ngModel.$setValidity('phone', false);
//              scope.$digest();
//            }
//          });
//      };
//
//    }
//  };
//
//})

//.directive('maskedPhoneNumber', function(){
//  return {
//    restrict: 'A',
//    scope: {
//      phone: '=?'
//    },
//    link: function(scope, elm, attrs){
//
//      scope.$watch('phone', function(new_value){
//
//        if(new_value){
//          $(elm).text(new_value);
//          $(elm).unmask();
//          $(elm).mask(attrs.maskedPhoneNumber || '+7(000) 000-00-00');
//        }
//        else {
//          $(elm).text(attrs.noValue || '');
//        }
//
//
//      });
//
//    }
//  }
//})

.directive('dateSelector', function(){

  return {
    restrict: 'AE',
    replace: true,
    require: 'ngModel',
    template:
      `
        <div class="clearfix">

          <div class="form_date form_date__day">
            <select class="form_select" data-ng-model="selected_date[0]" data-ng-options="day as day for day in range(1, date_data.days[selected_date[1] || 1])">
              <option value="">Day</option>
            </select>
          </div>
          <div class="form_date form_date__month">
            <select class="form_select" data-ng-model="selected_date[1]" data-ng-options="number as name for (number, name) in date_data.months">
              <option value="">Month</option>
            </select>
          </div>
          <div class="form_date form_date__year" >
            <select class="form_select" data-ng-model="selected_date[2]" data-ng-options="year as year for year in date_data.years">
              <option value="">Year</option>
            </select>
          </div>
        
        </div>
      `,
    scope: true,
    link: function(scope, elm, attrs, ngModelCtrl){

      let max_year = attrs.maxYear || new Date().getFullYear();

      let min_year = attrs.minYear || 1930;

      let years = function() {

        let min_year_counter = min_year, years = [];

        while ( min_year_counter <= max_year ) {
          years.push(min_year_counter++);
        }

        return years.reverse();
      };

      scope.range = function (start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
          result.push(i);
        }
        return result;
      };

      scope.date_data = {
        days: {
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
        },
        months: {
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
        years: years()
      };

      scope.selected_date = [ '', '', '' ];

      ngModelCtrl.$formatters.push(function(modelValue) {
        return modelValue ? angular.copy(modelValue).split('-').reverse() : [ '', '', '' ];
      });

      ngModelCtrl.$render = function() {
        scope.selected_date = angular.copy(ngModelCtrl.$viewValue);
      };

      ngModelCtrl.$parsers.push(function(viewValue) {

        return viewValue && angular.copy(viewValue).reverse().join('-');

      });

      ngModelCtrl.$validators.required = function(modelValue, viewValue){

        var valid = true;

        angular.forEach(viewValue, function(val){
          if(!val || val === '') valid = false;
        });

        return valid;

      };

      scope.$watchCollection('selected_date', function(){
        ngModelCtrl.$setViewValue(angular.copy(scope.selected_date));

      });


    }
  };

})

.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}])

.filter('json', function() {
  return function(text) {
    let res = {};
    try {
      res = JSON.parse(text || '{}');
    } catch(e) {}
    return res
  };
})

.filter('background_image', function(){
  return function(url) {
    return url && 'url(' + url + ')' || '';
  };
})

.service('tools', function($document){

  let initial_overflow = $document[0].body.style.overflow;
  let initial_webkit_overflow = $document[0].body.style.WebkitOverflowScrolling || 'auto';

  this.body_lock = (state) => {
    $document[0].body.style.overflow = state ? 'hidden' : initial_overflow;
    $document[0].body.style.WebkitOverflowScrolling = state ? 'touch' : initial_webkit_overflow;
  };

  this.stringify_widget_css = (prefix, obj) => {

    let css_string = '';
    let media_queries = '';

    for(let selector in obj){

      if(obj.hasOwnProperty(selector)){

        if (selector[0] == '@' && selector.split('|').length > 1) {
          var media = selector.split('|')[0].trim();
          var cls = selector.split('|')[1].trim();
          media_queries += media + '{ ' + prefix + ' .' + cls + '{ '
        } else css_string += prefix + ' .' + selector + '{ ';

        let selector_styles = obj[selector];

        for(let prop in selector_styles){

          if(selector_styles.hasOwnProperty(prop)) {

            if (selector[0] == '@') 
              media_queries += prop + ':' + selector_styles[prop] + ' !important;';      
            else      
              css_string += prop + ':' + selector_styles[prop] + ' !important;';

          }

        }

        if (selector[0] == '@') media_queries += ' } }'
        else css_string += ' }';
      }

    }

    css_string += media_queries;
    return css_string;

  };

  // https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
  this.get_scroll_top = () => {
      if(typeof pageYOffset!= 'undefined'){
          //most browsers except IE before #9
          return pageYOffset;
      } else {
          var B = document.body; //IE 'quirks'
          var D = document.documentElement; //IE with doctype
          D= (D.clientHeight)? D: B;
          return D.scrollTop;
      }
  }

})

.directive('magicSlider', function(MAGIC_CONFIG){

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elm, attrs){

      scope._slider_config = MAGIC_CONFIG.tools.slider;

      scope.left = 0;

      scope.current_position = 0;

      scope.show_left = false;
      scope.show_right = true;


      // Переделать
      scope.set_position = function (position) {

        var slides = elm[0].querySelectorAll('[data-magic-slide]');
        var wrapper = elm[0].querySelectorAll('[data-magic-gallery]')[0];

        angular.forEach(slides, function(slide){
          slide.style.width = '';
        });

        var _width = slides[0].offsetWidth || 0;

        _width = _width ? _width + 30 : 0;

        var _limits = {
          min: 1,
          max: 4
        };

        if (!_width) return;

        var _wrap_width = wrapper.offsetWidth;

        var _count_show = Math.floor(_wrap_width / _width) > _limits.max ? Math.floor(_wrap_width / _width) < _limits.min ? _limits.min : Math.floor(_wrap_width / _width) : Math.floor(_wrap_width / _width);

        if (!_count_show) return;

        _width = Math.floor(_wrap_width / _count_show);

        angular.forEach(slides, function(slide){
          slide.style.width = (_width - 30) + 'px';
        });

        var _max = Math.ceil(slides.length - _count_show);

        var _current = scope.current_position;

        var _next = _current;

        if (position == 'left') {

          _next = _current - 1 < 0 ? 0 : _current - 1;

        } else if (position == 'right') {

          _next = _current + 1 > _max ? _max : _current + 1;

        }

        scope.show_right = true;
        scope.show_left = true;

        if(_next == _max) {
          scope.show_right = false;
        }

        if(_next == 0) {
          scope.show_left = false;
        }

        if(_count_show > slides.length) {
          scope.show_right = false;
        }

        scope.current_position = _next;

        scope.left = '-' + (_next * _width) + 'px';

      };

    }
  }

})

.directive('toolsStyles', function(tools, $document, MAGIC_CONFIG){

  return {

    restrict: 'E',
    replace: true,
    template: '<style></style>',
    scope: {
      widget: '=?'
    },
    link: function(scope, element, attrs){


      function append_styles() {
        element[0].type = 'text/css';

        let prefix = '.spm_wrapper';

        let tools_config = MAGIC_CONFIG.tools || [];

        let tools_styles = '';

        angular.forEach(tools_config, (tool) => {

          tools_styles += tools.stringify_widget_css(prefix, tool.styles);

        });

        if (element[0].styleSheet){
          element[0].styleSheet.cssText = tools_styles;
        } else {
          element[0].appendChild($document[0].createTextNode(tools_styles));
        }

      }

      append_styles();

    }

  };

})

.filter('short_number', function(){
  return function(number){
      function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
        number = Number(number);
        forceLetter = forceLetter || false;
        if(forceLetter !== false) {
          return annotate(number, maxPlaces, forcePlaces, forceLetter)
        }
        var abbr;
        if(number >= 1e12) {
          abbr = 'T';
        }
        else if(number >= 1e9) {
          abbr = 'B';
        }
        else if(number >= 1e6) {
          abbr = 'M';
        }
        else if(number >= 1e3) {
          abbr = 'K';
        }
        else {
          abbr = '';
        }
        return annotate(number, maxPlaces, forcePlaces, abbr);
      }

      function annotate(number, maxPlaces, forcePlaces, abbr) {
        // set places to false to not round
        var rounded = 0
        switch(abbr) {
          case 'T':
            rounded = number / 1e12;
            break;
          case 'B':
            rounded = number / 1e9;
            break;
          case 'M':
            rounded = number / 1e6;
            break;
          case 'K':
            rounded = number / 1e3;
            break;
          case '':
            rounded = number;
            break;
        }
        if(maxPlaces !== false) {
          var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
          if(test.test(('' + rounded))) {
            rounded = rounded.toFixed(maxPlaces);
          }
        }
        if(forcePlaces !== false) {
          rounded = Number(rounded).toFixed(forcePlaces);
        }
        var splitted = rounded.toString().split('.');
        var decimal = splitted[1] ? splitted[1][0] : '0';
        return splitted[0] + ( decimal != '0' ? ('.' + decimal) : '') + abbr;
      }

      return abbreviate(number, 2, false, false);
  }
})

.filter('tel', function () {
  return function (tel) {
    if (!tel) { return ''; }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var country, city, number;
    
    if (value.slice(0, 3) == '614') {
      country = '61 4';
      city = '';
      number = value.slice(3);

      number = number.slice(0, 4) + '-' + number.slice(4);
      return (country + ' ' + number).trim();
    }

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    number = number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5);
    return '+' + (country + " (" + city + ") " + number).trim();
  };
})

.filter('masked', function () {
  var cache = {};
  var maskDefinitions = {
    '9': /\d/,
    'A': /[a-zA-Z]/,
    '*': /[a-zA-Z0-9]/
  };
  function getPlaceholderChar(i) {
    return '_';
  }
  function processRawMask(mask) {
    if (cache[mask]) return cache[mask];
    var characterCount = 0;

    var maskCaretMap = [];
    var maskPatterns = [];
    var maskPlaceholder = '';
    var minRequiredLength = 0;
    if (angular.isString(mask)) {


      var isOptional = false,
        numberOfOptionalCharacters = 0,
        splitMask = mask.split('');

      angular.forEach(splitMask, function(chr, i) {
        if (maskDefinitions[chr]) {

          maskCaretMap.push(characterCount);

          maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
          maskPatterns.push(maskDefinitions[chr]);

          characterCount++;
          if (!isOptional) {
            minRequiredLength++;
          }

          isOptional = false;
        }
        else if (chr === '?') {
          isOptional = true;
          numberOfOptionalCharacters++;
        }
        else {
          maskPlaceholder += chr;
          characterCount++;
        }
      });
    }
    // Caret position immediately following last position is valid.
    maskCaretMap.push(maskCaretMap.slice().pop() + 1);
    return cache[mask] = {maskCaretMap: maskCaretMap, maskPlaceholder: maskPlaceholder};
  }

  function maskValue(unmaskedValue, maskDef) {
    unmaskedValue = unmaskedValue || '';
    var valueMasked = '',
      maskCaretMapCopy = maskDef.maskCaretMap.slice();

    angular.forEach(maskDef.maskPlaceholder.split(''), function (chr, i) {
      if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
        valueMasked += unmaskedValue.charAt(0) || '_';
        unmaskedValue = unmaskedValue.substr(1);
        maskCaretMapCopy.shift();
      }
      else {
        valueMasked += chr;
      }
    });
    return valueMasked;

  }

  return function (value, mask) {
    var maskDef = processRawMask(mask);
    var maskedValue = maskValue(value, maskDef);
    return maskedValue;
  };
})

.filter('nullVariable', function () {

  return function (value, replacer) {

    if(value === 'null' || !value) {
      return replacer;
    }
    else {
      return value;
    }

  };

})

.directive('spmClickOutside', function ($document) {

  return {
    restrict: "A",
    link: function (scope, elm, attrs) {

      const outside_click = event => {
        if (!elm[0].contains(event.target)) { // or use: event.target.closest(selector) === null
          scope.$apply(() => {
            scope.$eval(attrs.spmClickOutside);
          });
        }
      };

      $document[0].addEventListener('click', outside_click);

      scope.$on('$destroy', () => {
        $document[0].removeEventListener('click', outside_click)
      });

    }
  };

})

.filter('interpolate', function($interpolate){

  let filterFactory = function(){

    return function(template, obj){

      if(!template) return '';

      let exp = $interpolate(template);
      return exp(obj);

    };

  };

  return filterFactory();

});

export default Tools.name;