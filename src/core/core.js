import angular from 'angular';
import SailPlay from '../sailplay/sailplay';
import Widget from './widget';

export let Core = angular.module('magic.core', [
  SailPlay,
  Widget
])

.run(function(SailPlay, SailPlayApi, $rootScope, $window, MAGIC_CONFIG, $timeout, QuizService, $locale){

  $locale.NUMBER_FORMATS.GROUP_SEP = " ";
  $locale.NUMBER_FORMATS.DECIMAL_SEP = ".";
  
  //we need global template reference for config
  $rootScope.MAGIC_CONFIG = MAGIC_CONFIG;

  //reset to unauthorized state
  function logout_reset(){
    SailPlay.set_auth_hash_cookie(false);
    SailPlayApi.reset();
    SailPlayApi.call('load.badges.list', {include_rules: 1});
    SailPlayApi.call('load.actions.list');
    SailPlayApi.call('load.actions.custom.list');
    SailPlayApi.call('load.gifts.list');
    SailPlayApi.call('leaderboard.load');
  }

  //when bad login
  $rootScope.$on('sailplay-login-error', function(){
    logout_reset();
  });

  //when success logout
  $rootScope.$on('sailplay-logout-success', function(){
    logout_reset();
  });

  let TAGS = QuizService.getTags();

  //wait for sailplay inited, then try to login by cookie (we need to see unauthorized content)
  SailPlay.authorize('cookie');
    
  let offset = new Date().getTimezoneOffset(), o = Math.abs(offset)
  let timezone =  (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2)

  //we need to save auth hash in cookies for authorize status tracking
  $rootScope.$on('sailplay-login-success', function(e, data){
    SailPlay.set_auth_hash_cookie(SailPlay.config().auth_hash);
    SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });
    SailPlayApi.call('load.badges.list', {include_rules: 1});
    SailPlayApi.call('load.actions.list');
    SailPlayApi.call('load.actions.custom.list');
    SailPlayApi.call('load.user.history', {tz: timezone});
    SailPlayApi.call('tags.exist', {tags: TAGS});
    SailPlayApi.call('load.gifts.list');
    SailPlayApi.call('leaderboard.load');
  });

  //unfortunately, we need to update actions list after perform
  SailPlay.on('actions.perform.success', function(){
    SailPlayApi.call('load.actions.list');
  });

  SailPlay.on('actions.perform.error', function(){
    SailPlayApi.call('load.actions.list');
  });

  SailPlay.on('actions.perform.complete', function(){
    SailPlayApi.call('load.actions.list');
  });

  SailPlay.on('tags.add.success', function(){
    $timeout(function(){
      SailPlayApi.call('tags.exist', {tags: TAGS});
    }, 2000);
  });

  //also, we need update user info after gift purchase
  SailPlay.on('gifts.purchase.success', function(res){

    setTimeout(() => {
      SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });
      SailPlayApi.call('load.user.history', {tz: timezone});
      SailPlayApi.call('leaderboard.load');
      $rootScope.$apply();
    }, 1000)

  });

  //SailPlay.on('actions.social.connect.complete', function(){
  //  SailPlayApi.call('load.actions.list');
  //});

});

export default Core.name;
