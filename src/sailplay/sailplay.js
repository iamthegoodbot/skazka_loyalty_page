import angular from 'angular';
import SailPlayProfile from './sailplay.profile';
import SailPlayGifts from './sailplay.gifts';
import SailPlayHistory from './sailplay.history';
import SailPlayActions from './sailplay.actions';
import SailPlayBadges from './sailplay.badges';
import Cookies from 'angular-cookie';

export let SailPlay = angular.module('sailplay', [
  SailPlayProfile,
  SailPlayGifts,
  SailPlayHistory,
  SailPlayActions,
  SailPlayBadges,
  Cookies
])

  .run(function (SailPlay, $rootScope) {

    SailPlay.on('init.success', function (res) {

      $rootScope.$broadcast('sailplay-init-success', res);
      $rootScope.$apply();

    });

    SailPlay.on('login.error', function (res) {

      $rootScope.$broadcast('sailplay-login-error', res);
      $rootScope.$apply();

    });

    SailPlay.on('login.success', function (res) {

      $rootScope.auth_state = true;
      $rootScope.$broadcast('sailplay-login-success', res);
      $rootScope.$apply();

    });

    SailPlay.on('login.cancel', function (res) {

      $rootScope.$broadcast('sailplay-login-cancel', res);
      $rootScope.$apply();

    });

    SailPlay.on('logout.success', function (res) {

      $rootScope.auth_state = false;
      $rootScope.$broadcast('sailplay-logout-success', res);
      $rootScope.$apply();

    });

  })


  .provider('SailPlay', function () {

    var auth_type = 'url';

    var auth_options = {};

    var auth_hash_id = 'sailplay_auth_hash';

    return {

      set_auth_type: function (type, options) {

        if (type) auth_type = type;

        if (options) auth_options = options;

      },

      set_auth_hash_id: function (name) {

        if (name) auth_hash_id = name;

      },

      set_remote_config: function (new_config) {

        angular.merge(auth_options, new_config);

      },

      $get: function ($window, $rootScope, ipCookie) {

        var sp = $window.SAILPLAY || {};

        sp.authorize = function (type) {

          type = type || auth_type;

          switch (type) {

            case 'url':

              var params = sp.url_params();

              if (params) {
                sp.send('login', params[auth_hash_id]);
              }
              else {
                $rootScope.$broadcast('sailplay-login-error', {status: 'error', message: 'No auth_hash found'});
              }

              break;

            case 'cookie':

              var auth_hash = ipCookie(auth_hash_id);
              if (auth_hash) {
                sp.send('login', auth_hash);
              }
              else {
                $rootScope.$broadcast('sailplay-login-error', {status: 'error', message: 'No auth_hash found'});
              }
              break;

            case 'remote':

              sp.send('login.remote', auth_options);

          }


        };

        sp.auth_hash_id = auth_hash_id;

        sp.set_auth_hash_cookie = function (auth_hash) {
          ipCookie(auth_hash_id, auth_hash);
        };

        return sp;

      }

    };


  })

  .service('SailPlayApi', function ($q, SailPlay, $rootScope, $timeout) {

    var self = this;

    var data = {};

    var observers = {};

    var points = [

      'load.user.info',
      'leaderboard.load',
      'load.user.history',
      'load.actions.list',
      'load.actions.custom.list',
      'load.badges.list',
      'tags.exist',
      'tags.add',
      'load.gifts.list'

    ];

    self.points = [];
    self.observe = function(name, fn) {
      if (!observers[name]) observers[name] = [];
      let currentId = observers[name].length;
      fn.id = currentId;
      observers[name].push(fn);

      return () => {
        var fn = observers[name].find(obj => obj.id == currentId)      
        observers[name].splice(fn.id, 1)
      }
    }

    angular.forEach(points, function (point) {
      SailPlay.on(point + '.success', function (res) {
          $rootScope.$apply(() => {
            self.data(point, res);
          })
          
          if (observers[point] && observers[point].length)
            observers[point].forEach(fn => fn(res))
          console.log('sailplay.api:' + point + '.success');
          //console.log(JSON.stringify(self.data(point)()));
      });

      SailPlay.on(point + '.error', function (res) {
          $rootScope.$apply(() => {
            self.data(point, null);
          })

          if (observers[point] && observers[point].length)
            observers[point].forEach(fn => fn(null))         

      });

    });


    self.data = function (key, value) {

      if (typeof value !== 'undefined') {
        data[key] = angular.copy(value);
      }

      return function () {
        return data[key];
      };

    };

    self.call = function (name, params, callback) {

      SailPlay.send(name, params, callback);

    };

    self.reset = function () {
      data = {};
    };

  })

  .filter('sailplay_pluralize', function () {
    var cases = [2, 0, 1, 1, 1, 2];
    return function (input, titles) {
      input = Math.abs(input);
      titles = titles && titles.split(',') || [];
      return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
    }
  })

  .filter('sailplay_pic', function (SailPlay, $window) {

    function repair_pic_url(url) {
      if (/^((http|https|ftp):\/\/)/.test(url)) {
        return url;
      }
      if (url.indexOf('//') === 0) {
        return $window.location.protocol + url;
      }
      else {
        return SailPlay.config().DOMAIN + url;
      }
    }

    return function (pic_url) {

      if (!pic_url) return '';

      return repair_pic_url(pic_url);

    };

  })

  .directive('sailplayRemoteLogin', function (SailPlay) {

    return {
      restrict: 'A',
      replace: true,
      template: '<iframe></iframe>',
      link: function (scope, elm, attrs) {

        var opts = scope.$eval(attrs.sailplayRemoteLogin);

        var options = {
          node: elm[0]
        };

        var logged = false;

        console.dir(opts);
        angular.merge(options, opts);
        console.dir(options);

        scope.$on('sailplay-init-success', function () {
          SailPlay.send('login.remote', options);
        });

        scope.$on('sailplay-login-success', function () {
          logged = true;
        });

        scope.$on('sailplay-logout-success', function () {

          if (logged) {

            logged = false;

            var src = elm[0].src;

            elm[0].src = '';

            elm[0].src = src;

          }

        });

        SailPlay.config() && SailPlay.config().partner && SailPlay.send('login.remote', options);

      }
    }

  })

  .factory('SailPlayShare', function ($window) {
    return function (network, url, title, description, image) {

      var share_url = '';

      switch (network) {

        case 'fb':

          share_url = 'http://www.facebook.com/sharer.php?s=100';
          share_url += '&t=' + encodeURIComponent(title);
          share_url += '&u=' + encodeURIComponent(url);
          break;

        case 'tw':

          share_url = 'https://twitter.com/intent/tweet?tw_p=tweetbutton';
          share_url += '&original_referer=' + encodeURIComponent(url);
          share_url += '&url=' + encodeURIComponent(url);
          share_url += '&text=' + encodeURIComponent(description);


      }

      window.open(share_url, '_blank', 'toolbar=0,status=0,width=626,height=436,location=no');
    }
  });

export default SailPlay.name;