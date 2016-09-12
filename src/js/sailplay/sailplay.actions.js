(function () {

  angular.module('sailplay.actions', [])

    .provider('SailPlayActionsData', function(){

      var actions_data = {

        "system": {
          "emailBinding": {
            name: "Enter email"
          },
          "fillProfile":{
            name: "Fill profile"
          },
          "inviteFriend":{
            name: "Invite friend"
          }
        },
        "social": {
          "vk": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on VK"
            },
            "purchase": {
              "name": "Share your purchase on VK"
            }
          },
          "fb": {
            "like": {
              "name": "Like Facebook group"
            },
            "partner_page": {
              "name": "Share our website on Facebook"
            },
            "purchase": {
              "name": "Share your purchase on Facebook"
            }
          },
          "gp": {
            "like": {
              "name": "Like G+ group"
            },
            "partner_page": {
              "name": "Share our website on G+"
            },
            "purchase": {
              "name": "Share your purchase on G+"
            }
          },
          "ok": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on Odnoklassniki"
            },
            "purchase": {
              "name": "Share you purchase on Odnoklassniki"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Share our website on twitter"
            },
            "purchase": {
              "name": "Share your purchase on twitter"
            }
          }
        }
      };

      return {

        set_actions_data: function(data){

          angular.merge(actions_data, data);

        },

        $get: function(){

          return actions_data;

        }

      };

    })

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayActions
     * @scope
     * @restrict A
     *
     * @description
     * SailPlay profile directive used for rendering sailplay actions, sush as: fill profile, invite friend and social sharing. =)
     *
     */
    .directive('sailplayActions', function(SailPlayApi, SailPlay, SailPlayActionsData){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.actions = SailPlayApi.data('load.actions.list');
          scope.actions_custom = SailPlayApi.data('load.actions.custom.list');

          scope.perform_action = function(action){

            SailPlay.send('actions.perform', action);

          };

          SailPlay.on('actions.perform.success', function(res){

            scope.$apply(function(){

              scope.on_perform && scope.on_perform(res);

            });


          });

          scope.action_data = function(action){

            var data = {};

            if(!action) return data;

            data = action;

            if(action.socialType) data = SailPlayActionsData.social[action.socialType] && SailPlayActionsData.social[action.socialType][action.action];

            if(SailPlayActionsData.system[action.type]) data = SailPlayActionsData.system[action.type];

            return data;

          };

        }

      };

    })

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayAction
     * @scope
     * @restrict A
     *
     * @description
     * Simple directive for parsing dom element as SailPlay action.
     *
     * @param {object}  action   A SailPlay action object, received from api.
     * @param {string}  styles   Not required attribute, used for custom styling iframe buttons.
     * @param {string}  text   Not required attribute, used for custom text in iframe buttons.
     *
     */
    .directive('sailplayAction', function(SailPlay, $timeout, $compile){

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function(scope, elm, attrs){

          init_state = elm[0].innerHTML;

          elm.on('click', function(e){
            e.preventDefault();
          });

          function parse_action(action){
            $timeout(function(){
              attrs.styles && elm.attr('data-styles', attrs.styles);
              console.log(attrs.styles);
              attrs.text && elm.attr('data-text', attrs.text);
              SailPlay.actions && action && SailPlay.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function(new_value){
            if(new_value){
              elm.html('');
              elm.append($compile(init_state)(scope.$parent));
              parse_action(new_value);
            }
          });

        }

      };

    })

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayActionCustom
     * @scope
     * @restrict A
     *
     * @description
     * Renders SailPlay custom action in element.
     *
     * @param {object}  action   A SailPlay custom action object, received from api.
     *
     */
    .directive('sailplayActionCustom', function(SailPlay, $document){

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function(scope, elm, attrs){

          var iframe = $document[0].createElement('iframe');

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency="true";

          elm.append(iframe);

          scope.$watch('action', function(action){

            if(action){

              var config = SailPlay.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
            }

          });

        }

      };

    });

}());
