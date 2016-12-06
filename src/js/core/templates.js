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
    '<div class="{{ _config.name }} clearfix"><div class="bon_choice_main container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-gifts=""><div class="bon_item_main" data-ng-show="gifts_list.length" data-magic-slider=""><div class="bon_slide_cat_item_wrap" data-magic-gallery=""><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><div class="bon_item gift" data-magic-slide="" data-magic-gift="" data-ng-repeat="gift in gifts_list"><div class="bon_item_iner"><div class="gift_img"><img data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ gift.name }}"></div><div class="gift_info"><span class="bon_item_name gift_name" data-ng-bind="gift.name"></span> <span class="bon_tem_info gift_points" data-ng-bind="(gift.points | number) + \' \' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span></div><a href="#" class="button_primary" data-ng-click="gift_select(gift); $event.preventDefault();">{{ _config.texts.get }}</a></div></div></div></div><a href="#" class="arr_left arr_left slider_arrow_left" data-ng-click="$event.preventDefault(); set_position(\'left\');" data-ng-show="show_left"></a> <a href="#" class="arr_right arr_right slider_arrow_right" data-ng-click="$event.preventDefault(); set_position(\'right\');" data-ng-show="show_right"></a></div></div><magic-modal class="bns_overlay_gift" data-ng-cloak="" data-show="$parent.selected_gift"><div><div class="gift_img"><img class="gift_more_img" data-ng-src="{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ selected_gift.name }}"></div><div class="gift_more_block"><span class="gift_more_name modal_gift_name" data-ng-bind="selected_gift.name"></span> <span class="gift_more_points modal_gift_points" data-ng-bind="(selected_gift.points | number) + \' \' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span><p class="gift_more_descr modal_gift_description" data-ng-bind="selected_gift.descr"></p><span class="alink button_primary" data-ng-click="gift_select(false);">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" style="margin-left: 5px;" data-ng-click="gift_confirm();" data-ng-bind="gift_affordable(selected_gift) ? _config.texts.get : _config.texts.no_points_button_text">{{ _config.texts.get }}</span></div></div></magic-modal><magic-modal class="bns_overlay_gift_not_points" data-ng-cloak="" data-show="$parent.no_points_error"><div><p class="modal_gift_description">{{ _config.texts.no_points_message }}</p><a class="alink button_primary earn_points_button" href="#magic_actions" data-ng-click="gift_unconfirm()">{{ _config.texts.earn_points }}</a> <a class="alink button_primary service_button" data-ng-if="_config.texts.partner_service_url" target="_blank" href="{{ _config.texts.partner_service_url }}" data-ng-click="gift_unconfirm()">{{ _config.texts.service }}</a></div></magic-modal><magic-modal class="bns_overlay_gift_complete" data-ng-cloak="" data-show="$parent.confirmed_gift"><div><p class="modal_gift_description">{{ _config.texts.confirm_message_start }} {{ (confirmed_gift.points | number) + \' \' + (confirmed_gift.points | sailplay_pluralize:_tools.points.texts.pluralize) }}. {{ _config.texts.confirm_message_end }}</p><span class="alink button_primary" data-ng-click="gift_unconfirm();">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" data-ng-click="gift_purchase(confirmed_gift);">{{ _tools.buttons.texts.get }}</span></div></magic-modal><magic-modal class="bns_overlay_gift bns_overlay_order_gift" data-ng-cloak="" data-show="$parent.order_gift"><div class="mb_popup mb_popup_order_gift" data-sailplay-order-gift="" data-config="{{ _config.order_gift.config }}"><div class="gift_img"><img class="gift_more_img" data-ng-src="{{ $parent.order_gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ $parent.order_gift.name }}"></div><div class="gift_overlay"><div class="gift_more_block"><span class="gift_more_name modal_gift_name" data-ng-bind="$parent.order_gift.name"></span> <span class="gift_more_points modal_gift_points" data-ng-bind="($parent.order_gift.points | number) + \' \' + ($parent.order_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span><p class="gift_more_descr modal_gift_description" data-ng-bind="$parent.order_gift.descr"></p></div><div class="mb_popup_top"><span class="modal_profile_header">{{ _config.order_gift.header }}</span></div><form name="order_gift" class="mb_popup_main mb_popup_main_mt" data-ng-submit="sailplay.order_gift.submit(order_gift, $parent.order_gift, gift_purchase);"><div class="form_field" data-ng-repeat="field in sailplay.order_gift.form" data-ng-switch="field.input"><div data-ng-switch-when="image" class="avatar_upload clearfix"><img width="160px" data-ng-src="{{ (field.value | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png\'}}" alt=""></div><div data-ng-switch-when="text" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="date" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="select" class="clearfix"><label class="form_label">{{ field.label }}</label><div class="magic_select form_input"><select data-ng-model="field.value" data-ng-required="field.required" data-ng-options="item.value as item.text for item in field.data"></select></div></div><div data-ng-switch-when="phone" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div><div data-ng-switch-when="email" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="email" placeholder="{{ field.placeholder }}" data-ng-required="field.required" data-ng-model="field.value"></div></div><div class="answ_text"><button type="submit" class="sp_btn button_primary">{{ _tools.buttons.texts.save }}</button></div></form></div></div></magic-modal></div></div></div>');
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
    '<div class="{{ _config.name }} clearfix"><div class="bon_profile_wrap container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div class="bon_profile_info" data-sailplay-profile=""><div class="bon_profile_top clearfix"><div class="bon_profile_top_left"><h3><span class="header">{{ _config.texts.header }}</span></h3><h4><span class="caption">{{ _config.texts.spoiler }}</span></h4></div><div class="bon_profile_right" data-ng-show="user()"><div class="user_avatar"><img class="user_avatar_image" data-ng-src="{{ (user().user.pic | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png \'}}" alt="You"> <a href="#" class="logout_btn button_link" data-ng-click="$event.preventDefault(); logout();">{{ _config.texts.logout }}</a></div><div class="user_info"><span class="user_name" data-ng-bind="user().user.name || _config.texts.name_not_defined"></span> <span class="user_phone" data-ng-model="user().user.phone" data-ng-bind="user().user.phone | tel"></span> <span class="user_email" data-ng-if="user().user.email" data-ng-bind="user().user.email"></span> <a href="#" class="edit_profile_btn button_link" data-ng-click="$event.preventDefault();fill_profile(true);">{{ _config.texts.edit_profile_button }}</a></div></div><div class="bon_profile_right clearfix" data-ng-show="!user()"><button type="button" class="sp_btn button_primary login_reg_btn" data-ng-click="$event.preventDefault(); login(\'remote\');">{{ _config.texts.login_reg }}</button></div></div><div class="status_block" data-ng-show="user()"><span class="status_block_title" data-ng-bind="_config.texts.user_status"></span> <img class="status_block_img" data-ng-src="{{ user().user_status.pic | sailplay_pic }}" alt="{{ user().user_status.name }}"> <span class="status_block_name" data-ng-bind="user().user_status.name || _config.texts.empty_status"></span></div><div class="bon_profile_stat"><div class="bps_left clearfix" data-ng-class="{ transparent: !user() }"><span class="points_confirmed"><span class="points_confirmed_value" data-ng-bind="user().user_points.confirmed | number"></span> <span class="points_confirmed_name" data-ng-bind="user().user_points.confirmed | sailplay_pluralize: _tools.points.texts.pluralize"></span></span> <a class="button_link" href="#" data-ng-click="$event.preventDefault(); $parent.show_history = true;">{{ _config.texts.history_button }}</a></div><div class="bps_right clearfix" data-sailplay-gifts="" data-ng-show="progress"><div class="progress_line_main"><div class="progress_line_bg progress_bar progress_bar_border"></div><div class="progress_line progress_bar_filled" data-procent="0" data-ng-style="{ width: progress.plenum + \'%\' }"><div class="progress_text progress_bar_flag" data-ng-show="progress.next.item" data-ng-class="{ right_position: progress.plenum < 50 }"><span class="progress_bar_flag_text" data-ng-bind="progress.next.offset + \' \' + (progress.next.offset | sailplay_pluralize:_tools.points.texts.pluralize) + \' \' + _config.texts.before_gift"></span></div></div><div class="gift_item progress_bar_border" data-ng-repeat="item in progress.items track by $index" data-ng-class="{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}" data-ng-style="{ left: item.get_left() }"><span class="gift_item_hint" data-ng-bind="item.gifts[0].points"></span></div></div></div></div></div><magic-modal class="bns_overlay_hist" data-show="show_history"><div data-sailplay-history="" data-sailplay-profile=""><h3><span class="modal_history_header">{{ _config.texts.history.header }}</span></h3><h4 class="modal_history_caption">{{ _config.texts.history.caption }}</h4><table class="bns_hist_table"><tbody><tr data-dir-paginate="item in history() | itemsPerPage:10" data-pagination-id="history_pages"><td><span class="modal_history_date" data-ng-bind="item.action_date | date:\'d/MM/yyyy\'"></span></td><td><span><b class="modal_history_content" data-ng-bind="item | history_item"></b></span></td><td><span class="modal_history_points" data-ng-if="item.points_delta" data-ng-bind="((item.points_delta|number) || 0) + \' \' + (item.points_delta | sailplay_pluralize:_tools.points.texts.pluralize)"></span></td></tr></tbody></table><dir-pagination-controls data-max-size="7" data-pagination-id="history_pages" data-template-url="/html/tools/pagination.controls.html" data-auto-hide="true"></dir-pagination-controls></div></magic-modal><magic-modal class="fill_profile_modal" data-show="show_fill_profile"><div class="mb_popup mb_popup_prof" data-sailplay-fill-profile="" data-config="_config.fill_profile.config"><div class="mb_popup_top"><span class="modal_profile_header">{{ _config.fill_profile.header }}</span></div><form name="fill_profile" class="mb_popup_main mb_popup_main_mt" data-ng-submit="sailplay.fill_profile.submit(fill_profile, $parent.fill_profile);"><div class="form_field" data-ng-repeat="field in sailplay.fill_profile.form.fields" data-ng-switch="field.input"><div data-ng-switch-when="image" class="avatar_upload clearfix"><img width="160px" data-ng-src="{{ (field.value | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png\'}}" alt=""></div><div data-ng-switch-when="text" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="date" class="clearfix"><label class="form_label">{{ field.label }}</label><date-picker data-model="field.value"></date-picker></div><div data-ng-switch-when="select" class="clearfix"><label class="form_label">{{ field.label }}</label><div class="magic_select form_input"><select data-ng-model="field.value" data-ng-options="item.value as item.text for item in field.data"></select></div></div><div data-ng-switch-when="phone" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="email" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="email" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div></div><div class="answ_text"><button type="submit" class="sp_btn button_primary">{{ _tools.buttons.texts.save }}</button></div></form></div></magic-modal></div></div>');
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
