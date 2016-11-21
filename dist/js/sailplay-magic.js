(function () {

  angular.module('magic', [ 'sailplay', 'core', 'ipCookie', 'tools', 'magic.config' ])

  .config(function(SailPlayProvider, MAGIC_CONFIG, SailPlayHistoryProvider, SailPlayActionsDataProvider){

    SailPlayActionsDataProvider.set_actions_data(MAGIC_CONFIG.data.actions);

    SailPlayProvider.set_auth_hash_id(MAGIC_CONFIG.auth.auth_hash_id);

    SailPlayProvider.set_remote_config({
      background: 'transparent'
    });

    if(MAGIC_CONFIG.auth.config) {
      SailPlayProvider.set_remote_config(MAGIC_CONFIG.auth.config);
    }

    SailPlayHistoryProvider.set_dictionary(MAGIC_CONFIG.data.history);

    //SailPlayProvider.set_auth_type(MAGIC_CONFIG.auth.type);

  })

  .directive('sailplayMagic', function(SailPlay, ipCookie, SailPlayApi, $document, $rootScope, MAGIC_CONFIG){

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/magic.html',
      link: function(scope){

        scope.show_statuses_list = false;

        scope.show_profile_action = true;

        scope.show_login = false;

        scope.$on('sailplay-login-cancel', function(){
          scope.show_login = false;
        });

        scope.$on('sailplay-login-success', function(){
          scope.show_login = false;
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

  //define magic constructor
  if(typeof SAILPLAY === 'undefined') return;

  SAILPLAY.magic = function(config){

    SAILPLAY.send('init', config);

    SAILPLAY.on('init.success', function(res){

      if(!res.partner.loyalty_page_config) return;

      angular.module('magic.config', []).constant('MAGIC_CONFIG', res.partner.loyalty_page_config);

      var app_container = document.getElementsByTagName('sailplay-magic')[0];

      app_container && angular.bootstrap(app_container, [ 'magic' ]);

    });

  };

}());
(function () {

  angular.module('core', [
    'sailplay',
    'core.templates',
    'widgets.profile',
    'widgets.gifts',
    'widgets.badges',
    'widgets.leaderboard',
    'widgets.actions',
    'widgets.statuses'
  ])

  .run(function(SailPlay, SailPlayApi, $rootScope, $window, MAGIC_CONFIG, $timeout, QuizService){

    //we need global template reference for config
    $rootScope.MAGIC_CONFIG = MAGIC_CONFIG;

    //reset to unauthorized state
    function logout_reset(){
      SailPlay.set_auth_hash_cookie(false);
      console.log('reset');
      SailPlayApi.reset();
      SailPlayApi.call('load.badges.list');
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

    var TAGS = QuizService.getTags();

    //wait for sailplay inited, then try to login by cookie (we need to see unauthorized content)
    SailPlay.authorize('cookie');

    //we need to save auth hash in cookies for authorize status tracking
    $rootScope.$on('sailplay-login-success', function(e, data){
      SailPlay.set_auth_hash_cookie(SailPlay.config().auth_hash);
      SailPlayApi.call('load.user.info', { all: 1 });
      SailPlayApi.call('load.badges.list');
      SailPlayApi.call('load.actions.list');
      SailPlayApi.call('load.actions.custom.list');
      SailPlayApi.call('load.user.history');
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

      SailPlayApi.call('load.user.info', { all: 1 });
      SailPlayApi.call('load.user.history');
      SailPlayApi.call('leaderboard.load');

      $rootScope.$apply();

    });

    //SailPlay.on('actions.social.connect.complete', function(){
    //  SailPlayApi.call('load.actions.list');
    //});

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
    '<div class="sailplay magic"><style data-ng-repeat="tool in MAGIC_CONFIG.tools" data-widget-style="tool.styles"></style><div class="bn_wrap clearfix"><div class="clearfix" data-ng-repeat="widget in MAGIC_CONFIG.widgets" data-ng-switch="widget.name"><sailplay-magic-profile data-ng-switch-when="profile" data-config="widget"></sailplay-magic-profile><sailplay-magic-badges data-ng-switch-when="badges" data-config="widget"></sailplay-magic-badges><sailplay-magic-gifts data-ng-switch-when="gifts" data-config="widget"></sailplay-magic-gifts><sailplay-magic-actions data-ng-switch-when="actions" data-config="widget"></sailplay-magic-actions><sailplay-magic-leaderboard data-ng-switch-when="leaderboard" data-config="widget"></sailplay-magic-leaderboard><sailplay-magic-statuses data-ng-switch-when="statuses" data-config="widget"></sailplay-magic-statuses></div></div><notifier></notifier></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/datepicker.html',
    '<div><div class="form_date form_date__day"><span data-ng-bind="model[0] || \'Day\'"></span><div class="form_date__popup"><a href="#" data-ng-repeat="day in range(1, days[model[1] || 1])" data-ng-bind="day" data-ng-click="$event.preventDefault();model[0] = day;"></a></div></div><div class="form_date form_date__month"><span data-ng-bind="months[model[1]] || \'Month\'"></span><div class="form_date__popup"><a href="#" data-ng-repeat="(key, value) in months track by $index" data-ng-bind="value" data-ng-click="$event.preventDefault();model[1] = +key;"></a></div></div><div class="form_date form_date__year"><span data-ng-bind="model[2] || \'Year\'"></span><div class="form_date__popup"><a href="#" data-ng-repeat="year in years" data-ng-bind="year" data-ng-click="$event.preventDefault();model[2] = year;"></a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/modal.html',
    '<div class="bns_overlay" data-ng-class="{ visible: show }" tabindex="-1" role="dialog"><div class="bns_overlay_iner modal_container" data-ng-style="{ background: _modal_config.styles.background }"><a href="#" class="close_overlay" data-ng-click="$event.preventDefault(); close();" data-ng-style="{ backgroundImage: (_modal_config.images.close | background_image) }"></a><ng-transclude></ng-transclude></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/notifier.html',
    '<div data-ng-cloak=""><magic-modal class="bns_overlay_notify" data-show="show_notifier"><div><a href="#" class="close_overlay" data-ng-click="reset_notifier();$event.preventDefault();"></a><h3 class="notifier_header" data-ng-bind-html="data.header | to_trusted"></h3><h4 class="notifier_body" data-ng-bind-html="data.body | to_trusted" style="margin: 20px 0;"></h4><a class="notify_link button_primary" data-ng-click="reset_notifier();$event.preventDefault();">{{ _tools.buttons.texts.ok }}</a></div></magic-modal></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/tools/pagination.controls.html',
    '<div class="bns_hist_pager" data-ng-if="1 < pages.length || !autoHide"><a data-ng-if="directionLinks" data-ng-class="{ disabled : pagination.current == 1 }" href="" data-ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a> <a data-ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" data-ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }" href="" data-ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a> <a data-ng-if="directionLinks" data-ng-class="{ disabled : pagination.current == pagination.last }" href="" data-ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/actions.html',
    '<div class="{{ _config.name }} clearfix"><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div id="magic_actions" class="more_bonus container" data-ng-show="_config.enabled" data-ng-cloak=""><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-actions=""><div class="more_bonus_main"><div class="mb_item action" data-ng-repeat="action in actions().actions" data-ng-style="_config.styles.action"><div class="mb_item_left"><span class="action_name" data-ng-bind="action_data(action).name"></span> <span class="action_points" data-ng-show="action.points" data-ng-bind="((action.points || 0) | number) + \' \' + (action.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a class="sp_btn button_primary" data-ng-click="action_select(action)">{{ action_data(action).button_text }}</a></div><div class="mb_item_right"><img data-ng-src="{{ action_data(action).pic | sailplay_pic }}" alt=""></div></div><div class="mb_item action" data-ng-repeat="action in actions_custom()" data-ng-style="_config.styles.action"><div class="mb_item_left"><span class="action_name" data-ng-bind="action.name"></span> <span class="action_points" data-ng-show="action.points" data-ng-bind="((action.points || 0) | number) + \' \' + (action.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a class="sp_btn button_primary" data-ng-click="action_custom_select(action)">{{ action.button_text }}</a></div><div class="mb_item_right"><img data-ng-src="{{ action.icon | sailplay_pic }}" alt=""></div></div><div class="mb_item action" data-ng-if="quiz_list && quiz_list.length && ((!exist || !exist()) || !checkTag(quiz.tag, exist()))" data-ng-repeat="quiz in $parent.quiz_list" data-ng-style="_config.styles.action"><div class="mb_item_left"><span class="action_name" data-ng-bind="quiz.name"></span> <span class="action_points" data-ng-show="quiz.points" data-ng-bind="((quiz.points || 0) | number) + \' \' + (quiz.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a class="sp_btn button_primary" data-ng-click="$event.preventDefault();open_quiz(quiz)">{{ quiz.button_text }}</a></div><div class="mb_item_right"><img data-ng-src="{{ quiz.icon | sailplay_pic }}" alt=""></div></div></div><magic-modal class="actions_selected_modal" data-ng-cloak="" data-show="$parent.action_selected"><div><div class="action_image"><img class="gift_more_img" data-ng-src="{{ action_data(action_selected).pic | sailplay_pic }}" alt="{{ action_data(action_selected).name }}"></div><div class="action_tools"><p><span class="modal_action_name" data-ng-bind="action_data(action_selected).name"></span></p><p style="margin-top: 10px;"><span class="modal_action_points" data-ng-bind="(action_selected.points | number) + \' \' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span></p><p style="margin-top: 10px;"><span class="modal_action_description" data-ng-bind="action_data(action_selected).description"></span></p><p class="action_buttons"><span data-sailplay-action="" data-styles="{{ action_styles(action_data(action_selected)) }}" data-action="action_selected" data-text="{{ action_data(action_selected).button_text }}"><span class="sp_btn button_primary">{{ action_data(action_selected).button_text }}</span></span></p></div></div></magic-modal><magic-modal class="actions_custom_selected_modal" data-ng-cloak="" data-show="$parent.action_custom_selected"><div data-sailplay-action-custom="" data-action="action_custom_selected"></div></magic-modal><magic-modal class="actions_custom_selected_modal" data-ng-cloak="" data-show="$parent.quiz.show"><div class="quiz_main"><div class="quiz_block" data-ng-if="$parent.quiz.data"><div class="quiz_block__title" data-ng-bind="$parent.quiz.data.name"></div><div class="quiz_block__counter" data-ng-bind="$parent.quiz.step + \' / \' + $parent.quiz.data.data.length"></div><div class="quiz_block__name" data-ng-bind="getCurrentTest().name"></div><label data-ng-repeat="question in getCurrentTest().answers" data-ng-switch="getCurrentTest().type" data-ng-click="$event.preventDefault();change(question, getCurrentTest());"><input data-ng-switch-when="many" type="checkbox" name="quiz_[[ $index ]]" data-ng-checked="check(question)"> <input data-ng-switch-when="one" type="radio" name="quiz" data-ng-checked="check(question)"> <span data-ng-bind="question.text"></span></label> <textarea name="variable" data-ng-show="needToShowVariable()" data-ng-model="models.variable"></textarea><div class="button_wrapper clearfix"><span data-ng-click="prev();" class="quiz_block__btn prev" data-ng-class="{type_disabled: $parent.quiz.step == 1}">Prev</span> <span data-ng-click="next();" class="quiz_block__btn next" data-ng-class="{type_disabled: !canPressNext() }" data-ng-bind="step == $parent.quiz.data.data.length ? \'Finish\' : \'Next\'">next</span></div></div></div></magic-modal></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/badges.badge.html',
    '<div class="badge"><div class="badge_iner" data-ng-click="on_click(badge)"><div class="badge_pic"><img data-ng-src="{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}" alt="{{ badge.name }}"></div><span class="badge_name" data-ng-bind="badge.name"></span></div><div class="badge_arrow"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/badges.html',
    '<div class="widget {{ _config.name }} clearfix"><div class="container clearfix" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-badges="" class="badge_lines_container clearfix"><sailplay-magic-badge-line class="multi_level" data-ng-repeat="line in sailplay.badges.list().multilevel_badges" data-line="line" data-config="_config"></sailplay-magic-badge-line><sailplay-magic-badge-line class="one_level" data-line="sailplay.badges.list().one_level_badges" data-type="one_level" data-config="_config"></sailplay-magic-badge-line></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/badges.line.html',
    '<div class="clearfix"><div class="bon_item_main clearfix" data-ng-show="line.length"><div class="bon_slide_cat_item_wrap" data-magic-gallery=""><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><sailplay-magic-badge data-magic-slide="" data-badge="badge" data-on-click="badge_select(badge);" data-ng-repeat="badge in line" data-ng-class="{ last: $last }"></sailplay-magic-badge></div></div></div></div><magic-modal class="modal_badge_selected" data-ng-cloak="" data-show="badge_selected"><div><div class="modal_badge_image"><img class="gift_more_img" data-ng-src="{{ badge_selected.thumbs.url_250x250 | sailplay_pic }}" alt="{{ badge_selected.name }}"></div><div class="modal_badge_tools"><p><span class="modal_badge_name" data-ng-bind="badge_selected.name"></span></p><p style="margin-top: 10px;"><span class="modal_badge_description" data-ng-bind="badge_selected.descr"></span></p><p class="modal_badge_buttons"><span class="badge_share_button fb_icon" data-ng-click="badge_share(\'fb\', badge_selected)">{{ _config.texts.share_fb }}</span> <span class="badge_share_button tw_icon" style="margin-right: 20px;" data-ng-click="badge_share(\'tw\', badge_selected)">{{ _config.texts.share_tw }}</span> <span class="sp_btn button_primary" data-ng-click="badge_select(false);">{{ _tools.buttons.texts.close }}</span></p></div></div></magic-modal></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/gifts.html',
    '<div class="{{ _config.name }} clearfix"><div class="bon_choice_main container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-gifts=""><div class="bon_item_main" data-ng-show="gifts && gifts().length" data-magic-slider=""><div class="bon_slide_cat_item_wrap" data-magic-gallery=""><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><div class="bon_item gift" data-magic-slide="" data-ng-repeat="gift in gifts()"><div class="bon_item_iner"><div class="gift_img"><img data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ gift.name }}"></div><div class="gift_info"><span class="bon_item_name gift_name" data-ng-bind="gift.name"></span> <span class="bon_tem_info gift_points" data-ng-bind="(gift.points | number) + \' \' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span></div><a href="#" class="button_primary" data-ng-click="gift_select(gift); $event.preventDefault();">{{ _config.texts.get }}</a></div></div></div></div><a href="#" class="arr_left arr_left slider_arrow_left" data-ng-click="$event.preventDefault(); set_position(\'left\');" data-ng-show="show_left"></a> <a href="#" class="arr_right arr_right slider_arrow_right" data-ng-click="$event.preventDefault(); set_position(\'right\');" data-ng-show="show_right"></a></div></div><magic-modal class="bns_overlay_gift" data-ng-cloak="" data-show="$parent.selected_gift"><div><div class="gift_img"><img class="gift_more_img" data-ng-src="{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ selected_gift.name }}"></div><div class="gift_more_block"><span class="gift_more_name modal_gift_name" data-ng-bind="selected_gift.name"></span> <span class="gift_more_points modal_gift_points" data-ng-bind="(selected_gift.points | number) + \' \' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span><p class="gift_more_descr modal_gift_description" data-ng-bind="selected_gift.descr"></p><span class="alink button_primary" data-ng-click="gift_select(false);">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" style="margin-left: 5px;" data-ng-click="gift_confirm();" data-ng-bind="gift_affordable(selected_gift) ? _config.texts.get : _config.texts.no_points_button_text">{{ _config.texts.get }}</span></div></div></magic-modal><magic-modal class="bns_overlay_gift_not_points" data-ng-cloak="" data-show="$parent.no_points_error"><div><p class="modal_gift_description">{{ _config.texts.no_points_message }}</p><a class="alink button_primary earn_points_button" href="#magic_actions" data-ng-click="gift_unconfirm()">{{ _config.texts.earn_points }}</a> <a class="alink button_primary service_button" data-ng-if="_config.texts.partner_service_url" target="_blank" href="{{ _config.texts.partner_service_url }}" data-ng-click="gift_unconfirm()">{{ _config.texts.service }}</a></div></magic-modal><magic-modal class="bns_overlay_gift_complete" data-ng-cloak="" data-show="$parent.confirmed_gift"><div><p class="modal_gift_description">{{ _config.texts.confirm_message_start }} {{ (confirmed_gift.points | number) + \' \' + (confirmed_gift.points | sailplay_pluralize:_tools.points.texts.pluralize) }}. {{ _config.texts.confirm_message_end }}</p><span class="alink button_primary" data-ng-click="gift_unconfirm();">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" data-ng-click="gift_purchase(confirmed_gift);">{{ _tools.buttons.texts.get }}</span></div></magic-modal><magic-modal class="bns_overlay_gift bns_overlay_order_gift" data-ng-cloak="" data-show="$parent.order_gift"><div class="mb_popup mb_popup_order_gift" data-sailplay-order-gift="" data-config="{{ _config.order_gift.config }}"><div class="gift_img"><img class="gift_more_img" data-ng-src="{{ $parent.order_gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ $parent.order_gift.name }}"></div><div class="gift_overlay"><div class="gift_more_block"><span class="gift_more_name modal_gift_name" data-ng-bind="$parent.order_gift.name"></span> <span class="gift_more_points modal_gift_points" data-ng-bind="($parent.order_gift.points | number) + \' \' + ($parent.order_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span><p class="gift_more_descr modal_gift_description" data-ng-bind="$parent.order_gift.descr"></p></div><div class="mb_popup_top"><span class="modal_profile_header">{{ _config.order_gift.header }}</span></div><form name="order_gift" class="mb_popup_main mb_popup_main_mt" data-ng-submit="sailplay.order_gift.submit(order_gift, $parent.order_gift, gift_purchase);"><div class="form_field" data-ng-repeat="field in sailplay.order_gift.form" data-ng-switch="field.input"><div data-ng-switch-when="image" class="avatar_upload clearfix"><img width="160px" data-ng-src="{{ (field.value | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png\'}}" alt=""></div><div data-ng-switch-when="text" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="date" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="select" class="clearfix"><label class="form_label">{{ field.label }}</label><div class="magic_select form_input"><select data-ng-model="field.value" data-ng-required="field.required" data-ng-options="item.value as item.text for item in field.data"></select></div></div><div data-ng-switch-when="phone" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="email" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="email" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div></div><div class="answ_text"><button type="submit" class="sp_btn button_primary">{{ _tools.buttons.texts.save }}</button></div></form></div></div></magic-modal></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/leaderboard.html',
    '<div class="{{ _config.name }} clearfix"><div class="bon_choice_main container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><ul class="leaderboard__list" data-ng-if="data && data()"><li class="leaderboard__list-item type_headers"><span class="leaderboard__list-item__rank rows headers">{{ _config.texts.rank }}</span> <span class="leaderboard__list-item__name rows headers">{{ _config.texts.full_name }}</span> <span class="leaderboard__list-item__score rows headers">{{ _config.texts.score }}</span></li><li class="leaderboard__list-item" data-ng-repeat="member in $parent.data().members.members" data-ng-class="{ type_current : member.is_current_user }"><span class="leaderboard__list-item__rank rank rows" data-ng-bind="member.rank"></span> <span class="leaderboard__list-item__name full_name rows"><img class="leaderboard__list-item__photo photo" data-ng-if="member.pic" data-ng-src="{{ $parent.member.pic | sailplay_pic }}" alt="{{ $parent.member.full_name || \'n/a\' }}"> {{ member.full_name || \'n/a\' }}</span> <span class="leaderboard__list-item__score score rows" data-ng-bind="member.score"></span></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/profile.html',
    '<div class="{{ _config.name }} clearfix"><div class="bon_profile_wrap container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div class="bon_profile_info" data-sailplay-profile=""><div class="bon_profile_top clearfix"><div class="bon_profile_top_left"><h3><span class="header">{{ _config.texts.header }}</span></h3><h4><span class="caption">{{ _config.texts.spoiler }}</span></h4></div><div class="bon_profile_right" data-ng-show="user()"><div class="user_avatar"><img class="user_avatar_image" data-ng-src="{{ (user().user.pic | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png \'}}" alt="You"> <a href="#" class="logout_btn button_link" data-ng-click="$event.preventDefault(); logout();">{{ _config.texts.logout }}</a></div><div class="user_info"><span class="user_name" data-ng-bind="user().user.name || _config.texts.name_not_defined"></span> <span class="user_phone" data-ng-if="user().user.phone" data-ng-bind="user().user.phone"></span> <span class="user_email" data-ng-if="user().user.email" data-ng-bind="user().user.email"></span> <a href="#" class="edit_profile_btn button_link" data-ng-click="$event.preventDefault();fill_profile(true);">{{ _config.texts.edit_profile_button }}</a></div></div><div class="bon_profile_right clearfix" data-ng-show="!user()"><button type="button" class="sp_btn button_primary login_reg_btn" data-ng-click="$event.preventDefault(); login(\'remote\');">{{ _config.texts.login_reg }}</button></div></div><div class="status_block" data-ng-show="user()"><span class="status_block_title" data-ng-bind="_config.texts.user_status"></span> <img class="status_block_img" data-ng-src="{{ user().user_status.pic | sailplay_pic }}" alt="{{ user().user_status.name }}"> <span class="status_block_name" data-ng-bind="user().user_status.name || _config.texts.empty_status"></span></div><div class="bon_profile_stat"><div class="bps_left clearfix" data-ng-class="{ transparent: !user() }"><span class="points_confirmed"><span class="points_confirmed_value" data-ng-bind="user().user_points.confirmed | number"></span> <span class="points_confirmed_name" data-ng-bind="user().user_points.confirmed | sailplay_pluralize: _tools.points.texts.pluralize"></span></span> <a class="button_link" href="#" data-ng-click="$event.preventDefault(); $parent.show_history = true;">{{ _config.texts.history_button }}</a></div><div class="bps_right clearfix" data-sailplay-gifts="" data-ng-show="progress"><div class="progress_line_main"><div class="progress_line_bg progress_bar progress_bar_border"></div><div class="progress_line progress_bar_filled" data-procent="0" data-ng-style="{ width: progress.plenum + \'%\' }"><div class="progress_text progress_bar_flag" data-ng-show="progress.next.item" data-ng-class="{ right_position: progress.plenum < 50 }"><span class="progress_bar_flag_text" data-ng-bind="progress.next.offset + \' \' + (progress.next.offset | sailplay_pluralize:_tools.points.texts.pluralize) + \' \' + _config.texts.before_gift"></span></div></div><div class="gift_item progress_bar_border" data-ng-repeat="item in progress.items track by $index" data-ng-class="{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}" data-ng-style="{ left: item.get_left() }"><span class="gift_item_hint" data-ng-bind="item.gifts[0].points"></span></div></div></div></div></div><magic-modal class="bns_overlay_hist" data-show="show_history"><div data-sailplay-history="" data-sailplay-profile=""><h3><span class="modal_history_header">{{ _config.texts.history.header }}</span></h3><h4 class="modal_history_caption">{{ _config.texts.history.caption }}</h4><table class="bns_hist_table"><tbody><tr data-dir-paginate="item in history() | itemsPerPage:10" data-pagination-id="history_pages"><td><span class="modal_history_date" data-ng-bind="item.action_date | date:\'d/MM/yyyy\'"></span></td><td><span><b class="modal_history_content" data-ng-bind="item | history_item"></b></span></td><td><span class="modal_history_points" data-ng-if="item.points_delta" data-ng-bind="((item.points_delta|number) || 0) + \' \' + (item.points_delta | sailplay_pluralize:_tools.points.texts.pluralize)"></span></td></tr></tbody></table><dir-pagination-controls data-max-size="7" data-pagination-id="history_pages" data-template-url="/html/tools/pagination.controls.html" data-auto-hide="true"></dir-pagination-controls></div></magic-modal><magic-modal class="fill_profile_modal" data-show="show_fill_profile"><div class="mb_popup mb_popup_prof" data-sailplay-fill-profile="" data-config="_config.fill_profile.config"><div class="mb_popup_top"><span class="modal_profile_header">{{ _config.fill_profile.header }}</span></div><form name="fill_profile" class="mb_popup_main mb_popup_main_mt" data-ng-submit="sailplay.fill_profile.submit(fill_profile, $parent.fill_profile);"><div class="form_field" data-ng-repeat="field in sailplay.fill_profile.form.fields" data-ng-switch="field.input"><div data-ng-switch-when="image" class="avatar_upload clearfix"><img width="160px" data-ng-src="{{ (field.value | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png\'}}" alt=""></div><div data-ng-switch-when="text" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="date" class="clearfix"><label class="form_label">{{ field.label }}</label><date-picker data-model="field.value"></date-picker></div><div data-ng-switch-when="select" class="clearfix"><label class="form_label">{{ field.label }}</label><div class="magic_select form_input"><select data-ng-model="field.value" data-ng-options="item.value as item.text for item in field.data"></select></div></div><div data-ng-switch-when="phone" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="email" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="email" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div></div><div class="answ_text"><button type="submit" class="sp_btn button_primary">{{ _tools.buttons.texts.save }}</button></div></form></div></magic-modal></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/core/widgets/statuses.html',
    '<div class="{{ _config.name }} clearfix"><div class="status-list container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div class="status-list__wrapper" data-sailplay-statuses="" data-ng-cloak=""><div class="status-list__progress element-progress" data-ng-style="getProgress(user().user_points, _statuses)"></div><div class="status-list__item element-item" data-ng-class="{ type_active : item.points <= user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra }" data-ng-repeat="item in _statuses" data-ng-style="generateOffset($index, _statuses)"><div class="status-list__item-point element-item-point"></div><div class="status-list__item-name element-item-name" data-ng-bind="item.name"></div><div class="status-list__item-status element-item-status" data-ng-if="item.status" data-ng-bind="item.status" style="{{ (item.color) ? (\'color: \' + item.color) : \'\' }}"></div></div></div></div></div>');
}]);
})();

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

    .constant('TAGS_ADD_LIMIT', 10)

    .service('QuizService', function (MAGIC_CONFIG, TAGS_ADD_LIMIT, SailPlayApi) {

      var self = this;

      self.getTags = function () {

        var tags = [];

        if (MAGIC_CONFIG && MAGIC_CONFIG.data.quiz) {

          tags = tags.concat(MAGIC_CONFIG.data.quiz.map(function (item) {
            return item.tag;
          }));

        }

        return tags;
      };

      self.checkTag = function (tag, exist) {

        if (!tag || !exist) return true;

        var _tag = exist.tags.filter(function (item) {
            return item.name == tag
          })[0] || {};

        return _tag.exist;

      };

      self.addTags = function (data, callback) {

        var _send_data = angular.copy(data);

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
              console.log(attrs.styles);
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
    .directive('sailplayActionCustom', function(SailPlay, $document){

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function(scope, elm, attrs){

          var iframe = $document[0].createElement('iframe');

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency="true";

          elm.append(iframe);

          scope.$watch('action', function(action){

            if(action){

              var config = SailPlay.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
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
     * @restrict A
     *
     * @description
     * SailPlay profile directive used for rendering and operating with badges. =)
     * This directive extends parent scope with property: sailplay.badges
     *
     */
    .directive('sailplayBadges', function(SailPlayApi, SailPlayBadges){

      return {

        restrict: 'A',
        replace: false,
        scope: false,
        link: function(scope){

          //we need to define reserved property for sailplay service
          scope.sailplay = scope.sailplay || {};

          //ok then we need define badges functionality
          scope.sailplay.badges = {
            list: SailPlayApi.data('load.badges.list')
          };

          var user = SailPlayApi.data('load.user.info');

          // badges.get_next = function () {
          //
          //   var badges_list = badges.list;
          //
          //   var statuses = badges_list && badges_list() && badges_list().multilevel_badges && badges_list().multilevel_badges[0];
          //   if (!statuses) return;
          //   var received = statuses.filter(function (status) {
          //     return status.is_received;
          //   });
          //   if (received.length == statuses.length) return null;
          //   var result = statuses.filter(function (status) {
          //     return !status.is_received;
          //   });
          //   return result[0] || statuses[0];
          //
          // };
          //
          // badges.get_offset = function () {
          //
          //   var arr = SailPlayBadges.limits;
          //
          //   var limit = user && user() ? user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra : 0;
          //   var result = [];
          //   for (var i = 0, len = arr.length; i < len; i++) {
          //     var current_limit = arr[i];
          //     if (limit < current_limit) {
          //       result.push(current_limit);
          //     }
          //   }
          //   return Math.round(result[0] ? result[0] - limit : 0);
          // };
          //
          // badges.get_streak = function(badges_arr){
          //
          //   var streak = {
          //     streak: [],
          //     progress: 0
          //   };
          //
          //   if(!badges_arr) return streak;
          //
          //   for(var i = 0; i < badges_arr.length; i+=1){
          //
          //     var badge = badges_arr[i];
          //     if(badge.is_received) streak.streak.push(badge);
          //     else break;
          //
          //   }
          //
          //   streak.progress = badges_arr.length/streak.streak.length*100;
          //
          //   if(scope.get_offset)
          //
          //   return streak;
          //
          // };
          //
          // badges.get_progress = function(){
          //
          //   var balance = user && user() ? user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra : 0;
          //
          //   var target = parseInt(angular.copy(SailPlayBadges.limits).pop());
          //
          //   var progress = balance/target*100;
          //
          //   return progress <= 100 ? progress : 100;
          //
          // };

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
    .directive('sailplayGifts', function (SailPlay, SailPlayApi) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.gifts = SailPlayApi.data('load.gifts.list');

          var user = SailPlayApi.data('load.user.info');

          scope.gift_purchase = function (gift) {

            SailPlay.send('gifts.purchase', {gift: gift});

          };

          scope.gift_affordable = function (gift) {
            return user() && user().user_points.confirmed >= gift.points;
          };

          scope.$watch(function () {
            return angular.toJson([scope.gifts(), user()]);
          }, function () {

            build_progress();

          });

          scope.progress = false;

          function build_progress() {

            if (!scope.gifts() || scope.gifts().length < 1) {
              scope.progress = false;
              return;
            }

            var target = Math.max.apply(Math, scope.gifts().map(function (o) {
              return o.points;
            }));

            var progress_value = user() && user().user_points.confirmed / (target / 100) || 0;

            scope.progress = {
              items: [],
              plenum: progress_value <= 100 ? progress_value : 100,
              next: {
                item: false,
                offset: 0
              }
            };

            var ProgressItem = function () {

              this.gifts = [];

              this.left = 0;

              this.reached = false;

              this.get_left = function () {

                return this.left + '%';

              }

            };

            scope.gifts().sort(function (a, b) {
              return a.points > b.points;
            }).reduce(function (prev_gift, current_gift) {

              var item;

              if (!prev_gift) {

                item = new ProgressItem();

                item.gifts.push(current_gift);

                scope.progress.items.push(item);

              }
              else {

                if (Math.abs(prev_gift.points - current_gift.points) < target * 0.02) {
                  item = scope.progress.items[scope.progress.length - 1];
                  item && item.gifts.push(current_gift);
                }
                else {
                  item = new ProgressItem();
                  item.gifts.push(current_gift);
                  scope.progress.items.push(item);
                }

              }

              item.left = parseInt(current_gift.points) / (parseInt(target) / 100);
              item.reached = user() && current_gift.points <= user().user_points.confirmed;

              if (user() && !item.reached && !scope.progress.next.item) {

                scope.progress.next.item = current_gift;
                scope.progress.next.offset = parseInt(current_gift.points) - parseInt(user().user_points.confirmed);

              }


            }, 0);

          }


        }

      };

    })

    .directive('sailplayOrderGift', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi) {

      return {
        restrict: 'A',
        scope: false,
        link: function (scope, elm, attrs) {

          var config = JSON.parse(attrs.config || 'false');

          scope.sailplay = scope.sailplay || {};

          scope.gift_id = {};

          scope.sailplay.order_gift = {
            config: config,
            form: config.fields
          };

          if (!config) {
            console.error('Provide order_form_config');
          }

          scope.sailplay.order_gift.submit = function (form, gift, callback) {

            if (!form || !form.$valid || !gift) {
              return;
            }

            var vars = {};

            angular.forEach(scope.sailplay.order_gift.form, function(item){
              vars[item.name] = item.value;
            });

            SailPlay.send('vars.add', {custom_vars: vars}, function (vars_res) {

              if (vars_res.status === 'ok') {

                callback && callback(gift);
                scope.$apply();

              } else {

                $rootScope.$broadcast('notifier:notify', {
                  header: $rootScope.locale.error,
                  body: user_res.message || $rootScope.locale.notifications.default_error
                });
                scope.$apply();

              }

            });

          };

        }

      };

    })

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

    .provider('SailPlayHistory', function(){

      var dict = {
        "purchase": "Purchase",
        "gift_purchase": "Gift",
        "badge": "Badge",
        "registration": "Sign up",
        "referral": "Invite friend",
        "referred": "Registration from friend's invite",
        "referred_purchase": "Friend's purchase",
        "promocode": "Promocode activation",
        "enter_group": "Joined our group on ",
        "share_purchase": "Shared a purchase on ",
        "social_share": "Shared our website on ",
        "share_badge": "Shared a badge on ",
        "earn_badge": 'Earn badge ',
        "custom_action" : "Custom action"
      };

      return {
        set_dictionary: function(new_dict){
          angular.merge(dict, new_dict);
        },
        $get: function(){

          return {

            dict: dict

          };

        }
      };

    })

    .filter('history_item', function(SailPlayHistory) {

      var history_texts = SailPlayHistory.dict;

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
    'sailplay.statuses',
    'ipCookie'
  ])

    .run(function(SailPlay, $rootScope){

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


    .provider('SailPlay', function(){

      var auth_type = 'url';

      var auth_options = {};

      var auth_hash_id = 'sailplay_auth_hash';

      return {

        set_auth_type: function(type, options){

          if(type) auth_type = type;

          if(options) auth_options = options;

        },

        set_auth_hash_id: function(name){

          if(name) auth_hash_id = name;

        },

        set_remote_config: function(new_config){

          angular.merge(auth_options, new_config);

        },

        $get: function($window, $rootScope, ipCookie){

          var sp = $window.SAILPLAY || {};

          sp.authorize = function(type){

            type = type || auth_type;

            switch (type){

              case 'url':

                var params = sp.url_params();

                if (params) {
                  sp.send('login', params[auth_hash_id]);
                }
                else {
                  $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
                }

                break;

              case 'cookie':

                var auth_hash = ipCookie(auth_hash_id);
                if(auth_hash){
                  sp.send('login', auth_hash);
                }
                else {
                  $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
                }
                break;

              case 'remote':

                sp.send('login.remote', auth_options);

            }



          };

          sp.auth_hash_id = auth_hash_id;

          sp.set_auth_hash_cookie = function(auth_hash){
            ipCookie(auth_hash_id, auth_hash);
          };

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
        'leaderboard.load',
        'load.user.history',
        'load.actions.list',
        'load.actions.custom.list',
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

        SailPlay.send(name, params, callback);

      };

      self.reset = function(){
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

    })

    .factory('SailPlayShare', function ($window) {
      return function (network, url, title, description, image) {

        var share_url = '';

        switch (network){

          case 'fb':

            share_url = 'http://www.facebook.com/sharer.php?s=100';
            share_url += '&t=' + encodeURIComponent(title);
            share_url += '&u=' + encodeURIComponent(url);
            break;

          case 'tw':

            share_url = 'https://twitter.com/intent/tweet?tw_p=tweetbutton';
            share_url += '&original_referer=' + encodeURIComponent(url);
            share_url += '&url=' + encodeURIComponent(url);
            share_url +=  '&text=' + encodeURIComponent(description);



        }

        $window[0].open(share_url, '_blank', 'toolbar=0,status=0,width=626,height=436,location=no');

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
           * @name login
           * @methodOf sailplay.profile.directive:sailplayProfile
           * @description
           * Login by type.
           * @param {string}  type   Authorization type.
           */
          scope.login = function(type){

            SailPlay.authorize(type);

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

    })

    /**
     * @ngdoc service
     * @name sailplay.profile.service:SailPlayFillProfileProvider
     * @description
     * data service for SailPlay profile editing
     */
    .provider('SailPlayFillProfile', function(){

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

          this.Field = function(params){

            this.type = params.type;
            this.name = params.name;
            this.label = params.label;
            this.placeholder = params.placeholder;
            this.input = params.input || 'text';

            if(params.data){
              this.data = params.data;
            }

            this.value = '';

          };

          return this;

        }

      };

    })

    /**
     * @ngdoc directive
     * @name sailplay.profile.directive:sailplayFillProfile
     * @restrict A
     *
     * @param {object}  config   Config object for fill profile. Fields will be constructed from config.fields.
     *
     * @description
     * SailPlay profile directive implements user's profile editing.
     * This directive extends parent scope with property: sailplay.fill_profile
     *
     */
    .directive('sailplayFillProfile', function(SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile){

      return {

        restrict: 'A',
        scope: false,
        link: function(scope, elm, attrs){

          var config = scope.$eval(attrs.config);

          scope.sailplay = scope.sailplay || {};

          scope.sailplay.fill_profile = {
            config: config,
            form: {}
          };

          if(!config) {
            console.error('Provide fill_profile_config');
          }

          var saved_form = false;

          scope.$watch(function(){
            return angular.toJson([ SailPlayApi.data('load.user.info')() ]);
          }, function(){

            var user = SailPlayApi.data('load.user.info')();

            if(!user) return;

            var form = scope.sailplay.fill_profile.form;

            form.fields = config.fields.map(function (field) {

              var form_field = new SailPlayFillProfile.Field(field);

              //we need to assign received values to form
              switch (form_field.type) {

                //we need define type
                case 'system':

                  //bind different values to form field
                  switch (form_field.name) {

                    case 'firstName':

                      form_field.value = user.user.first_name || '';
                      break;

                    case 'lastName':

                      form_field.value = user.user.last_name || '';
                      break;

                    case 'middleName':

                      form_field.value = user.user.middle_name || '';
                      break;

                    case 'birthDate':

                      var bd = user.user.birth_date && user.user.birth_date.split('-');
                      form_field.value = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];
                      break;

                    case 'addPhone':

                      form_field.value = user.user.phone || '';
                      break;

                    case 'addEmail':

                      form_field.value = user.user.email || '';
                      break;

                    case 'sex':

                      form_field.value = user.user.sex || '';
                      break;

                  }

                  break;

              }

              return form_field;
            });

            form.auth_hash = SailPlay.config().auth_hash;
            //angular.extend(scope.profile_form.user, user.user);
            //if(ipCookie(FillProfile.cookie_name) && SailPlay.config().auth_hash === ipCookie(FillProfile.cookie_name).user.auth_hash ){
            //  angular.extend(scope.profile_form, ipCookie(FillProfile.cookie_name));
            //}
            console.dir(form);
            saved_form = angular.copy(form);

          });

          scope.revert_profile_form = function(form){
            if (form) {
              form.$setPristine();
              form.$setUntouched();
            }
            scope.sailplay.fill_profile.form = angular.copy(saved_form);
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

          scope.sailplay.fill_profile.submit = function(form, callback){

            if(!form || !form.$valid) {
              return;
            }

            var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;

            var req_user = {};

            angular.forEach(scope.sailplay.fill_profile.form.fields, function(item){
              req_user[item.name] = item.value;
            });

            if(req_user.addPhone && data_user && data_user.phone && data_user.phone.replace(/\D/g,'') == req_user.addPhone.replace(/\D/g,'')){
              delete req_user.addPhone;
            }

            if(req_user.addEmail && data_user && data_user.email && data_user.email == req_user.addEmail){
              delete req_user.addEmail;
            }

            if(req_user.birthDate) {
              var bd = angular.copy(req_user.birthDate);
              bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
              bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
              req_user.birthDate = bd.reverse().join('-');
            }

            SailPlay.send('users.update', req_user, function(user_res){

              if(user_res.status === 'ok'){

                scope.$apply(function(){

                  if (typeof callback == 'function') callback();

                  SailPlayApi.call('load.user.info', { all: 1 });

                });

              } else {

                $rootScope.$broadcast('notifier:notify', {
                  body: user_res.message
                });
                
                scope.$apply();

              }

            });

          };

        }

      };

    })

}());

(function () {

  angular.module('sailplay.statuses', [])

    .directive('sailplayStatuses', function (SailPlayApi) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = SailPlayApi.data('load.user.info');

          scope.generateOffset = function (index, statuses) {
            return {
              left: ((100 / (statuses.length - 1)) * index) + '%'
            }
          };

          scope.getProgress = function (user_points, statuses) {

            if (!user_points || !statuses) return;

            var status_points = statuses.map(function (item) {
              return item.points
            });

            var points = user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;

            if (status_points[status_points.length - 1] && (points > status_points[status_points.length - 1])) {
              return {
                width: '100%'
              };
            }

            var multiplier = 100 / (status_points.length - 1);

            var state = 0;

            for (var i = 1, len = status_points.length; i < len; i++) {
              if (points >= status_points[i]) {
                state++;
              }
            }
            var current = 0;

            var total = status_points[0];

            if (state === 0) {
              return {
                width: '0%'
              };
            } else {
              current = (points - status_points[state]);
              total = status_points[state + 1] ? (status_points[state + 1] - status_points[state]) : status_points[state];
            }

            return {
              width: parseInt((current * 100 / total / 100 * 10) + (state * multiplier)) + '%'
            };

          };


        }

      };

    })


}());

(function () {

  angular.module('ui.datepicker', [])

    .service('dateService', function () {

      var self = this;

      self.days = {
        1: 31,
        2: 29,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
      };

      var current_year = new Date().getFullYear();
      var arr = [];
      for (var i = 90; i > 0; i--) {
        arr.push(current_year - i);
      }

      self.years = arr.reverse();

      self.months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };

      return this;

    })

    .directive('datePicker', function (dateService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/html/tools/datepicker.html',
        scope: {
          model: '=',
          disabled: '=?'
        },
        link: function (scope) {

          scope.days = dateService.days;
          scope.months = dateService.months;
          scope.years = dateService.years;

          scope.range = function (start, end) {
            var result = [];
            for (var i = start; i <= end; i++) {
              result.push(i);
            }
            return result;
          };

        }
      }

    });


}());
(function () {

  angular.module('tools', [
    'angularUtils.directives.dirPagination',
    'ui.mask',
    'ui.datepicker'
  ])

    .config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
      uiMaskConfigProvider.maskDefinitions({'_': /[0-9]/});
      uiMaskConfigProvider.addDefaultPlaceholder(true);
    }])

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

    .directive('notifier', function(MAGIC_CONFIG){

       return {

         restrict: 'E',
         replace: true,
         scope: true,
         templateUrl: '/html/tools/notifier.html',
         link: function(scope){

           scope._notifier_config = MAGIC_CONFIG.tools.notifier;

           scope._tools = MAGIC_CONFIG.tools;

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

    //.directive('phoneMask', function($timeout){
    //
    //  return {
    //    restrict: 'A',
    //    require: 'ngModel',
    //    link: function(scope, elm, attrs, ngModel){
    //
    //      function valid_phone(value){
    //
    //        return value && /^[0-9]{11}$/.test(value);
    //
    //      }
    //
    //      ngModel.$render = function(){
    //
    //        ngModel.$setValidity('phone', valid_phone(ngModel.$modelValue));
    //
    //        $(elm).unmask();
    //        $(elm).val(ngModel.$modelValue);
    //        $(elm).mask(attrs.phoneMask || '+7(000) 000-00-00',
    //          {
    //            placeholder: attrs.placeholder || "+7(___)___-__-__",
    //            onComplete: function(cep) {
    //              ngModel.$setViewValue(cep);
    //              ngModel.$setValidity('phone', true);
    //              scope.$digest();
    //            },
    //            onChange: function(cep){
    //              var value = (cep || '').replace(/\D/g,'');
    //              if(!valid_phone(cep)){
    //                ngModel.$setViewValue('');
    //                ngModel.$setValidity('phone', false);
    //                scope.$digest();
    //              }
    //            },
    //            onInvalid: function(val, e, f, invalid, options){
    //              ngModel.$setViewValue('');
    //              ngModel.$setValidity('phone', false);
    //              scope.$digest();
    //            }
    //          });
    //      };
    //
    //    }
    //  };
    //
    //})

    //.directive('maskedPhoneNumber', function(){
    //  return {
    //    restrict: 'A',
    //    scope: {
    //      phone: '=?'
    //    },
    //    link: function(scope, elm, attrs){
    //
    //      scope.$watch('phone', function(new_value){
    //
    //        if(new_value){
    //          $(elm).text(new_value);
    //          $(elm).unmask();
    //          $(elm).mask(attrs.maskedPhoneNumber || '+7(000) 000-00-00');
    //        }
    //        else {
    //          $(elm).text(attrs.noValue || '');
    //        }
    //
    //
    //      });
    //
    //    }
    //  }
    //})

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
    }])

    .filter('background_image', function(){
      return function(url) {
        return url && 'url(' + url + ')' || '';
      };
    })

    .service('tools', function($document){

      var self = this;

      var initial_overflow = $document[0].body.style.overflow;

      self.body_lock = function(state){
        $document[0].body.style.overflow = state ? 'hidden' : initial_overflow;
      };

      self.stringify_widget_css = function(prefix, obj){

        var css_string = '';

        for(var selector in obj){

          if(obj.hasOwnProperty(selector)){

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for(var prop in selector_styles){

              if(selector_styles.hasOwnProperty(prop)) {

                css_string += prop + ':' + selector_styles[prop] + ' !important;';

              }

            }

            css_string += ' }';

          }

        }

        return css_string;

      };

    })

    .directive('widgetStyle', function(tools, $document){

      return {

        restrict: 'A',
        replace: false,
        scope: {
          widget_style: '=widgetStyle',
          widget_name: '=?widgetName'
        },
        link: function(scope, element, attrs){

          element[0].type = 'text/css';

          var prefix = '.sailplay.magic ' + (scope.widget_name ? '.' + scope.widget_name : '');

          var css_string = tools.stringify_widget_css(prefix, scope.widget_style);

          if (element[0].styleSheet){
            element[0].styleSheet.cssText = css_string;
          } else {
            element[0].appendChild($document[0].createTextNode(css_string));
          }

        }

      };

    })

    .directive('magicModal', function($parse, tools, MAGIC_CONFIG){

      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/html/tools/modal.html',
        scope: true,
        transclude: true,
        link: function(scope, elm, attrs){

          scope._modal_config = MAGIC_CONFIG.tools.modal;

          scope.show = false;

          scope.close = function(){
            $parse(attrs.show).assign(scope.$parent, false);
            scope.$eval(attrs.onClose);
          };

          elm.on('click', function(e){
            if(e.target === elm[0]){
              scope.$apply(function () {
                scope.close();
              });
            }
          });

          scope.$watch(function(){
            return angular.toJson([scope.$eval(attrs.show)]);
          }, function(){
            var new_value = scope.$eval(attrs.show);
            scope.show = new_value;
            tools.body_lock(new_value);
          });

        }
      };

    })

    .directive('magicSlider', function(MAGIC_CONFIG){

      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elm, attrs){

          scope._slider_config = MAGIC_CONFIG.tools.slider;

          scope.left = 0;

          scope.current_position = 0;

          scope.show_left = false;
          scope.show_right = true;


          // Переделать
          scope.set_position = function (position) {

            var slides = elm[0].querySelectorAll('[data-magic-slide]');
            var wrapper = elm[0].querySelectorAll('[data-magic-gallery]')[0];

            angular.forEach(slides, function(slide){
              slide.style.width = '';
            });

            var _width = slides[0].offsetWidth || 0;

            _width = _width ? _width + 30 : 0;

            var _limits = {
              min: 1,
              max: 4
            };

            if (!_width) return;

            var _wrap_width = wrapper.offsetWidth;

            var _count_show = Math.floor(_wrap_width / _width) > _limits.max ? Math.floor(_wrap_width / _width) < _limits.min ? _limits.min : Math.floor(_wrap_width / _width) : Math.floor(_wrap_width / _width);

            if (!_count_show) return;

            _width = Math.floor(_wrap_width / _count_show);

            angular.forEach(slides, function(slide){
              slide.style.width = _width - 30;
            });

            var _max = Math.ceil(slides.length - _count_show);

            var _current = scope.current_position;

            var _next = _current;

            if (position == 'left') {

              _next = _current - 1 < 0 ? 0 : _current - 1;

            } else if (position == 'right') {

              _next = _current + 1 > _max ? _max : _current + 1;

            }

            scope.show_right = true;
            scope.show_left = true;

            if(_next == _max) {
              scope.show_right = false;
            }

            if(_next == 0) {
              scope.show_left = false;
            }

            if(_count_show > slides.length) {
              scope.show_right = false;
            }

            scope.current_position = _next;

            scope.left = '-' + (_next * _width) + 'px';

          };

        }
      }

    });

}());

(function () {

  angular.module('widgets.actions', [])

    .directive('sailplayMagicActions', function (MAGIC_CONFIG, tools, $location, $timeout, QuizService) {

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/actions.html',
        link: function (scope, elm, attrs) {

          scope._tools = MAGIC_CONFIG.tools;

          scope.action_selected = false;
          scope.action_custom_selected = false;


          // TODO : must be transfer from here!!! to single directive
          // FOR QUIZ
          scope.quiz = {
            show: false,
            data: null,
            step: 1
          };

          var _default = {
            tags: [],
            vars: {}
          };

          var _models = {
            radio: null,
            checkbox: {},
            variable: null
          };


          scope.models = angular.copy(_models);

          scope.data = angular.copy(_default);

          scope.open_quiz = function (quiz) {

            scope.quiz.step = 1;
            scope.quiz.data = angular.copy(quiz);
            scope.quiz.show = true;

            scope.models = angular.copy(_models);
            scope.data = angular.copy(_default);
            scope.data.tags.push(scope.quiz.data.tag);

          };

          scope.quiz_list = MAGIC_CONFIG && MAGIC_CONFIG.data && MAGIC_CONFIG.data.quiz;

          scope.sending = false;

          scope.getCurrentTest = function () {
            return scope.quiz.data.data[(scope.quiz.step - 1) || 0] || null;
          };

          scope.prev = function () {
            scope.quiz.step = scope.quiz.step == 1 ? scope.quiz.step : scope.quiz.step - 1;
          };

          scope.needToShowVariable = function () {
            var tag = scope.getCurrentTest().answers.filter(function (item) {
              return item.my_version
            })[0];
            return tag ? scope.data.tags.indexOf(tag.tag) != -1 : null
          };

          scope.canPressNext = function () {

            var can = 0;

            var tags = scope.getCurrentTest().answers.map(function (item) {
              return item.tag
            });

            tags.forEach(function (item) {

              var index = scope.data.tags.indexOf(item);

              if (index != -1 && (!item.my_version || item.my_version && scope.models.variable)) {
                can++;
              }

            });

            return can;

          };

          scope.next = function () {

            if (!scope.canPressNext() || scope.sending) return;

            var tag = scope.getCurrentTest().answers.filter(function (item) {
              return item.my_version
            })[0];

            if (tag && scope.data.tags.indexOf(tag.tag) != -1) {
              scope.data.vars[tag.my_version] = scope.models.variable
            }
            if (scope.quiz.step == scope.quiz.data.data.length) {
              scope.sending = true;
              QuizService.addTags(scope.data, function (res) {

                scope.$apply(function () {

                  scope.quiz = {
                    show: false,
                    data: null,
                    step: 1
                  };


                  scope.models = angular.copy(_models);
                  scope.data = angular.copy(_default);

                  scope.sending = false;

                });

              });
              return;
            }
            scope.quiz.step = scope.quiz.step < scope.quiz.data.data.length ? scope.quiz.step + 1 : scope.quiz.step;
          };

          scope.change = function (question, test) {

            if (!question || !test) return;

            var filter = test.answers.map(function (item) {
              return item.tag
            });

            if (test.type == 'one') {

              filter.forEach(function (item) {

                var index = scope.data.tags.indexOf(item);

                if (index == -1 && item == question.tag) {
                  scope.data.tags.push(item);
                } else {
                  scope.data.tags.splice(index, 1);
                }

              });

            } else if (test.type == 'many') {
              removeTag(question.tag);
            }

            function removeTag(tag) {

              var index = scope.data.tags.indexOf(tag);

              if (index == -1) {
                scope.data.tags.push(tag);
              } else {
                scope.data.tags.splice(index, 1);
              }

            }

          };

          scope.check = function (question) {
            return question.tag ? scope.data.tags.indexOf(question.tag) != -1 : false
          };

          // END OF QUIZ

          scope.action_select = function (action) {

            scope.action_selected = action || false;

          };

          scope.action_custom_select = function (action) {

            scope.action_custom_selected = action || false;

          };

          scope.action_styles = function (action_data) {
            return action_data.styles && tools.stringify_widget_css('', action_data.styles);
          };

        }

      };

    });

}());

(function () {

  angular.module('widgets.badges', [])

    .directive('sailplayMagicBadges', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/badges.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

        }

      };

    })

    .directive('sailplayMagicBadge', function(MAGIC_CONFIG, tools){

      return {

        restrict: "E",
        replace: true,
        scope: {
          badge: '='
        },
        templateUrl: '/html/core/widgets/badges.badge.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.on_click = function () {
            attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
          }

        }

      };

    })

    .directive('sailplayMagicBadgeLine', function(MAGIC_CONFIG, SailPlayShare, $window){

      return {

        restrict: "E",
        replace: true,
        scope: {
          line: '=',
          _config: '=config'
        },
        templateUrl: '/html/core/widgets/badges.line.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.badge_selected = false;

          scope.badge_select = function (badge) {
            scope.badge_selected = badge || false;
          };

          scope.badge_share = function (network, badge) {
            SailPlayShare(network, scope._config.texts.share_url || $window.location.href, badge.name, badge.descr, badge.thumbs.url_250x250);
          };

        }

      };

    });

}());

(function () {

  angular.module('widgets.gifts', [])

    .directive('sailplayMagicGifts', function (MAGIC_CONFIG, SailPlayApi, SailPlay, $rootScope) {

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/gifts.html',
        link: function (scope, elm, attrs) {

          scope.user = SailPlayApi.data('load.user.info');

          scope._tools = MAGIC_CONFIG.tools;

          scope.gift_unconfirm = function () {
            scope.confirmed_gift = scope.selected_gift = scope.no_points_error = scope.order_gift = false;
          };

          scope.gift_unconfirm();

          scope.gift_select = function (gift) {
            scope.selected_gift = gift || false;
          };
          
          scope.is_order_gift = function (gift) {
            if (!MAGIC_CONFIG || !MAGIC_CONFIG.data.gifts || !MAGIC_CONFIG.data.gifts.category_order_gifts) return;
            var access_list = MAGIC_CONFIG.data.gifts.category_order_gifts;
            return gift && access_list.indexOf(gift.category) != -1
          };

          scope.gift_confirm = function () {

            if (scope.is_order_gift(scope.selected_gift)) {

              if (!scope.user()) {

                SailPlay.authorize('remote');

              } else if (scope.user().user_points.confirmed < scope.selected_gift.points) {

                scope.selected_gift = false;
                scope.confirmed_gift = false;
                scope.order_gift = false;
                scope.no_points_error = true;

              }

              scope.confirmed_gift = false;

              scope.order_gift = angular.copy(scope.selected_gift);

              scope.selected_gift = false;

            } else {

              scope.confirmed_gift = scope.selected_gift;

              if (!scope.user()) {

                SailPlay.authorize('remote');

              }

              else if (scope.user().user_points.confirmed < scope.confirmed_gift.points) {

                scope.confirmed_gift = false;
                scope.no_points_error = true;

              }

              scope.selected_gift = false;

            }

          };

          SailPlay.on('gifts.purchase.success', function (res) {

            $rootScope.$broadcast('notifier:notify', {

              header: scope._tools.notifier.texts.congratulations,
              body: (res.coupon_number && (scope._config.texts.coupon_number + ' ' + res.coupon_number)) || res.success_message || scope._config.texts.gift_received

            });

            scope.gift_unconfirm();

            $rootScope.$apply();

          });

          SailPlay.on('gift.purchase.error', function (error) {
            console.dir(error);
            $rootScope.$broadcast('notifier:notify', {

              header: scope._tools.notifier.texts.error,
              body: error.message || scope._config.errors.gift_received_error

            });

            scope.gift_unconfirm();

            $rootScope.$apply();

          });


        }

      };

    });

}());

(function () {

  angular.module('widgets.leaderboard', [])

    .directive('sailplayMagicLeaderboard', function(MAGIC_CONFIG, SailPlayApi){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/leaderboard.html',
        link: function(scope, elm, attrs){

          scope.data = SailPlayApi.data('leaderboard.load');

        }

      };

    });

}());

(function () {

  angular.module('widgets.profile', [])

    .directive('sailplayMagicProfile', function(MAGIC_CONFIG){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/profile.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope.show_history = false;

          scope.show_fill_profile = false;

          scope.fill_profile = function(state){

            scope.show_fill_profile = state || false;

          };

        }

      };

    });

}());

(function () {

  angular.module('widgets.statuses', [])

    .directive('sailplayMagicStatuses', function(MAGIC_CONFIG){

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/statuses.html',
        link: function(scope, elm, attrs){

          scope._tools = MAGIC_CONFIG.tools;

          scope._statuses = MAGIC_CONFIG.data.statuses;

        }

      };

    });

}());
