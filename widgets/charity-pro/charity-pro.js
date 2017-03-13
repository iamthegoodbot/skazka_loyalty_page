import {WidgetRegister} from '@core/widget';
import CharityProTemplate from './charity-pro.html';
import './charity-pro.less';

WidgetRegister({
  id: 'charity_pro',
  template: CharityProTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    '$q'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, $q) {
    return function (scope) {

      // Local variable, for storage current charity model
      let current_charity = null;

      // Form model
      scope.form = scope.widget.options.request_charity && angular.copy(scope.widget.options.request_charity.fields);

      // Charity model
      scope.charity = null;

      // Show form model
      scope.show_form = false;

      // Exist tags
      scope.disabled = true;

      // Show buttons
      scope.show_search_link = false;
      scope.show_request_charity = false;

      // User info
      scope.user = SailPlayApi.data('load.user.info');

      console.log('user', scope.user());

      scope.$watch(() => {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, (new_val, old_val) => {


        SailPlay.send('tags.exist',
          {tags: [scope.widget.options.show_search_link, scope.widget.options.show_request_charity]},
          (tags_res) => {
            scope.$apply(() => {
              if (tags_res.status === 'ok') {
                scope.show_search_link = tags_res.tags[0].exist;
                scope.show_request_charity = tags_res.tags[1].exist;
              }
            });
          });

      });

      // Method for existing tags, maybe need tranfer to some sailplay module
      scope.tags_exist = function (params, callback) {

        if (!params) return;

        let response = [];

        let tags = params.tags || [];

        if (tags.length > 0) {

          let chunk = (array, chunkSize) => {
            return [].concat.apply([], array.map((elem, i) => {
              return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            }))
          };

          let chunked_tags = chunk(tags, 10);

          let tag_promises = [];

          angular.forEach(chunked_tags, (chunk) => {

            let promise = $q((resolve, reject) => {

              SailPlay.send('tags.exist', {tags: chunk}, (tags_res) => {
                if (tags_res.status === 'ok') {
                  response = response.concat(tags_res.tags);
                  resolve(tags_res);
                } else {
                  reject(tags_res);
                }
              });

            });

            tag_promises.push(promise);

          });

          $q.all(tag_promises).then(() => {
            callback && callback(response);
          })

        } else {
          callback && callback();
        }

      };

      // Getting existing tags
      if (scope.widget.options.charities && scope.widget.options.charities.length) {
        let exist_object = {
          tags: scope.widget.options.charities.map((item) => {
            return item.tag
          })
        };
        scope.tags_exist(exist_object, tags => {
          if (tags && tags.length) {
            let exist = tags.filter((item) => {
              return item.exist
            })[0];
            scope.disabled = false;
            scope.charity = exist && exist.name;
            current_charity = scope.charity;
          }
        });
      }

      /**
       * On change charity
       */
      scope.charity_change = function () {

        scope.disabled = true;

        if (current_charity) SailPlay.send('tags.delete', {tags: [current_charity]});

        SailPlay.send('tags.add', {tags: [scope.charity]}, (res_add) => {
          if (res_add && res_add.status == 'ok') {
            current_charity = scope.charity;
            scope.disabled = false;
            scope.$digest();
          }
        });

      };

      /**
       * Charity form submit function
       * @param form
       */
      scope.charity_form_submit = function (form) {

        if (!form || !form.$valid) return;

        let data = {};

        let vars = {};

        scope.form.forEach((field) => {

          switch (field.type) {

            case 'system': {

              if (field.value) {

                // If the phone matches the phone in user info
                if (field.name == 'addPhone' && scope.user().user.phone && field.value.replace(/\D/g, '') == scope.user().user.phone.replace(/\D/g, '')) break;

                // If the email matches the email in user info
                if (field.name == 'addEmail' && scope.user().user.email && field.value == scope.user().user.email) break;

                data[field.name] = field.value;

              }

              break;
            }

            case 'variable': {

              if (field.value) {
                vars[field.name] = field.value;
              }

              break;
            }

          }

        });

        // Update user info
        SailPlay.send('users.update', data, (res_user) => {
          if (res_user && res_user.status == 'ok') {
            // Call user info for get actualy data
            SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
            // Add custom variables
            SailPlay.send('vars.add', {custom_vars: vars}, (res_vars) => {
              if (res_vars && res_vars.status == 'ok') {
                // Add tags

                SailPlay.send('tags.add', {tags: scope.widget.options.request_charity.tags}, (res_tags) => {
                  if (res_tags && res_tags.status == 'ok') {
                    scope.show_form = false;
                    scope.$digest();
                  } else {
                    res_tags.message & error_wrapper(res_tags.message);
                  }
                });

                scope.$digest();
              } else {
                res_vars.message & error_wrapper(res_vars.message);
              }
            });

            scope.$digest();
          } else {
            res_user.message & error_wrapper(res_user.message);
          }
        });

      };

      /**
       * Charity form close function
       * @param form
       */
      scope.charity_form_close = function (form) {
        if (form) {
          form.$setPristine();
          form.$setUntouched();
        }
        scope.show_form = false;
      };

      /**
       * Function wrapper for error messages
       * @param msg
       */
      function error_wrapper(msg) {
        $rootScope.$broadcast('notifier:notify', {
          header: "Error",
          body: msg
        });
      }

    }
  }
});