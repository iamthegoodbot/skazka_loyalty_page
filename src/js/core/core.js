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
