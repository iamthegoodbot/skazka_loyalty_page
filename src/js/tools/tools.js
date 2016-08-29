(function () {

  angular.module('tools', [
    'angularUtils.directives.dirPagination'
  ])


    .provider('FillProfile', function(){

      var profile_tag = 'Completed Profile';
      var cookie_name = 'sailplay_profile_form';

      return {

        set_tag: function(tag){

          profile_tag = tag || profile_tag;

        },

        set_cookie_name: function(name){

          cookie_name = name || cookie_name;

        },

        $get: function(){

          this.tag = profile_tag;

          this.cookie_name = cookie_name;

          return this;

        }

      };

    })

    .directive('fillProfile', function(SailPlay, $rootScope, $q, ipCookie, SailPlayApi, FillProfile){

      return {

        restrict: 'A',
        scope: true,
        link: function(scope){

          var saved_form = false;

          var new_form = {

            user: {

              addPhone: '',
              addEmail: '',
              birthDate: '',
              firstName: '',
              lastName: '',
              sex: ''

            },
            custom_vars: {
              'Address': ''
            },
            tags: [],
            hide_hist: false

          };

          scope.$watch(function(){
            return angular.toJson([ SailPlayApi.data('load.user.info')() ]);
          }, function(){

            var user = SailPlayApi.data('load.user.info')();

            if(!user) return;
            scope.profile_form = angular.copy(new_form);
            scope.profile_form.user.auth_hash = SailPlay.config().auth_hash;
            //angular.extend(scope.profile_form.user, user.user);
            scope.profile_form.user.addPhone = user.user.phone;
            scope.profile_form.user.addEmail = user.user.email;
            scope.profile_form.user.firstName = user.user.first_name;
            scope.profile_form.user.lastName = user.user.last_name;
            scope.profile_form.user.birthDate = user.user.birth_date || '';
            if(ipCookie(FillProfile.cookie_name) && SailPlay.config().auth_hash === ipCookie(FillProfile.cookie_name).user.auth_hash ){
              angular.extend(scope.profile_form, ipCookie(FillProfile.cookie_name));
            }

            saved_form = angular.copy(scope.profile_form);

          });

          scope.revert_profile_form = function(form){
            if (form) {
              form.$setPristine();
              form.$setUntouched();
            }
            scope.profile_form = angular.copy(saved_form);
          };

          scope.toggle_tag = function(arr, tag){

            if(!tag) return;

            var index = arr.indexOf(tag);

            if(index > -1){

              arr.splice(index, 1);

            }
            else {

              arr.push(tag);

            }

          };

          scope.submit_profile = function(form, callback){

            if(!form || !form.$valid) {
              return;
            }

            var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;

            var req_user = angular.copy(scope.profile_form.user);
            //console.log(data_user.phone, req_user.addPhone);

            if(data_user && data_user.phone && data_user.phone.replace(/\D/g,'') == req_user.addPhone.replace(/\D/g,'')){
              delete req_user.addPhone;
            }

            if(data_user && data_user.email && data_user.email == req_user.addEmail){
              delete req_user.addEmail;
            }

            SailPlay.send('users.update', req_user, function(user_res){

              if(user_res.status === 'ok'){

                var req_tags = angular.copy(scope.profile_form.tags);

                if(!scope.profile_form.user.sex || !scope.profile_form.custom_vars.Address){
                  req_tags.push('Profile Uncompleted');
                }
                else {
                  req_tags.push(FillProfile.tag);
                }

                function chunk(array, chunkSize) {
                  return [].concat.apply([],
                    array.map(function(elem,i) {
                      return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
                    })
                  );
                }

                var chunked_tags = chunk(req_tags, 10);

                var tag_promises = [];

                angular.forEach(chunked_tags, function(chunk){

                  var promise = $q(function(resolve, reject){

                    SailPlay.send('tags.add', { tags: chunk }, function(tags_res){
                      if(tags_res.status === 'ok') {

                        resolve(tags_res);

                        //sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
                      }
                      else {
                        reject(tags_res);
                        //sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
                      }
                    });

                  });

                  tag_promises.push(promise);

                });

                $q.all(tag_promises).then(function(tags_res){

                  SailPlay.send('vars.add', { custom_vars: scope.profile_form.custom_vars }, function(vars_res){

                    var response = {
                      user: user_res,
                      tags: tags_res,
                      vars: vars_res
                    };

                    if(vars_res.status === 'ok') {

                      ipCookie(FillProfile.cookie_name, scope.profile_form);

                      $rootScope.$broadcast('notifier:notify', {

                        header: $rootScope.locale.thanks,
                        body: $rootScope.locale.notifications.fill_profile_success

                      });

                      SailPlayApi.call('load.user.info', { all: 1 });

                      callback && callback(response);
                      scope.$apply();


                    }
                    else {

                      $rootScope.$broadcast('notifier:notify', {

                        header: $rootScope.locale.error,
                        body: user_res.message || $rootScope.locale.notifications.default_error

                      });
                      scope.$apply();

                    }

                  });

                });



              }

              else {

                $rootScope.$broadcast('notifier:notify', {

                  header: $rootScope.locale.error,
                  body: ($rootScope.locale.errors && $rootScope.locale.errors[user_res.status_code] || $rootScope.locale.errors[user_res.message]) || $rootScope.locale.notifications.default_error

                });
                $rootScope.$apply();

              }

            });

          };

        }

      };

    })

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

    .directive('notifier', function(){

       return {

         restrict: 'E',
         replace: true,
         scope: true,
         templateUrl: '/html/tools/tools.notifier.html',
         link: function(scope){

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

    .directive('phoneMask', function($timeout){

      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel){

          function valid_phone(value){

            return value && /^[0-9]{11}$/.test(value);

          }

          ngModel.$render = function(){

            ngModel.$setValidity('phone', valid_phone(ngModel.$modelValue));

            $(elm).unmask();
            $(elm).val(ngModel.$modelValue);
            $(elm).mask(attrs.phoneMask || '+7(000) 000-00-00',
              {
                placeholder: attrs.placeholder || "+7(___)___-__-__",
                onComplete: function(cep) {
                  ngModel.$setViewValue(cep);
                  ngModel.$setValidity('phone', true);
                  scope.$digest();
                },
                onChange: function(cep){
                  var value = (cep || '').replace(/\D/g,'');
                  if(!valid_phone(cep)){
                    ngModel.$setViewValue('');
                    ngModel.$setValidity('phone', false);
                    scope.$digest();
                  }
                },
                onInvalid: function(val, e, f, invalid, options){
                  ngModel.$setViewValue('');
                  ngModel.$setValidity('phone', false);
                  scope.$digest();
                }
              });
          };

        }
      };

    })

    .directive('maskedPhoneNumber', function(){
      return {
        restrict: 'A',
        scope: {
          phone: '=?'
        },
        link: function(scope, elm, attrs){

          scope.$watch('phone', function(new_value){

            if(new_value){
              $(elm).text(new_value);
              $(elm).unmask();
              $(elm).mask(attrs.maskedPhoneNumber || '+7(000) 000-00-00');
            }
            else {
              $(elm).text(attrs.noValue || '');
            }


          });

        }
      }
    })

    .directive('selectize', function($timeout){

      return {
        restrict: 'A',
        link: function(scope, elm){

          $timeout(function(){
            $(elm).selectize({});
          }, 0);

        }
      };

    })

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
    }]);

}());
