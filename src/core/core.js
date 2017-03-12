import angular from 'angular';
import SailPlay from '../sailplay/sailplay';
import Widget from './widget';

export let Core = angular.module('magic.core', [
  SailPlay,
  Widget
])

.run(function(SailPlay, SailPlayApi, $rootScope, $window, MAGIC_CONFIG, $timeout, QuizService){

  //we need global template reference for config
  $rootScope.MAGIC_CONFIG = MAGIC_CONFIG;

  //reset to unauthorized state
  function logout_reset(){
    SailPlay.set_auth_hash_cookie(false);
    console.log('reset');
    SailPlayApi.reset();
    SailPlayApi.call('load.badges.list', {include_rules: 1});
    SailPlayApi.call('load.actions.list');
    SailPlayApi.call('load.actions.custom.list');
    SailPlayApi.call('load.gifts.list');
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

  //we need to save auth hash in cookies for authorize status tracking
  $rootScope.$on('sailplay-login-success', function(e, data){
    SailPlay.set_auth_hash_cookie(SailPlay.config().auth_hash);
    SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });
    SailPlayApi.call('load.badges.list', {include_rules: 1});
    SailPlayApi.call('load.actions.list');
    SailPlayApi.call('load.actions.custom.list');
    SailPlayApi.call('load.user.history');
    SailPlayApi.call('tags.exist', {tags: TAGS});
    SailPlayApi.call('load.gifts.list');
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

    SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });
    SailPlayApi.call('load.user.history');

    $rootScope.$apply();

  });

  //SailPlay.on('actions.social.connect.complete', function(){
  //  SailPlayApi.call('load.actions.list');
  //});

});

export default Core.name;
