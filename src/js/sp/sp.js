(function () {

  angular.module('sp', [
      'sp.actions',
      'sp.gifts',
      'sp.profile',
      'sp.history',
      'sp.news'

    ])

    .service('sp', function ($window) {

      return $window.SAILPLAY || {};

    })

    .service('user_service', function ($window) {

      var self = this;

      self.tags = {
        fill_profile: 'Заполнил профиль'
      };

      self.getTags = function(){
        return angular.copy(self.tags);
      };

      self.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

      return self;

    })

    .service('sp_api', function ($q, sp, $rootScope) {

      var self = this;

      var data = {};

      var points = [

        'load.user.info',
        'load.gifts.list',
        'load.gifts.categories',
        'load.user.history',
        'tags.exist',
        'load.actions.list'

      ];

      angular.forEach(points, function (point) {

        sp.on(point + '.success', function (res) {

          $rootScope.$apply(function () {
            self.data(point, res);

            if($rootScope.debug) {
              console.log('sailplay.api:' + point + '.success');
              console.dir(self.data(point)());
            }

          });

        });

        sp.on(point + '.error', function (res) {
          $rootScope.$apply(function () {

            if($rootScope.debug){
              console.log('sailplay.api:' + point + '.error');
              console.dir(res);
            }

            self.data(point, null);
          });
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

        sp.send(name, params, callback);

      };

    })

    .filter('toArray', function () {
      return function (obj, addKey) {
        if (!angular.isObject(obj)) return obj;
        if ( addKey === false ) {
          return Object.keys(obj).map(function(key) {
            return obj[key];
          });
        } else {
          return Object.keys(obj).map(function (key) {
            var value = obj[key];
            return angular.isObject(value) ?
              Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
            { $key: key, $value: value };
          });
        }
      };
    })

    .filter('to_trusted', ['$sce', function($sce){
      return function(text) {
        return $sce.trustAsHtml(text);
      };
    }])

    .filter('sailplay_pluralize', function () {
      var cases = [2, 0, 1, 1, 1, 2];
      return function (input, titles) {
        input = Math.abs(input);
        titles = titles.split(',');
        return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
      }
    })

    .filter('sailplay_pic', function (sp) {

      function repair_pic_url(url) {
        if (/^((http|https|ftp):\/\/)/.test(url)) {
          return url;
        }
        if (url.indexOf('//') === 0) {
          return window.location.protocol + url;
        }
        else {
          return sp.config().DOMAIN + url;
        }
      }

      return function (pic_url) {

        if (!pic_url) return '';

        return repair_pic_url(pic_url);

      };

    });

}());
