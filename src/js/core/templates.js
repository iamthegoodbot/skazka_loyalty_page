(function(module) {
try {
  module = angular.module('core.templates');
} catch (e) {
  module = angular.module('core.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/magic.html',
    '<div class="sailplay magic"><style data-ng-repeat="tool in MAGIC_CONFIG.tools" data-widget-style="tool.styles"></style><div class="bn_wrap clearfix"><div class="clearfix" data-ng-repeat="widget in MAGIC_CONFIG.widgets" data-ng-switch="widget.name"><sailplay-magic-profile data-ng-switch-when="profile" data-config="widget"></sailplay-magic-profile><sailplay-magic-badges data-ng-switch-when="badges" data-config="widget"></sailplay-magic-badges><sailplay-magic-gifts data-ng-switch-when="gifts" data-config="widget"></sailplay-magic-gifts><sailplay-magic-actions data-ng-switch-when="actions" data-config="widget"></sailplay-magic-actions></div></div><notifier></notifier></div>');
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
    '<div class="{{ _config.name }} clearfix"><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div id="magic_actions" class="more_bonus container" data-ng-show="_config.enabled" data-ng-cloak=""><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-actions=""><div class="more_bonus_main"><div class="mb_item action" data-ng-repeat="action in actions().actions" data-ng-style="_config.styles.action"><div class="mb_item_left"><span class="action_name" data-ng-bind="action_data(action).name"></span> <span class="action_points" data-ng-show="action.points" data-ng-bind="((action.points || 0) | number) + \' \' + (action.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a class="sp_btn button_primary" data-ng-click="action_select(action)">{{ action_data(action).button_text }}</a></div><div class="mb_item_right"><img data-ng-src="{{ action_data(action).pic | sailplay_pic }}" alt=""></div></div><div class="mb_item action" data-ng-repeat="action in actions_custom()" data-ng-style="_config.styles.action"><div class="mb_item_left"><span class="action_name" data-ng-bind="action.name"></span> <span class="action_points" data-ng-show="action.points" data-ng-bind="((action.points || 0) | number) + \' \' + (action.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a class="sp_btn button_primary" data-ng-click="action_custom_select(action)">{{ action.button_text }}</a></div><div class="mb_item_right"><img data-ng-src="{{ action.icon | sailplay_pic }}" alt=""></div></div></div><magic-modal class="actions_selected_modal" data-ng-cloak="" data-show="$parent.action_selected"><div><div class="action_image"><img class="gift_more_img" data-ng-src="{{ action_data(action_selected).pic | sailplay_pic }}" alt="{{ action_data(action_selected).name }}"></div><div class="action_tools"><p><span class="modal_action_name" data-ng-bind="action_data(action_selected).name"></span></p><p style="margin-top: 10px;"><span class="modal_action_points" data-ng-bind="(action_selected.points | number) + \' \' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span></p><p style="margin-top: 10px;"><span class="modal_action_description" data-ng-bind="action_data(action_selected).description"></span></p><p class="action_buttons"><span data-sailplay-action="" data-styles="{{ action_styles(action_data(action_selected)) }}" data-action="action_selected" data-text="{{ action_data(action_selected).button_text }}"><span class="sp_btn button_primary">{{ action_data(action_selected).button_text }}</span></span></p></div></div></magic-modal><magic-modal class="actions_custom_selected_modal" data-ng-cloak="" data-show="$parent.action_custom_selected"><div data-sailplay-action-custom="" data-action="action_custom_selected"></div></magic-modal></div></div></div>');
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
    '<div class="bon_item badge"><div class="bon_item_iner"><img class="badge_pic" data-ng-src="{{ badge.thumbs.url_250x250 | sailplay_pic }}" alt="{{ badge.name }}"> <span class="bon_item_name badge_name" data-ng-bind="badge.name"></span> <span class="bon_tem_info badge_points" data-ng-bind="(badge.points | number) + \' \' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span></div><div class="badge_arrow"></div></div>');
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
    '<div class="widget {{ _config.name }} clearfix"><div class="bon_choice_main container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-badges="" class="badge_lines_container clearfix"><sailplay-magic-badge-line class="multi_level" data-ng-repeat="line in sailplay.badges.list().multilevel_badges" data-line="line"></sailplay-magic-badge-line><sailplay-magic-badge-line class="one_level" data-line="sailplay.badges.list().one_level_badges" data-type="one_level"></sailplay-magic-badge-line></div></div></div>');
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
    '<div class="clearfix"><div class="bon_item_main clearfix" data-ng-show="line.length" data-magic-slider=""><div class="bon_slide_cat_item_wrap" data-magic-gallery=""><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><sailplay-magic-badge data-magic-slide="" data-badge="badge" data-ng-repeat="badge in line" data-ng-class="{ last: $last }"></sailplay-magic-badge></div></div><a href="#" class="arr_left arr_left slider_arrow_left" data-ng-click="$event.preventDefault(); set_position(\'left\');" data-ng-show="show_left"></a> <a href="#" class="arr_right arr_right slider_arrow_right" data-ng-click="$event.preventDefault(); set_position(\'right\');" data-ng-show="show_right"></a></div></div></div>');
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
    '<div class="{{ _config.name }} clearfix"><div class="bon_choice_main container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><h3 class="bon_header"><span class="header">{{ _config.texts.header }}</span></h3><h4 class="bon_sub_header"><span class="caption">{{ _config.texts.caption }}</span></h4><div data-sailplay-gifts=""><div class="bon_item_main" data-ng-show="gifts().length" data-magic-slider=""><div class="bon_slide_cat_item_wrap" data-magic-gallery=""><div class="bon_slide_cat_item"><div class="bon_item_line" data-ng-style="{left : left}"><div class="bon_item gift" data-magic-slide="" data-ng-repeat="gift in gifts()"><div class="bon_item_iner"><img data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ gift.name }}"> <span class="bon_item_name gift_name" data-ng-bind="gift.name"></span> <span class="bon_tem_info gift_points" data-ng-bind="(gift.points | number) + \' \' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span> <a href="#" class="button_primary" data-ng-click="gift_select(gift); $event.preventDefault();">{{ _config.texts.get }}</a></div></div></div></div><a href="#" class="arr_left arr_left slider_arrow_left" data-ng-click="$event.preventDefault(); set_position(\'left\');" data-ng-show="show_left"></a> <a href="#" class="arr_right arr_right slider_arrow_right" data-ng-click="$event.preventDefault(); set_position(\'right\');" data-ng-show="show_right"></a></div></div><magic-modal class="bns_overlay_gift" data-ng-cloak="" data-show="$parent.selected_gift"><div><img class="gift_more_img" data-ng-src="{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}" alt="{{ selected_gift.name }}"><div class="gift_more_block"><span class="gift_more_name modal_gift_name" data-ng-bind="selected_gift.name"></span> <span class="gift_more_points modal_gift_points" data-ng-bind="(selected_gift.points | number) + \' \' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)"></span><p class="gift_more_descr modal_gift_description" data-ng-bind="selected_gift.descr"></p><span class="alink button_primary" data-ng-click="gift_select(false);">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" style="margin-left: 5px;" data-ng-click="gift_confirm();" data-ng-bind="gift_affordable(selected_gift) ? _config.texts.get : _config.texts.no_points_button_text">{{ _config.texts.get }}</span></div></div></magic-modal><magic-modal class="bns_overlay_gift_not_points" data-ng-cloak="" data-show="$parent.no_points_error"><div><p class="modal_gift_description">{{ _config.texts.no_points_message }}</p><a class="alink button_primary" href="#magic_actions" data-ng-click="gift_unconfirm()">{{ _config.texts.earn_points }}</a> <a class="alink button_primary" target="_blank" href="{{ _config.texts.partner_service_url }}" data-ng-click="gift_unconfirm()">{{ _config.texts.service }}</a></div></magic-modal><magic-modal class="bns_overlay_gift_complete" data-ng-cloak="" data-show="$parent.confirmed_gift"><div><p class="modal_gift_description">{{ _config.texts.confirm_message_start }} {{ (confirmed_gift.points | number) + \' \' + (confirmed_gift.points | sailplay_pluralize:_tools.points.texts.pluralize) }}. {{ _config.texts.confirm_message_end }}</p><span class="alink button_primary" data-ng-click="gift_unconfirm();">{{ _tools.buttons.texts.close }}</span> <span class="alink button_primary" data-ng-click="gift_purchase(confirmed_gift);">{{ _tools.buttons.texts.get }}</span></div></magic-modal></div></div></div>');
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
    '<div class="{{ _config.name }} clearfix"><div class="bon_profile_wrap container" data-ng-show="_config.enabled" data-ng-cloak=""><style scoped="" data-widget-style="_config.styles" data-widget-name="_config.name"></style><div class="bon_profile_info" data-sailplay-profile=""><div class="bon_profile_top clearfix"><div class="bon_profile_top_left"><h3><span class="header">{{ _config.texts.header }}</span></h3><h4><span class="caption">{{ _config.texts.spoiler }}</span></h4></div><div class="bon_profile_right" data-ng-show="user()"><div class="user_avatar"><img class="user_avatar_image" data-ng-src="{{ (user().user.pic | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png \'}}" alt="You"> <a href="#" class="logout_btn button_link" data-ng-click="$event.preventDefault(); logout();">{{ _config.texts.logout }}</a></div><div class="user_info"><span class="user_name" data-ng-bind="user().user.name || _config.texts.name_not_defined"></span></div><div class="user_info"><a href="#" class="edit_profile_btn button_link" data-ng-click="$event.preventDefault();fill_profile(true);">{{ _config.texts.edit_profile_button }}</a></div></div><div class="bon_profile_right clearfix" data-ng-show="!user()"><button type="button" class="sp_btn button_primary login_reg_btn" data-ng-click="$event.preventDefault(); login(\'remote\');">{{ _config.texts.login_reg }}</button></div></div><div class="bon_profile_stat"><div class="bps_left clearfix" data-ng-class="{ transparent: !user() }"><span class="points_confirmed" data-ng-bind="(user().user_points.confirmed | number) + \' \' + (user().user_points.confirmed | sailplay_pluralize: _tools.points.texts.pluralize)"></span> <a class="button_link" href="#" data-ng-click="$event.preventDefault(); $parent.show_history = true;">{{ _config.texts.history_button }}</a></div><div class="bps_right clearfix" data-sailplay-gifts="" data-ng-show="progress"><div class="progress_line_main"><div class="progress_line_bg progress_bar progress_bar_border"></div><div class="progress_line progress_bar_filled" data-procent="0" data-ng-style="{ width: progress.plenum + \'%\' }"><div class="progress_text progress_bar_flag" data-ng-show="progress.next.item" data-ng-class="{ right_position: progress.plenum < 50 }"><span class="progress_bar_flag_text" data-ng-bind="progress.next.offset + \' \' + (progress.next.offset | sailplay_pluralize:_tools.points.texts.pluralize) + \' \' + _config.texts.before_gift"></span></div></div><div class="gift_item progress_bar_border" data-ng-repeat="item in progress.items track by $index" data-ng-class="{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}" data-ng-style="{ left: item.get_left() }"><span class="gift_item_hint" data-ng-bind="item.gifts[0].points"></span></div></div></div></div></div><magic-modal class="bns_overlay_hist" data-show="show_history"><div data-sailplay-history="" data-sailplay-profile=""><h3><span class="modal_history_header">{{ _config.texts.history.header }}</span></h3><h4 class="modal_history_caption">{{ _config.texts.history.caption }}</h4><table class="bns_hist_table"><tbody><tr data-dir-paginate="item in history() | itemsPerPage:10" data-pagination-id="history_pages"><td><span class="modal_history_date" data-ng-bind="item.action_date | date:\'d/MM/yyyy\'"></span></td><td><span><b class="modal_history_content" data-ng-bind="item | history_item"></b></span></td><td><span class="modal_history_points" data-ng-if="item.points_delta" data-ng-bind="((item.points_delta|number) || 0) + \' \' + (item.points_delta | sailplay_pluralize:_tools.points.texts.pluralize)"></span></td></tr></tbody></table><dir-pagination-controls data-max-size="7" data-pagination-id="history_pages" data-template-url="/html/tools/pagination.controls.html" data-auto-hide="true"></dir-pagination-controls></div></magic-modal><magic-modal class="fill_profile_modal" data-show="show_fill_profile"><div class="mb_popup mb_popup_prof" data-sailplay-fill-profile="" data-config="_config.fill_profile.config"><div class="mb_popup_top"><span class="modal_profile_header">{{ _config.fill_profile.header }}</span></div><form name="fill_profile" class="mb_popup_main mb_popup_main_mt" data-ng-submit="sailplay.fill_profile.submit(fill_profile);"><div class="form_field" data-ng-repeat="field in sailplay.fill_profile.form.fields" data-ng-switch="field.input"><div data-ng-switch-when="image" class="avatar_upload clearfix"><img width="160px" data-ng-src="{{ (field.value | sailplay_pic) || \'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png\'}}" alt=""></div><div data-ng-switch-when="text" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="date" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="select" class="clearfix"><label class="form_label">{{ field.label }}</label><div class="magic_select form_input"><select data-ng-model="field.value" data-ng-options="item.value as item.text for item in field.data"></select></div></div><div data-ng-switch-when="phone" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-model="field.value"></div><div data-ng-switch-when="email" class="clearfix"><label class="form_label">{{ field.label }}</label> <input class="form_input" type="email" placeholder="{{ field.placeholder }}" data-ng-model="field.value"></div></div><div class="answ_text"><button type="submit" class="sp_btn button_primary">{{ _tools.buttons.texts.save }}</button></div></form></div></magic-modal></div></div>');
}]);
})();
