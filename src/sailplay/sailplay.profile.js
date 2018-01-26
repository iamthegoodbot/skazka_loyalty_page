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
  .directive('sailplayFillProfile', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile, MAGIC_CONFIG) {

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
          var tags_fields = [];
          // console.info('fields', config.fields)
          form.fields = config.fields.map(function (field) {
            var form_field = new SailPlayFillProfile.Field(field);
            if (field.type == 'variable') 
              custom_fields.push(form_field)

            if (field.type == 'tags') {
              tags_fields.push(form_field)
              if(form_field.input == 'checkbox-tag') {
                // TODO дети тут
                let found = form_field.data.find(v=>v.isChildren)
                // console.log('fnd', found.childrenVarName)
                SailPlayApi.call("vars.batch", { names: [found.childrenVarName] }, (res) => {
                  var childrenVariable = JSON.parse(res.vars[0] && res.vars[0].value || '{}')

                  if(childrenVariable && childrenVariable.length) {
                    found.childArray = childrenVariable.map(item=>{return {age: item.age}});
                  } else {
                    found.childArray = []
                  }

                })
              }
              // console.log('enfield',form_field)
            }

            
            //we need to assign received values to form
            console.info(form_field)
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

                form_field.oldVal = form_field.value
                    

                break;

            }

            return form_field;
          });

          // console.info(tags_fields)

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
                  if (field.name == variable.name) {
                    field.value = variable.value;
                    field.oldVal = field.value
                  }
                })
              })
            })
          }

          if (tags_fields.length) {
            let tags = [];
            angular.forEach(tags_fields, field => {
              tags = tags.concat(field.data.map(item => item.tag))
            })

            if (tags.length) {

              let chunkedTags = tags.reduce((acc, v, k) => {
                if (acc[acc.length - 1].length == 10) {
                  acc.push([v])
                } else {
                  acc[acc.length - 1].push(v)
                }
                return acc
              }, [[]])
              let tagsPromises = chunkedTags.map(tagsArray => {
                return new Promise((res) => {
                  SailPlay.send('tags.exist', {tags: tagsArray}, (res_vars) => {
                    if (!res_vars.status == 'ok')
                      $rootScope.$broadcast('notifier:notify', {
                        body: res_vars.message
                      });
                    res(res_vars)
                  })
                })
              })

              let existPromises = Promise.all(tagsPromises)
                .then((arraysRes)=>{
                  return arraysRes.reduce((acc, v, k)=>{
                    // console.log(acc)
                    return acc.concat(v.tags)
                  }, [])
                })
                .then((flatRes)=>{
                  // console.info('flatres', flatRes)
                  flatRes.forEach((tag)=>{
                    angular.forEach(tags_fields, field => {
                      angular.forEach(field.data, tag_field => {
                        if (tag_field.tag == tag.name) {
                          tag_field.value = tag.exist
                          if(tag.exist){
                            field.value = tag_field.tag
                            field.oldVal = field.value
                          } else if (!field.oldVal){
                            field.oldVal = ""
                          }
                          // console.log(tag_field, tag)
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
          // console.log(form.fields.map(x=>x.value));
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


        scope.sailplay.fill_profile.submit = function (form, callback, options) {

          if (!form || !form.$valid) {
            return;
          }

          if(!options) {
            options = {}
          }

          var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;         
          var req_user = {},
            custom_user_vars = {},
            custom_user_tags_add = [],
            custom_user_tags_delete = [],
            hasChangesTagCondition = false,
            hasUpdatedEmailCondition = false;

          angular.forEach(scope.sailplay.fill_profile.form.fields, function (item) {
            if(!(item.value === item.oldVal) && !(!item.hasOwnProperty('oldVal') && item.value == "")){
              // console.log(item, 'changed field')
              hasChangesTagCondition = true
            }
            if (item.type == 'variable') {
              custom_user_vars[item.name] = item.value
            } else if (item.type =="tags" ){
              // console.log('itempre', item)
              if(item.input=="checkbox-tag") {
                // console.log('chitem', item)
                item.data.forEach(v => {
                  if(v.value){
                    custom_user_tags_add.push(v.tag)
                    if(v.isChildren){
                      custom_user_vars[v.childrenVarName] = JSON.stringify(v.childArray)
                    }
                  } else {
                    custom_user_tags_delete.push(v.tag)
                  }
                })
              } else if(!(item.value === item.oldVal)) {
                item.data.forEach(v => {
                  if(v.tag === item.value){
                    custom_user_tags_add.push(v.tag)
                  } else {
                    custom_user_tags_delete.push(v.tag)
                  }
                })
              }
            } else if (item.type !="tags") {
              req_user[item.name] = item.value;
            }
          });
          // console.log(data_user, req_user)

          // console.info(scope)

          if (req_user.addPhone && data_user && data_user.phone && data_user.phone.replace(/\D/g, '') == req_user.addPhone.replace(/\D/g, '')) {
            delete req_user.addPhone;
          }

          if (req_user.addEmail && data_user && data_user.email && data_user.email == req_user.addEmail) {
            delete req_user.addEmail;
          }

          // console.log(hasChangesTagCondition, hasUpdatedEmailCondition, MAGIC_CONFIG)

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

              const deleteP = new Promise((resOuter, rej)=>{
                  if (custom_user_tags_delete.length) {
                    let chunkedTags = custom_user_tags_delete.reduce((acc, v, k) => {
                      if (acc[acc.length-1].length == 10) {
                        acc.push([v])
                      } else {
                        acc[acc.length-1].push(v)
                      }
                      return acc
                    }, [[]])
                    let tagsPromises = chunkedTags.map(tagsArray=>{
                      return new Promise((res) => {
                        SailPlay.send('tags.delete', {tags: tagsArray}, (res_vars) => {
                          if (!res_vars.status == 'ok')
                            $rootScope.$broadcast('notifier:notify', {
                              body: res_vars.message
                            });
                          res(res_vars.status)
                        })
                      })
                    })
                    Promise.all(tagsPromises)
                      .then((data)=>{
                        resOuter(data)
                      })
                  } else {
                    resOuter()
                  }
                })

              const addP =  deleteP.then(res=>{
                return new Promise((res, rej) => {
                  if (custom_user_tags_add.length) {
                    // console.info(custom_user_tags_add, custom_user_tags_delete)
                    SailPlay.send('tags.add', {tags: custom_user_tags_add}, (res_vars) => {
                      if (!res_vars.status == 'ok')
                        $rootScope.$broadcast('notifier:notify', {
                        body: res_vars.message
                      });
                      res(res_vars.status)
                    })
                  } else {
                    res()
                  }
                })
              })  
              
              const ngApply = addP.then(res=>{
                return new Promise((res, rej)=>{
                  scope.$apply(function () {

                    const form = scope.sailplay.fill_profile.form.fields

                    const isProfileFilled = form.reduce((acc, x)=>{
                      if( Object.prototype.toString.call( x.value ) === '[object Array]' ) {
                        return (x.value.length === 3) && Object.keys(x.value).reduce(function(acc, key, index) {
                           return !!x.value[key] && acc
                        }, true)
                      } else {
                        return acc && !!x.value
                      }
                    }, true)

                    scope.phone_error = false
                    scope.email_error = false

                    if(isProfileFilled){
                      SailPlay.send('tags.add',{tags:['Клиент заполнил профиль']})
                      $rootScope.$broadcast('isProfileFilled', true);
                    }
                    if (hasChangesTagCondition || hasUpdatedEmailCondition) {
                      var conditionalProfileTags = []
                      if(hasChangesTagCondition && !options.profileUpdatedTagAlreadySet) {
                        conditionalProfileTags.push(MAGIC_CONFIG.data.profile_update_tags.profile_general)
                      }
                      if(hasUpdatedEmailCondition) {
                        conditionalProfileTags.push(MAGIC_CONFIG.data.profile_update_tags.email)
                      }
                      SailPlay.send('tags.add',{tags:conditionalProfileTags})
                    }

                    if (typeof callback == 'function') callback();

                    window.setTimeout(function() {
                      SailPlayApi.call('load.user.info', {all: 1});
                    }, 1000);

                    console.log('pizdec')

                  });
                  res()
                })
                
              })

              return ngApply;


            } else {

              if(user_res.status == "error"){

                // if (user_res.status_code == -200010) {
                //   scope.email_error = true
                //   scope.phone_error = false
                //   // console.log('email error', scope)
                // } else if(user_res.status_code == -200007) {
                //   scope.email_error = false
                //   scope.phone_error = true
                //   // console.log('phone error')
                // }

                $rootScope.$broadcast('notifier:notify', {
                  body: MAGIC_CONFIG.data.profile_update_errors && MAGIC_CONFIG.data.profile_update_errors[user_res.status_code || user_res.message] || user_res.message
                });

                scope.$apply();

              } else {

                $rootScope.$broadcast('notifier:notify', {
                  body: user_res.message
                });

                scope.$apply();
              }

            }

          });

        };

      }

    };

  });

export default SailPlayProfile.name;