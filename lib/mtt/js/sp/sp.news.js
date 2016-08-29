(function () {

  angular.module('sp.news', [])

    .service('news_service', function ($http, $rootScope) {

      var that = this;

      var data = null;

      that.getData = function () {

        return data;

      };

      that.loadData = function (callback) {

        $http.get('./dist/json/news.json').success(function (res) {

          data = res;
          callback && callback(res)

        });

      };

      return that;

    })

    .directive('sailplayNews', function (sp_api, sp, $timeout, $rootScope, news_service) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.news = news_service.getData;

          news_service.loadData();

        }
      };

    });

}());
