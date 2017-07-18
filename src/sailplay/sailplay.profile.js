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
         * @param {object}  from   Where it call.
         */
        scope.login = function (type, from) {

          SailPlay.authorize(type, from);

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
          this.tag_on = params.tag_on;
          this.tag_off = params.tag_off;
          this.required = params.required;
          this.once = params.once;

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
  .directive('sailplayFillProfile', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile) {

    return {

      restrict: 'A', scope: false, link: function (scope, elm, attrs) {

        var config = scope.$eval(attrs.config);

        scope.sailplay = scope.sailplay || {};

        scope.sailplay.fill_profile = {
          config: config, form: {}
        };

        if (!config) {
          console.error('Provide fill_profile_config');
        }

        var saved_form = false;

        SailPlayApi.observe('load.user.info', user => {
          if (!user) return;
          var form = scope.sailplay.fill_profile.form;
          var custom_fields = [];
          var tag_fields = []

          $rootScope.cannot_close = false;
          form.fields = config.fields.map(function (field) {
            var form_field = new SailPlayFillProfile.Field(field);
            if (field.type == 'variable')
              custom_fields.push(form_field)
            
            if (field.type == 'tags')
              tag_fields.push(form_field)

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

                    var bd = user.user.birth_date && user.user.birth_date.split('-');
                    form_field.value = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];
                    break;

                  case 'addPhone':
                    form_field.value = user.user.phone || '';
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
          //angular.extend(scope.profile_form.user, user.user);
          //if(ipCookie(FillProfile.cookie_name) && SailPlay.config().auth_hash === ipCookie(FillProfile.cookie_name).user.auth_hash ){
          //  angular.extend(scope.profile_form, ipCookie(FillProfile.cookie_name));
          //}
          console.dir(form);
          saved_form = angular.copy(form);                        

          if (custom_fields.length) {            
            SailPlayApi.call("vars.batch", { names: custom_fields.map(field => { return field.name }) }, (res) => {
              angular.forEach(res.vars, variable => {                
                angular.forEach(custom_fields, field => {
                  if (field.name == variable.name) field.value = variable.value;
                })
              })
            })
          }

          if (tag_fields.length) {
            var tags_to_test = [];

            angular.forEach(tag_fields.reduce( (prev, next) => {
              if (!next.data) 
                return prev.concat(next.tag_on)
              return prev.concat(next.data.reduce( (_prev, _next) => _prev.concat(_next.tag_on), [] ))
            }, []), el => el && tags_to_test.push(el))

            
            var i, j, temparray, chunk = 10;
            for (i = 0,j = tags_to_test.length; i < j; i += chunk) {
                temparray = tags_to_test.slice(i,i+chunk);
                SailPlayApi.call('tags.exist', { tags: temparray }, res => {
                  angular.forEach(res.tags, tag => {
                    angular.forEach(tag_fields, tag_field => {
                      if (tag_field.required) {
                        $rootScope.cannot_close = true;
                      }

                      if (!tag_field.data && tag_field.tag_on == tag.name) {
                        if (tag.exist) {
                          $rootScope.cannot_close = false;                          
                          tag_field.disable = tag_field.once;
                          tag_field.value = true;
                        }
                      }

                      angular.forEach(tag_field.data, (tag_field_item, index) => {
                        if (tag_field_item.tag_on == tag.name && tag.exist) {
                          switch (tag_field.input) {
                            case 'radiolist':
                              $rootScope.cannot_close = false;
                              tag_field.value = index;
                              tag_field.disable = tag_field.once;
                              break;
                            case 'checklist':
                              tag_field['value_' + index] = true;
                              break;
                          }
                        }
                      })

                    })
                  })
                })
            }                
          }

          form.auth_hash = SailPlay.config().auth_hash;
          //angular.extend(scope.profile_form.user, user.user);
          //if(ipCookie(FillProfile.cookie_name) && SailPlay.config().auth_hash === ipCookie(FillProfile.cookie_name).user.auth_hash ){
          //  angular.extend(scope.profile_form, ipCookie(FillProfile.cookie_name));
          //}
          console.dir(form);
          saved_form = angular.copy(form);

          if (scope.$root.$$phase != '$digest')
            scope.$digest();
        });

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

        scope.sailplay.fill_profile.submit = function (form, callback) {
          scope.submitted = true;

          if (!form || !form.$valid) {
            return;
          }

          $rootScope.preloader = true;
          $rootScope.cannot_close = false;
          var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;         
          var req_user = {},
            custom_user_vars = {},
            tag_to_applied = [],
            tag_to_unapplied = [];

          angular.forEach(scope.sailplay.fill_profile.form.fields, function (item) {
            switch (item.type) {
              case 'variable':
                custom_user_vars[item.name] = item.value
                break;
              case 'tags':
                if (!item.data && item.input == 'checkbox') {
                  if (item.value) {
                    item.tag_on && tag_to_applied.push(item.tag_on);
                    item.tag_off && tag_to_unapplied.push(item.tag_off)                    
                  } else {
                    item.tag_on && tag_to_unapplied.push(item.tag_on);
                    item.tag_off && tag_to_applied.push(item.tag_off)                       
                  }
                } else
                  angular.forEach(item.data, function(i, index) {
                    if (item.input == 'radiolist' && index == item.value || 
                      item.input == 'checklist' && item['value_' + index]) {
                      i.tag_on && tag_to_applied.push(i.tag_on);
                      i.tag_off && tag_to_unapplied.push(i.tag_off)
                    } else {
                      i.tag_on && tag_to_unapplied.push(i.tag_on)
                      i.tag_off && tag_to_applied.push(i.tag_off)
                    }
                  })
                break;
              default: 
                req_user[item.name] = item.value;                
            }
          });

          if (req_user.addPhone && data_user && data_user.phone && data_user.phone.replace(/\D/g, '') == req_user.addPhone.replace(/\D/g, '')) {
            delete req_user.addPhone;
          }

          if (req_user.addEmail && data_user && data_user.email && data_user.email == req_user.addEmail) {
            delete req_user.addEmail;
          }

          if (req_user.birthDate) {
            var bd = angular.copy(req_user.birthDate);
            bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
            bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
            req_user.birthDate = bd.reverse().join('-');
          }

          SailPlay.send('users.update', req_user, function (user_res) {
            if (user_res.status === 'ok') {

              var promises = [];

              var i, j, temparray, chunk = 10;
              for (i = 0,j = tag_to_applied.length; i < j; i += chunk) {
                  temparray = tag_to_applied.slice(i,i+chunk);
                  promises.push(new Promise( resolve => SailPlay.send('tags.add', { tags: temparray }, resolve) ))
              }


              var i, j, temparray, chunk = 10;
              for (i = 0,j = tag_to_unapplied.length; i < j; i += chunk) {
                  temparray = tag_to_unapplied.slice(i,i+chunk);
                  promises.push(new Promise( resolve => SailPlay.send('tags.delete', { tags: temparray }, resolve) ))
              }

              if (Object.keys(custom_user_vars).length) {
                promises.push(new Promise( resolve => SailPlay.send('vars.add', { custom_vars: custom_user_vars }, resolve) ))
              }

              Promise.all(promises).then( () => {
                scope.$apply(function () {

                  if (typeof callback == 'function') callback();
                  $rootScope.preloader = false;

                  SailPlayApi.call('load.user.info', {all: 1});

                });
              })

            } else {

              $rootScope.$broadcast('notifier:notify', {
                body: user_res.message
              });

              scope.$apply();

            }

          });

        };

      }

    };

  });

export default SailPlayProfile.name;