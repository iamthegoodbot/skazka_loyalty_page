(function () {

  angular.module('magic', [ 'sailplay', 'core', 'ipCookie', 'tools' ])

  .directive('sailplayMagic', function(SailPlay, ipCookie, SailPlayApi, $document, $rootScope, $filter){

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/magic.html',
      link: function(scope){

        scope.show_history = false;

        scope.show_statuses_list = false;

        scope.show_profile_info = false;

        scope.show_profile_action = true;

        scope.show_login = false;

        scope.show_companies = false;

        scope.show_download = false;

        scope.$on('sailplay-login-cancel', function(){
          scope.show_login = false;
        });

        scope.$on('sailplay-login-success', function(){
          scope.show_login = false;
        });

        scope.$on('sailplay-logout-success', function(){

          SailPlayApi.reset();

        });

        scope.fill_profile = function(){

          scope.show_profile_info = true;

        };

        scope.body_lock = function(state){

          if(state) {
            $document[0].body.classList.add('body_lock');
          }
          else {
            $document[0].body.classList.remove('body_lock');
          }

        };

        scope.close_profile = function(){

          scope.show_profile_info = false;

          scope.body_lock(false);

        };

        scope.on_submit_profile = function(){
          scope.show_profile_action = false;
          scope.close_profile();
        };

        scope.open_profile = function(){
          scope.show_profile_info = true;
          scope.body_lock(true);
        };

        SailPlay.on('tags.exist.success', function(res){

          if(res.status === 'ok' && res.tags[0].exist) {

            scope.show_profile_action = false;
            scope.$apply();

          }

        });

        scope.gift_points_notify = function(){
          $rootScope.$broadcast('notifier:notify', { header: '', body: 'You do not currently have enough points to redeem this gift. Earn additional points by staying with us or taking the actions below!' });
        };

        scope.has_avatar = function(){

          var has_avatar = false;

          if(SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user.pic.indexOf('no_avatar') < 0){

            has_avatar = true;

          }

          return has_avatar;

        };

        SailPlay.on('actions.social.connect.error', function(e){
          console.dir(e);
        });

        SailPlay.on('actions.social.connect.success', function(e){
          console.dir(e);
        });

      }
    }

  });

  window.addEventListener('DOMContentLoaded', function(){

    var app_container = document.getElementsByTagName('sailplay-magic')[0];

    app_container && angular.bootstrap(app_container, [ 'magic' ]);

  });

}());
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
              attrs.text && elm.attr('data-text', attrs.text);
              SailPlay.actions && action && SailPlay.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function(new_value){
            if(new_value){
              elm.html(init_state);
              parse_action(new_value);
            }
          });

        }

      };

    });

}());

(function () {

  angular.module('sailplay.badges', [])

    .provider('SailPlayBadges', function(){

      var limits = [];

      return {

        set_limits: function(new_limits){

          if(new_limits) limits = new_limits;

        },
        $get: function(){

          var self = this;

          self.limits = limits;

          return self;

        }

      };

    })


    /**
     * @ngdoc directive
     * @name sailplay.badges.directive:sailplayBadges
     * @scope
     * @restrict A
     *
     * @description
     * SailPlay profile directive used for rendering and operating with badges. =)
     *
     */
    .directive('sailplayBadges', function(SailPlayApi, SailPlayBadges){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.badges = SailPlayApi.data('load.badges.list');

          var user = SailPlayApi.data('load.user.info');

          scope.get_next = function () {

            var badges = scope.badges;

            var statuses = badges && badges() && badges().multilevel_badges && badges().multilevel_badges[0];
            if (!statuses) return;
            var received = statuses.filter(function (status) {
              return status.is_received;
            });
            if (received.length == statuses.length) return null;
            var result = statuses.filter(function (status) {
              return !status.is_received;
            });
            return result[0] || statuses[0];

          };

          scope.get_offset = function () {

            var arr = SailPlayBadges.limits;

            var limit = user && user() ? user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra : 0;
            var result = [];
            for (var i = 0, len = arr.length; i < len; i++) {
              var current_limit = arr[i];
              if (limit < current_limit) {
                result.push(current_limit);
              }
            }
            return Math.round(result[0] ? result[0] - limit : 0);
          };

          scope.get_streak = function(badges_arr){

            var streak = {
              streak: [],
              progress: 0
            };

            if(!badges_arr) return streak;

            for(var i = 0; i < badges_arr.length; i+=1){

              var badge = badges_arr[i];
              if(badge.is_received) streak.streak.push(badge);
              else break;

            }

            streak.progress = badges_arr.length/streak.streak.length*100;

            if(scope.get_offset)

            return streak;

          };

          scope.get_progress = function(){

            var balance = user && user() ? user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra : 0;

            var target = parseInt(angular.copy(SailPlayBadges.limits).pop());

            var progress = balance/target*100;

            return progress <= 100 ? progress : 100;

          };

        }

      };

    });

}());

(function () {

  angular.module('sailplay.gifts', [])

    /**
     * @ngdoc directive
     * @name sailplay.gifts.directive:sailplayGifts
     * @scope
     * @restrict A
     *
     * @description
     * Simple directive for rendering and operating with SailPlay gifts.
     *
     */
    .directive('sailplayGifts', function(SailPlay, SailPlayApi){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.gifts = SailPlayApi.data('load.gifts.list');

          scope.gift_purchase = function(gift){

            SailPlay.send('gifts.purchase', { gift: gift });

          };

        }

      };

    });

}());

(function () {

  angular.module('sailplay.history', [])

    /**
     * @ngdoc directive
     * @name sailplay.history.directive:sailplayHistory
     * @scope
     * @restrict A
     *
     * @description
     * Simple directive for rendering and operating with SailPlay user's history.
     *
     */
    .directive('sailplayHistory', function(SailPlayApi){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.history = SailPlayApi.data('load.user.history');

          scope.history_current_page = 0;

          scope.set_current_page = function(page){
            scope.history_current_page = page;
          };

        }

      };

    })

    .service('history_texts', function($rootScope){

      return $rootScope.locale.history_items;

    })

    .filter('history_item', function(history_texts) {

      return function(historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_texts.gift_purchase + ': ' + historyItem.name;
          case 'event':
            return historyItem.name || history_texts.custom_action;
          case 'extra':
            return historyItem.name || history_texts.custom_action;
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_texts.enter_group + historyItem.social_type;
              case 'purchase':
                return history_texts.share_purchase + historyItem.social_type;
              case 'partner_page':
                return history_texts.social_share + historyItem.social_type;
              case 'badge':
                return history_texts.share_badge + historyItem.social_type;
            }
        }
        return history_texts[historyItem.action];
      }
    });

}());

(function () {

  angular.module('sailplay', [
    'sailplay.profile',
    'sailplay.gifts',
    'sailplay.history',
    'sailplay.actions',
    'sailplay.badges',
    'ipCookie'
  ])

    .run(function(SailPlay, $rootScope){

      SailPlay.send('init', SailPlay.CONFIG);

      SailPlay.on('init.success', function(res){

        $rootScope.$broadcast('sailplay-init-success', res);
        $rootScope.$apply();
      });

      SailPlay.on('login.error', function (res) {

        $rootScope.$broadcast('sailplay-login-error', res);
        $rootScope.$apply();

      });

      SailPlay.on('login.success', function (res) {

        $rootScope.$broadcast('sailplay-login-success', res);
        $rootScope.$apply();

      });

      SailPlay.on('login.cancel', function (res) {

        $rootScope.$broadcast('sailplay-login-cancel', res);
        $rootScope.$apply();

      });

      SailPlay.on('logout.success', function (res) {

        $rootScope.$broadcast('sailplay-logout-success', res);
        $rootScope.$apply();

      });

    })
    
    .service('sailplay_config', function($window){
      
      return typeof $window._CONFIG !== 'undefined' && $window._CONFIG.SAILPLAY || { partner_id: 1, domain: 'https://sailplay.net' };
      
    })

    .provider('SailPlay', function(){

      var auth_type = 'url';

      var auth_options = {};

      var auth_hash_cookie_name = 'sailplay_auth_hash';

      var config = {
        partner_id: 1,
        domain: 'https://sailplay.net'
      };

      return {

        set_auth_type: function(type, options){

          if(type) auth_type = type;

          if(options) auth_options = options;

        },

        set_cookie_name: function(name){

          if(name) auth_hash_cookie_name = name;

        },

        set_config: function(new_config){

          angular.merge(config, new_config);

        },

        set_remote_config: function(new_config){

          angular.merge(auth_options, new_config);

        },

        $get: function($window, $rootScope, ipCookie){

          var sp = $window.SAILPLAY || {};

          sp.CONFIG = config;

          switch (auth_type){

            case 'url':

              sp.authorize = function(){

                var params = sp.url_params();

                if (params) {
                  sp.send('login', params.auth_hash);
                }
                else {
                  $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
                }

              };
              break;

            case 'cookie':

              var auth_hash = ipCookie(auth_hash_cookie_name);
              if(auth_hash){
                sp.send('login', auth_hash);
              }
              else {
                $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
              }
              break;

            case 'remote':
              sp.authorize = function() {
                sp.send('login.remote', auth_options);
              };


          }

          sp.auth_hash_cookie_name = auth_hash_cookie_name;

          return sp;

        }

      };


    })

    .service('SailPlayApi', function($q, SailPlay, $rootScope){

      var self = this;

      var data = {};

      var points = [

        'load.user.info',
        'load.gifts.list',
        'load.user.history',
        'load.actions.list',
        'load.badges.list',
        'tags.exist',
        'tags.add'

      ];

      self.points = [];

      angular.forEach(points, function(point){

        SailPlay.on(point+'.success', function(res){

          $rootScope.$apply(function(){
            self.data(point, res);
            console.log('sailplay.api:' + point + '.success');
            console.dir(self.data(point)());
            //console.log(JSON.stringify(self.data(point)()));

          });

        });

        SailPlay.on(point+'.error', function(res){
          $rootScope.$apply(function() {
            console.log('sailplay.api:' + point + '.error');
            console.dir(res);
            self.data(point, null);
          });
        });

      });

      self.data = function(key, value){

        if(typeof value !== 'undefined'){

          data[key] = angular.copy(value);

        }

        return function (){
          return data[key];
        };

      };

      self.call = function(name, params, callback){

        SailPlay.send(name, params);

      };

      self.reset = function(){
        data = {};
      };

    })

    .filter('sailplay_pluralize', function () {
      var cases = [2, 0, 1, 1, 1, 2];
      return function (input, titles) {
        input = Math.abs(input);
        titles = titles.split(',');
        return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
      }
    })

    .filter('sailplay_pic', function(SailPlay, $window){

      function repair_pic_url(url){
        if(/^((http|https|ftp):\/\/)/.test(url)){
          return url;
        }
        if(url.indexOf('//') === 0){
          return $window.location.protocol + url;
        }
        else {
          return SailPlay.config().DOMAIN + url;
        }
      }

      return function(pic_url) {

        if(!pic_url) return '';

        return repair_pic_url(pic_url);

      };

    })

    .directive('sailplayRemoteLogin', function(SailPlay){

      return {
        restrict: 'A',
        replace: true,
        template: '<iframe></iframe>',
        link: function(scope, elm, attrs){

          var opts = scope.$eval(attrs.sailplayRemoteLogin);

          var options = {
            node: elm[0]
          };

          var logged = false;

          console.dir(opts);
          angular.merge(options, opts);
          console.dir(options);

          scope.$on('sailplay-init-success', function(){
            SailPlay.send('login.remote', options);
          });

          scope.$on('sailplay-login-success', function(){
            logged = true;
          });

          scope.$on('sailplay-logout-success', function(){

            if(logged) {

              logged = false;

              var src = elm[0].src;

              elm[0].src = '';

              elm[0].src = src;

            }

          });

          SailPlay.config() && SailPlay.config().partner && SailPlay.send('login.remote', options);

        }
      }

    });

}());

(function () {

  angular.module('sailplay.profile', [])

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
    .directive('sailplayProfile', function(SailPlayApi, SailPlay, $q){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

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
          scope.logout = function(){

            SailPlay.send('logout');

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
          scope.tags_add = function(params, callback){

            if(!params) return;

            var tags = params.tags || [];

            if(tags.length > 0){

              function chunk(array, chunkSize) {
                return [].concat.apply([],
                  array.map(function(elem,i) {
                    return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
                  })
                );
              }

              var chunked_tags = chunk(tags, 10);

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

                callback && callback(tags_res);

              });
            }

          };

        }

      };

    });

}());

(function () {

  angular.module('core', [
    'ipCookie',
    'sailplay',
    'core.templates',
    'magic.profile'
  ])

  .run(function(SailPlay, ipCookie, SailPlayApi, $rootScope, $window, FillProfile){

    $rootScope.config = $window._CONFIG || {};

    SailPlay.on('login.error', function(){

      $rootScope.loaded = true;
      $rootScope.$apply();

    });

    SailPlay.on('login.success', function(){

      $rootScope.loaded = true;

      //load data for widgets
      SailPlayApi.call('load.user.info', { all: 1 });
      SailPlayApi.call('load.badges.list');
      SailPlayApi.call('load.actions.list');
      SailPlayApi.call('load.user.history');
      SailPlayApi.call('load.gifts.list');
      SailPlayApi.call('tags.exist', { tags: [ FillProfile.tag ] });


      $rootScope.$apply();

    });

    SailPlay.on('actions.perform.success', function(){
      SailPlayApi.call('load.actions.list');
    });

    SailPlay.on('actions.perform.error', function(){
      SailPlayApi.call('load.actions.list');
    });

    SailPlay.on('actions.perform.complete', function(){
      SailPlayApi.call('load.actions.list');
    });

    SailPlay.on('gifts.purchase.success', function(res){

      $rootScope.$broadcast('notifier:notify', {

        header: $rootScope.locale.congratulations,
        body: (res.coupon_number && ($rootScope.locale.coupon_number + ' ' + res.coupon_number)) ||  res.success_message || $rootScope.locale.gift_received

      });

      SailPlayApi.call('load.user.info', { all: 1 });
      SailPlayApi.call('load.user.history');

      $rootScope.$apply();

    });

    SailPlay.on('gift.purchase.error', function(res){

      $rootScope.$broadcast('notifier:notify', {

        header: $rootScope.locale.gift_error,
        body: $rootScope.locale.errors[res.status_code] || $rootScope.locale.error

      });

      $rootScope.$apply();

    });

    //SailPlay.on('actions.social.connect.complete', function(){
    //  SailPlayApi.call('load.actions.list');
    //});

  });

}());

(function () {

  angular.module('magic.profile', [])

    .directive('sailplayMagicProfile', function(){

      return {

        restrict: "E",
        replace: true,
        scope: true,
        templateUrl: '/html/profile/profile.html',
        link: function(scope, elm, attrs){

        }

      };

    });

}());

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/magic.html',
    '<div class="sailplay magic"><div class="bn_wrap clearfix"><sailplay-magic-profile></sailplay-magic-profile><div class="bon_choice_main" data-ng-cloak="" data-sailplay-gifts=""><h3 class="bon_header">Выберите вознаграждение</h3><h4 class="bon_sub_header">Вы моежете потратить накопленные баллы на подарки из разных категорий</h4><div class="bon_choice_cat"><a href="#" data-ng-show="gifts().length" data-ng-click="set_category();$event.preventDefault();" data-ng-class="{active : !active_category}"><span>Все подарки</span> <span data-ng-bind="gifts().length + \' \' + (gifts().length | sailplay_pluralize:\'подарок,подарка,подарков\') + \' в разделе\'"></span> <img data-ng-src="dist/img/category/all.png" alt="Все подарки"></a> <a href="#" data-ng-repeat="category in categories()" data-ng-class="{active : category.id == $parent.active_category}" data-ng-click="set_category(category.id);$event.preventDefault();"><span data-ng-bind="category.name"></span> <span data-ng-bind="category.count + \' \' + (category.count | sailplay_pluralize:\'подарок,подарка,подарков\') + \' в разделе\'"></span> <img data-ng-src="{{ get_icon(category.id) }}" alt="{{ category.name }}"></a></div><div class="bon_item_main" data-ng-show="show_gifts && show_gifts.length"><div class="bon_slide_cat_item_wrap"><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><div class="bon_item" data-ng-repeat="gift in show_gifts"><div class="bon_item_iner"><img data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ gift.name }}"> <span class="bon_item_name" data-ng-bind="gift.name"></span> <span class="bon_tem_info" data-ng-bind="(gift.points | number) + \' \' + (gift.points | sailplay_pluralize:\'балл,балла,баллов\')"></span> <a href="#" data-ng-click="open_gift(gift);$event.preventDefault();">Получить</a></div></div></div></div><a href="#" class="arr_left arr_left" data-ng-click="set_position(\'left\');$event.preventDefault();" data-ng-show="show_left"></a> <a href="#" class="arr_right arr_right" data-ng-click="set_position(\'right\');$event.preventDefault();" data-ng-show="show_right"></a></div></div><div class="bns_overlay bns_overlay_gift" data-ng-cloak=""><div class="bns_overlay_iner"><a href="#" class="close_overlay" data-ng-click="close_gift();$event.preventDefault();$event.stopPropagation();"></a> <img class="gift_more_img" data-ng-src="{{ gift_more.thumbs.url_250x250 | sailplay_pic }}" alt="{{ gift_more.name }}"><div class="gift_more_block"><span class="gift_more_name" data-ng-bind="gift_more.name"></span> <span class="gift_more_points" data-ng-bind="(gift_more.points | number) + \' \' + (gift_more.points | sailplay_pluralize:\'балл,балла,баллов\')"></span><p class="gift_more_descr" data-ng-bind="gift_more.descr"></p><span class="alink" data-ng-click="close_gift();">Закрыть</span> <span class="alink" style="margin-left: 5px;" data-ng-click="complete_gift_open();" data-ng-bind="user().user_points.confirmed >= gift_more.points ? \'Получить\' : \'Недостаточно баллов\'">Получить</span></div></div></div><div class="bns_overlay bns_overlay_gift_not_points" data-ng-cloak=""><div class="bns_overlay_iner"><p>У вас недостаточное количество баллов на этот подарок. Вам необходимо выполнить следующие действия.</p><span class="alink" data-scroll-to=".more_bonus">Заработать баллы</span> <a class="alink" target="_blank" href="http://www.mtt.ru/">Выбрать услугу</a></div></div><div class="bns_overlay bns_overlay_gift_complete" data-ng-cloak=""><div class="bns_overlay_iner"><p>Пожалуйста, подтвердите получение подарка. С вашего счета будет списано {{ (gift_more.points | number) + \' \' + (gift_more.points | sailplay_pluralize:\'балл,балла,баллов\') }}. Приняли решение? Подтвердите, пожалуйста, свой выбор и списание баллов.</p><span class="alink" data-ng-click="complete_gift_close();">Закрыть</span> <span class="alink" data-ng-click="gift_purchase(gift_more);" data-ng-bind="user().user_points.confirmed >= gift_more.points ? \'Получить\' : \'Недостаточно баллов\'">Получить</span></div></div></div><div class="more_bonus" data-ng-cloak="" data-sailplay-actions=""><h3 class="bon_header">Заработайте баллы</h3><h4 class="bon_sub_header">Выполняя простые задания вы моежете получить дополнительные баллы</h4><div class="more_bonus_main"><div class="mb_item" data-ng-repeat="action in actions().actions"><div class="mb_item_left"><span data-ng-bind="action_data(action).name"></span> <span data-ng-bind="(action.points | number) + \' \' + (action.points | sailplay_pluralize:\'балл,балла,баллов\')"></span> <a data-sailplay-action="" data-action="action" class="without_bg" data-text="Получить">Получить</a></div><div class="mb_item_right"><img data-ng-src="{{ action_data(action).pic }}" alt=""></div></div><div class="mb_item mb_item_prof" data-ng-if="!getExist(exist(),\'Заполнил профиль\')"><div class="mb_item_left"><span>Заполнить профиль</span> <span>150 баллов</span> <a href="#">Получить</a></div><div class="mb_item_right"><img src="dist/img/icon_prof.png" alt=""></div></div><div class="mb_item mb_item_prof_opr" data-ng-repeat="test in test_data() track by $index" data-ng-if="test.rules ? !getExist(exist(), test.tag) && getExist(exist(), test.rules) : !getExist(exist(), test.tag)"><div class="mb_item_left"><span data-ng-bind="test.name"></span> <span data-ng-bind="(test.points | number) + \' \' + (test.points | sailplay_pluralize:\'балл,балла,баллов\')"></span> <a href="#" data-ng-click="openTest(test);$event.preventDefault();">Получить</a></div><div class="mb_item_right"><img src="dist/img/icon_opr.png" alt=""></div></div><div class="mb_popup mb_popup_op" data-ng-cloak="" data-sailplay-test=""><div class="mb_popup_top"><span>Пройти опрос<strong>{{ (current_test.points | number) + \' \' + (current_test.points | sailplay_pluralize:\'балл,балла,баллов\') }}</strong></span></div><div class="mb_popup_main" data-ng-show="current_test"><span class="numb_qust">Вопрос {{ step }} / {{ current_test.data.length }}</span> <span class="qust" data-ng-bind="current_test.data[step - 1].label"></span><div class="answ_item" data-ng-repeat="item in current_test.data[step - 1].answers" data-ng-switch="current_test.data[step - 1].type"><input data-ng-switch-when="checkbox" type="checkbox" name="{{ \'qust[\' + (step - 1) + \'][]\' }}" id="qust_{{ (step - 1)+ \'_\' + $index }}" data-ng-value="item" data-ng-model="item.model" data-ng-change="on_change(item, item.model, \'checkbox\')"> <input data-ng-switch-default="" type="radio" name="qust" id="qust_{{ (step - 1)+ \'_\' + $index }}" data-ng-value="$index" data-ng-model="current_test.model_for_radio" data-ng-change="on_change(item, null, \'radio\')"> <label for="qust_{{ (step - 1) + \'_\' + $index }}" class="type_{{ current_test.data[step - 1].type || \'radio\' }}" data-ng-bind="item.label"></label></div><div class="answ_text"><input type="text" placeholder="Напишите свой вариант тут" data-ng-if="writable" data-ng-model="$parent.writable_model"> <input type="submit" value="Далее" data-ng-disabled="!isSelectable()" data-ng-click="set_answer();"></div></div></div><div class="mb_popup mb_popup_prof"><div class="mb_popup_top"><span data-ng-if="!getExist(exist(),\'Заполнил профиль\')">Заполнить профиль<strong>150 баллов</strong></span></div><div class="mb_popup_main mb_popup_main_mt"><div class="edit_profile_input"><label>Фамилия</label> <input type="text" placeholder="Введите фамилию" data-ng-model="form.lastName"></div><div class="edit_profile_input"><label>Улица</label> <input type="text" placeholder="Укажите улицу" data-ng-model="vars[\'Улица\']"></div><div class="edit_profile_input"><label>Имя</label> <input type="text" placeholder="Введите имя" data-ng-model="form.firstName"></div><div class="edit_profile_input"><label>Дом</label> <input type="text" placeholder="Укажите дом" data-ng-model="vars[\'Дом\']"></div><div class="edit_profile_input"><label>Отчество</label> <input type="text" placeholder="Введите отчество" data-ng-model="form.middleName"></div><div class="edit_profile_input"><label>Телефон</label> <input type="text" data-phone-mask="" maxlength="17" data-ng-model-options="{ updateOn: \'default change blur\' }" data-ng-model="form.addPhone"></div><div class="edit_profile_input"><label>Город</label> <input type="text" placeholder="Укажите город" data-ng-model="vars[\'Город\']"></div><div class="edit_profile_input"><label>E-mail</label> <input type="text" placeholder="Введите E-mail" data-ng-model="form.addEmail"></div><div class="answ_text"><input type="submit" value="Сохранить" data-ng-disabled="!isValid()" data-ng-click="save_profile();"></div></div></div></div></div></div><div class="bns_overlay bns_overlay_about"><div class="bns_overlay_iner bns_overlay_iner_tr_bg"><div class="b_about"><a href="#" class="b_about1"><img src="dist/img/icon_how1.png" alt=""> <span>Как получить карту</span></a> <a href="#" class="b_about2"><img src="dist/img/icon_how2.png" alt=""> <span>Какие бывают бонусы</span></a> <a href="#" class="b_about3"><img src="dist/img/icon_how3.png" alt=""> <span>Как бонусы начисляются</span></a> <a href="#" class="b_about4"><img src="dist/img/icon_how4.png" alt=""> <span>На что тратить бонусы</span></a></div><a href="#" class="close_overlay"></a><div class="b_about_main cycle-slideshow" data-cycle-fx="fade" data-cycle-timeout="0" data-cycle-slides="> .b_about_item" data-cycle-pager=".b_about" data-cycle-pager-template=""><div class="b_about_item"><h3>Как получить карту</h3><span>При совершении покупки с погашением части суммы бонусами, происходит списание бонусов по следующим условиям:<br>• Списание бонусов допускается только на товар без скидки за исключением специальных предложений и акций<br>• Списание бонусов производится с конечной суммы после вычета всех скидок по акциям;<br>• Всеми видами бонусов можно оплатить не более 20% от стоимости покупки после вычета всех скидок по акциям;<br>• Бонусы могут быть аннулированы за товар, на который оформлен возврат<br>• Списание бонусов может быть в счет получения подарка на кассе магазина Respect</span></div><div class="b_about_item"><h3>Какие бывают бонусы</h3><span>При совершении покупки с погашением части суммы бонусами, происходит списание бонусов по следующим условиям:<br>• Списание бонусов допускается только на товар без скидки за исключением специальных предложений и акций<br>• Списание бонусов производится с конечной суммы после вычета всех скидок по акциям;<br>• Всеми видами бонусов можно оплатить не более 20% от стоимости покупки после вычета всех скидок по акциям;<br>• Бонусы могут быть аннулированы за товар, на который оформлен возврат<br>• Списание бонусов может быть в счет получения подарка на кассе магазина Respect</span></div><div class="b_about_item"><h3>Как бонусы начисляются</h3><span>При совершении покупки с погашением части суммы бонусами, происходит списание бонусов по следующим условиям:<br>• Списание бонусов допускается только на товар без скидки за исключением специальных предложений и акций<br>• Списание бонусов производится с конечной суммы после вычета всех скидок по акциям;<br>• Всеми видами бонусов можно оплатить не более 20% от стоимости покупки после вычета всех скидок по акциям;<br>• Бонусы могут быть аннулированы за товар, на который оформлен возврат<br>• Списание бонусов может быть в счет получения подарка на кассе магазина Respect</span></div><div class="b_about_item"><h3>На что тратить бонусы</h3><span>При совершении покупки с погашением части суммы бонусами, происходит списание бонусов по следующим условиям:<br>• Списание бонусов допускается только на товар без скидки за исключением специальных предложений и акций<br>• Списание бонусов производится с конечной суммы после вычета всех скидок по акциям;<br>• Всеми видами бонусов можно оплатить не более 20% от стоимости покупки после вычета всех скидок по акциям;<br>• Бонусы могут быть аннулированы за товар, на который оформлен возврат<br>• Списание бонусов может быть в счет получения подарка на кассе магазина Respect</span></div></div></div></div><div class="bns_overlay bns_overlay_hist" data-sailplay-history="" data-ng-cloak=""><div class="bns_overlay_iner"><table class="bns_hist_table"><a href="#" class="close_overlay"></a><h3>Вся история<b>У вас {{ user().user_points.confirmed + \' \' + (user().user_points.confirmed | sailplay_pluralize:\'балл,балла,баллов\') }}</b></h3><h4>Здесь показана история покупок, выполненных заданий, начисления баллов и полученных подарков</h4><tbody><tr data-dir-paginate="item in history() | itemsPerPage:10" data-pagination-id="history_pages"><td><span data-ng-bind="item.action_date | date:\'d MM yyyy\'"></span></td><td><span><b data-ng-bind="item | history_item"></b></span></td><td><span data-ng-if="item.points_delta" data-ng-bind="((item.points_delta|number) || 0) + \' \' + (item.points_delta | sailplay_pluralize:\'балл,балла,баллов\')"></span></td></tr></tbody></table><dir-pagination-controls data-max-size="7" data-pagination-id="history_pages" data-template-url="/html/tools/tools.pagination.controls.html" data-auto-hide="true"></dir-pagination-controls></div></div><notifier></notifier></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/profile/profile.html',
    '<div class="bon_profile_wrap" data-ng-cloak="" data-sailplay-profile=""><div class="bon_profile_info"><div class="bon_profile_top clearfix"><div class="bon_profile_top_left"><h3>Ваш профиль</h3><h4>Здесь отображается количество накопленных баллов и прогресс получения подарков</h4></div><div class="bon_profile_right"><img data-ng-src="{{ (user().user.pic | sailplay_pic) || \'dist/img/prof_def.png\'}}" alt="You"> <span data-ng-bind="user().user.name || \'Имя не указано\'"></span> <a href="#" data-ng-click="open_profile();$event.preventDefault();">Редактировать профиль</a></div></div><div class="bon_profile_stat"><div class="bps_left"><span data-ng-bind="(user().user_points.confirmed | number) + \' \' + (user().user_points.confirmed | sailplay_pluralize:\'балл,балла,баллов\')"></span> <a href="#">История начислений</a></div><div class="bps_right"><div class="progress_line_main"><div class="progress_line_bg"></div><div class="progress_line" data-procent="0" data-ng-style="{ width: setProgress(user().user_points.confirmed) + \'%\' }"><div class="progress_text" data-ng-show="getOffsetToGift(user().user_points.confirmed)"><span data-ng-bind="getOffsetToGift(user().user_points.confirmed) + \' \' + ((getOffsetToGift(user().user_points.confirmed) | sailplay_pluralize:\'балл,балла,баллов\')) + \' до подарка\'"></span></div></div><div class="gift_item" data-ng-repeat="limit in limits track by $index" data-ng-class="{act : limit <= user().user_points.confirmed }" data-ng-style="{ left: progressGiftWidth($index, limits.length) + \'%\' }"><span class="gift_item_hint" data-ng-bind="limit"></span></div></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/tools.notifier.html',
    '<div class="bns_overlay bns_overlay_notify" data-ng-cloak=""><div class="bns_overlay_iner"><a href="#" class="close_overlay" data-ng-click="reset_notifier();$event.preventDefault();"></a><h3 data-ng-bind-html="data.header | to_trusted"></h3><h4 data-ng-bind-html="data.body | to_trusted" style="margin: 20px 0;"></h4><a class="notify_link" data-ng-click="reset_notifier();$event.preventDefault();">OK</a></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/tools.pagination.controls.html',
    '<div class="bns_hist_pager" data-ng-if="1 < pages.length || !autoHide"><a data-ng-if="directionLinks" data-ng-class="{ disabled : pagination.current == 1 }" href="" data-ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a> <a data-ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" data-ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }" href="" data-ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a> <a data-ng-if="directionLinks" data-ng-class="{ disabled : pagination.current == pagination.last }" href="" data-ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></div>');
}]);
})();

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
