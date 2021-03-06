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

  .service('SailPlayProfile', function (SailPlayApi, SailPlay, $q) {

    return class SailPlayProfile {

      constructor(){

        this.user = SailPlayApi.data('load.user.info');



      }
      logout() {

        SailPlay.send('logout');

      }
      login(type, from) {

        SailPlay.authorize(type, from);

      }
      tags_add(params, callback) {

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
          this.icon = params.icon || '';
          this.placeholder = params.placeholder;
          this.mask = params.mask;
          this.placeholder_char = params.placeholder_char;
          this.required = params.required;
          this.input = params.input || 'text';

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
              console.error("No fill tag_to_set_after_submit in config");
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

        scope.maskOptions = {
          addDefaultPlaceholder: true,
          clearOnBlur: true,
          maskDefinitions:  {
            '_': /[0-9]/,
            'd':/[0-3]/,
            'm':/[01]/,
            '1':/[0-1]/, 
            '2':/[0-2]/, 
            '3':/[0-3]/, 
            'y':/[12]/
          }
        }

        scope.sailplay.fill_profile = {
          config: config, form: {}
        };

        if (!config) {
          console.error('Provide fill_profile_config');
        }

        var saved_form = {};

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

                    // var bd = user.user.birth_date && user.user.birth_date.split('-');
                    // form_field.value = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];
                    // form_field.value = form_field.value.map(value => {
                    //   return value && value.toString().length == 1 ? '0' + value : value
                    // })
                    form_field.value = user.user.birth_date || '';
                    break;

                  case 'addPhone':
                    form_field.value = user.user.phone || '';
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

                  case 'subscriptions':
                    form_field.value = {
                      email: user.user.is_email_notifications || 0,
                      sms: user.user.is_sms_notifications || 0
                    };
                    break;

                }

                break;

            }
            console.log(form_field);
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
            
            const tagName = MAGIC_CONFIG.data.force_registration.tag_name;

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

        scope.sailplay.fill_profile.form.valid = function () {
          let required_fields = scope.sailplay.fill_profile.form.fields.filter(item => (item.required && item.type=='system'));
          return required_fields.every(field => field.value);
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
          
          if (req_user.sex && data_user && data_user.sex && data_user.sex == req_user.sex) {
            delete req_user.sex;
          }

          if (req_user.firstName && data_user && data_user.first_name && data_user.first_name == req_user.firstName) {
            delete req_user.firstName;
          }

          if (req_user.lastName && data_user && data_user.last_name && data_user.last_name == req_user.lastName) {
            delete req_user.lastName;
          }

          if (req_user.middleName && data_user && data_user.middle_name && data_user.middle_name == req_user.middleName) {
            delete req_user.middleName;
          }

          if (req_user.subscriptions && data_user.is_sms_notifications == req_user.subscriptions.sms) {
            delete req_user.subscriptions.sms;
          }

          if (req_user.subscriptions && data_user && data_user.is_email_notifications == req_user.subscriptions.email) {
            delete req_user.subscriptions.email;
          }

          if (!Object.keys(req_user.subscriptions || {}).length) {
            delete req_user.subscriptions;
          } else {
            req_user.subscriptions = JSON.stringify(req_user.subscriptions);
          }

          let verifyPhone = false;
          if(scope.sailplay.fill_profile.config.verify_changes && ~scope.sailplay.fill_profile.config.verify_changes.indexOf('addPhone') && req_user.addPhone) {
            verifyPhone = req_user.addPhone;
            delete req_user.addPhone;
          }

          // Make it via chains
          // if(scope.sailplay.fill_profile.config.verify_changes && ~scope.sailplay.fill_profile.config.verify_changes.indexOf('addEmail') && req_user.addEmail) {
          //   callback({status: "verify", identifier: 'email', value: req_user.addEmail})
          //   return;
          // }

          // if (req_user.birthDate) {
          //   var bd = angular.copy(req_user.birthDate);
          //   bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
          //   bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
          //   req_user.birthDate = bd.reverse().join('-');
          // }
          
          if (req_user.birthDate && data_user && data_user.birth_date && data_user.birth_date == req_user.birthDate) {
            delete req_user.birthDate;
          }


          // Check to the fill profile action (only system field)
          let fill_profile_flag = false;
          let required_fields = scope.sailplay.fill_profile.form.fields.filter(item => (item.required && item.type=='system'));
          fill_profile_flag = required_fields.every(field => field.value);

          console.log('fill_profile_flag',fill_profile_flag);
          console.log('req_user', req_user);
          console.log('required_fields',required_fields);
          console.log('required_fields',custom_user_vars);


          SailPlay.send('users.update', req_user, function (user_res) {

            if (user_res.status === 'ok') {

              if(fill_profile_flag) {
                SailPlay.send('tags.add', {tags: [MAGIC_CONFIG.data.FILL_PROFILE_TAG]})
              }

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
                    if (typeof callback == 'function') callback(req_user, user_res);
                    SailPlayApi.call('load.user.info', {all: 1, purchases: 1}, () => {
                      if(verifyPhone) {
                        callback({status: "verify", identifier: 'phone' ,value: verifyPhone})
                      }
                    });
                  })  
              } else {
                if (typeof callback == 'function') callback(req_user, user_res);
                SailPlayApi.call('load.user.info', {all: 1, purchases: 1}, () => {
                  if(verifyPhone) {
                    callback({status: "verify", identifier: 'phone' ,value: verifyPhone})
                  }
                });
              }

            } else {

              callback(null, user_res);
              scope.revert_profile_form();

            }

          });

        };

        scope.sailplay.fill_profile.get_selected_value = function (field) {

          return field.data.filter(item => item.value === field.value)[0];

        };

      }

    };

  })

  //new class for profile form
  .service('SailPlayProfileForm', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile, $timeout, MAGIC_CONFIG, fillProfileTag) {

    class SailPlayProfileForm {

      constructor(config){

        this.maskOptions = {
          addDefaultPlaceholder: true,
          clearOnBlur: true,
          maskDefinitions:  {
            '_': /[0-9]/,
            'd':/[0-3]/,
            'm':/[01]/,
            '1':/[0-1]/,
            '2':/[0-2]/,
            '3':/[0-3]/,
            'y':/[12]/
          }
        };

        this.config = config;

        this.form = {};

        this._form_cache = {};

        this.reg_incomplete = false;

        this.preventClose = false;

        if (!config) {
          console.error('Provide fill_profile_config');
        }

        SailPlayApi.observe('load.user.info', user => {
          if (!user) return;
          var form = this.form;
          var custom_fields = [];
          form.fields = this.config.fields.map(function (field) {
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

                    // var bd = user.user.birth_date && user.user.birth_date.split('-');
                    // form_field.value = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];
                    // form_field.value = form_field.value.map(value => {
                    //   return value && value.toString().length == 1 ? '0' + value : value
                    // })
                    form_field.value = user.user.birth_date || '';
                    break;

                  case 'addPhone':
                    form_field.value = user.user.phone || '';
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

                  case 'subscriptions':
                    form_field.value = {
                      email: user.user.is_email_notifications || 0,
                      sms: user.user.is_sms_notifications || 0
                    };
                    break;

                }

                break;

            }
            // console.log(form_field);
            return form_field;
          });

          form.auth_hash = SailPlay.config().auth_hash;
          //angular.extend(scope.profile_form.user, user.user);
          //if(ipCookie(FillProfile.cookie_name) && SailPlay.config().auth_hash === ipCookie(FillProfile.cookie_name).user.auth_hash ){
          //  angular.extend(scope.profile_form, ipCookie(FillProfile.cookie_name));
          //}
          // console.dir(form);

          this._form_cache = angular.copy(form);

          if (custom_fields.length) {
            SailPlayApi.call("vars.batch", { names: custom_fields.map(field => { return field.name }) }, (res) => {
              angular.forEach(res.vars, variable => {
                angular.forEach(custom_fields, field => {
                  if (field.name == variable.name) field.value = variable.value;
                })
              })
            })
          }

          form.auth_hash = SailPlay.config().auth_hash;

        });

      }
      revert(form) {
        if (form) {
          form.$setPristine();
          form.$setUntouched();
        }
        this.form = angular.copy(this._form_cache);
      }
      toggle_tag(arr, tag) {

        if (!tag) return;

        var index = arr.indexOf(tag);

        if (index > -1) {

          arr.splice(index, 1);

        } else {

          arr.push(tag);

        }

      }
      valid () {
        let required_fields = this.form.fields.filter(item => item.required);
        return required_fields.every(field => field.value);
      }
      submit(form, callback) {

        if (!form || !form.$valid) {
          return;
        }

        var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;
        var req_user = {},
          custom_user_vars = {};

        angular.forEach(this.form.fields, function (item) {
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

        if (req_user.sex && data_user && data_user.sex && data_user.sex == req_user.sex) {
          delete req_user.sex;
        }

        if (req_user.firstName && data_user && data_user.first_name && data_user.first_name == req_user.firstName) {
          delete req_user.firstName;
        }

        if (req_user.lastName && data_user && data_user.last_name && data_user.last_name == req_user.lastName) {
          delete req_user.lastName;
        }

        if (req_user.middleName && data_user && data_user.middle_name && data_user.middle_name == req_user.middleName) {
          delete req_user.middleName;
        }

        if (req_user.subscriptions && data_user.is_sms_notifications == req_user.subscriptions.sms) {
          delete req_user.subscriptions.sms;
        }

        if (req_user.subscriptions && data_user && data_user.is_email_notifications == req_user.subscriptions.email) {
          delete req_user.subscriptions.email;
        }

        if (!Object.keys(req_user.subscriptions || {}).length) {
          delete req_user.subscriptions;
        } else {
          req_user.subscriptions = JSON.stringify(req_user.subscriptions);
        }

        let verifyPhone = false;
        if(this.config.verify_changes && ~this.config.verify_changes.indexOf('addPhone') && req_user.addPhone) {
          verifyPhone = req_user.addPhone;
          delete req_user.addPhone;
        }

        // Make it via chains
        // if(scope.sailplay.fill_profile.config.verify_changes && ~scope.sailplay.fill_profile.config.verify_changes.indexOf('addEmail') && req_user.addEmail) {
        //   callback({status: "verify", identifier: 'email', value: req_user.addEmail})
        //   return;
        // }

        // if (req_user.birthDate) {
        //   var bd = angular.copy(req_user.birthDate);
        //   bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
        //   bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
        //   req_user.birthDate = bd.reverse().join('-');
        // }

        if (req_user.birthDate && data_user && data_user.birth_date && data_user.birth_date == req_user.birthDate) {
          delete req_user.birthDate;
        }


        // Check to the fill profile action (only system field)
        let fill_profile_flag = false;
        let required_fields = this.form.fields.filter(item => (item.required));
        fill_profile_flag = required_fields.every(field => field.value);

        console.log('fill_profile_flag',fill_profile_flag);
        console.log('req_user', req_user);
        console.log('required_fields',required_fields);
        console.log('required_fields',custom_user_vars);


        SailPlay.send('users.update', req_user, (user_res) => {

          if (user_res.status === 'ok') {

            if(fill_profile_flag) {
              SailPlay.send('tags.add', {tags: [MAGIC_CONFIG.data.FILL_PROFILE_TAG]})
            }

            if (Object.keys(custom_user_vars).length) {
              SailPlay.send('vars.add', {custom_vars: custom_user_vars}, (res_vars) => {
                if (!res_vars.status == 'ok')
                  $rootScope.$broadcast('notifier:notify', {
                    body: res_vars.message
                  });
              })
            }

            if(MAGIC_CONFIG.data.force_registration && MAGIC_CONFIG.data.force_registration.active) {
              fillProfileTag.checkSubmitForm(this.form.fields)
                .then((isValid)=>{
                  if(isValid){
                    const tagNameToSet = MAGIC_CONFIG.data.force_registration.tag_to_set_after_submit;
                    const tagNameMessage = MAGIC_CONFIG.data.force_registration.messageAfterSubmit;
                    const tagNameMessageUpdate = MAGIC_CONFIG.data.force_registration.messageAfterSubmitUpdate;
                    if(tagNameMessage || tagNameMessageUpdate){
                      $rootScope.$broadcast('notifier:notify', {
                        body: this.reg_incomplete ? tagNameMessage : tagNameMessageUpdate
                      });
                    }
                    $rootScope.submited = true;
                    if(this.reg_incomplete && MAGIC_CONFIG.data.force_registration.logout_after_submit){
                      SailPlayApi.call('logout')
                    }
                  }
                  if (typeof callback == 'function') callback(req_user, user_res);
                  SailPlayApi.call('load.user.info', {all: 1, purchases: 1}, () => {
                    if(verifyPhone) {
                      callback({status: "verify", identifier: 'phone' ,value: verifyPhone})
                    }
                  });
                })
            } else {
              if (typeof callback == 'function') callback(req_user, user_res);
              SailPlayApi.call('load.user.info', {all: 1, purchases: 1}, () => {
                if(verifyPhone) {
                  callback({status: "verify", identifier: 'phone' ,value: verifyPhone})
                }
              });
            }

          } else {

            callback && callback(null, user_res)
            this.revert();

          }

        });

      }
      get_selected_value(field) {

        return field.data.filter(item => item.value === field.value)[0];

      }
      completed(){

        return $q((resolve, reject) => {

          if (MAGIC_CONFIG.data.FILL_PROFILE_TAG){

            console.log(MAGIC_CONFIG.data.FILL_PROFILE_TAG);

            SailPlay.send('tags.exist', {tags: [MAGIC_CONFIG.data.FILL_PROFILE_TAG]}, (res) => {

              console.log(res);
              if (res && res.tags.length) {
                if (res.tags[0].exist) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }
            }, (err) => {
              reject(err);
            });

          }
          else {
            resolve(true);
          }

        })

      }


    }

    return SailPlayProfileForm;

  })

  .directive('sailplayVariableCheckbox', function () {

    return {
      restrict: 'A',
      controllerAs: 'SailplayVariableCheckbox',
      require: {
        NgModel: 'ngModel'
      },
      bindToController: true,
      controller: function () {

        this.value = {};

        this.$onInit = () => {

          this.NgModel.$render = () => {

            console.log(this.NgModel.$modelValue);

            if(this.NgModel.$modelValue) {

              let variables = this.NgModel.$modelValue.split('  ');

              variables.forEach((variable) => {

                this.value[variable] = true;

              });

              console.log(this.value);

            }

          };

        };

        this.change = () => {

          let parsed = [];

          for(let v in this.value) {

            if(this.value[v]) parsed.push(v);

          }

          this.NgModel.$setViewValue(parsed.join('  '))

        };

      }
    };

  })

  .filter('sailplay_profile_avatar', function () {

    return function (url, default_avatar) {

      if(default_avatar) {

        let is_default = url.includes('no_avatar');

        return is_default ? default_avatar : url;

      }
      else {

        return url;

      }

    }

  });

export default SailPlayProfile.name;