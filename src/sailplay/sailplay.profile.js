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
          this.required = params.required
          this.input = params.input || 'text';
          this.showLabel = params.showLabel;

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
   * @ngdoc factory
   * @name sailplay.profile.factory:fillProfileTag
   *
   * @param {object} form   Fields from edit user profile form
   *
   * @description
   * Factory for checking user profile after signup
   *   
   */

  .factory('fillProfileTag', (SailPlay, SailPlayApi, MAGIC_CONFIG, $q, $rootScope) => {
    const obj = {
    }
    obj.checkSubmitForm = function(form){
      return $q((res, rej) => {
        if(MAGIC_CONFIG.data.force_registration && MAGIC_CONFIG.data.force_registration.active){
          const config = MAGIC_CONFIG.data.force_registration
          const requiredFields = config.required_fields
          const isProfileFilled = requiredFields.reduce((acc, x)=>{
            const field = form.find((field)=>{
                return field.name == x
              })
            if(field === void 0) {
              return false
            }
            if( Object.prototype.toString.call( field.value ) === '[object Array]' ) {
              return (field.value.length === 3) && Object.keys(field.value).reduce(function(acc, key, index) {
                 return !!field.value[key] && acc
              }, true)
            } else {
              return acc && !!field.value
            }
          }, true)
          if(isProfileFilled){
            if(MAGIC_CONFIG.data.force_registration.tag_to_set_after_submit){
              const tagName = MAGIC_CONFIG.data.force_registration.tag_to_set_after_submit
              SailPlay.send('tags.add',{tags:[tagName]},()=>{
                res(true)
              })
            } else {
              console.error("No fill tag_to_set_after_submit in config")
              res(true)
            }
          } else {
            res(false)
          }
        } else {
          res(true)
        }
      })
    }
    return obj
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
  .directive('sailplayFillProfile', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile, $timeout, MAGIC_CONFIG, fillProfileTag) {

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
          form.fields = config.fields.map(function (field) {
            var form_field = new SailPlayFillProfile.Field(field);
            if (field.type == 'variable') 
              custom_fields.push(form_field)
            
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
                    form_field.value = user.user.phone.slice(1) || '';
                    break;

                  case 'addEmail':

                    form_field.value = user.user.email || '';
                    break;

                  case 'addOid':

                    form_field.value = user.user.origin_user_id || '';
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
          // console.dir(form);

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

          if (MAGIC_CONFIG.data.force_registration && MAGIC_CONFIG.data.force_registration.active && MAGIC_CONFIG.data.force_registration.tag_name && !$rootScope.submited){
            
            const tagName = MAGIC_CONFIG.data.force_registration.tag_name

            SailPlay.send('tags.exist', {tags: [tagName]}, function (res) {
              if (res && res.tags.length) {
                if (!res.tags[0].exist) {
                  $timeout(function(){
                    scope.$parent.reg_incomplete = true;
                    scope.$parent.preventClose = true;
                    $rootScope.$broadcast('openProfile');
                  }, 10)
                } else {
                  scope.$parent.reg_incomplete = false;
                  scope.$parent.preventClose = false;
                }
              }
            })
          }

          form.auth_hash = SailPlay.config().auth_hash;

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

          if (!form || !form.$valid) {
            return;
          }

          var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;         
          var req_user = {},
            custom_user_vars = {};

          angular.forEach(scope.sailplay.fill_profile.form.fields, function (item) {
            if (item.type == 'variable') {
              custom_user_vars[item.name] = item.value
            } else
              req_user[item.name] = item.value;
          });

          if (req_user.addPhone && data_user && data_user.phone && data_user.phone.replace(/\D/g, '') == req_user.addPhone.replace(/\D/g, '')) {
            delete req_user.addPhone;
          }
          
          if (req_user.addEmail && data_user && data_user.email && data_user.email == req_user.addEmail) {
            delete req_user.addEmail;
          }

          if (req_user.addOid && data_user && data_user.origin_user_id && data_user.origin_user_id == req_user.addOid) {
            delete req_user.addOid;
          }

          if (req_user.birthDate) {
            var bd = angular.copy(req_user.birthDate);
            bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
            bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
            req_user.birthDate = bd.reverse().join('-');
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

              if(MAGIC_CONFIG.data.force_registration && MAGIC_CONFIG.data.force_registration.active) {
                fillProfileTag.checkSubmitForm(scope.sailplay.fill_profile.form.fields)
                  .then((isValid)=>{
                    if(isValid){
                      const tagNameToSet = MAGIC_CONFIG.data.force_registration.tag_to_set_after_submit
                      const tagNameMessage = MAGIC_CONFIG.data.force_registration.messageAfterSubmit
                      const tagNameMessageUpdate = MAGIC_CONFIG.data.force_registration.messageAfterSubmitUpdate
                      if(tagNameMessage || tagNameMessageUpdate){
                        $rootScope.$broadcast('notifier:notify', {
                          body: scope.$parent.reg_incomplete ? tagNameMessage : tagNameMessageUpdate
                        });
                      }
                      $rootScope.submited = true;
                      if(scope.$parent.reg_incomplete && MAGIC_CONFIG.data.force_registration.logout_after_submit){
                        SailPlayApi.call('logout')
                      }
                    }
                    if (typeof callback == 'function') callback();
                    SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
                  })  
              } else {
                if (typeof callback == 'function') callback();
                SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
              }

            } else {

              if(user_res.status == 'error' &&
                MAGIC_CONFIG.data.force_registration.active &&
                MAGIC_CONFIG.data.force_registration.errors &&
                MAGIC_CONFIG.data.force_registration.errors[user_res.status_code]){
                user_res.message = MAGIC_CONFIG.data.force_registration.errors[user_res.status_code]
              }

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