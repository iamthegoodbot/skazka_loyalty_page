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