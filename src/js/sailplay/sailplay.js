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
