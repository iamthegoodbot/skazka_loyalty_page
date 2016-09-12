(function () {

  angular.module('tools', [
    'angularUtils.directives.dirPagination',
    'ui.mask'
  ])

    .config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
      uiMaskConfigProvider.maskDefinitions({'_': /[0-9]/});
      uiMaskConfigProvider.addDefaultPlaceholder(true);
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

    .directive('notifier', function(MAGIC_CONFIG){

       return {

         restrict: 'E',
         replace: true,
         scope: true,
         templateUrl: '/html/tools/notifier.html',
         link: function(scope){

           scope._notifier_config = MAGIC_CONFIG.tools.notifier;

           scope._tools = MAGIC_CONFIG.tools;

           var new_data = {

             header: '',
             body: ''

           };

           scope.$on('notifier:notify', function(e, data){

            scope.data = data;
            scope.show_notifier = true;
            console.log('notifier: ' + data.body);

           });

           scope.reset_notifier = function(){
             scope.data = angular.copy(new_data);
             scope.show_notifier = false;
           };

           scope.reset_notifier();

         }

       }

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

    .directive('dateSelector', function($parse){

      return {
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: function(scope, elm, attrs, ngModelCtrl){

          var years = function(startYear) {
            var currentYear = new Date().getFullYear(), years = [];
            startYear = startYear || 1980;

            while ( startYear <= currentYear ) {
              years.push(startYear++);
            }

            return years.reverse();
          };

          scope.date_data = {
            days: new Array(31),
            months: new Array(12),
            years: years(1930)
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

    .filter('background_image', function(){
      return function(url) {
        return url && 'url(' + url + ')' || '';
      };
    })

    .service('tools', function($document){

      var self = this;

      var initial_overflow = $document[0].body.style.overflow;

      self.body_lock = function(state){
        $document[0].body.style.overflow = state ? 'hidden' : initial_overflow;
      };

      self.stringify_widget_css = function(prefix, obj){

        var css_string = '';

        for(var selector in obj){

          if(obj.hasOwnProperty(selector)){

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for(var prop in selector_styles){

              if(selector_styles.hasOwnProperty(prop)) {

                css_string += prop + ':' + selector_styles[prop] + ' !important;';

              }

            }

            css_string += ' }';

          }

        }

        return css_string;

      };

    })

    .directive('widgetStyle', function(tools, $document){

      return {

        restrict: 'A',
        replace: false,
        scope: {
          widget_style: '=widgetStyle'
        },
        link: function(scope, element, attrs){

          element[0].type = 'text/css';

          var prefix = '.sailplay.magic ' + (attrs.widgetName ? '.' + attrs.widgetName : '');

          var css_string = tools.stringify_widget_css(prefix, scope.widget_style);

          if (element[0].styleSheet){
            element[0].styleSheet.cssText = css_string;
          } else {
            element[0].appendChild($document[0].createTextNode(css_string));
          }

        }

      };

    })

    .directive('magicModal', function($parse, tools, MAGIC_CONFIG){

      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/html/tools/modal.html',
        scope: true,
        transclude: true,
        link: function(scope, elm, attrs){

          scope._modal_config = MAGIC_CONFIG.tools.modal;

          scope.show = false;

          scope.close = function(){
            $parse(attrs.show).assign(scope.$parent, false);
            scope.$eval(attrs.onClose);
          };

          elm.on('click', function(e){
            if(e.target === elm[0]){
              scope.$apply(function () {
                scope.close();
              });
            }
          });

          scope.$watch(function(){
            return angular.toJson([scope.$eval(attrs.show)]);
          }, function(){
            var new_value = scope.$eval(attrs.show);
            scope.show = new_value;
            tools.body_lock(new_value);
          });

        }
      };

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
              slide.style.width = _width - 30;
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

    });

}());
