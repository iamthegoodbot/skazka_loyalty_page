(function () {

  angular.module('sp.actions', [])

    .service('tests_service', function ($http) {

      var that = this;

      var data = [];

      that.getData = function () {

        return data;

      };

      that.loadData = function (callback) {

        $http.get('./dist/json/tests.json').success(function (res) {

          data = res;
          callback && callback(res)

        });

      };

      return that;

    })


    .constant('actions_data', {
      "social": {
        "fb": {
          "partner_page": {
            "name": "Рассказать в Facebook",
            "pic": "dist/img/icon_fb.png"
          },
          "like": {
            "name": "Подписаться в Facebook",
            "pic": "dist/img/icon_fb.png"
          }
        },
        "vk": {
          "partner_page": {
            "name": "Рассказать в ВКонтакте",
            "pic": "dist/img/icon_vk.png"
          },
          "like": {
            "name": "Вступить в группу в ВКонтакте",
            "pic": "dist/img/icon_vk.png"
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать в twitter",
            "pic": "dist/img/icon_tw.png"
          },
          "like": {
            "name": "Вступить в группу в twitter",
            "pic": "dist/img/icon_tw.png"
          }
        },
        "ok": {
          "partner_page": {
            "name": "Рассказать в Одноклассниках",
            "pic": "dist/img/icon_ok.png"
          },
          "like": {
            "name": "Вступить в группу в Одноклассниках",
            "pic": "dist/img/icon_ok.png"
          }
        }

      }
    })

    .directive('sailplayActions', function (sp_api, sp, actions_data, $timeout, user_service, $rootScope, tests_service, ipCookie) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');
          scope.user = sp_api.data('load.user.info');
          scope.exist = sp_api.data('tags.exist');
          scope.test_data = tests_service.getData;
          scope.current_test = null;

          if (!ipCookie('sailplay_vars')) {

            ipCookie('sailplay_vars', {});

          }

          scope.vars = angular.copy(ipCookie('sailplay_vars'));


          scope.getExist = function (data, name) {
            if (!data || !name) return;
            var el = data.tags.filter(function (item) {
              return item.name == name;
            })[0];
            return el && el.exist || false;
          };

          scope.openTest = function (test) {
            scope.current_test = test;
          };

          scope.form = {};

          sp.on('load.user.info.success', function () {
            scope.form = {
              firstName: scope.user && scope.user() && scope.user().user.first_name,
              lastName: scope.user && scope.user() && scope.user().user.last_name,
              middleName: scope.user && scope.user() && scope.user().user.middle_name,
              addEmail: scope.user && scope.user() && scope.user().user.email,
              addPhone: scope.user && scope.user() && scope.user().user.phone
            };
          });

          scope.isValid = function () {

            if (!scope.user || !scope.user()) {
              return;
            }

            var form = angular.copy(scope.form);

            if (
              (form.firstName)
              && (form.lastName)
              && (form.middleName)
              && (form.addPhone)
              && (user_service.validateEmail(form.addEmail))
            ) {
              if (
                (scope.user().user.first_name == form.firstName)
                && (scope.user().user.last_name == form.lastName)
                && (scope.user().user.middle_name == form.middleName)
                && (scope.user().user.phone == form.addPhone.replace(/\D/g, ''))
                && (scope.user().user.email == form.addEmail)
              ) {

                if(!angular.equals(scope.vars, ipCookie('sailplay_vars'))) {

                  return true;

                } else {

                  return false;

                }


              } else {

                return true;

              }
            }
            return false;
          };

          scope.save_profile = function () {

            if (scope.isValid()) {

              var form = angular.copy(scope.form);

              if (scope.user().user.first_name == form.firstName) {
                delete form.firstName;
              }

              if (scope.user().user.last_name == form.lastName) {
                delete form.lastName;
              }

              if (scope.user().user.middle_name == form.middleName) {
                delete form.middleName;
              }

              if (scope.user().user.email == form.addEmail) {
                delete form.addEmail;
              }

              if (scope.user().user.phone == form.addPhone.replace(/\D/g, '')) {
                delete form.addPhone;
              }

              if (!Object.keys(form).length) {

                sendVars();

              } else {

                sp_api.call('users.update', form);

              }

            }

          };

          sp.on('users.update.error', function (res) {

            var mes;

            switch (res.status_code) {
              case -200002:
                mes = 'Имя и Фамилия должны иметь длину до 50 символов.';
                break;
              case -200007:
                mes = 'Такой телефон уже используется.';
                break;
              case -200010:
                mes = 'Такой email уже используется.';
                break;
              default:
                mes = res.message;
            }

            $rootScope.$broadcast('notifier:notify', {

              header: 'Ошибка',
              body: mes

            });

          });

          sp.on('users.update.success', function () {

            sp_api.call('tags.add', {tags: [user_service.getTags().fill_profile]}, function () {

              sendVars();

            });

          });

          function sendVars() {

            if (scope.vars && Object.keys(scope.vars).length) {

              sp_api.call('vars.add', {custom_vars: scope.vars}, function () {

                ipCookie('sailplay_vars', angular.copy(scope.vars));

                closeProfile();

              });

            } else {

              closeProfile();

            }

          }

          function closeProfile() {

            scope.$apply(function(){

              $rootScope.$broadcast('notifier:notify', {

                header: 'Информация обновлена'

              });

            });

            $('.mb_item_prof').removeClass('act');
            $('.mb_popup_prof').slideUp();
          }

          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          sp.on('actions.perform.success', function (res) {

            scope.$apply(function () {

              scope.on_perform && scope.on_perform(res);

            });


          });

          scope.action_data = function (action) {

            var data = {};

            if (!action) return data;

            data = action;

            if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

            return data;

          };

        }

      };

    })

    .directive('sailplayAction', function (sp, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm) {

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/1d4796587373184fefd8b608e6eba603.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

    .directive('sailplayTest', function (sp, sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, elm) {

          var TAGS_ADD_LIMIT = 10;

          scope.step = 1;

          scope.writable = false;

          scope.writable_model = null;

          scope.current_model = null;

          var _empty = {
            tags: [],
            vars: {}
          };

          scope.send_data = angular.copy(_empty);

          scope.set_answer = function () {

            if (scope.current_model) {

              if (scope.current_model.writable && scope.writable_model) {

                scope.send_data.vars[scope.current_model.tag.slice(0, 100)] = scope.writable_model;

              } else {

                if (angular.isArray(scope.current_model)) {

                  scope.send_data.tags = scope.send_data.tags.concat(scope.current_model.map(function (item) {
                    return item.tag.slice(0, 100);
                  }))

                } else {

                  scope.send_data.tags.push(scope.current_model.tag.slice(0, 100));

                }

              }

              scope.next()

            }

          };

          scope.next = function () {

            scope.writable = false;

            scope.writable_model = false;

            scope.current_model = null;

            var next = scope.step + 1;

            scope.current_test.model_for_radio = null;

            if (next <= scope.current_test.data.length) {

              scope.step = next;

            } else {

              scope.send_data.tags.push(scope.current_test.tag.slice(0, 100));

              tags_add(scope.send_data.tags.slice(0, TAGS_ADD_LIMIT));

              function tags_add(tags) {

                sp_api.call('tags.add', {tags: tags}, function () {

                  scope.send_data.tags = scope.send_data.tags.slice(TAGS_ADD_LIMIT);

                  if (scope.send_data.tags.length != 0) {

                    tags_add(scope.send_data.tags.slice(0, TAGS_ADD_LIMIT));

                    return;

                  }

                  if (Object.keys(scope.send_data.vars).length) {

                    sp_api.call('vars.add', {custom_vars: scope.send_data.vars}, function () {

                      scope.clear();

                    });

                  } else {

                    scope.clear();

                  }

                })

              }


            }

          };

          scope.clear = function () {

            scope.send_data = angular.copy(_empty);

            $rootScope.$broadcast('notifier:notify', {

              header: 'Спасибо!',
              body: 'Нам очень важна информация о наших клиентах. Гарантируем, мы будем использовать её разумно и не передавать третьим лицам.'

            });

            $('.mb_item_prof_opr').removeClass('act');

            $('.mb_popup_op').slideUp(function () {

              scope.step = 1;

              scope.writable = true;

              scope.writable_model = null;

              scope.current_model = null;

              scope.current_test = null;

            });

          };

          scope.on_change = function (item, value, type) {


            if (type == 'radio') {

              scope.current_model = item;

            } else if (type == 'checkbox') {

              scope.current_model = angular.isArray(scope.current_model) ? scope.current_model : [];

              if (!value) {

                scope.current_model = scope.current_model.filter(function (it) {
                  return it.label !== item.label;
                });

              } else {

                scope.current_model.push(item);

              }

            }

            if (item) {
              if (item.writable) {
                scope.writable = true;
              } else {
                scope.writable = false;
              }
              scope.writable_model = null;
            }

          };

          scope.isSelectable = function () {
            return scope.current_model ? angular.isArray(scope.current_model) ? scope.current_model.length : scope.current_model.writable && scope.writable_model ? true : !scope.current_model.writable ? true : false : false;
          }

        }

      };

    });

}());
