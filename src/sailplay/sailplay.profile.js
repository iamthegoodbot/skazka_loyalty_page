import angular from 'angular';

export let SailPlayProfile = angular.module('sailplay.profile', [])

/**
 * @ngdoc directive
 * @name sailplay.profile.directive:sailplayProfile
 * @scope
 * @restrict A
 *
 * @description
 * SailPlay profile directive used for rendering user's profile. =)
 *
 */
  .directive('sailplayProfile', function (SailPlayApi, SailPlay, $q) {

    return {

      restrict: 'A', replace: false, scope: true, link: function (scope) {

        /**
         * @ngdoc method
         * @name user
         * @methodOf sailplay.profile.directive:sailplayProfile
         * @description
         * Returns user's data stored in API service with key: 'load.user.info'
         *
         * @returns {Object} User's profile data
         */
        scope.user = SailPlayApi.data('load.user.info');

        /**
         * @ngdoc method
         * @name logout
         * @methodOf sailplay.profile.directive:sailplayProfile
         * @description
         * Logout current user, clear session cookies
         */
        scope.logout = function () {

          SailPlay.send('logout');

        };

        /**
         * @ngdoc method
         * @name login
         * @methodOf sailplay.profile.directive:sailplayProfile
         * @description
         * Login by type.
         * @param {string}  type   Authorization type.
         */
        scope.login = function (type) {

          SailPlay.authorize(type);

        };

        /**
         * @ngdoc method
         * @name tags_add
         * @methodOf sailplay.profile.directive:sailplayProfile
         * @description
         * Add array of tags to current_user or user in params
         * @param {object}  params   Object with params:  tags - array of tag names, user (optional)
         * @param {function}  callback   Not required attribute, used for callback action after success
         */
        scope.tags_add = function (params, callback) {

          if (!params) return;

          var tags = params.tags || [];

          if (tags.length > 0) {

            function chunk(array, chunkSize) {
              return [].concat.apply([], array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
              }));
            }

            var chunked_tags = chunk(tags, 10);

            var tag_promises = [];

            angular.forEach(chunked_tags, function (chunk) {

              var promise = $q(function (resolve, reject) {

                SailPlay.send('tags.add', {tags: chunk}, function (tags_res) {
                  if (tags_res.status === 'ok') {

                    resolve(tags_res);

                    //sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
                  } else {
                    reject(tags_res);
                    //sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
                  }
                });

              });

              tag_promises.push(promise);

            });

            $q.all(tag_promises).then(function (tags_res) {

              callback && callback(tags_res);

            });
          }

        };

      }

    };

  })

  /**
   * @ngdoc service
   * @name sailplay.profile.service:SailPlayFillProfileProvider
   * @description
   * data service for SailPlay profile editing
   */
  .provider('SailPlayFillProfile', function () {

    var profile_tag = 'Completed Profile';
    var cookie_name = 'sailplay_profile_form';

    return {

      set_tag: function (tag) {

        profile_tag = tag || profile_tag;

      },

      set_cookie_name: function (name) {

        cookie_name = name || cookie_name;

      },

      $get: function () {

        this.tag = profile_tag;

        this.cookie_name = cookie_name;

        this.Field = function (params) {

          this.type = params.type;
          this.name = params.name;
          this.label = params.label;
          this.placeholder = params.placeholder;
          this.input = params.input || 'text';
          this.can_edit = params.can_edit || false;

          if (params.data) {
            this.data = params.data;
          }

          this.value = '';

        };

        return this;

      }

    };

  })

  /**
   * @ngdoc directive
   * @name sailplay.profile.directive:sailplayFillProfile
   * @restrict A
   *
   * @param {object}  config   Config object for fill profile. Fields will be constructed from config.fields.
   *
   * @description
   * SailPlay profile directive implements user's profile editing.
   * This directive extends parent scope with property: sailplay.fill_profile
   *
   */
  .directive('sailplayFillProfile', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile, $http, MAGIC_CONFIG) {

    return {

      restrict: 'A', scope: false, link: function (scope, elm, attrs) {

        var config = scope.$eval(attrs.config);

        scope.sailplay = scope.sailplay || {};

        scope.sailplay.fill_profile = {
          config: config, form: {}, name: {}
        };

        if (!config) {
          console.error('Provide fill_profile_config');
        }

        var saved_form = false;

        function build_user(user) {
          if (!user) return;
          var form = scope.sailplay.fill_profile.form;
          var custom_fields = [];
          form.fields = config.fields.map(function (field) {
            var form_field = new SailPlayFillProfile.Field(field);
            if (field.type == 'variable')
              custom_fields.push(form_field);

            //we need to assign received values to form
            switch (form_field.type) {

              //we need define type
              case 'system':
                //bind different values to form field
                switch (form_field.name) {

                  case 'firstName':

                    form_field.value = user.user.first_name || '';
                    break;

                  case 'lastName':

                    form_field.value = user.user.last_name || '';
                    break;

                  case 'middleName':

                    form_field.value = user.user.middle_name || '';
                    break;

                  case 'birthDate':

                    form_field.value = user.user.birth_date && user.user.birth_date.split('-').reverse().join('-') || '';
                    break;

                  case 'addPhone':
                    form_field.value = user.user.phone || '';
                    break;

                  case 'subscriptions':
                    form_field.value = {
                      email: user.user.is_email_notifications || 0,
                      sms: user.user.is_sms_notifications || 0
                    };
                    break;

                  case 'addEmail':

                    form_field.value = user.user.email || '';
                    break;

                  case 'sex':

                    form_field.value = user.user.sex || '';
                    break;

                }

                break;

            }

            return form_field;
          });

          form.auth_hash = SailPlay.config().auth_hash;

          saved_form = angular.copy(form);

          if (custom_fields.length) {
            SailPlayApi.call("vars.batch", {
              names: custom_fields.map(field => {
                return field.name
              })
            }, (res) => {
              angular.forEach(res.vars, variable => {
                angular.forEach(custom_fields, field => {
                  if (field.name == variable.name) field.value = variable.value;
                })
              })
            })
          }

          form.auth_hash = SailPlay.config().auth_hash;

          saved_form = angular.copy(form);

          if (scope.$root.$$phase != '$digest' && scope.$root.$$phase != '$apply')
            scope.$digest();
        }

        SailPlayApi.observe('load.user.info', build_user);

        scope.revert_profile_form = function (form) {
          if (form) {
            form.$setPristine();
            form.$setUntouched();
          }
          scope.sailplay.fill_profile.form = angular.copy(saved_form);
        };

        scope.toggle_tag = function (arr, tag) {

          if (!tag) return;

          var index = arr.indexOf(tag);

          if (index > -1) {

            arr.splice(index, 1);

          } else {

            arr.push(tag);

          }

        };

        scope.sailplay.fill_profile.change_avatar = function () {

          if (!scope.sailplay.fill_profile.avatar) {
            return;
          }

          let callback_name = 'sailplay_change_avatar_callback';
          let fd = new FormData();

          fd.append('avatar', scope.sailplay.fill_profile.avatar);

          let config = SailPlay.config().DOMAIN + SailPlay.config().urls.users.update;

          config += '?auth_hash=' + SailPlay.config().auth_hash;
          config += '&callback=' + callback_name;

          window[callback_name] = function (res) {
            if (res.status == 'ok') {
              SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
            } else {
              $rootScope.$broadcast('notifier:notify', {
                body: res.message
              });
            }
          };

          return $http.post(config, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }).then(function (res) {
            eval(res.data);
          });

        };

        scope.sailplay.fill_profile.focus = function (event, field) {
          scope.sailplay.fill_profile.clear();
          if (field) field.editing = true;
          if (!event || !event.target || !event.target.parentNode) return;
          var par = event.target.parentNode;
          var input;
          setTimeout(function () {
            input = angular.element(par.querySelector("input"));
            if (input.length) {
              input[0].focus();
            }
          }, 50);
        };

        scope.sailplay.fill_profile.clear = function () {
          angular.forEach(scope.sailplay.fill_profile.form.fields, function (item) {
            item.editing = false;
          })
        };

        scope.sailplay.fill_profile.password = {
          show: false,
          pass1: null,
          pass2: null
        };

        scope.sailplay.fill_profile.change_name = function (form, callback) {
          if (!form) return;
          SailPlay.send('users.update', form, function (user_res) {
            if (user_res.status === 'ok') {
              scope.$apply(function () {
                scope.sailplay.fill_profile.name = {
                  show: false,
                  first_name: null,
                  last_name: null,
                };
                if (typeof callback == 'function') callback();
                SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
              });

            } else {
              scope.$apply(function () {
                $rootScope.$broadcast('notifier:notify', {
                  body: user_res.message
                });
              });
            }

          });
        };

        scope.sailplay.fill_profile.change_password = function (password, callback) {
          if (!password) return;
          var data = {};
          data.addPass = password;
          SailPlay.send('users.update', data, function (user_res) {
            if (user_res.status === 'ok') {
              scope.$apply(function () {
                scope.sailplay.fill_profile.password = {
                  show: false,
                  pass1: null,
                  pass2: null
                };
                if (typeof callback == 'function') callback();
                SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
              });

            } else {
              scope.$apply(function () {
                $rootScope.$broadcast('notifier:notify', {
                  body: user_res.message
                });
              });
            }
          });
        };

        scope.sailplay.fill_profile.submit = function (form, callback) {

          // console.log('form', form);
          // console.log('form.$valid', form.$valid);
          // if (!form || !form.$valid) {
          //   return;
          // }

          var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;
          var req_user = {},
            custom_user_vars = {};

          var fields = angular.copy(scope.sailplay.fill_profile.form.fields);

          angular.forEach(fields, function (item) {
            if (!item.value) return;
            if (item.type == 'variable') {
              custom_user_vars[item.name] = item.value
            } else {
              req_user[item.name] = item.value;
            }
          });

          if (req_user.addPhone && data_user && data_user.phone && data_user.phone.replace(/\D/g, '') == req_user.addPhone.replace(/\D/g, '')) {
            delete req_user.addPhone;
          }

          if (req_user.subscriptions && data_user.is_sms_notifications == req_user.subscriptions.sms) {
            delete req_user.subscriptions.sms;
          }

          if (req_user.subscriptions && data_user && data_user.is_email_notifications == req_user.subscriptions.email) {
            delete req_user.subscriptions.email;
          }

          if (!Object.keys(req_user.subscriptions).length) {
            delete req_user.subscriptions;
          } else {
            req_user.subscriptions = JSON.stringify(req_user.subscriptions);
          }

          if (req_user.sex && data_user && data_user.sex && data_user.sex == req_user.sex) {
            delete req_user.sex;
          }

          if (req_user.addEmail && data_user && data_user.email && data_user.email == req_user.addEmail) {
            delete req_user.addEmail;
          }

          if (req_user.birthDate && data_user && data_user.birth_date && data_user.birth_date.split('-').reverse().join('-') == req_user.birthDate) {
            delete req_user.birthDate;
          }

          if (!Object.keys(req_user).length && !Object.keys(custom_user_vars).length) {
            build_user(SailPlayApi.data('load.user.info')());
            return;
          }

          SailPlay.send('users.update', req_user, function (user_res) {

            if (user_res.status === 'ok') {

              if (Object.keys(custom_user_vars).length) {
                SailPlay.send('vars.add', {custom_vars: custom_user_vars}, (res_vars) => {
                  if (!res_vars.status == 'ok')
                    $rootScope.$broadcast('notifier:notify', {
                      body: res_vars.message
                    });
                })
              }

              scope.$apply(function () {

                if (typeof callback == 'function') callback();

                SailPlayApi.call('load.user.info', {all: 1, purchases: 1});

              });

            } else {


              $rootScope.$broadcast('notifier:notify', {
                body: MAGIC_CONFIG.data.profile.errors[user_res.status_code] || user_res.message
              });

              SailPlayApi.call('load.user.info', {all: 1, purchases: 1});

              scope.$apply();

            }

          });

        };

        function clear_edit(e) {
          scope.$apply(function () {
            build_user(SailPlayApi.data('load.user.info')());
          });
        }

        angular.element(document.body).bind('click', clear_edit)

      }

    };

  });

export default SailPlayProfile.name;