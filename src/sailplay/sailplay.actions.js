import angular from 'angular';

export let SailPlayActions = angular.module('sailplay.actions', [])

.provider('SailPlayActionsData', function(){

  let actions_data = {

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

.constant('TAGS_ADD_LIMIT', 10)

.service('QuizService', function (MAGIC_CONFIG, TAGS_ADD_LIMIT, SailPlayApi) {

  let self = this;

  self.getTags = function () {

    let tags = [];

    if (MAGIC_CONFIG && MAGIC_CONFIG.data && MAGIC_CONFIG.data.quiz) {

      tags = tags.concat(MAGIC_CONFIG.data.quiz.map(function (item) {
        return item.tag;
      }));

    }

    return tags;
  };

  self.checkTag = function (tag, exist) {

    if (!tag || !exist) return true;

    let _tag = exist.tags.filter(function (item) {
        return item.name == tag
      })[0] || {};

    return _tag.exist;

  };

  self.addTags = function (data, callback) {

    let _send_data = angular.copy(data);

    sending(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

    function sending(tags) {

      SailPlayApi.call('tags.add', {tags: tags}, function () {

        _send_data.tags = _send_data.tags.slice(TAGS_ADD_LIMIT);

        if (_send_data.tags.length != 0) {

          sending(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

          return;

        }

        if (Object.keys(_send_data.vars).length) {

          SailPlayApi.call('vars.add', {custom_vars: _send_data.vars}, function () {

            callback && callback();

          });

        } else {

          callback && callback();

        }

      });

    }


  };

  return self;

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
.directive('sailplayActions', function(SailPlayApi, SailPlay, SailPlayActionsData, QuizService){

  return {

    restrict: 'A',
    replace: false,
    scope: true,
    link: function(scope){

      scope.actions = SailPlayApi.data('load.actions.list');
      scope.actions_custom = SailPlayApi.data('load.actions.custom.list');

      scope.exist = SailPlayApi.data('tags.exist');

      scope.checkTag = QuizService.checkTag;

      scope.perform_action = function(action){

        SailPlay.send('actions.perform', action);

      };

      SailPlay.on('actions.perform.success', function(res){

        scope.$apply(function(){

          scope.on_perform && scope.on_perform(res);

        });


      });

      scope.action_data = function(action){

        let data = {};

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
          // console.log(attrs.styles);
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
.directive('sailplayActionCustom', function(SailPlay, $document, MAGIC_CONFIG_DATA){

  let init_state;

  return {

    restrict: 'A',
    replace: false,
    scope: {
      action: '='
    },
    link: function(scope, elm, attrs){

      let iframe = $document[0].createElement('iframe');
      let name = MAGIC_CONFIG_DATA.name;

      iframe.style.backgroundColor = "transparent";
      iframe.frameBorder = "0";
      iframe.allowTransparency="true";

      elm.append(iframe);

      scope.$watch('action', function(action){

        if(action){

          let config = SailPlay.config();

          console.info(config)

          iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang + '&config=' + name))) || '';

          iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

        }
        else {
          iframe.src = '';
        }

      });

    }

  };

});

export default SailPlayActions.name;