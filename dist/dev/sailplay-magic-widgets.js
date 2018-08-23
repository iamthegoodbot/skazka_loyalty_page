webpackJsonp([0],Array(56).concat([
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftTypeRegister = undefined;

var _widget = __webpack_require__(2);

var _gifts = __webpack_require__(230);

var _gifts2 = _interopRequireDefault(_gifts);

__webpack_require__(231);

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'gifts',
  template: _gifts2.default,
  inject: ['SailPlayApi', 'SailPlay', '$rootScope'],
  controller: function controller(SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      scope.user = SailPlayApi.data('load.user.info');

      scope.modals = {
        confirmed_gift: false,
        selected_gift: false,
        no_points_error: false
      };

      scope.gift_unconfirm = function () {

        scope.modals.confirmed_gift = scope.modals.selected_gift = scope.modals.no_points_error = false;
      };

      scope.gift_unconfirm();

      scope.gift_select = function (gift) {
        scope.modals.selected_gift = gift || false;
      };

      scope.gift_confirm = function () {

        scope.modals.confirmed_gift = scope.modals.selected_gift;

        if (!scope.user()) {

          SailPlay.authorize('remote', { widget: 'gifts', action: 'gift_confirm' });
        } else if (scope.user().user_points.confirmed < scope.modals.confirmed_gift.points) {

          scope.modals.confirmed_gift = false;
          scope.modals.no_points_error = true;
        }

        scope.modals.selected_gift = false;
      };

      SailPlay.on('gifts.purchase.success', function (res) {

        $rootScope.$broadcast('notifier:notify', {

          header: scope.widget.texts.purchase_success_header,
          body: res.coupon_number && scope.widget.texts.coupon_number + ' ' + res.coupon_number || res.success_message || scope.widget.texts.gift_received

        });

        scope.gift_unconfirm();

        $rootScope.$apply();
      });

      SailPlay.on('gift.purchase.error', function (error) {
        console.dir(error);
        $rootScope.$broadcast('notifier:notify', {

          header: scope.widget.texts.purchase_error_header,
          body: error.message || scope.widget.texts.gift_received_error

        });

        scope.gift_unconfirm();

        $rootScope.$apply();
      });
    };
  }
});

_widget.Widget.provider('GiftsWidget', function () {

  var gift_types = [];

  var get_gift_type_config = function get_gift_type_config(type_id) {
    return gift_types.filter(function (gift_type) {
      return gift_type.id === type_id;
    })[0];
  };

  return {
    register: function register(config) {

      var unique = !get_gift_type_config(config.id);
      unique && gift_types.push(config);
    },
    $get: function $get() {

      return {
        types: gift_types,
        get_type: get_gift_type_config
      };
    }
  };
});

var GiftTypeRegister = exports.GiftTypeRegister = function GiftTypeRegister(config) {

  _widget.Widget.config(["GiftsWidgetProvider", function (GiftsWidgetProvider) {
    GiftsWidgetProvider.register(config);
  }]);
};

_widget.Widget.directive('giftType', ["GiftsWidget", "$injector", "$compile", function (GiftsWidget, $injector, $compile) {
  return {
    restrict: 'A',
    scope: {
      types: '=',
      gift: '='
    },
    link: function link(scope, elm) {

      scope.$watch(function () {
        return _angular2.default.toJson([scope.types, scope.gift]);
      }, function (data) {

        data = _angular2.default.fromJson(data);

        var types = data[0];

        var gift = data[1];

        elm.html('');

        if (!types || !gift) return;

        var gift_type_options = types.filter(function (gift_type) {
          return gift_type.categories && gift_type.categories.indexOf(gift.category) >= 0;
        })[0];

        if (!gift_type_options) return;

        var gift_type_config = GiftsWidget.get_type(gift_type_options.id);

        var gift_type_scope = scope.$new();

        gift_type_scope.options = _angular2.default.copy(gift_type_options);

        gift_type_scope.gift = _angular2.default.copy(gift);

        gift_type_config.controller.$inject = gift_type_config.inject || [];

        $injector.invoke(gift_type_config.controller)(gift_type_scope, elm);

        elm.append($compile(gift_type_config.template)(gift_type_scope));
      });
    }
  };
}]);

_widget.Widget.directive('magicGift', ["$timeout", function ($timeout) {
  return {
    restrict: 'A',
    scope: false,
    link: function link(scope, elm, attrs) {
      if (scope.$last) {

        $timeout(function () {

          var slides = elm[0].parentElement.querySelectorAll('[data-magic-slide]');
          var wrapper = elm[0].parentElement.parentElement.parentElement;

          if (!slides.length) return;

          _angular2.default.forEach(slides, function (slide) {
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

          _angular2.default.forEach(slides, function (slide) {
            slide.style.width = _width - 30 + 'px';
          });
        }, 200);
      }
    }
  };
}]);

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
__webpack_require__(163);
__webpack_require__(167);
__webpack_require__(172);
__webpack_require__(176);
__webpack_require__(181);
__webpack_require__(187);
__webpack_require__(191);
__webpack_require__(195);
__webpack_require__(200);
__webpack_require__(204);
__webpack_require__(208);
__webpack_require__(214);
__webpack_require__(218);
__webpack_require__(222);
__webpack_require__(226);
__webpack_require__(56);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(238);
__webpack_require__(242);
__webpack_require__(246);
__webpack_require__(250);
__webpack_require__(255);
__webpack_require__(260);
__webpack_require__(268);
__webpack_require__(273);
__webpack_require__(277);
__webpack_require__(282);
__webpack_require__(286);
__webpack_require__(290);
__webpack_require__(294);
__webpack_require__(299);
__webpack_require__(305);
__webpack_require__(315);
__webpack_require__(320);
module.exports = __webpack_require__(324);


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(158);

var _template2 = _interopRequireDefault(_template);

var _badge = __webpack_require__(159);

var _badge2 = _interopRequireDefault(_badge);

var _line = __webpack_require__(160);

var _line2 = _interopRequireDefault(_line);

__webpack_require__(161);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: 'bootstrap_badges',
  template: _template2.default,
  inject: ['$rootScope', 'SailPlay', 'SailPlayApi', 'MAGIC_CONFIG'],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {};
  }
};

_widget.Widget.directive('sailplayMagicBootstrapBadge', ["MAGIC_CONFIG", "tools", function (MAGIC_CONFIG, tools) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      badge: '='
    },
    template: _badge2.default,
    link: function link(scope, elm, attrs) {

      scope._tools = MAGIC_CONFIG.tools;

      scope.on_click = function () {
        attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
      };
    }
  };
}]);

_widget.Widget.directive('sailplayMagicBootstrapBadgeLine', ["MAGIC_CONFIG", "SailPlayShare", "$window", function (MAGIC_CONFIG, SailPlayShare, $window) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      line: '=',
      _config: '=config'
    },
    template: _line2.default,
    link: function link(scope, elm, attrs) {

      scope._tools = MAGIC_CONFIG.tools;

      scope.badge_selected = false;

      scope.badge_select = function (badge) {
        return;
        scope.badge_selected = badge || false;
      };

      scope.badge_share = function (network, badge) {
        SailPlayShare(network, scope._config.texts.share_url || $window.location.href, badge.name, badge.descr, badge.thumbs.url_250x250);
      };
    }

  };
}]);

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_badges-container\">\n\n    <div class=\"spm_badges-container__left\">\n        <div class=\"spm_badges-header\" ng-bind=\"widget.texts.header\"></div>\n        <div class=\"spm_badges-sub-header\" ng-bind-html=\"widget.texts.sub_header | to_trusted\"></div>\n    </div>\n\n    <div class=\"spm_badges-container__right spm_badges-list\">\n        <div sailplay-badges class=\"badge_lines_container clearfix\">\n            <sailplay-magic-bootstrap-badge-line  class=\"one_level\" line=\"sailplay.badges.list().one_level_badges\" type=\"one_level\" config=\"widget\"></sailplay-magic-bootstrap-badge-line>\n            <sailplay-magic-bootstrap-badge-line class=\"multi_level\" ng-repeat=\"line in sailplay.badges.list().multilevel_badges\"\n                                       line=\"line\" config=\"widget\"></sailplay-magic-bootstrap-badge-line>\n        </div>\n    </div>\n    \n\n</div>";

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = "<div class=\"badge\">\n    <div class=\"badge_iner\">\n        <div class=\"badge_pic\">\n        <img ng-src=\"{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}\" alt=\"{{ badge.name }}\">\n        </div>\n        <span class=\"badge_name\" ng-bind=\"badge.name\"></span>\n    </div>\n    <div class=\"badge_arrow\"></div>\n</div>";

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix\">\n    <div class=\"bon_item_main clearfix\" ng-show=\"line.length\">\n        <div class=\"bon_slide_cat_item_wrap\">\n            <div class=\"bon_slide_cat_item\">\n                <div class=\"bon_item_line\" ng-style=\"{left : left}\">\n                    <sailplay-magic-bootstrap-badge badge=\"badge\" ng-repeat=\"badge in line\" ng-class=\"{ last: $last, type_active: badge.is_received }\"></sailplay-magic-bootstrap-badge>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n    <magic-modal class=\"modal_badge_selected\" data-ng-cloak data-show=\"badge_selected\">\n\n        <div>\n\n            <div class=\"modal_badge_image\">\n                <img class=\"gift_more_img\" data-ng-src=\"{{ badge_selected.thumbs.url_250x250 | sailplay_pic }}\"\n                     alt=\"{{ badge_selected.name }}\">\n            </div>\n\n            <div class=\"modal_badge_tools\">\n\n                <p>\n                    <span class=\"modal_badge_name\" data-ng-bind=\"badge_selected.name\"></span>\n                </p>\n\n                <!--<p style=\"margin-top: 10px;\">-->\n                <!--<span class=\"modal_badge_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n                <!--</p>-->\n\n                <p style=\"margin-top: 10px;\">\n                    <span class=\"modal_badge_description\" data-ng-bind=\"badge_selected.descr\"></span>\n                </p>\n\n                <p class=\"modal_badge_buttons\">\n                      <span class=\"badge_share_button fb_icon\" data-ng-click=\"badge_share('fb', badge_selected)\">\n                        {{ _config.texts.share_fb }}\n                      </span>\n                                <span class=\"badge_share_button tw_icon\" style=\"margin-right: 20px;\" data-ng-click=\"badge_share('tw', badge_selected)\">\n                        {{ _config.texts.share_tw }}\n                      </span>\n                    <span class=\"sp_btn button_primary\" data-ng-click=\"badge_select(false);\">{{ _tools.buttons.texts.close }}</span>\n                </p>\n\n            </div>\n\n        </div>\n\n    </magic-modal>\n</div>";

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(162);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_badges {\n  position: relative;\n  background: #ecf0f0;\n}\n.spm_wrapper .spm_badges-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .spm_badges-container {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .spm_badges-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-flex-basis: 20%;\n      -ms-flex-preferred-size: 20%;\n          flex-basis: 20%;\n  padding-right: 30px;\n  padding-top: 50px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .spm_badges-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 0;\n    padding-top: 0;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .spm_badges-container__right {\n  -webkit-flex-basis: 80%;\n      -ms-flex-preferred-size: 80%;\n          flex-basis: 80%;\n}\n.spm_wrapper .spm_badges-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .spm_badges-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .spm_badges-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .spm_badges-list {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .spm_badges-list .bon_slide_cat_item_wrap {\n  float: left;\n  width: 100%;\n  margin: 30px 0;\n  position: relative;\n}\n.spm_wrapper .spm_badges-list .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .spm_badges-list .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .spm_badges-list .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .spm_badges-list .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .spm_badges-list .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 20px 0px 0px 20px;\n          border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_badges-list .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 0px 20px 20px 0px;\n          border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_badges-list .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: normal;\n  overflow: hidden;\n}\n.spm_wrapper .spm_badges-list .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  -webkit-transition: .3s ease;\n  -o-transition: .3s ease;\n  transition: .3s ease;\n}\n.spm_wrapper .spm_badges-list .badge_lines_container {\n  float: left;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_badges-list .one_level .badge.type_active .badge_arrow {\n  background-image: url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/51e1122f5e454976808981a0ab95927e.svg);\n}\n.spm_wrapper .spm_badges-list .multi_level .badge.type_active .badge_arrow {\n  background-image: url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/81306caa9d0b69c31b1bea25c10a80f8.svg);\n}\n.spm_wrapper .spm_badges-list .badge {\n  position: relative;\n  width: 150px;\n  min-height: 190px;\n  margin-right: 30px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n  vertical-align: top;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner span {\n  white-space: normal;\n  float: left;\n  color: #222222;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner .badge_name {\n  font-size: 14px;\n  width: 100%;\n  text-align: center;\n  font-weight: bold;\n  letter-spacing: 1.6px;\n  color: #222c3b;\n  margin-top: 20px;\n  line-height: 22px;\n  text-transform: uppercase;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner .badge_pic {\n  width: 100%;\n  max-height: 150px;\n  overflow: hidden;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner .badge_pic img {\n  width: 100%;\n  height: auto;\n}\n.spm_wrapper .spm_badges-list .badge .badge_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_badges-list .badge .badge_arrow {\n  position: absolute;\n  left: 100%;\n  top: 65px;\n  width: 60px;\n  height: 8px;\n  background-position: center left;\n  -webkit-background-size: cover;\n          background-size: cover;\n  background-repeat: repeat-x;\n  background-image: url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/5268864f1e8dcb60e795959e347893bf.svg);\n}\n.spm_wrapper .spm_badges-list .badge.last .badge_arrow {\n  display: none;\n}\n", ""]);

// exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(164);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(165);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_gifts",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_success = false;
      scope.show_gift = false;
      scope.purchased_gift = false;

      scope.getGift = function (gift) {
        SailPlay.send('gifts.purchase', { gift: gift });
      };

      scope.onChange = function () {};

      $rootScope.$on("gift:state", function (e, state) {
        if (state) {
          scope.getGift(angular.copy(state));
        }
        // scope.show_gift = state && angular.copy(state);
      });

      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = true;
          scope.purchased_gift = res;
          console.log(scope.purchased_gift);
        });
      });

      SailPlay.on('gift.purchase.error', function (error) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = false;
          $rootScope.$broadcast('notifier:notify', {
            header: widget.texts.modals.error.title,
            body: error.message || widget.texts.modals.error.body
          });
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid spm_gifts clearfix\" ng-cloak sailplay-profile sailplay-gifts>\n\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"spm_gifts-container col\">\n\n        <div class=\"spm_gifts-container__left\">\n          <div class=\"spm_gifts-header\" ng-bind=\"widget.texts.header\"></div>\n          <div class=\"spm_gifts-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n          <div class=\"spm_gifts-pagination\">\n            <dir-pagination-controls direction-links=\"true\" data-page-links=\"false\" pagination-id=\"gifts_pages\"\n                                     template-url=\"magic.pagination\" auto-hide=\"true\"></dir-pagination-controls>\n          </div>\n        </div>\n\n        <div class=\"spm_gifts-container__right spm_gifts-list\">\n\n          <div class=\"spm_gifts-item\"\n               dir-paginate=\"gift in gifts() | itemsPerPage:3 track by $index\" pagination-id=\"gifts_pages\"\n               ng-mouseenter=\"gift.actived=true\"\n               ng-mouseleave=\"gift.actived=false\"\n               ng-class=\"{type_disabled: gift.points>user().user_points.confirmed, type_enabled: gift.points<=user().user_points.confirmed, type_hovered: gift.actived}\">\n            <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n            <div class=\"spm_gifts-item-placeholder\" ng-bind=\"widget.texts.name_placeholder\"></div>\n            <a href=\"#\" class=\"spm_gifts-item-button type_recieve\" ng-bind=\"widget.texts.get\"\n               ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n            <div class=\"spm_gifts-item-button type_points\"\n                 ng-bind=\"(gift.points|number)+' '+(gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n  <magic-modal show=\"$parent.$parent.show_gift\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.gift.title\"></magic-modal-title>\n    <magic-modal-body>\n\n      <div class=\"spm_gifts-open\">\n        <i class=\"spm_gifts-open-image\"\n           ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n        <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\"></div>\n        <div class=\"spm_gifts-open-points\"\n             ng-bind=\"($parent.show.points|number) + ' ' + ($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n        <div class=\"spm_gifts-open-descr\" ng-bind=\"$parent.show.descr\"></div>\n        <a href=\"#\" class=\"spm_gifts-open-button spm_btn theme_1 type_filled type_big\"\n           ng-bind=\"widget.texts.modals.gift.button\" ng-click=\"$event.preventDefault();getGift($parent.show)\"></a>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"spm_gifts-success-modal\" show=\"$parent.$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body data-ng-switch=\"purchased_gift.gift_type\">\n\n      <div class=\"spm_gifts-success-modal-body\" ng-bind-html=\"purchased_gift.gift_help_text || widget.texts.modals.success.body | to_trusted\"></div>\n\n      <div data-ng-switch-when=\"coupon\" class=\"spm_gifts-success-modal-body-coupon\">\n        <div class=\"spm_gifts-success-modal-body-coupon-message\">\n          {{ widget.texts.modals.success.coupon_title }}\n        </div>\n        <div class=\"spm_gifts-success-modal-body-coupon-input\">\n          <input type=\"text\" value=\"{{ purchased_gift.coupon_number }}\" disabled>\n        </div>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(166);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_gifts .spm_gifts {\n  position: relative;\n  background: #ecf0f0;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-flex-basis: 20%;\n      -ms-flex-preferred-size: 20%;\n          flex-basis: 20%;\n  padding-right: 30px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 60px;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-container__right {\n  -webkit-flex-basis: 80%;\n      -ms-flex-preferred-size: 80%;\n          flex-basis: 80%;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  width: 100%;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-list {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  width: 100%;\n  max-width: 280px;\n  min-height: 280px;\n  margin: 0 8px;\n  color: #ffffff;\n  background-color: #ca5b54;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-transition: box-shadow 0.3s linear;\n  -o-transition: box-shadow 0.3s linear;\n  -webkit-transition: -webkit-box-shadow 0.3s linear;\n  transition: -webkit-box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear, -webkit-box-shadow 0.3s linear;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-item {\n    width: 48%;\n    margin: 1%;\n  }\n}\n@media (max-width: 600px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-item {\n    width: 100%;\n    margin: 1% 1% 5% 1%;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item-name {\n  font-size: 80px;\n  font-weight: bold;\n  line-height: 1;\n  margin: 50px 10px 5px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  text-transform: uppercase;\n  text-align: center;\n}\n@media (max-width: 1280px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-item-name {\n    font-size: 60px;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item-placeholder {\n  font-size: 22px;\n  font-weight: normal;\n  line-height: 1.45;\n  color: inherit;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item-button {\n  margin-top: 35px;\n  position: relative;\n  text-align: center;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  border: solid 1px #ffffff;\n  font-size: 14px;\n  color: inherit;\n  line-height: 1.38;\n  letter-spacing: 1.6px;\n  padding: 10px 20px;\n  width: auto;\n  min-width: 180px;\n  text-transform: uppercase;\n  text-decoration: none;\n  font-weight: 700;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item-button.type_points {\n  display: block;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item-button.type_recieve {\n  display: none;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item.type_enabled {\n  -webkit-box-shadow: 0 15px 20px 0 rgba(202, 91, 84, 0.27);\n          box-shadow: 0 15px 20px 0 rgba(202, 91, 84, 0.27);\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item.type_disabled {\n  background-color: #b3bcc3;\n  -webkit-box-shadow: 0 11px 12px 0 rgba(168, 178, 189, 0.36);\n          box-shadow: 0 11px 12px 0 rgba(168, 178, 189, 0.36);\n  color: #8e9cab;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item.type_disabled .spm_gifts-item-button {\n  border-color: #8e9cab;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item:hover.type_enabled {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_points {\n  display: none;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_recieve {\n  display: block;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-pagination .spm_pagination {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-pagination .spm_pagination {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-pagination .spm_pagination-direction-link {\n  color: #809797;\n  margin: 0;\n  font-size: 40px;\n  font-weight: 100;\n  line-height: 46px;\n  width: 50px;\n  height: 50px;\n  -webkit-border-radius: 3px;\n          border-radius: 3px;\n  border: solid 1px #809797;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-pagination .spm_pagination-direction-link:first-child {\n  -webkit-border-top-right-radius: 0;\n          border-top-right-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n          border-bottom-right-radius: 0;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-pagination .spm_pagination-direction-link:last-child {\n  border-left: none;\n  -webkit-border-top-left-radius: 0;\n          border-top-left-radius: 0;\n  -webkit-border-bottom-left-radius: 0;\n          border-bottom-left-radius: 0;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-open {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 380px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .bootstrap_gifts .spm_gifts-open {\n    width: 100%;\n  }\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-open-image {\n  width: 200px;\n  height: 200px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  margin: 10px 0;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-open-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #ca5b54;\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-open-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-open-descr {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 25px;\n  margin: 20px 0 30px;\n  color: #000000;\n  opacity: 0.5;\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts .spm_gifts-success-modal .spm_modal-container {\n  max-width: 500px;\n}\n", ""]);

// exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(168);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(169);

var _defaults = __webpack_require__(171);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_gifts_image",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_success = false;
      scope.show_gift = false;

      scope.getGift = function (gift) {
        SailPlay.send('gifts.purchase', { gift: gift });
      };

      scope.purchased_gift = false;

      $rootScope.$on("gift:state", function (e, state) {
        // if(state){
        // scope.getGift(angular.copy(state));
        // }
        scope.show_gift = state && angular.copy(state);
      });

      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = true;
          scope.purchased_gift = res;
        });
      });

      SailPlay.on('gift.purchase.error', function (error) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = false;
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.modals.error.title,
            body: error.message || scope.widget.texts.modals.error.body
          });
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_gifts clearfix container-fluid\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile sailplay-gifts>\n\n  <div class=\"spm_gifts-container row\">\n\n    <div class=\"spm_gifts-container__left col-lg-4 col-md-12\">\n      <div class=\"spm_gifts-header\" ng-bind=\"widget.texts.header\"></div>\n      <div class=\"spm_gifts-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n      <div class=\"spm_gifts-pagination\">\n        <dir-pagination-controls direction-links=\"true\" pagination-id=\"gifts_pages\" template-url=\"magic.pagination\"\n                                 auto-hide=\"true\"></dir-pagination-controls>\n      </div>\n    </div>\n\n    <div class=\"spm_gifts-container__right spm_gifts-list col-lg-8 col-md-12\">\n\n      <div class=\"row\">\n        <div class=\"spm_gifts-item col-lg-4 col-md-4 col-sm-4 col-xs-12\"\n             dir-paginate=\"gift in gifts() | itemsPerPage:3 track by $index\" pagination-id=\"gifts_pages\"\n             ng-mouseenter=\"gift.actived=true\"\n             ng-mouseleave=\"gift.actived=false\"\n             ng-class=\"{type_disabled: !user() || gift.points>user().user_points.confirmed, type_enabled: gift.points<=user().user_points.confirmed, type_hovered: gift.actived}\">\n          <div class=\"spm_gifts-image\">\n            <img class=\"img-fluid\" data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\" alt=\"{{ gift.name }}\">\n          </div>\n          <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n          <div class=\"text-center display-inline-block\">\n            <a href=\"#\" class=\"spm_gifts-item-button type_recieve\" \n               ng-bind=\"widget.texts.get\"\n               ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n            <a href=\"#\" class=\"spm_gifts-item-button type_points\"\n               ng-bind=\"(gift.points|number)+' '+(gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"\n               ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n  <magic-modal show=\"$parent.$parent.show_gift\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.gift.title\"></magic-modal-title>\n    <magic-modal-body>\n\n      <div class=\"spm_gifts-open\">\n        <i class=\"spm_gifts-open-image\"\n           ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n        <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\"></div>\n        <div class=\"spm_gifts-open-points\"\n             ng-bind=\"($parent.show.points|number) + ' ' + ($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n        <div class=\"spm_gifts-open-descr\" ng-bind=\"$parent.show.descr\"></div>\n\n        <div class=\"spm_gifts-open-button spm_btn theme_1 type_cancel type_big\"\n          ng-show=\"!user() || $parent.show.points>user().user_points.confirmed\"\n          ng-bind=\"($parent.show.points|number)+' '+($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n        \n        <a href=\"#\" class=\"spm_gifts-open-button spm_btn theme_1 type_filled type_big\"\n           ng-show=\"$parent.show.points<=user().user_points.confirmed\"\n           ng-bind=\"widget.texts.modals.gift.button\" ng-click=\"$event.preventDefault();getGift($parent.show)\"></a>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"spm_gifts-success-modal\" show=\"$parent.$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body data-ng-switch=\"purchased_gift.gift_type\">\n\n      <div class=\"spm_gifts-success-modal-body\" ng-bind-html=\"purchased_gift.gift_help_text || widget.texts.modals.success.body | to_trusted\"></div>\n\n      <div data-ng-switch-when=\"coupon\" class=\"spm_gifts-success-modal-body-coupon\">\n        <div class=\"spm_gifts-success-modal-body-coupon-message\" ng-bind=\"widget.texts.modals.success.coupon_title\"></div>\n        <div class=\"spm_gifts-success-modal-body-coupon-input\">\n          <input type=\"text\" value=\"{{ purchased_gift.coupon_number }}\" disabled>\n        </div>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(170);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_gifts_image .spm_gifts {\n  position: relative;\n  background: #ecf0f0;\n  padding: 0;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-image {\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 80px 30px;\n  overflow: hidden;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-right: 30px;\n  padding-top: 80px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts_image .spm_gifts-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 60px;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-container__right {\n  padding: 0;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-sub-header {\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-list {\n  display: inline-block;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item {\n  display: inline-block;\n  position: relative;\n  width: 280px;\n  margin: 0 8px;\n  color: #ffffff;\n  background-color: #ca5b54;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-transition: box-shadow 0.3s linear;\n  -o-transition: box-shadow 0.3s linear;\n  -webkit-transition: -webkit-box-shadow 0.3s linear;\n  transition: -webkit-box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear, -webkit-box-shadow 0.3s linear;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-right: 1px solid #eeeeee;\n  border-bottom: 1px solid #eeeeee;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts_image .spm_gifts-item {\n    width: 48%;\n    margin: 1%;\n  }\n}\n@media (max-width: 768px) {\n  .spm_wrapper .bootstrap_gifts_image .spm_gifts-item {\n    width: 100%;\n    margin: 0 0 5% 0;\n  }\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item-name {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 1;\n  margin: 50px 10px 5px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  text-transform: uppercase;\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item-placeholder {\n  font-size: 22px;\n  font-weight: normal;\n  line-height: 1.45;\n  color: inherit;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item-button {\n  margin-top: 35px;\n  position: relative;\n  text-align: center;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  border: solid 1px #ffffff;\n  font-size: 16px;\n  color: inherit;\n  line-height: 1.38;\n  padding: 10px 20px;\n  width: auto;\n  min-width: 150px;\n  text-decoration: none;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item-button.type_points {\n  display: block;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item-button.type_recieve {\n  display: none;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item.type_disabled {\n  background-color: #b3bcc3;\n  color: #8e9cab;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item.type_disabled .spm_gifts-item-button {\n  border-color: #8e9cab;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item:hover.type_enabled {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_points {\n  display: none;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_recieve {\n  display: block;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-pagination .spm_pagination {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_gifts_image .spm_gifts-pagination .spm_pagination {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-pagination .spm_pagination-direction-link {\n  color: #809797;\n  margin: 0;\n  font-size: 40px;\n  font-weight: 100;\n  line-height: 46px;\n  width: 50px;\n  height: 50px;\n  -webkit-border-radius: 3px;\n          border-radius: 3px;\n  border: solid 1px #809797;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-pagination .spm_pagination-direction-link:first-child {\n  -webkit-border-top-right-radius: 0;\n          border-top-right-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n          border-bottom-right-radius: 0;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-pagination .spm_pagination-direction-link:last-child {\n  border-left: none;\n  -webkit-border-top-left-radius: 0;\n          border-top-left-radius: 0;\n  -webkit-border-bottom-left-radius: 0;\n          border-bottom-left-radius: 0;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-open {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 380px;\n  margin: 0 auto;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .bootstrap_gifts_image .spm_gifts-open {\n    width: 100%;\n  }\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-open-image {\n  width: 200px;\n  height: 200px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  margin: 10px 0;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-open-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #ca5b54;\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-open-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-open-descr {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 25px;\n  margin: 20px 0 30px;\n  color: #000000;\n  opacity: 0.5;\n  text-align: center;\n}\n.spm_wrapper .bootstrap_gifts_image .spm_gifts-success-modal .spm_modal-container {\n  max-width: 500px;\n}\n", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = {"styles":{"spm_gifts-item.type_hovered.type_enabled .spm_gifts-item-button.type_recieve":{"color":"#fff","margin":"50px auto auto auto","display":"inline-block","background-color":"rgb(252,46,162)"},"spm_gifts-header":{"font-size":"45px","font-family":"Akrobat, Roboto, sans-serif"},"spm_gifts-item.type_hovered.type_enabled .spm_gifts-item-name":{"display":"none"},"spm_gifts-container":{"max-width":"100%","padding":0},"spm_gifts-item-name":{"color":"rgb(154,152,147)","font-size":"20px","font-weight":300},"spm_gifts-container__right":{},"spm_gifts-item.type_disabled .spm_gifts-item-button.type_points":{"margin-top":"20px"},"spm_gifts-container__left":{"padding-right":"80px","padding-left":"80px"},"spm_gifts-success-modal-body":{"font-size":"20px","font-weight":300,"margin-bottom":"20px"},"spm_gifts-success-modal .spm_modal-content-title":{"margin-top":"20px"},"@media (max-width: 992px) | spm_gifts-list":{},"spm_gifts-success-modal-body-coupon-input input":{"padding":"10px 20px","width":"100%","font-size":"30px","margin-top":"5px"},"spm_gifts-sub-header":{"font-weight":300},"spm_gifts-item":{"border-radius":0,"padding":"80px 40px 50px 40px","font-family":"Open Sans, sans-serif","margin":0,"background-color":"#fff"},"spm_gifts-item-button.type_points":{"color":"#333","font-size":"24px","font-weight":600,"text-transform":"uppercase","margin-top":0},"spm_gifts-item-button.type_recieve":{"padding":"20px 35px","text-transform":"uppercase"},"spm_gifts-success-modal-body-coupon-message":{"font-weight":300}},"enabled":true,"id":"bootstrap_gifts_image","texts":{"sub_header":"Receive gifts from this list for accumulated points","header":"Gifts","name_placeholder":"cashback","modals":{"gift":{"button":"Recieve reward","title":"Information"},"success":{"body":"You received the gift!","coupon_title":"Your coupon number is:","title":"Congratulations"},"error":{"body":"An error occurred while receiving the gift.","title":"Error"}},"get":"Recieve reward"},"images":{},"options":{}}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(173);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(174);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_menu",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, tools) {
    return function (scope, elm, attrs) {
      scope.active = false;
      scope.onClick = function (item) {
        var element = document.querySelector(item.selector);
        if (scope.active) {
          scope.active = false;
        }
        if (element) {
          var offset = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
          offset -= elm[0].offsetHeight;
          if (tools.get_scroll_top() == offset) return;
          window.scrollTo(0, offset);
        }
      };

      var onBodyClick = function onBodyClick(e) {
        if (scope.active) {
          scope.active = false;
          scope.$digest();
        }
      };

      document.body.addEventListener("click", onBodyClick, true);
      document.body.addEventListener("touchstart", onBodyClick, true);

      scope.$on("$destroy", function () {
        document.body.removeEventListener("click", onBodyClick);
        document.body.removeEventListener("touchstart", onBodyClick);
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_menu clearfix\" ng-show=\"widget.enabled\" ng-cloak sailplay-profile>\n    <div class=\"spm_menu-wrapper\">\n\n        <div class=\"spm_menu-container\">\n\n            <div class=\"spm_menu-list\" ng-show=\"widget.options.items && widget.options.items.length\">\n                <a class=\"spm_menu-item\" ng-repeat=\"item in widget.options.items track by $index\" ng-click=\"$event.preventDefault();onClick(item)\">\n                    <i ng-style=\"{'background-image': ((item.icon || widget.images.menu_icon)|background_image)}\"></i>\n                    <span ng-bind=\"item.label\"></span>\n                </a>\n            </div>\n\n            <div class=\"spm_menu-profile\" ng-show=\"user && user()\">\n                <i ng-style=\"{'background-image': (user().user.avatar['250x250'] | sailplay_pic | background_image)}\" ng-click=\"$parent.active=true\"></i>\n                <div class=\"spm_menu-profile-balance\" ng-click=\"$parent.active=true\">\n                    <span class=\"spm_menu-profile-balance_label\" ng-bind=\"widget.texts.your_balance\"></span>\n                    <span class=\"spm_menu-profile-balance_value\" ng-bind=\"(user().user_points.confirmed|number) + ' ' + (user().user_points.confirmed | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                </div>\n                <div class=\"spm_menu-profile-dropdown\" ng-class=\"{type_open: $parent.active}\">\n                    <a href=\"#\" class=\"spm_menu-profile-dropdown-item type_mobile\" ng-repeat=\"item in widget.options.items track by $index\" ng-bind=\"item.label\" ng-click=\"$event.preventDefault();onClick(item)\"></a>\n                    <a href=\"#\" class=\"spm_menu-profile-dropdown-item\" ng-bind=\"widget.texts.edit_profile\" ng-click=\"$event.preventDefault();active=false;$root.$broadcast('profile:state', true)\"></a>\n                    <a class=\"spm_menu-profile-dropdown-item\" ng-href=\"{{widget.options.logout}}\" ng-bind=\"widget.texts.logout\"></a>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>";

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(175);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_menu {\n  width: 100%;\n  height: 94px;\n  color: #ffffff;\n  position: relative;\n}\n.spm_wrapper .spm_menu-wrapper {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 94px;\n  background: #ca5b54;\n  z-index: 10;\n}\n.spm_wrapper .spm_menu-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 30px;\n  margin: 0 auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.spm_wrapper .spm_menu-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-list {\n    display: none;\n  }\n}\n.spm_wrapper .spm_menu-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: baseline;\n  -webkit-align-items: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n  margin-right: 6vw;\n  font-size: 18px;\n}\n.spm_wrapper .spm_menu-item i {\n  margin-right: 10px;\n  width: 12px;\n  height: 12px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .spm_menu-item span {\n  cursor: pointer;\n  text-transform: uppercase;\n}\n.spm_wrapper .spm_menu-item:last-child {\n  margin-right: 0;\n}\n.spm_wrapper .spm_menu-profile {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n  -webkit-flex-basis: 260px;\n      -ms-flex-preferred-size: 260px;\n          flex-basis: 260px;\n  height: 100%;\n}\n.spm_wrapper .spm_menu-profile i {\n  margin-right: 15px;\n  width: 62px;\n  height: 62px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border: 1px solid #ffffff;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .spm_menu-profile-balance {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .spm_menu-profile-balance_label {\n  font-size: 16px;\n  line-height: 18px;\n}\n.spm_wrapper .spm_menu-profile-balance_value {\n  color: #ca5b54;\n  font-size: 18px;\n  line-height: 21px;\n}\n.spm_wrapper .spm_menu-profile-dropdown {\n  position: absolute;\n  left: 0;\n  top: 100%;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #ffffff;\n  padding: 0 20px;\n  -webkit-box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n          box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  -webkit-transform: translateY(20%);\n      -ms-transform: translateY(20%);\n          transform: translateY(20%);\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n  transition: 0.3s linear;\n}\n.spm_wrapper .spm_menu-profile-dropdown:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: -13px;\n  left: 19px;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 0 12px 14px 12px;\n  border-color: transparent transparent #ffffff transparent;\n}\n.spm_wrapper .spm_menu-profile-dropdown a {\n  display: inline-block;\n  text-transform: uppercase;\n  cursor: pointer;\n  font-size: 14px;\n  line-height: 16px;\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n  position: relative;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.spm_wrapper .spm_menu-profile-dropdown a:last-child {\n  border-bottom: none;\n}\n.spm_wrapper .spm_menu-profile-dropdown a:hover {\n  color: #000000;\n}\n.spm_wrapper .spm_menu-profile-dropdown-item.type_mobile {\n  display: none;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-profile-dropdown-item.type_mobile {\n    display: block;\n  }\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-profile-dropdown.type_open {\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@media (min-width: 800px) {\n  .spm_wrapper .spm_menu-profile:hover .spm_menu-profile-dropdown {\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n    visibility: visible;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(177);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(178);

var _avatar = __webpack_require__(180);

var _avatar2 = _interopRequireDefault(_avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_profile",
  template: _template2.default,
  inject: ["$rootScope", "SailPlayProfileForm"],
  controller: function controller($rootScope, SailPlayProfileForm) {
    return function (scope, elm, attrs) {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.show_text = false;
      scope.lock_profile = false;
      scope.menu_active = false;
      scope.default_avatar = _avatar2.default;

      scope.force_fill_profile = false;

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.config);

      scope.$on('sailplay-login-success', function () {

        if (scope.widget.options.fill_profile_required) {

          scope.profile_form.completed().then(function (is_completed) {

            if (!is_completed) {

              scope.force_fill_profile = true;
              scope.show_profile = true;

              scope.lock_profile = true;
            }
          });
        }
      });

      $rootScope.$on("text:state", function (e, state) {
        scope.show_text = state;
      });

      $rootScope.$on("info:state", function (e, state) {
        scope.show_info = state;
      });

      $rootScope.$on("profile:state", function (e, state, lock) {
        scope.show_profile = state;
        scope.lock_profile = lock;
      });

      $rootScope.$on("history:state", function (e, state) {
        scope.show_history = state;
      });

      scope.onSaveProfile = function (e, data) {
        if (data && data.status == "error") {
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.error,
            body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
          });
        } else {
          scope.lock_profile = false;
          scope.force_fill_profile = false;
        }
        scope.show_profile = false;
        scope.$apply();
      };

      var closeMenu = function closeMenu() {
        console.log('closeMenu', scope.menu_active);
        if (scope.force_fill_profile) return;
        scope.$apply(function () {
          scope.menu_active = false;
        });
      };

      document.body.addEventListener('click', closeMenu);

      // $timeout(() => {
      //   if(scope.widget.options.fill_profile_required && !scope.sailplay.fill_profile.form.valid()) {
      //
      //     $rootScope.$broadcast('profile:state', true);
      //
      //   }
      // }, 10);


      scope.$on('$destroy', function () {
        document.body.removeEventListener('click', closeMenu);
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid spm_profile profile clearfix\" ng-cloak sailplay-profile>\n\n  <div class=\"container state_authorized\" data-ng-if=\"user()\">\n    <div class=\"row align-items-center spm_profile_inner\">\n      <div class=\"col\">\n        <div class=\"position-relative d-flex align-items-center b-avatar mb-3\">\n          <div class=\"position-relative\">\n            <img ng-src=\"{{(user().user.avatar['250x250']|sailplay_pic) || widget.images.default_avatar || default_avatar}}\"\n                 class=\"rounded-circle cursor-pointer b-avatar-image\" ng-click=\"$root.$broadcast('info:state', true)\">\n            <div class=\"spm_profile-welcome-name\" data-ng-if=\"widget.options.show_name\" >\n              {{ widget.texts.hi }} {{ user().user.name || widget.texts.no_name }}\n            </div>\n          </div>\n\n          <div class=\"b-avatar-menu position-relative d-flex align-items-center\"\n               ng-class=\"{type_active: $parent.$parent.menu_active}\" data-spm-click-outside=\"$parent.$parent.menu_active = false;\">\n            <div class=\"b-avatar-menu__icon rounded-circle d-flex bg-primary cursor-pointer align-items-center\"\n                 ng-click=\"$event.stopPropagation();$event.preventDefault();$parent.$parent.menu_active=!$parent.$parent.menu_active\">\n              <img class=\"mw-100 h-50\" ng-src=\"{{widget.images.icon_dots}}\">\n            </div>\n            <div class=\"b-avatar-menu__list position-relative d-flex align-items-left bg-white flex-column\">\n              <a href=\"#\"\n                 class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\"\n                 ng-click=\"$event.stopPropagation();$event.preventDefault();$root.$broadcast('info:state', true);$parent.$parent.menu_active=false\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_profile}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_my_profile\"></span>\n              </a>\n              <a href=\"#\" data-ng-if=\"widget.options.auth_type === 'remote'\" class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\" data-ng-click=\"$event.preventDefault(); logout(); $parent.$parent.menu_active=false\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_logout}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_logout\"></span>\n              </a>\n              <a href=\"#\" data-ng-if=\"widget.options.auth_type === 'auth_hash'\" class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\"\n                 ng-href=\"{{widget.options.logout_link}}\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_logout}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_logout\"></span>\n              </a>\n            </div>\n          </div>\n        </div>\n        <h1 class=\"display-4 text-uppercase font-weight-bolder spm_profile-header\"\n            ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n        <p class=\"my-4 font-weight-light spm_profile-subheader\" ng-bind-html=\"widget.texts.sub_header|to_trusted\"></p>\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold learn_more_button\" href=\"#\" role=\"button\"\n           target=\"_blank\"\n           ng-click=\"$event.preventDefault();$root.$broadcast('text:state', true)\"\n           ng-bind=\"widget.texts.button_text\"></a>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"container state_unauthorized\" data-ng-if=\"!user()\">\n    <div class=\"row align-items-center spm_profile_inner\">\n      <div class=\"col\">\n        <h1 class=\"display-4 text-uppercase font-weight-bolder\"\n            ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n        <p class=\"my-4 font-weight-light\" ng-bind-html=\"widget.texts.sub_header|to_trusted\"></p>\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold profile_login_button\" href=\"#\" role=\"button\"\n           target=\"_blank\"\n           ng-click=\"$event.preventDefault();login('remote', {widget: 'bootstrap_profile_stacked', element: 'profile_login_button'});\"\n           ng-bind=\"widget.texts.login_button_text\"></a>\n      </div>\n    </div>\n  </div>\n\n  <magic-modal ng-show=\"!$parent.show_profile\" show=\"$parent.show_info\">\n    <magic-modal-title>\n      <div class=\"b-avatar\">\n        <img ng-src=\"{{user().user.avatar['250x250']|sailplay_pic}}\" class=\"rounded-circle\">\n      </div>\n      <span class=\"spm_profile-info-modal-name b-name d-block my-5 text-black\" ng-bind=\"user().user.name && user().user.name + ' ' + (user().user.middle_name | nullVariable) || widget.texts.no_name_profile_title\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n\n      <div data-ng-repeat=\"field in profile_form.form.fields\" data-ng-if=\"field.value && field.name !== 'firstName' && field.name !== 'lastName' && field.name !== 'middleName'\" data-ng-switch=\"field.input\">\n\n        <!-- uncomment for subscriptions field -->\n        <!--<div class=\"b-info pb-3 pt-3 pr-3 d-flex flex-column flex-column-light align-items-center spm_profile-info-modal-field spm_form_field\" data-ng-switch-when=\"subscriptions\">-->\n          <!--<label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.email === 1 }\">-->\n            <!--<input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.email\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>-->\n            <!--<span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.email_label\"></span>-->\n          <!--</label>-->\n          <!--<label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.sms === 1 }\">-->\n            <!--<input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.sms\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>-->\n            <!--<span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.sms_label\"></span>-->\n          <!--</label>-->\n        <!--</div>-->\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\" data-ng-switch-default>\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"field.value.split('  ').join(', ')\"></span>\n        </div>\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\" data-ng-switch-when=\"phone\">\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"field.value | tel\"></span>\n        </div>\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\" data-ng-switch-when=\"date\">\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"field.value | date:'dd/MM/yyyy'\"></span>\n        </div>\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\" data-ng-switch-when=\"select\">\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"profile_form.get_selected_value(field).text\"></span>\n        </div>\n\n      </div>\n\n      <!--<div ng-show=\"user().user.email\" class=\"b-info mb-5 pt-3 d-flex align-items-center flex-column flex-column-light\">-->\n        <!--<img ng-src=\"{{widget.images.icon_email}}\">-->\n        <!--<span class=\"mt-2\" ng-bind=\"user().user.email\"></span>-->\n      <!--</div>-->\n\n      <!--<div ng-show=\"user().user.phone\" class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n        <!--<img ng-src=\"{{widget.images.icon_phone}}\">-->\n        <!--<span class=\"mt-2\" ng-bind=\"user().user.phone|tel\"></span>-->\n      <!--</div>-->\n\n      <!--<div ng-show=\"user().user.birth_date\" class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n        <!--<img ng-src=\"{{widget.images.icon_bday}}\">-->\n        <!--<span class=\"mt-2\" ng-bind=\"user().user.birth_date|date:'d MMMM yyyy'\"></span>-->\n      <!--</div>-->\n\n      <div class=\"b-info d-flex align-items-center justify-content-center spm_profile-edit-profile-button\">\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold\" href=\"#\" role=\"button\"\n           ng-click=\"$event.preventDefault();$root.$broadcast('profile:state', true)\"\n           ng-bind=\"widget.texts.edit_profile\"></a>\n      </div>\n\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal on-close=\"profile_form.revert\" show=\"$parent.show_profile\" prevent-close=\"lock_profile\">\n    <magic-modal-title ng-bind-html=\"widget.texts.modals.profile.title|to_trusted\"></magic-modal-title>\n    <magic-modal-body>\n\n      <form name=\"ng_profile_form\" class=\"spm_profile-form\"\n            ng-submit=\"profile_form.submit(ng_profile_form, onSaveProfile);\">\n\n        <div class=\"spm_form_field\" ng-repeat=\"field in profile_form.form.fields\"\n             ng-switch=\"field.input\">\n\n          <div ng-switch-when=\"text\">\n            <input class=\"spm_form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\"\n                   ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"date\">\n            <label class=\"spm_form_label \" ng-bind=\"field.label\"></label>\n            <date-picker ng-model=\"field.value\" ng-required=\"field.required\"></date-picker>\n          </div>\n\n          <div ng-switch-when=\"phone\">\n            <input class=\"spm_form_input\" type=\"text\"\n                   ui-mask=\"{{ field.placeholder }}\" ng-model=\"field.value\"\n                   ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"email\">\n            <input class=\"spm_form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\"\n                   ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\">{{ field.label }}</label>\n          </div>\n\n          <div ng-switch-when=\"select\">\n            <select class=\"spm_form_select\" ng-model=\"field.value\"\n                    ng-options=\"item.value as item.text for item in field.data\" ng-required=\"field.required\"></select>\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n        </div>\n\n        <div class=\"spm_form_buttons\">\n          <button class=\"spm_btn theme_1 type_big type_cancel font-weight-bold\" ng-click=\"profile_form.revert(ng_profile_form); $parent.close();\"\n                  ng-bind=\"widget.texts.modals.profile.cancel\"></button>\n          <input type=\"submit\" class=\"spm_btn theme_1 type_filled type_big font-weight-bold\"\n                 ng-value=\"widget.texts.modals.profile.save\"/>\n        </div>\n\n      </form>\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal show=\"$parent.show_history\">\n    <magic-modal-title>\n      <span class=\"d-block text-left\" ng-bind=\"widget.texts.modals.history.title\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n      <div sailplay-history>\n\n        <table class=\"spm_profile-history\" ng-show=\"history().length\">\n          <tbody>\n          <tr dir-paginate=\"item in history() | itemsPerPage:5\" pagination-id=\"history_pages\">\n            <td class=\"type_lighter\" ng-bind=\"item.action_date | date:'d MMM yyyy'\"></td>\n            <td>\n              <div ng-bind=\"item|history_item\"></div>\n            </td>\n            <td></td>\n            <!--<td ng-class=\"{type_positive:item.points_delta>0, type_negative:item.points_delta<0}\"-->\n            <!--ng-bind=\"item.points_delta?(item.points_delta|number):''\"></td>-->\n          </tr>\n          </tbody>\n        </table>\n\n        <dir-pagination-controls max-size=\"7\" direction-links=\"false\" pagination-id=\"history_pages\"\n                                 template-url=\"magic.pagination\"\n                                 auto-hide=\"true\"></dir-pagination-controls>\n\n        <div ng-hide=\"history().length\" ng-bind=\"widget.texts.modals.history.empty\"></div>\n\n      </div>\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal show=\"$parent.$parent.show_text\">\n    <magic-modal-title ng-bind-html=\"widget.texts.modals.text.title|to_trusted\"></magic-modal-title>\n    <magic-modal-body ng-bind-html=\"widget.texts.modals.text.body|to_trusted\"></magic-modal-body>\n  </magic-modal>\n\n</section>";

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(179);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_profile .spm_profile {\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center top;\n  -webkit-background-size: cover;\n          background-size: cover;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-name {\n  letter-spacing: 2px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .spm_profile_inner {\n  height: 625px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar img {\n  width: 115px;\n  height: 115px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu {\n  margin-left: -15px;\n  z-index: 2;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__icon {\n  width: 45px;\n  height: 45px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__icon:hover {\n  -webkit-box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n          box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__item {\n  text-decoration: none;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__item-icon {\n  width: 24px;\n  height: 24px;\n  margin-right: 10px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__item:hover {\n  background-color: rgba(88, 131, 154, 0.1);\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__list {\n  opacity: 0;\n  visibility: hidden;\n  z-index: 2;\n  margin-left: -5px;\n  -webkit-box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n          box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu__list:before {\n  right: 100%;\n  top: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(255, 255, 255, 0);\n  border-right-color: #ffffff;\n  border-width: 10px;\n  margin-top: -10px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-avatar .b-avatar-menu.type_active .b-avatar-menu__list {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-info {\n  min-width: 340px;\n  max-width: 100%;\n  width: 100%;\n  margin: 0 auto;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile .b-info {\n    min-width: 0;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile .b-info img {\n  max-height: 24px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile .btn {\n  letter-spacing: 1.6px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-welcome-name {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  left: 150%;\n  min-width: 200px;\n}\n@media (max-width: 420px) {\n  .spm_wrapper .bootstrap_profile .spm_profile {\n    padding: 40px 35px;\n  }\n  .spm_wrapper .bootstrap_profile .spm_profile-welcome-name {\n    left: 0;\n    width: auto;\n    top: 120%;\n    min-width: 280px;\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n  }\n  .spm_wrapper .bootstrap_profile .spm_profile-header {\n    margin-top: 65px;\n  }\n  .spm_wrapper .bootstrap_profile .spm_profile .spm_modal-content-body {\n    min-width: 0 !important;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 80px 30px 160px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-welcome {\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: 20px;\n  line-height: 25px;\n  color: #000000;\n  margin-bottom: 10px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-welcome {\n    font-size: 16px;\n    line-height: 20px;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 45px;\n  line-height: 55px;\n  color: #000000;\n  max-width: 660px;\n  margin-bottom: 40px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-header {\n    font-size: 20px;\n    line-height: 26px;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 750px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-content {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points {\n  width: 280px;\n  height: 280px;\n  background: #ca5b54;\n  color: #ffffff;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 50px 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-confirmed {\n  font-size: 48px;\n  line-height: 38px;\n  margin-bottom: 10px;\n  font-weight: 800;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-placeholder {\n  font-size: 23px;\n  line-height: 27px;\n  font-weight: 800;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-unconfirmed {\n  font-size: 18px;\n  line-height: 21px;\n  font-weight: 800;\n  margin: 10px 0 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-unconfirmed-block {\n  opacity: 0.5;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-tooltip {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  line-height: 14px;\n  border: 1px solid #ffffff;\n  color: #ffffff;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  text-align: center;\n  margin-left: 10px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-tooltip div {\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  margin-bottom: 16px;\n  width: 212px;\n  margin-left: -106px;\n  background: #ffffff;\n  padding: 0 20px;\n  -webkit-box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n          box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n  transition: 0.3s linear;\n  font-size: 14px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-weight: 500;\n  line-height: 16px;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-tooltip div:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: -14px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 14px 12px 0 12px;\n  border-color: #ffffff transparent transparent transparent;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-points-tooltip div:after {\n    bottom: -12px;\n    left: auto;\n    right: 30px;\n  }\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-points-tooltip div {\n    margin-left: -170px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-points-tooltip:hover div {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-weight: 800;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status i {\n  width: 150px;\n  height: 150px;\n  margin-right: 20px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-color: #ffffff;\n  border: 8px solid #ffffff;\n  margin-left: -15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status i {\n    margin-left: 0;\n    margin-bottom: 10px;\n    margin-right: 0;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-info {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-placeholder {\n  font-size: 18px;\n  line-height: 25px;\n  color: #ca5b54;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-name {\n  font-size: 25px;\n  line-height: 25px;\n  color: #ca5b54;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-descr {\n  font-size: 18px;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status .spm_btn {\n  margin-top: 15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    margin-top: 30px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history {\n  max-width: 100%;\n  margin: 0 auto;\n  width: 420px;\n  margin-bottom: 35px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td {\n  color: #000000;\n  font-weight: 500;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td.type_lighter {\n  opacity: 0.2;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td.type_positive {\n  color: #ca5b54;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td div {\n  line-height: 24px;\n  padding-right: 10px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td:nth-child(1) {\n  width: 100px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history td:nth-child(3) {\n  min-width: 80px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history thead td {\n  line-height: 30px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history tbody tr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history tbody tr:first-child {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .bootstrap_profile .spm_profile-history tbody td {\n  line-height: 80px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-history {\n    width: 100%;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-form {\n  max-width: 100%;\n  width: 340px;\n  margin: 0 auto;\n  padding-top: 24px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-form input[type=\"submit\"] {\n  margin-top: 20px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-form {\n    width: 100%;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-block-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  background: #ffffff;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-block-wrapper .spm_profile-container {\n  padding: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 30px;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-block-wrapper-close {\n  width: 21px;\n  height: 21px;\n  right: 50px;\n  top: 25px;\n  position: absolute;\n  cursor: pointer;\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-block-wrapper-close:hover {\n  opacity: 0.7;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-block-wrapper-close {\n    top: 100px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-list {\n  color: #ffffff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-list {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item {\n    margin-top: 20px;\n    -webkit-flex-basis: 50%;\n        -ms-flex-preferred-size: 50%;\n            flex-basis: 50%;\n  }\n}\n@media (max-width: 300px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-tooltip {\n  position: absolute;\n  z-index: 2;\n  left: 0;\n  top: -25%;\n  width: 100%;\n  font-size: 17px;\n  line-height: 22px;\n  color: #000000;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  -webkit-transition: 0.3s linear;\n  -moz-transition: 0.3s linear;\n  -ms-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-tooltip {\n    font-size: 12px;\n    line-height: 16px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-image {\n  width: 138px;\n  height: 138px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #ffffff;\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  border: 8px solid white;\n  display: block;\n  z-index: 1;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-image {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 650px) {\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  text-transform: uppercase;\n  color: #ca5b54;\n  margin-top: 25px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-name {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-name {\n    margin-top: 10px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-descr {\n  text-align: center;\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 24px;\n  color: #000000;\n  opacity: 0.3;\n  margin: 10px 0;\n  max-width: 138px;\n  margin-bottom: 20px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-descr {\n    font-size: 13px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-descr {\n    margin-bottom: 10px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-value {\n  text-align: center;\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-value {\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item-progress {\n  position: absolute;\n  height: 8px;\n  background: white;\n  width: 100%;\n  top: 70px;\n  right: -85%;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-progress {\n    left: 8vw;\n    width: 120px;\n    height: 6px;\n    top: 35px;\n    right: auto;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item-progress {\n    display: none;\n  }\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item.type_active .spm_profile-status-item-image {\n  background-color: #ca5b54;\n  border-color: #ca5b54;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item.type_active .spm_profile-status-item-progress:after {\n  content: '';\n  background: #ca5b54;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  display: block;\n}\n.spm_wrapper .bootstrap_profile .spm_profile-status-item.type_active.type_filled .spm_profile-status-item-progress:after {\n  width: 100%;\n}\n@media (min-width: 650px) {\n  .spm_wrapper .bootstrap_profile .spm_profile-status-item:hover .spm_profile-status-item-tooltip {\n    opacity: 0.5;\n    visibility: visible;\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,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"

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(182);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(183);

var _defaults = __webpack_require__(185);

var _defaults2 = _interopRequireDefault(_defaults);

var _avatar = __webpack_require__(186);

var _avatar2 = _interopRequireDefault(_avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_profile_stacked",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.lock_profile = false;
      scope.show_learn_more = false;

      $rootScope.$on("info:state", function (e, state) {
        scope.show_info = state;
      });

      $rootScope.$on("profile:state", function (e, state, lock) {
        scope.show_profile = state;
        scope.lock_profile = lock;
      });

      $rootScope.$on("history:state", function (e, state) {
        scope.show_history = state;
      });

      scope.onSaveProfile = function (e, data) {
        if (data && data.status == "error") {
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.error,
            body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
          });
        }
        scope.show_profile = false;
        scope.$apply();
      };

      scope.open_learn_more = function () {

        scope.show_learn_more = true;
        console.log(scope.show_learn_more);
      };

      scope.default_avatar = _avatar2.default;
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = "<section class=\"spm_profile profile clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile sailplay-fill-profile config=\"widget.options.config\">\n\n  <div class=\"container container-fluid spm_profile-container\">\n\n    <!-- authorized section -->\n    <div class=\"row\" data-ng-if=\"user()\">\n\n      <div class=\"col-lg-2 col-md-12 spm_profile-avatar\">\n\n        <div class=\"position-relative d-inline-block b-avatar mb-3\">\n\n          <!-- user pic -->\n          <img ng-src=\"{{ ( user().user.avatar['250x250'] | sailplay_pic ) || default_avatar}}\" class=\"rounded-circle profile_avatar\">\n\n          <!-- profile menu -->\n          <div class=\"b-avatar-menu position-absolute\">\n            <div class=\"b-avatar-menu__icon rounded-circle bg-primary cursor-pointer\"\n                 ng-click=\"menuActive=!menuActive\">\n              <img ng-src=\"{{widget.images.icon_dots}}\">\n            </div>\n          </div>\n\n          <div class=\"b-avatar-menu__list position-absolute bg-light\" data-ng-class=\"{type_active: menuActive}\" data-ng-mouseleave=\"menuActive=false\">\n            <a href=\"#\" class=\"b-avatar-menu__item d-flex align-items-center text-dark py-3 pl-4 pr-5\"\n               ng-click=\"$event.preventDefault();$root.$broadcast('info:state', true);menuActive=false\">\n              <i class=\"b-avatar-menu__item-icon\">\n                <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_profile}}\">\n              </i>\n              <span ng-bind=\"widget.texts.menu_my_profile\"></span>\n            </a>\n            <a href=\"#\" class=\"b-avatar-menu__item text-dark py-3 pl-4 pr-5\" data-ng-click=\"$event.preventDefault();logout();menuActive=false\">\n              <i class=\"b-avatar-menu__item-icon\">\n                <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_logout}}\">\n              </i>\n              <span ng-bind=\"widget.texts.menu_logout\"></span>\n            </a>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"col col-lg-6 col-md-12 spm_profile-info\">\n\n        <div class=\"spm_profile-info-inner\">\n\n          <p class=\"font-weight-light spm_profile-subheader\">\n            <span>{{ user().user.name }}, </span>\n            <span ng-bind-html=\"widget.texts.sub_header | to_trusted\"></span>\n          </p>\n\n          <h1 class=\"display-4 text-uppercase font-weight-bolder spm_profile-header\" data-ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n\n          <p class=\"spm_profile-description\" data-ng-bind-html=\"widget.texts.description | to_trusted\"></p>\n\n          <button type=\"button\" class=\"btn btn-lg btn-primary spm_profile-login_button\" href=\"#\" role=\"button\" data-ng-click=\"open_learn_more()\" data-ng-bind=\"widget.texts.learn_more_button_text\"></button>\n\n        </div>\n\n      </div>\n\n      <div class=\"spm_status-bar status-bar col-lg-4 col-md-12 clearfix\" ng-cloak ng-class=\"{type_list: show_list}\">\n\n        <div>\n\n          <div class=\"align-items-top\">\n\n            <div class=\"b-current-status d-flex flex-column align-items-center text-center spm_profile-status\">\n              <i ng-style=\"currentStatus.style\"></i>\n              <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0 spm_profile-status-name\" ng-bind=\"currentStatus.name || widget.texts.status.no_status\"></h2>\n              <div class=\"mt-1 font-weight-light\" ng-bind-html=\"(currentStatus.description|to_trusted) || widget.texts.status.no_status_description\"></div>\n            </div>\n\n            <div class=\"b-points d-flex spm_profile-points\" data-ng-click=\"$root.$broadcast('history:state', true)\">\n              <div class=\"display-1 text-center points-balance font-akrobat font-weight-bold text-uppercase spm_profile-points-confirmed\">{{ user().user_points.confirmed | number }} {{ widget.texts.points.label }}</div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-show=\"show_list\" class=\"container py-0 py-lg-5 position-relative\">\n          <div class=\"b-list-close rounded-circle d-flex bg-primary cursor-pointer align-items-center position-absolute\"\n               ng-click=\"show_list=false\"></div>\n          <div class=\"row align-items-center\">\n            <div class=\"b-statuses col-md-12 my-5 my-lg-0 col-lg-4 d-flex flex-column align-items-center text-center\"\n                 ng-repeat=\"status in list track by $index\">\n              <i ng-style=\"status.style\"></i>\n              <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0\" ng-bind=\"status.name\"></h2>\n              <h5 class=\"my-2\"\n                  ng-bind=\"(status.points|number)+' '+(status.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></h5>\n              <div class=\"font-weight-light\" ng-bind-html=\"status.description|to_trusted\"></div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n    <!-- unauthorized section -->\n    <div class=\"row\" data-ng-if=\"!user()\">\n\n      <div class=\"col-lg-2 col-md-12 spm_profile-avatar\">\n\n        <div class=\"position-relative d-inline-block b-avatar mb-3\">\n\n          <!-- user pic -->\n          <img ng-src=\"{{ default_avatar }}\" class=\"rounded-circle profile_avatar\">\n\n        </div>\n\n      </div>\n\n      <div class=\"col col-lg-10 col-md-12 spm_profile-info\">\n\n\n        <div class=\"spm_profile-info-inner\">\n\n          <p class=\"font-weight-light spm_profile-subheader\">\n            <span ng-bind-html=\"widget.texts.sub_header | to_trusted\"></span>\n          </p>\n\n          <h1 class=\"display-4 text-uppercase font-weight-bolder spm_profile-header\" data-ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n\n          <p class=\"spm_profile-description\" data-ng-bind-html=\"widget.texts.description | to_trusted\"></p>\n\n          <button type=\"button\" class=\"btn btn-lg btn-primary spm_profile-login_button\" href=\"#\" role=\"button\" data-ng-click=\"$event.preventDefault(); login('remote', {widget: 'bootstrap_profile_stacked', element: 'profile_login_button'});\" data-ng-bind=\"widget.texts.login_button_text\"></button>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <magic-modal show=\"$parent.$parent.show_info\" class=\"spm_profile-info-modal\">\n    <magic-modal-title>\n      <div class=\"b-avatar spm_profile-info-modal-avatar\">\n        <img class=\"spm_profile-info-modal-avatar-image\" ng-src=\"{{user().user.avatar['250x250']|sailplay_pic}}\" class=\"rounded-circle\">\n      </div>\n      <span class=\"d-block my-5 spm_profile-info-modal-name\" ng-bind=\"user().user.name\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n\n      <div data-ng-repeat=\"field in sailplay.fill_profile.form.fields\" data-ng-if=\"field.value\" data-ng-switch=\"field.input\">\n\n        <div class=\"b-info pb-3 pt-3 pr-3 d-flex flex-column flex-column-light spm_profile-info-modal-field spm_form_field\" data-ng-switch-when=\"subscriptions\">\n          <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.email === 1 }\">\n            <input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.email\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>\n            <span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.email_label\"></span>\n          </label>\n          <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.sms === 1 }\">\n            <input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.sms\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>\n            <span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.sms_label\"></span>\n          </label>\n        </div>\n\n        <div class=\"b-info pb-3 pt-3 pr-3 d-flex flex-column flex-column-light spm_profile-info-modal-field\" data-ng-switch-default>\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"spm_profile-info-modal-field-label\">{{ field.label }}</span>\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"field.value.split('  ').join(', ')\"></span>\n        </div>\n\n      </div>\n\n\n      <!--<div class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n        <!--<img ng-src=\"{{widget.images.icon_phone}}\">-->\n        <!--<span class=\"mt-2\" ng-bind=\"user().user.phone|tel\"></span>-->\n      <!--</div>-->\n\n      <!--<div class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n        <!--<img ng-src=\"{{widget.images.icon_bday}}\">-->\n        <!--<span class=\"mt-2\" ng-bind=\"user().user.birth_date|date:'d MMMM yyyy'\"></span>-->\n      <!--</div>-->\n\n      <div class=\"b-info d-flex align-items-center justify-content-center spm_profile-info-modal-button\">\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bolder\" href=\"#\" role=\"button\"\n           ng-click=\"$event.preventDefault();$root.$broadcast('info:state', false); $root.$broadcast('profile:state', true)\"\n           ng-bind=\"widget.texts.modals.profile.edit_button\"></a>\n      </div>\n\n\n    </magic-modal-body>\n  </magic-modal>\n\n\n  <magic-modal class=\"spm_profile-edit-modal\" on-close=\"revert_profile_form\" show=\"$parent.$parent.show_profile\" prevent-close=\"lock_profile\">\n    <magic-modal-title ng-bind-html=\"widget.texts.modals.profile.title|to_trusted\"></magic-modal-title>\n    <magic-modal-body>\n\n      <form name=\"profile_form\" class=\"spm_profile-form\"\n            ng-submit=\"sailplay.fill_profile.submit(profile_form, onSaveProfile);\">\n\n        <div class=\"spm_form_field spm_form_field_type_{{ field.input }}\" ng-repeat=\"field in sailplay.fill_profile.form.fields\"\n             ng-switch=\"field.input\">\n\n          <div ng-switch-when=\"text\" class=\"position-relative\">\n            <input class=\"spm_form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\"\n                   ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"date\" class=\"position-relative\">\n            <label class=\"spm_form_label \" ng-bind=\"field.label\"></label>\n            <date-picker ng-model=\"field.value\" ng-required=\"field.required\"></date-picker>\n          </div>\n\n          <div ng-switch-when=\"phone\" class=\"position-relative\">\n            <input class=\"spm_form_input\" type=\"text\"\n                   ui-mask=\"{{ field.placeholder }}\" ng-model=\"field.value\"\n                   ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"email\" class=\"position-relative\">\n            <input class=\"spm_form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\"\n                   ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\">{{ field.label }}</label>\n          </div>\n\n          <div ng-switch-when=\"select\" class=\"position-relative\">\n            <select class=\"spm_form_select\" ng-model=\"field.value\"\n                    ng-options=\"item.value as item.text for item in field.data\"></select>\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div class=\"container-left-profile_field-value position-relative\" data-ng-switch-when=\"radio\">\n            <label class=\"spm_form_label\" ng-bind=\"field.label\"></label>\n            <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value === item.value }\" data-ng-repeat=\"item in field.data\">\n              <input class=\"spm_form_checkbox_input\" type=\"radio\" data-ng-model=\"field.value\" data-ng-value=\"item.value\">\n              <span class=\"spm_form_checkbox_label\" data-ng-bind=\"item.text\"></span>\n            </label>\n          </div>\n\n          <div class=\"container-left-profile_field-value position-relative\" data-ng-switch-when=\"checkbox\" data-sailplay-variable-checkbox data-ng-model=\"field.value\">\n            <label class=\"spm_form_label\" ng-bind=\"field.label\"></label>\n            <label class=\"spm_form_checkbox\" data-ng-repeat=\"item in field.data\" data-ng-class=\"{ checked: SailplayVariableCheckbox.value[item.value] }\">\n              <input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"SailplayVariableCheckbox.value[item.value]\" data-ng-change=\"SailplayVariableCheckbox.change()\">\n              <span class=\"spm_form_checkbox_label\" data-ng-bind=\"item.text\"></span>\n            </label>\n          </div>\n\n          <div class=\"container-left-profile_field-value position-relative\" data-ng-switch-when=\"subscriptions\"\n               data-ng-show=\"field.value\">\n            <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.email === 1 }\">\n              <input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.email\" data-ng-true-value=\"1\" data-ng-false-value=\"0\">\n              <span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.email_label\"></span>\n            </label>\n            <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.sms === 1 }\">\n              <input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.sms\" data-ng-true-value=\"1\" data-ng-false-value=\"0\">\n              <span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.sms_label\"></span>\n            </label>\n          </div>\n\n        </div>\n\n        <div class=\"spm_form_buttons\">\n          <button class=\"spm_btn theme_1 type_big type_cancel font-weight-bolder\" ng-click=\"$parent.close()\"\n                  ng-bind=\"widget.texts.modals.profile.cancel\"></button>\n          <input type=\"submit\" class=\"spm_btn theme_1 type_filled type_big font-weight-bolder\"\n                 ng-value=\"widget.texts.modals.profile.save\"/>\n        </div>\n\n      </form>\n\n    </magic-modal-body>\n  </magic-modal>\n\n\n  <magic-modal show=\"$parent.$parent.show_history\">\n    <magic-modal-title>\n      <span class=\"d-block text-left history_title\" ng-bind=\"widget.texts.modals.history.title\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n      <div sailplay-history>\n\n        <table class=\"spm_profile-history\" ng-show=\"history().length\">\n          <tbody>\n          <tr dir-paginate=\"item in history() | itemsPerPage:5\" pagination-id=\"history_pages\">\n            <td class=\"type_lighter\" ng-bind=\"item.action_date | date:'d MMM yyyy'\"></td>\n            <td>\n              <div ng-bind=\"item|history_item\"></div>\n            </td>\n            <td></td>\n            <!--<td ng-class=\"{type_positive:item.points_delta>0, type_negative:item.points_delta<0}\"-->\n            <!--ng-bind=\"item.points_delta?(item.points_delta|number):''\"></td>-->\n          </tr>\n          </tbody>\n        </table>\n\n        <dir-pagination-controls max-size=\"7\" direction-links=\"false\" data-page-links=\"true\" pagination-id=\"history_pages\"\n                                 template-url=\"magic.pagination\"\n                                 auto-hide=\"true\"></dir-pagination-controls>\n\n        <div ng-hide=\"history().length\" ng-bind=\"widget.texts.modals.history.empty\"></div>\n\n      </div>\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"learn_more_modal\" show=\"$parent.$parent.show_learn_more\">\n    <magic-modal-body>\n\n      <div class=\"mb-5 d-flex align-items-center flex-column flex-column-light\" data-ng-bind-html=\"widget.texts.learn_more_html | to_trusted\">\n\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n</section>";

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".bootstrap_profile_stacked .spm_profile {\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center top;\n  -webkit-background-size: cover;\n          background-size: cover;\n}\n.bootstrap_profile_stacked .spm_profile .b-info {\n  width: 400px;\n  margin: 0 auto;\n}\n.bootstrap_profile_stacked .spm_profile-avatar {\n  padding-top: 80px;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar {\n  padding-left: 50px;\n  position: relative;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .profile_avatar {\n  width: 115px;\n  height: 115px;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu {\n  top: 50%;\n  right: auto;\n  left: 100%;\n  margin-left: -15px;\n  margin-top: -22px;\n  z-index: 2;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__icon {\n  width: 45px;\n  height: 45px;\n  background-color: #444444;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__icon img {\n  width: 32px;\n  height: 32px;\n  margin-left: 7px;\n  margin-top: 6px;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__icon:hover {\n  -webkit-box-shadow: -6px 6px 14px 0 rgba(0, 0, 0, 0.66);\n          box-shadow: -6px 6px 14px 0 rgba(0, 0, 0, 0.66);\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__item {\n  text-decoration: none;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__item-icon {\n  width: 24px;\n  height: 24px;\n  margin-right: 10px;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__item:hover {\n  background-color: rgba(88, 131, 154, 0.1);\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__list {\n  opacity: 0;\n  visibility: hidden;\n  z-index: 2;\n  margin-left: -5px;\n  position: absolute;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translate(35px, -50%);\n      -ms-transform: translate(35px, -50%);\n          transform: translate(35px, -50%);\n  -webkit-box-shadow: -6px 6px 14px 0 rgba(0, 0, 0, 0.3);\n          box-shadow: -6px 6px 14px 0 rgba(0, 0, 0, 0.3);\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__list:before {\n  right: 100%;\n  top: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(255, 255, 255, 0);\n  border-right-color: #ffffff;\n  border-width: 10px;\n  margin-top: -10px;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__list a {\n  display: block;\n  white-space: nowrap;\n}\n.bootstrap_profile_stacked .spm_profile-avatar .b-avatar .b-avatar-menu__list.type_active {\n  opacity: 1;\n  visibility: visible;\n}\n.bootstrap_profile_stacked .spm_profile-info {\n  padding-top: 80px;\n  padding-bottom: 50px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .bootstrap_profile_stacked .spm_profile-info {\n    padding-top: 20px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-info-inner {\n  padding-right: 50px;\n}\n@media (max-width: 1060px) {\n  .bootstrap_profile_stacked .spm_profile-info-inner {\n    padding-left: 50px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-container {\n  width: 100%;\n  height: 100%;\n  max-width: 100% !important;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0 !important;\n  padding: 0;\n}\n.bootstrap_profile_stacked .spm_profile-welcome {\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: 20px;\n  line-height: 25px;\n  color: #000000;\n  margin-bottom: 10px;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-welcome {\n    font-size: 16px;\n    line-height: 20px;\n    text-align: center;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 50px;\n  line-height: 100%;\n  color: #000000;\n  max-width: 660px;\n  margin-bottom: 25px;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-header {\n    font-size: 20px;\n    line-height: 26px;\n    text-align: center;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-subheader {\n  font-weight: 300;\n  font-size: 30px;\n  line-height: 100%;\n  color: #000000;\n  max-width: 660px;\n  margin-bottom: 15px;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-subheader {\n    font-size: 20px;\n    line-height: 26px;\n    text-align: center;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-description {\n  line-height: 160%;\n  color: #000000;\n  margin-bottom: 30px;\n}\n.bootstrap_profile_stacked .spm_profile-login_button {\n  background-color: #000000;\n  color: #ffffff;\n  border: none;\n  margin: 0;\n}\n.bootstrap_profile_stacked .spm_profile-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 750px) {\n  .bootstrap_profile_stacked .spm_profile-content {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-points {\n  background: #cccccc;\n  color: #ffffff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 40px 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.bootstrap_profile_stacked .spm_profile-points-confirmed {\n  font-size: 30px;\n  line-height: 38px;\n  margin-bottom: 10px;\n  font-weight: 800;\n}\n.bootstrap_profile_stacked .spm_profile-points-placeholder {\n  font-size: 23px;\n  line-height: 27px;\n  font-weight: 800;\n}\n.bootstrap_profile_stacked .spm_profile-points-unconfirmed {\n  font-size: 18px;\n  line-height: 21px;\n  font-weight: 800;\n  margin: 10px 0 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.bootstrap_profile_stacked .spm_profile-points-unconfirmed-block {\n  opacity: 0.5;\n}\n.bootstrap_profile_stacked .spm_profile-points-tooltip {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  line-height: 14px;\n  border: 1px solid #ffffff;\n  color: #ffffff;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  text-align: center;\n  margin-left: 10px;\n}\n.bootstrap_profile_stacked .spm_profile-points-tooltip div {\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  margin-bottom: 16px;\n  width: 212px;\n  margin-left: -106px;\n  background: #ffffff;\n  padding: 0 20px;\n  -webkit-box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n          box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n  transition: 0.3s linear;\n  font-size: 14px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-weight: 500;\n  line-height: 16px;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n}\n.bootstrap_profile_stacked .spm_profile-points-tooltip div:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: -14px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 14px 12px 0 12px;\n  border-color: #ffffff transparent transparent transparent;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-points-tooltip div:after {\n    bottom: -12px;\n    left: auto;\n    right: 30px;\n  }\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-points-tooltip div {\n    margin-left: -170px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-points-tooltip:hover div {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  opacity: 1;\n  visibility: visible;\n}\n.bootstrap_profile_stacked .spm_profile-status {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-weight: 800;\n  padding: 50px;\n}\n.bootstrap_profile_stacked .spm_profile-status i {\n  width: 150px;\n  height: 150px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-color: #ffffff;\n  border: 8px solid #ffffff;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-status i {\n    margin-left: 0;\n    margin-bottom: 10px;\n    margin-right: 0;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-info {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.bootstrap_profile_stacked .spm_profile-status-placeholder {\n  font-size: 18px;\n  line-height: 25px;\n  color: #ca5b54;\n}\n.bootstrap_profile_stacked .spm_profile-status-name {\n  font-size: 25px;\n  line-height: 25px;\n  color: #444444;\n  margin-top: 30px;\n}\n.bootstrap_profile_stacked .spm_profile-status-descr {\n  font-size: 18px;\n  line-height: 25px;\n  color: #000000;\n}\n.bootstrap_profile_stacked .spm_profile-status .spm_btn {\n  margin-top: 15px;\n}\n@media (max-width: 500px) {\n  .bootstrap_profile_stacked .spm_profile-status {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    margin-top: 30px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-history {\n  max-width: 100%;\n  margin: 0 auto;\n  width: 420px;\n  margin-bottom: 35px;\n}\n.bootstrap_profile_stacked .spm_profile-history td {\n  color: #000000;\n  font-weight: 500;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.bootstrap_profile_stacked .spm_profile-history td.type_lighter {\n  opacity: 0.2;\n}\n.bootstrap_profile_stacked .spm_profile-history td.type_positive {\n  color: #ca5b54;\n}\n.bootstrap_profile_stacked .spm_profile-history td div {\n  line-height: 24px;\n  padding-right: 10px;\n}\n.bootstrap_profile_stacked .spm_profile-history td:nth-child(1) {\n  width: 100px;\n}\n.bootstrap_profile_stacked .spm_profile-history td:nth-child(3) {\n  min-width: 80px;\n}\n.bootstrap_profile_stacked .spm_profile-history thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.bootstrap_profile_stacked .spm_profile-history thead td {\n  line-height: 30px;\n}\n.bootstrap_profile_stacked .spm_profile-history tbody tr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.bootstrap_profile_stacked .spm_profile-history tbody tr:first-child {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.bootstrap_profile_stacked .spm_profile-history tbody td {\n  line-height: 80px;\n}\n@media (max-width: 600px) {\n  .bootstrap_profile_stacked .spm_profile-history {\n    width: 100%;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-form {\n  max-width: 100%;\n  width: 340px;\n  margin: 0 auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.bootstrap_profile_stacked .spm_profile-form input[type=\"submit\"] {\n  margin-top: 20px;\n}\n@media (max-width: 600px) {\n  .bootstrap_profile_stacked .spm_profile-form {\n    width: 100%;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-block-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  background: #ffffff;\n}\n.bootstrap_profile_stacked .spm_profile-block-wrapper .spm_profile-container {\n  padding: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 30px;\n}\n.bootstrap_profile_stacked .spm_profile-block-wrapper-close {\n  width: 21px;\n  height: 21px;\n  right: 50px;\n  top: 25px;\n  position: absolute;\n  cursor: pointer;\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.bootstrap_profile_stacked .spm_profile-block-wrapper-close:hover {\n  opacity: 0.7;\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-block-wrapper-close {\n    top: 100px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-list {\n  color: #ffffff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-list {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-item {\n    margin-top: 20px;\n    -webkit-flex-basis: 50%;\n        -ms-flex-preferred-size: 50%;\n            flex-basis: 50%;\n  }\n}\n@media (max-width: 300px) {\n  .bootstrap_profile_stacked .spm_profile-status-item {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item-tooltip {\n  position: absolute;\n  z-index: 2;\n  left: 0;\n  top: -25%;\n  width: 100%;\n  font-size: 17px;\n  line-height: 22px;\n  color: #000000;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  -webkit-transition: 0.3s linear;\n  -moz-transition: 0.3s linear;\n  -ms-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-tooltip {\n    font-size: 12px;\n    line-height: 16px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item-image {\n  width: 138px;\n  height: 138px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #ffffff;\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  border: 8px solid white;\n  display: block;\n  z-index: 1;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-image {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 650px) {\n}\n.bootstrap_profile_stacked .spm_profile-status-item-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  text-transform: uppercase;\n  color: #ca5b54;\n  margin-top: 25px;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-name {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-name {\n    margin-top: 10px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item-descr {\n  text-align: center;\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 24px;\n  color: #000000;\n  opacity: 0.3;\n  margin: 10px 0;\n  max-width: 138px;\n  margin-bottom: 20px;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-descr {\n    font-size: 13px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-descr {\n    margin-bottom: 10px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item-value {\n  text-align: center;\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-value {\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item-progress {\n  position: absolute;\n  height: 8px;\n  background: white;\n  width: 100%;\n  top: 70px;\n  right: -85%;\n}\n@media (max-width: 850px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-progress {\n    left: 8vw;\n    width: 120px;\n    height: 6px;\n    top: 35px;\n    right: auto;\n  }\n}\n@media (max-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-item-progress {\n    display: none;\n  }\n}\n.bootstrap_profile_stacked .spm_profile-status-item.type_active .spm_profile-status-item-image {\n  background-color: #ca5b54;\n  border-color: #ca5b54;\n}\n.bootstrap_profile_stacked .spm_profile-status-item.type_active .spm_profile-status-item-progress:after {\n  content: '';\n  background: #ca5b54;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  display: block;\n}\n.bootstrap_profile_stacked .spm_profile-status-item.type_active.type_filled .spm_profile-status-item-progress:after {\n  width: 100%;\n}\n@media (min-width: 650px) {\n  .bootstrap_profile_stacked .spm_profile-status-item:hover .spm_profile-status-item-tooltip {\n    opacity: 0.5;\n    visibility: visible;\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n.bootstrap_profile_stacked .spm_profile-info-modal .spm_modal-container,\n.bootstrap_profile_stacked .spm_profile-edit-modal .spm_modal-container {\n  padding-left: 0;\n  padding-right: 0;\n}\n.bootstrap_profile_stacked .spm_profile-info-modal-field,\n.bootstrap_profile_stacked .spm_profile-edit-modal-field {\n  position: relative;\n  padding-left: 50px;\n  border-bottom: 1px solid #eeeeee;\n  text-align: left;\n}\n.bootstrap_profile_stacked .spm_profile-info-modal-field-icon,\n.bootstrap_profile_stacked .spm_profile-edit-modal-field-icon {\n  position: absolute;\n  left: 0;\n  width: 24px;\n  height: 24px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n}\n.bootstrap_profile_stacked .spm_profile-info-modal .spm_profile-form,\n.bootstrap_profile_stacked .spm_profile-edit-modal .spm_profile-form {\n  min-width: 400px;\n}\n.bootstrap_profile_stacked .learn_more_modal .spm_modal-container {\n  width: 500px;\n  max-width: 100%;\n}\n.bootstrap_profile_stacked .spm_status-bar {\n  position: relative;\n}\n", ""]);

// exports


/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = {"styles":{"b-list-close:hover":{"box-shadow":"-6px 6px 14px 0 rgba(145, 70, 13, 0.66)"},"spm_profile-points":{"background-color":"rgb(252,46,162)"},"b-next-status":{"position":"relative"},"spm_profile":{"background-image":"url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/91db09a9ee09ff81fadffb1132423541.png)","font-family":"Roboto, sans-serif"},"history_title":{"font-family":"Akrobat, sans-serif"},"points-balance":{"font-size":"50px","font-weight":800,"line-height":"120%","letter-spacing":"2px"},"spm_profile-info-modal-field-label":{"color":"rgb(181,186,194)","font-weight":300},"spm_profile-subheader":{"color":"#fff","margin-top":"10px","font-family":"Akrobat, sans-serif","font-size":"35px"},"b-statuses h5":{"color":"#7e8c8a"},"spm_profile-info-modal-avatar":{"margin-top":"10px"},"spm_profile-info-modal-field":{"padding-left":"95px"},"spm_profile-info-modal-button a":{"letter-spacing":"1px","margin":"0 40px","padding":"15px","width":"100%","font-weight":400,"border":"none","display":"block","background-color":"rgb(252,46,162)"},"b-list-close:before":{"right":0,"bottom":0,"top":0,"transform":"rotate(135deg)","height":"2px","content":"''","width":"18px","background":"white","position":"absolute","margin":"auto","display":"block","left":0},"spm_profile-status-name":{"font-size":"35px"},"b-statuses":{"position":"static"},"spm_profile-login_button":{"font-size":"16px","color":"rgb(252,46,162)","box-shadow":"0 0 6px 0 rgba(0,0,0,0.3)","padding":"15px 70px","font-weight":"bold","background-color":"#fff"},"spm_profile-header":{"font-size":"55px","font-family":"Akrobat, sans-serif"},"spm_profile-info-modal-field-icon":{"left":"40px"},"b-points":{"cursor":"pointer"},"spm_profile-container":{"background-image":"url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/a871188f76c392582c013d2cc875be3d.png)","background-position":"-1199px -544px"},"spm_profile-status":{"background-image":"url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/01dfa00c60cd3a7f81bd5eb8c08af7da.png)","background-repeat":"repeat","background-color":"rgb(233,156,78)"},"spm_profile-info-modal-button":{"margin-top":"40px"},"@media (max-width: 750px) | spm_profile":{"background-position":"30% bottom"},"spm_profile-info-modal-avatar-image":{"border-radius":"50%","width":"130px","display":"inline-block"},"b-current-status > *":{"z-index":2},"spm_profile-info-modal-name":{"display":"none"},"b-avatar-menu__icon":{"background-color":"rgb(252,46,162)"},"b-statuses > *":{"z-index":5},"b-list-close":{"width":"54px","top":"-27px","right":0,"z-index":6,"height":"54px"},"spm_profile-form .spm_form_field_type_radio":{"border-bottom":"1px solid #eee","padding-bottom":"20px"},"b-list-close:after":{"right":0,"bottom":0,"top":0,"transform":"rotate(-135deg)","height":"2px","content":"''","width":"18px","background":"white","position":"absolute","margin":"auto","display":"block","left":0},"spm_profile-description":{"font-weight":"300"},"@media (min-width: 1678px) | spm_profile":{"background-size":"cover","background-position":"center bottom"},"b-next-status:before":{"opacity":0.2,"top":0,"height":"100%","content":"''","width":"2px","background":"#58839a","position":"absolute","left":"13%"},"spm_profile-header, .spm_profile-description, .spm_profile-status-name":{"color":"#fff"},"b-current-status":{"cursor":"pointer","position":"static"},"spm_profile-form .spm_form_field":{"padding-right":"50px","padding-left":"50px"}},"enabled":true,"id":"bootstrap_profile_stacked","texts":{"status":{"description":"Get <span style=\"color:#ca5b54;font-weight: 500;\">{{ (toNext|number)+' '+(toNext|sailplay_pluralize:'point,points,points') }}</span><br> to get gold status","description_final":"","no_status":"No status"},"description":"Here you can spend your points on gifts, look after your statuses and also carry out some extra tasks for extra points.","menu_logout":"Logout","sub_header":"Welcome to","modals":{"profile":{"cancel":"CANCEL","save":"SAVE","edit_button":"EDIT PROFILE","title":"PROFILE"},"history":{"date":"date","action":"action","points":"points","empty":"No actions","title":"HISTORY"}},"learn_more_button_text":"LEARN MORE","login_button_text":"SIGN IN","header":"FRIENDS WITH BENEFITS","menu_my_profile":"My profile","points":{"description":"Complete quests to recieve<br>extra points and statuses","label":"Points"},"learn_more_html":"<strong>How it works</strong><br>• Earn Points by shopping in store and telling others about Excitement with Hookups<br>• Friend referrals (Hookups) get you and your buddies 10% off a purchase when they mention your name at sign up<br>• More ways to earn points coming in the future!<br>• Redeem Points for store credits or our Pleasure Product of the Month (1 smoke, 1 love)<br>• Pssst... Every $200 spent = 2000 points = $20 in store credit or a $30+ gift item!<br>• Don’t wait too long between visits - shop with us often to keep points active!<br>• Level up your FWB Relationship Status to earn even more points and perks<br>• Keep track of your relationship status and refer friends on iloveexcitement.com/FWB-Rewards<br>• Receive special coupons and offers via text and email<br>• While you can opt out anytime if desired, you’ll miss out on the best deals and fun events delivered only via text!<br><br><br><strong>RELATIONSHIP STATUS (aka Tiers)</strong><br><strong>1st Level: Flirt</strong><br>• Intro level, every customer starts here.<br>• $0 to $99.99 spent in 12 mos<br>• 50 points given as bonus for signing up? - Welcome email and text triggered offering coupon for filling out profile online<br>• Birthday coupon (if you give us your bday) $10 off a $20 or more purchase + Double points on your birthday<br>• Receive texts and emails about special sales and events at Excitement<br>• Points expire if no purchases are made within 6 months of when the points were earned. If a purchase is made 1x per 6 mos, points remain.<br>• Points accrue a $1 = 10 points<br><br><strong>2nd Level: Fling</strong><br>• $100+ to $249.99 spent in 12 mos<br>• 100 Bonus Points Earned <br>• Birthday coupon (if you give us your bday) $10 off a $20 or more purchase + Double points on your birthday<br>• Receive texts and emails about special sales and events at Excitement<br>• Points expire if no purchases are made within 6 months of when the points were earned. If a purchase is made 1x per 6 mos, points remain.<br>• Earn 10% more in bonus points for every dollar spent at this level. Points accrue a $1 = 11 points<br><br><strong>3rd Level: Flame</strong><br>• $250+ to $499.99 spent in 12 mos<br>• 200 Bonus Points Earned <br>• Birthday coupon (if you give us your bday) $10 off a $20 or more purchase + Double points on your birthday<br>• Receive texts and emails about special sales and events at Excitement<br>• Points earned at this tier never expire (points earned at previous tiers expire according to tier level)<br>• Earn 20% more in bonus points for every dollar spent at this level. Points accrue a $1 = 12 points<br><br><strong>4th Level: Forever</strong><br>• $500+ spent in 12 mos<br>• 500 Bonus Points Earned<br>• Birthday coupon (if you give us your bday) $10 off a $20 or more purchase + Double points on your birthday<br>• Receive texts and emails about special sales and events at Excitement<br>• Points earned at this tier never expire (points earned at previous tiers expire according to tier level)<br>• Earn 30% more in bonus points for every dollar spent at this level. Points accrue at $1= 13 points<br>","error":"Error","open_history":"History"},"images":{"empty_status":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/1834f62f62f6a5011d447636714ad89d.png","icon_logout":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/4db300a4a8c7fcd8297b10f4d3111db8.svg","icon_close":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/459234d99339b7ea5c10d772f9d62ba0.png","icon_dots":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/721c1d38bb943115c0b16dc5214e76ee.png","icon_profile":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/17a40631c608e73a886d21ce975b0510.svg","close":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/459234d99339b7ea5c10d772f9d62ba0.png"},"options":{"config":{"fields":[{"name":"firstName","required":true,"label":"First name","input":"text","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/4ee7f4b31961c7923f02ffc35f20be26.png"},{"name":"lastName","required":true,"label":"Last name","input":"text","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/d04458f535df45771f7395d9011d4c8e.png"},{"name":"addEmail","required":true,"label":"Email","input":"email","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/2cede30616fe34a5ab8b1bbc974c2982.png"},{"name":"addPhone","placeholder":"+9 (999) 999-99-99","required":true,"label":"Cell Phone","input":"phone","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/acd9b6342c98789a2331c2c7a671a7b5.png"},{"name":"birthDate","required":true,"label":"Birthday","input":"date","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/a46af2f06be991403f1f7f889dcc778d.png"},{"name":"zipcode","placeholder":"999999","required":true,"label":"Zip code","input":"phone","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/6f71aa4115d34789bea2678bc3c5b80b.png"},{"name":"anniversary","required":true,"label":"Date of your anniversary","input":"date","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/5fb1f1ceb6fa4d2ecc7b9153986feba0.png"},{"name":"gender","data":[{"text":"Male","value":"male"},{"text":"Female","value":"female"},{"text":"Transmale","value":"transmale"},{"text":"Transfemale","value":"transfemale"},{"text":"Non-Binary Gender","value":"nonbinary"}],"required":true,"label":"Gender","input":"select","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/88fbea9f5e881a6db7de0e3d30ecba7b.png"},{"name":"LGBTQIA","data":[{"text":"Yes","value":"yes"},{"text":"No","value":"no"}],"required":true,"label":"I am part of the queer or LGBTQIA+ community","input":"radio","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/7825d4007951f8713ab53105acf7304f.png"},{"name":"shop_for","data":[{"text":"Sex Toys and Products","value":"Sex Toys and Products"},{"text":"Lingerie","value":"Lingerie"},{"text":"Smoke Items","value":"Smoke Items"},{"text":"DVDs or Magazines","value":"DVDs or Magazines"}],"required":true,"label":"I shop at Excitement for:","input":"checkbox","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/3b977645504ec7eafff8f2ec4f9047f5.png"},{"name":"locations","data":[{"text":"Camp Hill, PA","value":"Camp Hill, PA"},{"text":"Harrisburg, PA","value":"Harrisburg, PA"},{"text":"Reading, PA","value":"Reading, PA"},{"text":"York, PA","value":"York, PA"},{"text":"Online at iloveexcitement.com","value":"Online at iloveexcitement.com"}],"required":true,"label":"I shop at these Excitement locations","input":"checkbox","type":"variable","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/91d4d2e8ac2055ca9704dcf6d3ed9a0d.png"},{"name":"subscriptions","data":{"email_label":"Opt in for email","sms_label":"Opt in for sms"},"required":false,"label":"","input":"subscriptions","type":"system","icon":"https://sailplays3.cdnvideo.ru/media/assets/assetfile/5fb1f1ceb6fa4d2ecc7b9153986feba0.png"}],"errors":{"email is not valid":"Неправильно указан email","-200010":"Такой email уже используется","phone is not valid":"Неправильно указан телефон","-200007":"Такой телефон уже используется"}}}}

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,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"

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(188);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(189);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_quests",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, tools) {
    return function (scope, elm, attrs) {
      scope.show_success = false;

      scope.custom = {
        selected: false,
        select: function select(action) {

          scope.custom.selected = action;
          console.log(scope.custom.selected);
        }
      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css("", action_data.styles);
      };

      SailPlay.on('actions.perform.success', function (res) {
        scope.$apply(function () {
          scope.show_success = true;
          scope.custom.selected = false;
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_quests container-fluid clearfix\" ng-cloak sailplay-profile>\n\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col\">\n\n        <div class=\"spm_quests-container\">\n\n          <div class=\"spm_quests-container__left\">\n            <div class=\"spm_quests-header\" ng-bind=\"widget.texts.header\"></div>\n            <div class=\"spm_quests-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n          </div>\n\n          <div class=\"spm_quests-container__right spm_quests-list\" sailplay-actions>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions().actions\" ng-mouseenter=\"action.loaded=true\">\n              <i class=\"spm_quests-item-icon\"\n                 ng-style=\"{backgroundImage: (action_data(action).pic|sailplay_pic|background_image)}\"></i>\n              <div class=\"spm_quests-item-content\">\n                <div class=\"spm_quests-item-name\" ng-bind=\"action_data(action).name\"></div>\n                <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                     ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n              </div>\n              <div class=\"spm_quests-item-hover\" ng-if=\"action.type!='fillProfile' && action.loaded\" sailplay-action\n                   styles=\"{{ action_styles(action_data(action)) }}\"\n                   action=\"action\" text=\"{{ action_data(action).button_text }}\">\n                <span ng-bind=\"action_data(action).button_text\"></span>\n              </div>\n              <div ng-if=\"action.type=='fillProfile'\" class=\"spm_quests-item-hover\">\n                <span ng-click=\"$root.$broadcast('profile:state', true)\" ng-bind=\"action_data(action).button_text\"></span>\n              </div>\n            </div>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions_custom()\" ng-mouseenter=\"action.loaded=true\">\n              <i class=\"spm_quests-item-icon\" ng-style=\"{backgroundImage: (action.icon|sailplay_pic|background_image)}\"></i>\n              <div class=\"spm_quests-item-content\">\n                <div class=\"spm_quests-item-name\" ng-bind=\"action.name\"></div>\n                <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                     ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n              </div>\n              <div class=\"spm_quests-item-hover\" data-ng-click=\"custom.select(action)\">\n                {{ action.name }}\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n\n  <magic-modal show=\"$parent.$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body ng-bind-html=\"widget.texts.modals.success.body|to_trusted\"></magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"custom.selected\">\n\n    <magic-modal-title>\n      {{ custom.selected.name }}\n    </magic-modal-title>\n    <magic-modal-body>\n\n      <div data-sailplay-action-custom data-action=\"custom.selected\"></div>\n\n    </magic-modal-body>\n\n\n  </magic-modal>\n\n</div>";

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_quests .spm_quests {\n  position: relative;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    display: block;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-flex-basis: 20%;\n      -ms-flex-preferred-size: 20%;\n          flex-basis: 20%;\n  padding-right: 30px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 40px;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-container__right {\n  -webkit-flex-basis: 80%;\n      -ms-flex-preferred-size: 80%;\n          flex-basis: 80%;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  width: 100%;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-list {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  position: relative;\n  width: 100%;\n  max-width: 280px;\n  height: 130px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 8px;\n  margin: 1%;\n  overflow: hidden;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  border: 1px solid #b4bac2;\n}\n@media (max-width: 1150px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-item {\n    width: 31.2%;\n  }\n}\n@media (max-width: 768px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-item {\n    margin: 10px 5%;\n    width: 90%;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    padding: 20px;\n    height: auto;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-hover {\n  display: none;\n  opacity: 0;\n  background: #ca5b54;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #ffffff;\n  font-family: Arial;\n  letter-spacing: 1.6px;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-hover iframe {\n  width: 100% !important;\n  height: 100% !important;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-hover > * {\n  cursor: pointer;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-icon {\n  width: 75px;\n  height: 75px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-content {\n  margin-left: 15px;\n  -webkit-flex-basis: 65%;\n      -ms-flex-preferred-size: 65%;\n          flex-basis: 65%;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-item-content {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-left: 0;\n    margin-top: 15px;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-name {\n  font-size: 14px;\n  line-height: 24px;\n  color: #222c3b;\n  letter-spacing: 1.6px;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item-points {\n  margin-top: 10px;\n  font-size: 14px;\n  line-height: 24px;\n  color: #222c3b;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .bootstrap_quests .spm_quests-item {\n    margin: 10px 5px;\n  }\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item:hover {\n  border-color: #ca5b54;\n}\n.spm_wrapper .bootstrap_quests .spm_quests-item:hover .spm_quests-item-hover {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bootstrap_quests .spm_quests:hover .spm_quests-item-hover {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(192);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(193);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_quests_center",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, tools) {
    return function (scope, elm, attrs) {
      scope.show_success = false;

      scope.custom = {
        selected: false,
        select: function select(action) {
          scope.custom.selected = action;
        }
      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css("", action_data.styles);
      };

      SailPlay.on('actions.perform.success', function (res) {
        scope.$apply(function () {
          scope.show_success = true;
          scope.custom.selected = false;
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_quests container-fluid clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col\">\n\n        <div class=\"spm_quests-container\">\n\n          <div class=\"spm_quests-header\" ng-show=\"widget.texts.header\" ng-bind=\"widget.texts.header\"></div>\n          <div class=\"spm_quests-sub-header\" ng-show=\"widget.texts.sub_header\" ng-bind=\"widget.texts.sub_header\"></div>\n\n          <div class=\"spm_quests-list\" sailplay-actions>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions().actions\" ng-mouseenter=\"action.loaded=true\">\n              <i class=\"spm_quests-item-icon\"\n                 ng-style=\"{backgroundImage: (action_data(action).pic|sailplay_pic|background_image)}\"></i>\n              <div class=\"spm_quests-item-content\">\n                <div class=\"spm_quests-item-name\" ng-bind=\"action_data(action).name\"></div>\n                <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                     ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n              </div>\n              <div class=\"spm_quests-item-hover\" ng-if=\"action.type!='fillProfile' && action.loaded\" sailplay-action\n                   styles=\"{{ action_styles(action_data(action)) }}\"\n                   action=\"action\" text=\"{{ action_data(action).button_text }}\">\n                <span ng-bind=\"action_data(action).button_text\"></span>\n              </div>\n              <div ng-if=\"action.type=='fillProfile'\" class=\"spm_quests-item-hover\">\n                <span ng-click=\"$root.$broadcast('profile:state', true)\" ng-bind=\"action_data(action).button_text\"></span>\n              </div>\n            </div>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions_custom()\" ng-mouseenter=\"action.loaded=true\">\n              <i class=\"spm_quests-item-icon\" ng-style=\"{backgroundImage: (action.icon|sailplay_pic|background_image)}\"></i>\n              <div class=\"spm_quests-item-content\">\n                <div class=\"spm_quests-item-name\" ng-bind=\"action.name\"></div>\n                <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                     ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n              </div>\n              <div class=\"spm_quests-item-hover\" data-ng-click=\"custom.select(action)\">\n                {{ action.name }}\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n\n  <magic-modal show=\"$parent.$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body ng-bind-html=\"widget.texts.modals.success.body|to_trusted\"></magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"custom.selected\">\n\n    <magic-modal-title>\n      {{ custom.selected.name }}\n    </magic-modal-title>\n    <magic-modal-body>\n\n      <div data-sailplay-action-custom data-action=\"custom.selected\"></div>\n\n    </magic-modal-body>\n\n\n  </magic-modal>\n\n</div>";

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(194);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_quests_center .spm_quests {\n  position: relative;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  width: 100%;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_quests_center .spm_quests-list {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  position: relative;\n  width: 100%;\n  max-width: 280px;\n  height: 130px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 8px;\n  margin: 1%;\n  overflow: hidden;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  border: 1px solid #b4bac2;\n}\n@media (max-width: 1150px) {\n  .spm_wrapper .bootstrap_quests_center .spm_quests-item {\n    width: 31.2%;\n  }\n}\n@media (max-width: 768px) {\n  .spm_wrapper .bootstrap_quests_center .spm_quests-item {\n    margin: 10px 5%;\n    width: 90%;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    padding: 20px;\n    height: auto;\n  }\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-hover {\n  display: none;\n  opacity: 0;\n  background: #ca5b54;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #ffffff;\n  font-family: Arial;\n  letter-spacing: 1.6px;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-hover iframe {\n  width: 100% !important;\n  height: 100% !important;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-hover > * {\n  cursor: pointer;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-icon {\n  width: 75px;\n  height: 75px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-content {\n  margin-left: 15px;\n  -webkit-flex-basis: 65%;\n      -ms-flex-preferred-size: 65%;\n          flex-basis: 65%;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_quests_center .spm_quests-item-content {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-left: 0;\n    margin-top: 15px;\n    text-align: center;\n  }\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-name {\n  font-size: 14px;\n  line-height: 24px;\n  color: #222c3b;\n  letter-spacing: 1.6px;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item-points {\n  margin-top: 10px;\n  font-size: 14px;\n  line-height: 24px;\n  color: #222c3b;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .bootstrap_quests_center .spm_quests-item {\n    margin: 10px 5px;\n  }\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item:hover {\n  border-color: #ca5b54;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests-item:hover .spm_quests-item-hover {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bootstrap_quests_center .spm_quests:hover .spm_quests-item-hover {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(196);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(197);

var _defaults = __webpack_require__(199);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_quests_right",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "tools"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, tools) {
    return function (scope, elm, attrs) {
      scope.show_success = false;

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css("", action_data.styles);
      };

      SailPlay.on('actions.perform.success', function (res) {
        scope.$apply(function () {
          scope.show_success = true;
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_quests clearfix container-fluid\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n  <div class=\"spm_quests-container row\">\n\n    <div class=\"spm_quests-container__left col-lg-4 col-md-12 col-sm-12 col-xs-12 order-lg-1 order-md-0 order-sm-0 order-xs-0\">\n      <div class=\"spm_quests-header\" ng-bind=\"widget.texts.header\"></div>\n      <div class=\"spm_quests-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n    </div>\n\n    <div class=\"spm_quests-container__right spm_quests-list col-lg-8 col-md-12 col-sm-12 order-lg-0 order-md-1 order-sm-1 order-xs-1\" sailplay-actions>\n\n      <div class=\"row spm_quests-list-inner\">\n\n        <div ng-repeat=\"action in actions().actions\" class=\"col-xl-4 col-lg-6 col-md-6 col-sm-12\" >\n          <div class=\"spm_quests-item\" ng-mouseenter=\"action.loaded=true\">\n            <i class=\"spm_quests-item-icon\"\n               ng-style=\"{backgroundImage: (action_data(action).pic|sailplay_pic|background_image)}\"></i>\n            <div class=\"spm_quests-item-content\">\n              <div class=\"spm_quests-item-name\" ng-bind=\"action_data(action).name\"></div>\n              <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                   ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n            </div>\n            <div class=\"spm_quests-item-hover\" ng-if=\"action.type!='fillProfile' && (widget.options.preload_quests || action.loaded)\" sailplay-action\n                 styles=\"{{ action_styles(action_data(action)) }}\"\n                 action=\"action\" text=\"{{ action_data(action).button_text }}\">\n              <span ng-bind=\"action_data(action).button_text\"></span>\n            </div>\n            <div ng-if=\"action.type=='fillProfile'\" class=\"spm_quests-item-hover\">\n              <span ng-click=\"$root.$broadcast('profile:state', true)\" ng-bind=\"action_data(action).button_text\"></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-xl-4 col-lg-6 col-md-6 col-sm-12\" ng-repeat=\"action in actions_custom()\">\n          <div class=\"spm_quests-item\" ng-mouseenter=\"action.loaded=true\">\n            <i class=\"spm_quests-item-icon\" ng-style=\"{backgroundImage: (action.icon|sailplay_pic|background_image)}\"></i>\n            <div class=\"spm_quests-item-content\">\n              <div class=\"spm_quests-item-name\" ng-bind=\"action.name\"></div>\n              <div class=\"spm_quests-item-points\" ng-show=\"action.points\"\n                   ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n            </div>\n            <div class=\"spm_quests-item-hover\" sailplay-action-custom action=\"action\"></div>\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <magic-modal show=\"$parent.$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body ng-bind-html=\"widget.texts.modals.success.body|to_trusted\"></magic-modal-body>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(198);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bootstrap_quests_right {\n  position: relative;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-container {\n  width: 100%;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0 auto;\n  padding: 50px 30px;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-sub-header {\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .bootstrap_quests_right .spm_quests-list {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-list-inner {\n  width: 100%;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  position: relative;\n  height: 130px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 8px;\n  margin: 10px;\n  overflow: hidden;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  border: 1px solid #b4bac2;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-hover {\n  display: none;\n  opacity: 0;\n  background: #ca5b54;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #ffffff;\n  font-family: Arial;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-hover iframe {\n  width: 100% !important;\n  height: 100% !important;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-hover > * {\n  cursor: pointer;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-icon {\n  width: 75px;\n  height: 75px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-content {\n  margin-left: 15px;\n  -webkit-flex-basis: 65%;\n      -ms-flex-preferred-size: 65%;\n          flex-basis: 65%;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .bootstrap_quests_right .spm_quests-item-content {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-left: 0;\n    margin-top: 15px;\n  }\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-name {\n  font-size: 16px;\n  line-height: 24px;\n  color: #222c3b;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item-points {\n  margin-top: 10px;\n  font-size: 16px;\n  line-height: 24px;\n  color: #222c3b;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .bootstrap_quests_right .spm_quests-item {\n    margin: 25px 5px;\n  }\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item:hover {\n  border-color: #ca5b54;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests-item:hover .spm_quests-item-hover {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bootstrap_quests_right .spm_quests:hover .spm_quests-item-hover {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = {"styles":{"spm_quests-sub-header":{"color":"#fff","font-weight":300,"font-family":"Roboto, sans-serif"},"@media (max-width: 786px) | spm_quests-container__left":{"text-align":"center","padding-right":"10px","padding-left":"10px"},"spm_quests-item-name":{"color":"rgb(156,156,157)","font-weight":100},"spm_quests-header":{"color":"#fff","font-size":"45px","font-family":"Akrobat, Roboto, sans-serif"},"spm_quests-container__left":{"padding-right":"50px","padding-left":"50px"},"spm_quests":{"background-image":"url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/77cd041c4a8e07e7c9400aa79a209046.png)","background-size":"cover","background-position":"top center","background-color":"rgb(35,38,45)"},"spm_quests-item":{"border-radius":0,"margin":"0 0 30px 0","border":"none","background-color":"rgb(56,56,58)"},"spm_quests-item-points":{"color":"#fff","font-size":"16px","text-transform":"uppercase"},"spm_quests-item-icon":{"background-size":"auto 50px"},"spm_quests-item-hover":{"background-color":"rgb(252,46,162)"}},"enabled":true,"id":"bootstrap_quests_right","texts":{"sub_header":"Complete quests to recieve extra points and statuses","header":"Quests","modals":{"success":{"body":"You have completed quest","title":"Congratulations"}}},"images":{},"options":{"preload_quests":true}}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(201);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(202);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "bootstrap_status_bar",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG", '$interpolate'],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG, $interpolate) {
    return function (scope, elm, attrs) {

      scope.show_list = false;
      scope.currentStatus = null;
      scope.nextStatus = null;
      scope.list = scope.widget.options.list;
      scope.toNext = 0;

      scope.statusText = function (text) {
        return $interpolate(text)(scope);
      };

      SailPlayApi.observe('load.user.info', function (user) {
        if (!user) return;
        var user_points = user.user_points.confirmed;
        scope.currentStatus = scope.list.filter(function (status) {
          return status.points <= user_points;
        }).pop();
        scope.nextStatus = scope.list.filter(function (status) {
          return status.points > user_points;
        }).shift();
        scope.toNext = scope.nextStatus ? scope.nextStatus.points - user_points : null;
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_status-bar container-fluid status-bar clearfix\" ng-cloak sailplay-profile ng-class=\"{type_list: show_list}\">\n\n    <div ng-show=\"!show_list && user()\" class=\"container py-5\">\n        <div class=\"row align-items-top\">\n\n            <div class=\"b-points col-12 col-md-6 col-lg-4 d-flex align-items-center spm_status-bar-points\" ng-click=\"$root.$broadcast('history:state', true)\">\n                <div class=\"w-75\">\n                    <h4 class=\"font-akrobat font-weight-bold text-uppercase mb-0\" ng-bind=\"widget.texts.points.label\"></h4>\n                    <div class=\"mt-3 font-weight-light\" ng-bind-html=\"widget.texts.points.description|to_trusted\"></div>\n                </div>\n                <div class=\"display-1 points-balance mr-auto font-akrobat font-weight-bold text-uppercase\" ng-bind=\"user().user_points.confirmed|number\"></div>\n            </div>\n\n            <div class=\"b-next-status my-5 my-md-0 col-12 col-md-6 col-lg-4 d-flex flex-column align-items-left spm_status-bar-next-status\">\n                <h4 class=\"font-akrobat font-weight-bold text-uppercase mb-0\" ng-bind=\"widget.texts.status.label\"></h4>\n                <div class=\"mt-3 font-weight-light\" ng-bind-html=\"statusText(toNext ? widget.texts.status.description : widget.texts.status.description_final)|to_trusted\"></div>\n            </div>\n\n            <div class=\"b-current-status col-12 mt-5 pt-md-5 col-md-12 mt-lg-0 pt-lg-0 col-lg-4 d-flex flex-column align-items-center text-center spm_status-bar-current-status\" ng-click=\"show_list=true\">\n                <i ng-style=\"currentStatus.style\"></i>\n                <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0\" ng-bind=\"currentStatus.name\"></h2>\n                <div class=\"mt-1 font-weight-light\" ng-bind-html=\"currentStatus.description|to_trusted\"></div>\n            </div>\n\n        </div>\n    </div>\n\n    <div ng-show=\"show_list\" class=\"container py-0 py-lg-5 position-relative\">\n        <div class=\"b-list-close rounded-circle d-flex bg-primary cursor-pointer align-items-center position-absolute\"\n             ng-click=\"show_list=false\"></div>\n        <div class=\"row align-items-center justify-content-center\">\n            <div class=\"b-statuses col-md-12 my-5 my-lg-0 col-lg-4 d-flex flex-column align-items-center text-center\" ng-repeat=\"status in list track by $index\">\n                <i ng-style=\"status.style\"></i>\n                <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0\" ng-bind=\"status.name\"></h2>\n                <h5 class=\"my-2\" ng-bind=\"(status.points|number)+' '+(status.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></h5>\n                <div class=\"font-weight-light\" ng-bind-html=\"status.description|to_trusted\"></div>\n            </div>\n        </div>\n    </div>\n\n</div>";

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(203);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_status-bar {\n  position: relative;\n}\n", ""]);

// exports


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _actions = __webpack_require__(205);

var _actions2 = _interopRequireDefault(_actions);

__webpack_require__(206);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({

  id: 'actions',
  template: _actions2.default,
  inject: ['tools', 'SailPlayApi', 'SailPlay', '$rootScope'],
  controller: function controller(tools, SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.action_select = function (action) {

        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', { widget: 'actions', action: 'action_select' });

        scope.action_selected = action || false;
      };

      scope.open_profile = function () {
        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', { widget: 'actions', action: 'open_profile' });
        $rootScope.$broadcast('openProfile');
      };

      SailPlay.on('actions.perform.success', function () {
        scope.$apply(function () {
          scope.action_selected = false;
        });
      });

      scope.action_custom_select = function (action) {

        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', { widget: 'actions', action: 'action_custom_select' });
        scope.action_custom_selected = action || false;
      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };
    };
  }

});

/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = "<div class=\"{{ widget.id }} clearfix\">\n\n  <div id=\"magic_actions\" class=\"more_bonus container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-actions class=\"clearfix\">\n\n      <div class=\"more_bonus_main\">\n\n        <div class=\"spm_row clearfix\">\n\n          <div class=\"spm_col\" data-ng-repeat=\"action in actions().actions\">\n            <div class=\"mb_item action\" data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"action_data(action).name\"></span>\n                <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-if=\"action_data(action).just_open_profile\" data-ng-click=\"open_profile()\">{{ action_data(action).button_text }}</a>                \n                <a class=\"sp_btn button_primary\" data-ng-if=\"!action_data(action).just_open_profile\" data-ng-click=\"action_select(action)\">{{ action_data(action).button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ action_data(action).pic | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n          <div class=\"spm_col\" data-ng-repeat=\"action in actions_custom()\">\n            <div class=\"mb_item action\" data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"action.name\"></span>\n                <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-click=\"action_custom_select(action)\">{{ action.button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ action.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n          <div class=\"spm_col\" data-ng-repeat=\"quiz in $parent.quiz_list\" data-ng-if=\"quiz_list && quiz_list.length && ((!exist || !exist()) || !checkTag(quiz.tag, exist()))\" >\n            <div class=\"mb_item action\"data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"quiz.name\"></span>\n                <span class=\"action_points\" data-ng-show=\"quiz.points\" data-ng-bind=\"((quiz.points || 0) | number) + ' ' + (quiz.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-click=\"$event.preventDefault();open_quiz(quiz)\">{{ quiz.button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ quiz.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <magic-modal class=\"actions_selected_modal\" data-ng-cloak data-show=\"$parent.action_selected\">\n\n        <div>\n\n          <div class=\"action_image\">\n            <img class=\"gift_more_img\" data-ng-src=\"{{ action_data(action_selected).pic | sailplay_pic }}\"\n                 alt=\"{{ action_data(action_selected).name }}\">\n          </div>\n\n          <div class=\"action_tools\">\n\n            <p>\n              <span class=\"modal_action_name\" data-ng-bind=\"action_data(action_selected).name\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_description\" data-ng-bind=\"action_data(action_selected).description\"></span>\n            </p>\n\n\n            <p class=\"action_buttons\">\n            <span data-sailplay-action\n                  data-styles=\"{{ action_styles(action_data(action_selected)) }}\"\n                  data-action=\"action_selected\"\n                  data-text=\"{{ action_data(action_selected).button_text }}\">\n              <span class=\"sp_btn button_primary\">{{ action_data(action_selected).button_text }}</span>\n            </span>\n            </p>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.action_custom_selected\">\n\n        <div data-sailplay-action-custom data-action=\"action_custom_selected\"></div>\n\n      </magic-modal>\n\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.quiz.show\">\n\n        <div class=\"quiz_main\">\n\n          <div class=\"quiz_block\" data-ng-if=\"$parent.quiz.data\">\n\n            <div class=\"quiz_block__title\" data-ng-bind=\"$parent.quiz.data.name\"></div>\n\n            <div class=\"quiz_block__counter\" data-ng-bind=\"$parent.quiz.step + ' / ' + $parent.quiz.data.data.length\"></div>\n\n            <div class=\"quiz_block__name\" data-ng-bind=\"getCurrentTest().name\"></div>\n\n            <label data-ng-repeat=\"question in getCurrentTest().answers\"\n                   data-ng-switch=\"getCurrentTest().type\"\n                   data-ng-click=\"$event.preventDefault();change(question, getCurrentTest());\">\n\n              <input data-ng-switch-when=\"many\" type=\"checkbox\"\n                     name=\"quiz_[[ $index ]]\"\n                     data-ng-checked=\"check(question)\">\n\n              <input data-ng-switch-when=\"one\" type=\"radio\"\n                     name=\"quiz\"\n                     data-ng-checked=\"check(question)\">\n\n              <span data-ng-bind=\"question.text\"></span>\n\n            </label>\n\n            <textarea name=\"variable\" data-ng-show=\"needToShowVariable()\"\n                      data-ng-model=\"models.variable\"></textarea>\n\n            <div class=\"button_wrapper clearfix\">\n\n                <span data-ng-click=\"prev();\" class=\"quiz_block__btn prev\"\n                      data-ng-class=\"{type_disabled: $parent.quiz.step == 1}\">Prev</span>\n\n              <span data-ng-click=\"next();\" class=\"quiz_block__btn next\"\n                    data-ng-class=\"{type_disabled: !canPressNext() }\"\n                    data-ng-bind=\"step == $parent.quiz.data.data.length ? 'Finish' : 'Next' \">next</span>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(207);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./actions.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./actions.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .more_bonus {\n  float: left;\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .more_bonus .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n}\n.spm_wrapper .more_bonus .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .more_bonus .more_bonus_main {\n  margin: 40px 0 0 0;\n  float: left;\n}\n.spm_wrapper .more_bonus .more_bonus_main .spm_col {\n  width: 33.3%;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item {\n  background-color: #eeeeee;\n  height: 175px;\n  margin-bottom: 30px;\n  position: relative;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item.act {\n  margin-bottom: 0px;\n  height: 155px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover span {\n  opacity: 0;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover .mb_item_left a {\n  opacity: 1;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left {\n  float: left;\n  width: 64%;\n  position: relative;\n  height: 100%;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span {\n  float: left;\n  margin-left: 15%;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  width: 70%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  max-height: 80px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(1) {\n  color: #222222;\n  font-size: 16px;\n  line-height: 22px;\n  margin-top: 29px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(2) {\n  color: #444444;\n  margin-top: 9px;\n  margin-right: 30px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  font-family: Arial;\n  top: 50%;\n  margin-top: -18px;\n  left: 50%;\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  height: 35px;\n  font-weight: 500;\n  margin-left: -70px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a.without_bg {\n  background: none;\n  border: none;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right {\n  float: right;\n  width: 36%;\n  height: 100%;\n  background-color: #E6E2DD;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right img {\n  margin-top: 38px;\n  display: inline-block;\n  max-width: 90%;\n  max-height: 70px;\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 50%;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 50%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 100%;\n    position: relative;\n    margin-right: 0px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item {\n    height: auto;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col.act {\n    margin-bottom: 0px;\n    height: 250px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_left {\n    float: right;\n    margin-top: 100px;\n    height: 140px;\n    width: 100%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_left span {\n    width: 90%;\n    text-align: center;\n    margin-left: 5%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_right {\n    float: left;\n    width: 100%;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    height: 100px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_right img {\n    margin-top: 23px;\n  }\n}\n.spm_wrapper .actions_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .actions_selected_modal .action_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n  max-height: 170px;\n}\n.spm_wrapper .actions_selected_modal .action_image img {\n  width: 100%;\n}\n.spm_wrapper .actions_selected_modal .action_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 69%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .actions_selected_modal [data-sailplay-action] {\n  position: relative;\n  width: 100%;\n  height: 36px;\n  display: inline-block;\n}\n.spm_wrapper .actions_selected_modal .sailplay_action_frame {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 140px !important;\n  height: 100% !important;\n  overflow: visible !important;\n  border: none !important;\n}\n.spm_wrapper .actions_selected_modal .action_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .actions_custom_selected_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 400px;\n}\n.spm_wrapper .actions_custom_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_block {\n  width: 100%;\n  -webkit-border-radius: 10px;\n          border-radius: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.spm_wrapper .quiz_block .button_wrapper {\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__title {\n  width: 100%;\n  color: #57baad;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n}\n.spm_wrapper .quiz_block label {\n  display: block;\n  width: 100%;\n  font-size: 14px;\n  margin: 10px 0;\n  white-space: nowrap;\n}\n.spm_wrapper .quiz_block label input {\n  display: inline-block;\n  height: 14px;\n  width: 14px;\n  line-height: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .quiz_block label span {\n  white-space: normal;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 18px;\n}\n.spm_wrapper .quiz_block__counter {\n  width: 100%;\n  display: block;\n  margin: 5px 0;\n  text-align: center;\n  font-weight: bold;\n  font-size: 18px;\n  color: #57baad;\n}\n.spm_wrapper .quiz_block__name {\n  width: 100%;\n  display: block;\n  margin: 20px 0;\n  text-align: left;\n  font-size: 18px;\n}\n.spm_wrapper .quiz_block textarea {\n  width: 100%;\n  min-height: 150px;\n  padding: 10px;\n  resize: none;\n  -webkit-border-radius: 10px;\n          border-radius: 10px;\n  font-size: 18px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border: 1px solid grey;\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__btn {\n  width: 200px;\n  line-height: 40px;\n  text-align: center;\n  color: #ffffff;\n  background-color: #f8b01c;\n  text-decoration: none;\n  font-size: 14px;\n  -webkit-border-radius: 10px;\n          border-radius: 10px;\n}\n.spm_wrapper .quiz_block__btn.next {\n  float: right;\n}\n.spm_wrapper .quiz_block__btn.prev {\n  float: left;\n}\n.spm_wrapper .quiz_block__btn.type_disabled {\n  cursor: default;\n  background-color: grey;\n}\n", ""]);

// exports


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _badges = __webpack_require__(209);

var _badges2 = _interopRequireDefault(_badges);

var _badgesBadge = __webpack_require__(210);

var _badgesBadge2 = _interopRequireDefault(_badgesBadge);

var _badgesLine = __webpack_require__(211);

var _badgesLine2 = _interopRequireDefault(_badgesLine);

__webpack_require__(212);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'badges',
  template: _badges2.default,
  controller: function controller() {
    return function (scope, elm, attrs) {};
  }
});

_widget.Widget.directive('sailplayMagicBadge', ["MAGIC_CONFIG", "tools", function (MAGIC_CONFIG, tools) {

  return {

    restrict: "E",
    replace: true,
    scope: {
      badge: '='
    },
    template: _badgesBadge2.default,
    link: function link(scope, elm, attrs) {

      scope._tools = MAGIC_CONFIG.tools;

      scope.on_click = function () {
        attrs.onClick && scope.$eval(attrs.onClick, scope.$parent);
      };
    }

  };
}]);

_widget.Widget.directive('sailplayMagicBadgeLine', ["MAGIC_CONFIG", "SailPlayShare", "$window", function (MAGIC_CONFIG, SailPlayShare, $window) {

  return {

    restrict: "E",
    replace: true,
    scope: {
      line: '=',
      _config: '=config'
    },
    template: _badgesLine2.default,
    link: function link(scope, elm, attrs) {

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
}]);

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container clearfix\">\n\n  <div class=\"\">\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n  </div>\n\n\n  <div data-sailplay-badges class=\"badge_lines_container clearfix\">\n\n    <sailplay-magic-badge-line class=\"multi_level\" data-ng-repeat=\"line in sailplay.badges.list().multilevel_badges\" data-line=\"line\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n    <sailplay-magic-badge-line class=\"one_level\" data-line=\"sailplay.badges.list().one_level_badges\" data-type=\"one_level\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n  </div>\n\n\n</div>";

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = "<div class=\"badge\">\n  <div class=\"badge_iner\" data-ng-click=\"on_click(badge)\">\n    <div class=\"badge_pic\">\n      <img data-ng-src=\"{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}\" alt=\"{{ badge.name }}\">\n    </div>\n    <span class=\"badge_name\" data-ng-bind=\"badge.name\"></span>\n    <!--<span class=\"bon_tem_info badge_points\" data-ng-bind=\"(badge.points | number) + ' ' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n  </div>\n  <div class=\"badge_arrow\">\n\n  </div>\n</div>";

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_item_main clearfix\" data-ng-show=\"line.length\">\n\n    <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n      <div class=\"bon_slide_cat_item\">\n\n        <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n          <sailplay-magic-badge data-magic-slide data-badge=\"badge\" data-on-click=\"badge_select(badge);\" data-ng-repeat=\"badge in line\" data-ng-class=\"{ last: $last }\"></sailplay-magic-badge>\n\n        </div>\n\n      </div>\n\n      <!--<a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>-->\n      <!--<a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>-->\n\n    </div>\n\n  </div>\n\n  <magic-modal class=\"modal_badge_selected\" data-ng-cloak data-show=\"badge_selected\">\n\n    <div>\n\n      <div class=\"modal_badge_image\">\n        <img class=\"gift_more_img\" data-ng-src=\"{{ badge_selected.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ badge_selected.name }}\">\n      </div>\n\n      <div class=\"modal_badge_tools\">\n\n        <p>\n          <span class=\"modal_badge_name\" data-ng-bind=\"badge_selected.name\"></span>\n        </p>\n\n        <!--<p style=\"margin-top: 10px;\">-->\n          <!--<span class=\"modal_badge_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n        <!--</p>-->\n\n        <p style=\"margin-top: 10px;\">\n          <span class=\"modal_badge_description\" data-ng-bind=\"badge_selected.descr\"></span>\n        </p>\n\n        <p class=\"modal_badge_buttons\">\n          <span class=\"badge_share_button fb_icon\" data-ng-click=\"badge_share('fb', badge_selected)\">\n            {{ _config.texts.share_fb }}\n          </span>\n          <span class=\"badge_share_button tw_icon\" style=\"margin-right: 20px;\" data-ng-click=\"badge_share('tw', badge_selected)\">\n            {{ _config.texts.share_tw }}\n          </span>\n          <span class=\"sp_btn button_primary\" data-ng-click=\"badge_select(false);\">{{ _tools.buttons.texts.close }}</span>\n        </p>\n\n      </div>\n\n    </div>\n\n  </magic-modal>\n\n</div>";

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(213);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./badges.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./badges.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_tools_widget.badges {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .container {\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC', 'Roboto', sans-serif;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap {\n  float: left;\n  width: 100%;\n  margin-top: 30px;\n  margin-bottom: 30px;\n  position: relative;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 20px 0px 0px 20px;\n          border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 0px 20px 20px 0px;\n          border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  -webkit-transition: .3s ease;\n  -o-transition: .3s ease;\n  transition: .3s ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge_lines_container {\n  margin: 30px auto;\n  float: left;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.badges .one_level .badge_arrow {\n  display: none;\n}\n.spm_wrapper .spm_tools_widget.badges .badge {\n  position: relative;\n  width: 150px;\n  height: 190px;\n  border: 1px solid #cccccc;\n  margin-left: 30px;\n  margin-right: 30px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner span {\n  white-space: normal;\n  float: left;\n  color: #222222;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_name {\n  font-size: 16px;\n  width: 100%;\n  text-align: center;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_pic {\n  width: 100%;\n  max-height: 150px;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_pic img {\n  width: 100%;\n  height: auto;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  -webkit-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_arrow {\n  position: absolute;\n  left: 100%;\n  top: 65px;\n  width: 60px;\n  height: 20px;\n  background-position: center left;\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n.spm_wrapper .spm_tools_widget.badges .badge.last .badge_arrow {\n  display: none;\n}\n.spm_wrapper .modal_badge_selected .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image img {\n  width: 100%;\n  vertical-align: top;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 70%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button {\n  vertical-align: middle;\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background-position: center;\n  -webkit-background-size: 20px 20px;\n          background-size: 20px 20px;\n  background-repeat: no-repeat;\n  cursor: pointer;\n  margin-right: 10px;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  background-color: #cccccc;\n  -webkit-border-radius: 20px;\n          border-radius: 20px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button:hover {\n  background-color: #888888;\n}\n", ""]);

// exports


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _banner = __webpack_require__(215);

var _banner2 = _interopRequireDefault(_banner);

__webpack_require__(216);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'banner',
  template: _banner2.default,
  controller: function controller() {
    return function () {};
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_choice_main container block_images\" data-ng-cloak>\n    <img class=\"block_images__item\" data-ng-repeat=\"(key, value) in widget.images\" data-ng-src=\"{{ value }}\" alt=\"{{ key }}\">\n  </div>\n</div>\n";

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(217);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./banner.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./banner.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .block_images {\n  width: 100%;\n}\n.spm_wrapper .block_images__item {\n  max-width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _cardQuests = __webpack_require__(219);

var _cardQuests2 = _interopRequireDefault(_cardQuests);

__webpack_require__(220);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({

  id: 'card-quests',
  template: _cardQuests2.default,
  inject: ['tools', 'SailPlayApi', 'SailPlay'],
  controller: function controller(tools, SailPlayApi, SailPlay) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.filter = scope.widget.options && scope.widget.options.filter || {};

      scope.action_select = function (action) {

        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', { widget: 'card-quests', action: 'action_select' });

        scope.action_selected = action || false;
      };

      SailPlay.on('actions.perform.success', function () {
        scope.$apply(function () {
          scope.action_selected = false;
        });
      });

      scope.action_custom_select = function (action) {

        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote', { widget: 'card-quests', action: 'action_custom_select' });
        scope.action_custom_selected = action || false;
      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };
    };
  }

});

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container clearfix\" id=\"magic_actions\">\n\n  <div class=\"card_quests\">\n\n    <h3 class=\"card_quests_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n\n    <h4 class=\"card_quests_caption\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-actions class=\"card_quests_list clearfix\">\n\n      <div class=\"spm_row clearfix\">\n\n          <div class=\"spm_col quest_card_container\" data-ng-repeat=\"action in actions().actions | filter:filter\">\n\n            <div class=\"quest_card\" title=\"{{ action_data(action).name }}\">\n\n              <div class=\"quest_card_image\">\n                <img data-ng-src=\"{{ action_data(action).pic | sailplay_pic }}\" alt=\"\">\n              </div>\n\n              <div class=\"quest_card_tools\">\n\n                <div class=\"quest_card_info\">\n                  <span class=\"quest_card_name ellipsis\" data-ng-bind=\"action_data(action).name\"></span>\n                  <span class=\"quest_card_points ellipsis\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                </div>\n\n                <div class=\"quest_card_buttons\">\n                  <a class=\"button_primary\" data-ng-click=\"action_select(action)\">{{ action_data(action).button_text }}</a>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n          <div class=\"spm_col quest_card_container\" data-ng-repeat=\"action in actions_custom() | filter:filter\">\n\n            <div class=\"quest_card\" title=\"{{ action.name }}\">\n\n              <div class=\"quest_card_image\">\n                <img data-ng-src=\"{{ action.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n\n              <div class=\"quest_card_tools\">\n\n                <div class=\"quest_card_info\">\n                  <span class=\"quest_card_name ellipsis\" data-ng-bind=\"action.name\"></span>\n                  <span class=\"quest_card_points ellipsis\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                </div>\n\n                <div class=\"quest_card_buttons\">\n                  <a class=\"button_primary\" data-ng-click=\"action_custom_select(action)\">{{ action.button_text }}</a>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n\n      <magic-modal class=\"actions_selected_modal\" data-ng-cloak data-show=\"$parent.action_selected\">\n\n        <div>\n\n          <div class=\"action_image\">\n            <img class=\"gift_more_img\" data-ng-src=\"{{ action_data(action_selected).pic | sailplay_pic }}\"\n                 alt=\"{{ action_data(action_selected).name }}\">\n          </div>\n\n          <div class=\"action_tools\">\n\n            <p>\n              <span class=\"modal_action_name\" data-ng-bind=\"action_data(action_selected).name\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_description\" data-ng-bind=\"action_data(action_selected).description\"></span>\n            </p>\n\n\n            <p class=\"action_buttons\">\n            <span data-sailplay-action\n                  data-styles=\"{{ action_styles(action_data(action_selected)) }}\"\n                  data-action=\"action_selected\"\n                  data-text=\"{{ action_data(action_selected).button_text }}\">\n              <span class=\"sp_btn button_primary\">{{ action_data(action_selected).button_text }}</span>\n            </span>\n            </p>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.action_custom_selected\">\n\n        <div data-sailplay-action-custom data-action=\"action_custom_selected\"></div>\n\n      </magic-modal>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(221);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./card-quests.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./card-quests.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .card_quests {\n  width: 90%;\n  margin: 40px 5%;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .card_quests .card_quests_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 20px;\n}\n.spm_wrapper .card_quests .card_quests_caption {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 20px;\n}\n.spm_wrapper .card_quests .card_quests_list {\n  margin: 20px 0 20px 0;\n}\n.spm_wrapper .card_quests .quest_card_container {\n  width: 25%;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .card_quests .quest_card_container {\n    width: 50%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .card_quests .quest_card_container {\n    width: 100%;\n  }\n}\n.spm_wrapper .card_quests .quest_card .quest_card_image {\n  background-color: #888888;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_image img {\n  width: 100%;\n  display: block;\n  vertical-align: top;\n}\n.spm_wrapper .card_quests .quest_card:hover .quest_card_tools .quest_card_info {\n  opacity: 0;\n}\n.spm_wrapper .card_quests .quest_card:hover .quest_card_tools .quest_card_buttons {\n  opacity: 1;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools {\n  background-color: #cccccc;\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info {\n  opacity: 1;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info .quest_card_name {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 20px;\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info .quest_card_points {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  width: 100%;\n  padding: 0 20px 20px 20px;\n  font-size: 18px;\n  font-weight: bold;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_buttons {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding-top: 20px;\n  text-align: center;\n}\n.spm_wrapper .actions_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .actions_selected_modal .action_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n  max-height: 170px;\n}\n.spm_wrapper .actions_selected_modal .action_image img {\n  width: 100%;\n}\n.spm_wrapper .actions_selected_modal .action_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 69%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .actions_selected_modal [data-sailplay-action] {\n  position: relative;\n  width: 100%;\n  height: 36px;\n  display: inline-block;\n}\n.spm_wrapper .actions_selected_modal .sailplay_action_frame {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 140px !important;\n  height: 100% !important;\n  overflow: visible !important;\n  border: none !important;\n}\n.spm_wrapper .actions_selected_modal .action_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .actions_custom_selected_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 400px;\n}\n.spm_wrapper .actions_custom_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n", ""]);

// exports


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _charityPro = __webpack_require__(223);

var _charityPro2 = _interopRequireDefault(_charityPro);

__webpack_require__(224);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'charity_pro',
  template: _charityPro2.default,
  inject: ['SailPlayApi', 'SailPlay', '$rootScope', '$q'],
  controller: function controller(SailPlayApi, SailPlay, $rootScope, $q) {
    return function (scope) {

      // Local variable, for storage current charity model
      var current_charity = null;

      // Form model
      scope.form = scope.widget.options.request_charity && angular.copy(scope.widget.options.request_charity.fields);

      // Charity model
      scope.charity = null;

      // Show form model
      scope.show_form = false;

      // Exist tags
      scope.disabled = true;

      // Show buttons
      scope.show_search_link = false;
      scope.show_request_charity = false;

      // User info
      scope.user = SailPlayApi.data('load.user.info');

      console.log('user', scope.user());

      scope.$watch(function () {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, function (new_val, old_val) {

        SailPlay.send('tags.exist', { tags: [scope.widget.options.show_search_link, scope.widget.options.show_request_charity] }, function (tags_res) {
          scope.$apply(function () {
            if (tags_res.status === 'ok') {
              scope.show_search_link = tags_res.tags[0].exist;
              scope.show_request_charity = tags_res.tags[1].exist;
            }
          });
        });
      });

      // Method for existing tags, maybe need tranfer to some sailplay module
      scope.tags_exist = function (params, callback) {

        if (!params) return;

        var response = [];

        var tags = params.tags || [];

        if (tags.length > 0) {

          var chunk = function chunk(array, chunkSize) {
            return [].concat.apply([], array.map(function (elem, i) {
              return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            }));
          };

          var chunked_tags = chunk(tags, 10);

          var tag_promises = [];

          angular.forEach(chunked_tags, function (chunk) {

            var promise = $q(function (resolve, reject) {

              SailPlay.send('tags.exist', { tags: chunk }, function (tags_res) {
                if (tags_res.status === 'ok') {
                  response = response.concat(tags_res.tags);
                  resolve(tags_res);
                } else {
                  reject(tags_res);
                }
              });
            });

            tag_promises.push(promise);
          });

          $q.all(tag_promises).then(function () {
            callback && callback(response);
          });
        } else {
          callback && callback();
        }
      };

      // Getting existing tags
      if (scope.widget.options.charities && scope.widget.options.charities.length) {
        var exist_object = {
          tags: scope.widget.options.charities.map(function (item) {
            return item.tag;
          })
        };
        scope.tags_exist(exist_object, function (tags) {
          if (tags && tags.length) {
            var exist = tags.filter(function (item) {
              return item.exist;
            })[0];
            scope.disabled = false;
            scope.charity = exist && exist.name;
            current_charity = scope.charity;
          }
        });
      }

      /**
       * On change charity
       */
      scope.charity_change = function () {

        scope.disabled = true;

        if (current_charity) SailPlay.send('tags.delete', { tags: [current_charity] });

        SailPlay.send('tags.add', { tags: [scope.charity] }, function (res_add) {
          if (res_add && res_add.status == 'ok') {
            current_charity = scope.charity;
            scope.disabled = false;
            scope.$digest();
          }
        });
      };

      /**
       * Charity form submit function
       * @param form
       */
      scope.charity_form_submit = function (form) {

        if (!form || !form.$valid) return;

        var data = {};

        var vars = {};

        scope.form.forEach(function (field) {

          switch (field.type) {

            case 'system':
              {

                if (field.value) {

                  // If the phone matches the phone in user info
                  if (field.name == 'addPhone' && scope.user().user.phone && field.value.replace(/\D/g, '') == scope.user().user.phone.replace(/\D/g, '')) break;

                  // If the email matches the email in user info
                  if (field.name == 'addEmail' && scope.user().user.email && field.value == scope.user().user.email) break;

                  data[field.name] = field.value;
                }

                break;
              }

            case 'variable':
              {

                if (field.value) {
                  vars[field.name] = field.value;
                }

                break;
              }

          }
        });

        // Update user info
        SailPlay.send('users.update', data, function (res_user) {
          if (res_user && res_user.status == 'ok') {
            // Call user info for get actualy data
            SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });
            // Add custom variables
            SailPlay.send('vars.add', { custom_vars: vars }, function (res_vars) {
              if (res_vars && res_vars.status == 'ok') {
                // Add tags

                SailPlay.send('tags.add', { tags: scope.widget.options.request_charity.tags }, function (res_tags) {
                  if (res_tags && res_tags.status == 'ok') {
                    scope.show_form = false;
                    scope.$digest();
                  } else {
                    res_tags.message & error_wrapper(res_tags.message);
                  }
                });

                scope.$digest();
              } else {
                res_vars.message & error_wrapper(res_vars.message);
              }
            });

            scope.$digest();
          } else {
            res_user.message & error_wrapper(res_user.message);
          }
        });
      };

      /**
       * Charity form close function
       * @param form
       */
      scope.charity_form_close = function (form) {
        if (form) {
          form.$setPristine();
          form.$setUntouched();
        }
        scope.show_form = false;
      };

      /**
       * Function wrapper for error messages
       * @param msg
       */
      function error_wrapper(msg) {
        $rootScope.$broadcast('notifier:notify', {
          header: "Error",
          body: msg
        });
      }
    };
  }
});

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = "<div class=\"sp_cp-widget container clearfix\">\n\n    <div class=\"sp_cp-widget__wrap clearfix\">\n\n        <div class=\"sp_cp-widget__left\" data-ng-show=\"user && user()\">\n\n            <a class=\"sp_cp-widget__btn sp_cp-widget__search-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_search\"\n               data-ng-if=\"show_search_link && widget.options.search_link\"\n               data-ng-href=\"{{ widget.options.search_link }}\" target=\"_blank\"></a>\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_subscriptions\"\n               data-ng-if=\"widget.options.subscriptions_link\"\n               data-ng-href=\"{{ widget.options.subscriptions_link }}\" target=\"_blank\"></a>\n\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_form\"\n               data-ng-if=\"show_request_charity\"\n               data-ng-click=\"$event.preventDefault();$parent.show_form=true;\"></a>\n\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-if=\"widget.options.payments_link\"\n               data-ng-bind=\"widget.texts.button_payments\"\n               data-ng-href=\"{{ widget.options.payments_link }}\" target=\"_blank\"></a>\n\n        </div>\n\n        <div class=\"sp_cp-widget__right\" data-ng-show=\"user && user()\">\n\n            <select class=\"sp_cp-widget__select\" data-ng-model=\"charity\"\n                    data-ng-disabled=\"disabled\"\n                    data-ng-change=\"charity_change()\"\n                    data-ng-options=\"item.tag as item.name for item in widget.options.charities\">\n                <option value=\"\" disabled selected ng-hide=\"charity\"\n                        data-ng-bind=\"widget.texts.select_charity\"></option>\n            </select>\n\n        </div>\n\n    </div>\n\n    <magic-modal class=\"sp_cp-widget__form\" data-show=\"show_form\">\n\n        <div class=\"sp_cp-widget__form-header\" data-ng-bind=\"widget.texts.request_charity_header\"></div>\n\n        <div class=\"sp_cp-widget__invalid-fields\" data-ng-if=\"!form\">Invalid form fields</div>\n\n        <form name=\"request_charity\" data-ng-submit=\"charity_form_submit(request_charity)\" data-ng-show=\"form\">\n\n            <div class=\"form_field\" data-ng-repeat=\"field in form\"\n                 data-ng-class=\"{type_full: field.full_width}\"\n                 data-ng-switch=\"field.input\">\n\n                <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n                    <img width=\"160px\"\n                         data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\"\n                         alt=\"\">\n                </div>\n\n                <div data-ng-switch-when=\"textarea\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <textarea class=\"form_textarea\" placeholder=\"{{ field.placeholder }}\"\n                              data-ng-required=\"field.required\" data-ng-model=\"field.value\"></textarea>\n                </div>\n\n                <div data-ng-switch-when=\"text\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n                <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"text\" data-ui-mask=\"{{ field.placeholder }}\"\n                           data-model-view-value=\"true\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n                <div data-ng-switch-when=\"date\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <date-picker data-model=\"field.value\"></date-picker>\n                </div>\n\n                <div data-ng-switch-when=\"select\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <div class=\"magic_select form_input\">\n                        <select data-ng-model=\"field.value\"\n                                data-ng-required=\"field.required\"\n                                data-ng-options=\"item.value as item.text for item in field.data\"></select>\n                    </div>\n                </div>\n\n                <div data-ng-switch-when=\"email\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n            </div>\n\n            <div class=\"sp_cp-widget__form-submit_wrapper clearfix\">\n\n                <button type=\"submit\" class=\"sp_btn button_primary sp_cp-widget__form-submit_button\"\n                        data-ng-bind=\"widget.texts.request_charity_submit\"></button>\n\n                <button type=\"button\" class=\"sp_btn button_primary sp_cp-widget__form-back_button\"\n                        data-ng-bind=\"widget.texts.request_charity_back\"\n                        data-ng-click=\"charity_form_close(request_charity);\"></button>\n\n            </div>\n\n        </form>\n\n    </magic-modal>\n\n\n</div>";

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./charity-pro.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./charity-pro.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .sp_cp-widget {\n  /* -------------------- Select Box Styles: stackoverflow.com Method */\n  /* -------------------- Source: http://stackoverflow.com/a/5809186 */\n}\n.spm_wrapper .sp_cp-widget form {\n  padding: 20px 40px 40px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px), only screen and (max-width: 529px) {\n  .spm_wrapper .sp_cp-widget .form_field {\n    width: 100%;\n    padding: 0 40px 20px 0;\n  }\n}\n.spm_wrapper .sp_cp-widget__wrap {\n  position: relative;\n  height: auto;\n  width: 100%;\n  padding: 50px 5%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.spm_wrapper .sp_cp-widget__left {\n  width: 50%;\n  float: left;\n  text-align: left;\n  font-size: 0;\n}\n.spm_wrapper .sp_cp-widget__left a {\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.spm_wrapper .sp_cp-widget__right {\n  width: 50%;\n  float: left;\n  text-align: right;\n}\n.spm_wrapper .sp_cp-widget__invalid-fields {\n  padding: 10px 0;\n  text-align: center;\n}\n.spm_wrapper .sp_cp-widget__select {\n  -webkit-appearance: button;\n  -webkit-border-radius: 2px;\n  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);\n  -webkit-padding-end: 20px;\n  -webkit-padding-start: 2px;\n  -webkit-user-select: none;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n  white-space: nowrap;\n  color: black;\n  font-size: 16px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-left: 10px;\n  -webkit-border-radius: 10px;\n          border-radius: 10px;\n  border: 2px solid black;\n  line-height: 46px;\n  height: 50px;\n  background-image: url('https://d3sailplay.cdnvideo.ru/media/assets/assetfile/303e1f38393495b1a059952843abeeb0.png');\n  background-repeat: no-repeat;\n  background-position: right 10px center;\n  -webkit-background-size: 10px 10px;\n          background-size: 10px;\n  background-color: transparent;\n  outline: none;\n}\n.spm_wrapper .sp_cp-widget__select[disabled] {\n  opacity: .7;\n}\n", ""]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _event_message = __webpack_require__(227);

var _event_message2 = _interopRequireDefault(_event_message);

__webpack_require__(228);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'event_message',
  template: _event_message2.default,
  inject: ['SailPlayApi', 'SailPlay', '$rootScope'],
  controller: function controller(SailPlayApi, SailPlay, $rootScope) {
    return function (scope) {

      var tags = [];
      scope.exist = null;
      scope.messages = [];

      angular.forEach(scope.widget.options.content, function (text) {
        angular.forEach(text.events, function (event) {
          tags.push(event.name);
        });
      });

      if (tags.length) {
        SailPlay.send('tags.exist', { tags: tags }, function (res) {
          if (res && res.tags) {
            scope.exist = res.tags;
            scope.update();
            scope.$digest();
          }
        });
      }

      scope.update = function () {

        function check(events) {
          var array = events.filter(function (event) {
            return scope.exist.filter(function (exist_event) {
              return exist_event.name == event.name && exist_event.exist == event.exist;
            }).length;
          });
          return array.length == events.length;
        }

        scope.messages = scope.widget.options.content.filter(function (item) {
          return check(item.events);
        });

        console.log('scope.messages', scope.messages);
      };
    };
  }
});

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = "<div class=\"event_message__wrapper container\">\n\n    <div class=\"event_message\" data-ng-repeat=\"item in messages\">\n\n        <img class=\"event_message__icon\" data-ng-src=\"{{ item.icon }}\" alt=\"{{ item.text }}\">\n        <span class=\"event_message__text\" data-ng-bind=\"item.text\"></span>\n\n    </div>\n\n</div>";

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(229);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./event_message.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./event_message.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .event_message__wrapper {\n  text-align: center;\n  width: 100%;\n}\n.spm_wrapper .event_message__icon {\n  max-height: 80%;\n  display: inline-block;\n  vertical-align: middle;\n}\n.spm_wrapper .event_message__text {\n  margin-left: 5px;\n  display: inline-block;\n  vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bon_choice_main container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n  <h3 class=\"bon_header\">\n    <span class=\"header\">{{ widget.texts.header }}</span>\n  </h3>\n  <h4 class=\"bon_sub_header\">\n    <span class=\"caption\">{{ widget.texts.caption }}</span>\n  </h4>\n\n  <div data-sailplay-gifts class=\"clearfix\">\n    <div class=\"bon_item_main\" data-ng-show=\"gifts && gifts().length\" data-magic-slider>\n\n      <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n        <div class=\"bon_slide_cat_item\">\n\n          <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n            <div class=\"bon_item gift\" data-magic-slide data-magic-gift data-ng-repeat=\"gift in gifts()\">\n              <div class=\"bon_item_iner\">\n                <img data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\" alt=\"{{ gift.name }}\">\n                <span class=\"bon_item_name gift_name\" data-ng-bind=\"gift.name\"></span>\n                <span class=\"bon_tem_info gift_points\" data-ng-bind=\"(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                <a href=\"#\" class=\"button_primary\" data-ng-click=\"gift_select(gift); $event.preventDefault();\">{{ widget.texts.get }}</a>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>\n        <a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>\n\n      </div>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_gift\" data-ng-cloak data-show=\"modals.selected_gift\">\n\n      <div class=\"modal_gift_container\">\n\n        <img class=\"gift_more_img\" data-ng-src=\"{{ modals.selected_gift.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ modals.selected_gift.name }}\">\n\n        <div class=\"gift_more_block\">\n\n          <span class=\"gift_more_name modal_gift_name\" data-ng-bind=\"modals.selected_gift.name\"></span>\n\n          <span class=\"gift_more_points modal_gift_points\"\n                data-ng-bind=\"(modals.selected_gift.points | number) + ' ' + (modals.selected_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n          <p class=\"gift_more_descr modal_gift_description\" data-ng-bind=\"modals.selected_gift.descr\"></p>\n\n          <div class=\"modal_gift_type_block clearfix\" data-gift-type data-types=\"widget.options.gift_types\" data-gift=\"modals.selected_gift\"></div>\n\n          <div class=\"modal_gift_buttons\">\n            <span class=\"alink button_primary\" data-ng-click=\"gift_select(false);\">{{ 'buttons.texts.close' | tools }}</span>\n\n            <span class=\"alink button_primary\"\n                  style=\"margin-left: 5px;\"\n                  data-ng-click=\"gift_confirm();\"\n                  data-ng-bind=\"gift_affordable(modals.selected_gift) ? widget.texts.get : widget.texts.no_points_button_text\">{{ widget.texts.get }}</span>\n          </div>\n\n        </div>\n      </div>\n\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_not_points\" data-ng-cloak data-show=\"modals.no_points_error\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.no_points_message }}\n        </p>\n        <a class=\"alink button_primary earn_points_button\" href=\"#magic_actions\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.earn_points }}</a>\n        <a class=\"alink button_primary service_button\" target=\"_blank\" href=\"{{ widget.texts.partner_service_url }}\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.service }}</a>\n      </div>\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_complete\" data-ng-cloak data-show=\"modals.confirmed_gift\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.confirm_message_start }}\n          {{ (modals.confirmed_gift.points | number) + ' ' + (modals.confirmed_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools)) }}.\n          {{ widget.texts.confirm_message_end }}\n        </p>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_unconfirm();\">{{ 'buttons.texts.close' | tools }}</span>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_purchase(modals.confirmed_gift);\">{{ 'buttons.texts.get' | tools }}</span>\n      </div>\n    </magic-modal>\n  </div>\n\n\n</div>";

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(232);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./gifts.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./gifts.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bon_choice_main {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 80px;\n}\n.spm_wrapper .bon_choice_main .bon_sub_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap {\n  float: left;\n  width: 74%;\n  margin-left: 13%;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  position: relative;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 20px 0px 0px 20px;\n          border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  -webkit-border-radius: 0px 20px 20px 0px;\n          border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  -webkit-transition: .3s ease;\n  -o-transition: .3s ease;\n  transition: .3s ease;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item {\n  width: 245px;\n  height: 360px;\n  border: 1px solid #cccccc;\n  margin-left: 15px;\n  margin-right: 15px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item:hover {\n  border: 1px solid #888888;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner span {\n  white-space: normal;\n  float: left;\n  margin-left: 30px;\n  width: 185px;\n  text-align: left;\n  color: #222222;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover span {\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover a {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_item_name {\n  font-size: 16px;\n  position: absolute;\n  left: 0px;\n  bottom: 61px;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  visibility: visible;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner img {\n  margin-top: 30px;\n  max-height: 200px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bns_overlay_gift_not_points {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_not_points p {\n  padding: 20px;\n}\n.spm_wrapper .bns_overlay_gift {\n  text-align: left;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner {\n  font-size: 0;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner:before {\n  vertical-align: middle;\n  display: inline-block;\n  height: 100%;\n  width: 0;\n  content: '';\n}\n.spm_wrapper .bns_overlay_gift .gift_more {\n  color: #222222;\n  font-size: 14px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_block {\n  display: inline-block;\n  vertical-align: middle;\n  width: 70%;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding-left: 40px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_img {\n  display: inline-block;\n  width: 30%;\n  vertical-align: middle;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_name {\n  display: inline-block;\n  width: 100%;\n  font-size: 16px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_descr {\n  display: inline-block;\n  width: 100%;\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 20px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_points {\n  display: inline-block;\n  width: 100%;\n  opacity: 0.5;\n  font-size: 14px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift_complete {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_complete p {\n  margin: 20px 0;\n}\n", ""]);

// exports


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gifts = __webpack_require__(56);

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _gifts.GiftTypeRegister)({

  id: 'custom_vars',
  inject: ['SailPlay', 'SailPlayApi'],
  template: '\n      <form name="custom_vars_form" class="clearfix">\n        <div class="form_field" style="width: 100%;" data-ng-repeat="field in options.data.fields" data-ng-switch="field.type">\n          <div data-ng-switch-when="date" class="clearfix">\n            <label class="form_label">{{ field.label }}</label>\n            <date-selector data-ng-model="field.value" data-max-year="{{ field.options.max_year }}" data-min-year="{{ field.options.min_year }}"></date-selector>\n          </div>\n          <div data-ng-switch-when="text" class="clearfix">\n            <label class="form_label">{{ field.label }}</label>\n            <input class="form_input" type="text" placeholder="{{ field.placeholder }}" data-ng-model="field.value">\n          </div>\n          <div data-ng-switch-when="select" class="clearfix">\n            <label class="form_label">{{ field.label }}</label>\n            <div class="magic_select form_input">\n              <select data-ng-model="field.value" data-ng-options="item.value as item.text for item in field.data"></select>\n            </div>\n          </div>\n          <div data-ng-switch-when="phone" class="clearfix">\n            <label class="form_label">{{ field.label }}</label>\n            <input class="form_input" type="text" data-ui-mask="{{ field.placeholder }}" data-ng-model="field.value">\n          </div>          \n        </div>\n      </form>\n    ',
  controller: function controller(SailPlay, SailPlayApi) {

    return function (scope, elm) {

      console.log('custom vars scope:', scope);

      var purchasing = false;

      SailPlay.on('gifts.purchase', function (params) {
        if (params.gift.id === scope.gift.id) {
          purchasing = true;
        }
      });

      SailPlay.on('gifts.purchase.success', function (res) {

        console.dir(res);

        if (!purchasing) return;

        purchasing = false;

        console.log(scope.options.data.fields);

        scope.$digest();

        var custom_vars = {};

        _angular2.default.forEach(scope.options.data.fields, function (field) {
          custom_vars[field.variable] = field.value;
        });

        SailPlay.send('vars.add', { custom_vars: custom_vars }, function (vars_res) {

          console.log('custom vars added:', vars_res);
        });
      });
    };
  }

});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _giftsGrid = __webpack_require__(235);

var _giftsGrid2 = _interopRequireDefault(_giftsGrid);

__webpack_require__(236);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({

  id: 'gifts-grid',
  template: _giftsGrid2.default,
  inject: ['SailPlayApi', 'SailPlay', '$rootScope'],
  controller: function controller(SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // Grid blocks array
      scope.blocks = [];

      scope.gifts = [];

      scope.filter = scope.widget.options && scope.widget.options.filter || {};

      scope.orderBy = scope.widget.options && scope.widget.options.orderBy || 'points';

      // Current state of grid
      scope.state = 0;

      scope.check_categories = false;

      scope.user_categories = [];

      // Grid block size
      var block_size = scope.widget.options && scope.widget.options.grid_size || 6;

      var available_categories = scope.widget.options && scope.widget.options.available_categories || [];

      var categories = scope.widget.options && scope.widget.options.categories || [];

      if (!available_categories.length) {
        scope.check_categories = true;
      } else {
        SailPlay.send('tags.exist', { tags: categories.filter(function (item) {
            return available_categories.indexOf(item.id) !== -1;
          }).map(function (item) {
            return item.tag;
          }) }, function (tags_res) {
          if (tags_res && tags_res.status === 'ok') {
            scope.check_categories = true;
            scope.user_categories = tags_res.tags;
            scope.$digest();
          } else {
            console.error('Tags exit error. Response: ', tags_res);
          }
          scope.getBlocks();
          scope.$digest();
        });
      }

      function replaceVariables(str, data) {
        if (!str || !data) return;
        var re;
        for (var field in data) {
          re = new RegExp('%%' + field + '%%', "g");
          str = str.replace(re, data[field]);
        }
        return str;
      }

      scope.isNotAvailableGift = function (gift) {
        if (!gift || !scope.user()) return;
        var status = categories.filter(function (item) {
          return item.id == gift.category;
        })[0];
        var obj = {
          tag_id: status && status.id,
          status_name: status && status.name,
          tag_name: status && status.tag
        };
        $rootScope.$broadcast('notifier:notify', {
          header: replaceVariables(scope.widget.texts.no_available_category.header, obj),
          body: replaceVariables(scope.widget.texts.no_available_category.body, obj)
        });
      };

      scope.isAvailableGift = function (gift) {
        if (!gift || !scope.check_categories) return false;
        var category = categories.filter(function (category) {
          return category.id == gift.category;
        })[0];
        if (scope.check_categories && (!gift.category || !category)) {
          return true;
        }
        var checked = scope.user_categories.filter(function (tag) {
          return tag.name == category.tag && tag.exist;
        })[0];
        return scope.check_categories && checked;
      };

      // Local variable for preparing grid data
      var i = 0,
          page = null,
          len = 0;

      scope.getBlocks = function () {
        scope.blocks = [];
        if (!scope.gifts && !scope.gifts.length && scope.check_categories) return;
        var gifts = angular.copy(scope.gifts);
        var block_len = block_size == 'all' ? gifts.length : block_size;
        len = Math.ceil(gifts.length / block_len);
        i = 0;
        do {
          if (i == len - 1) {
            page = gifts.slice(block_len * i);
          } else {
            page = gifts.slice(block_len * i, block_len * i + block_len);
          }
          scope.blocks.push(page);
          i++;
        } while (len && i != len);
      };

      /**
       * Watch gift list, and prepare it for grid
       */
      SailPlayApi.observe('load.gifts.list', function (gifts) {
        scope.gifts = gifts;
        scope.getBlocks();
        scope.$digest();
      });

      /**
       * Change grid page
       * @param action
       */
      scope.move = function (action) {
        if (!scope.blocks[scope.state + action]) return;
        scope.state += action;
      };

      /**
       * Getting gift
       * @param gift
       */
      scope.gift_confirm = function (gift) {

        if (!scope.user()) SailPlay.authorize('remote', { widget: 'gifts-grid', action: 'gift_confirm' });else if (scope.user().user_points.confirmed < gift.points) {

          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_error_header,
            body: scope.widget.texts.no_points_message || res.success_message
          });

          scope.selected_gift = null;
        } else if (scope.user().user_points.confirmed >= gift.points) {
          SailPlay.send('gifts.purchase', { gift: gift });
        }
      };

      scope.open = function (gift) {
        if (!gift) return;
        if (scope.isAvailableGift(gift)) {
          scope.selected_gift = gift;
        } else {
          scope.isNotAvailableGift(gift);
        }
      };

      /**
       * Track success gift purchase
       */
      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          scope.selected_gift = null;
          SailPlayApi.call('load.gifts.list');
          SailPlayApi.call('load.user.info');
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_success_header,
            body: res.coupon_number && scope.widget.texts.coupon_number + ' ' + res.coupon_number || res.success_message || scope.widget.texts.gift_received
          });
        });
      });

      /**
       * Track error gift purchase
       */
      SailPlay.on('gift.purchase.error', function (error) {
        $rootScope.$apply(function () {
          scope.selected_gift = null;
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.purchase_error_header,
            body: error.message || scope.widget.texts.gift_received_error
          });
        });
      });
    };
  }

});

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bon_choice_main container clearfix gifts_grid_widget\">\n\n    <h3 class=\"gifts_grid___header\">\n        <span class=\"header\" data-ng-bind=\"widget.texts.header\"></span>\n    </h3>\n\n    <h4 class=\"gifts_grid___caption\">\n        <span class=\"caption\" data-ng-bind=\"widget.texts.caption\"></span>\n    </h4>\n\n    <div class=\"gifts_grid__wrapper clearfix\">\n\n        <div class=\"gifts_grid__blocks clearfix\">\n\n            <div class=\"gifts_grid__block clearfix\">\n\n                <div class=\"gifts_grid__item clearfix\"\n                     data-ng-class=\"{\n                     'gift-available': isAvailableGift(gift),\n                     'gift-unavailable': !isAvailableGift(gift),\n                     'gift-points-not-enough': user().user_points.confirmed < gift.points\n                     }\"\n                     data-ng-repeat=\"gift in blocks[state] | filter:filter | orderBy:orderBy track by $index\">\n\n                    <span class=\"gifts_grid__item-name gift_name\" data-ng-bind=\"gift.name\"></span>\n\n                    <span class=\"gifts_grid__item-points gift_points\"\n                          data-ng-bind=\"(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n                    <img class=\"gifts_grid__item-img gift_img\"\n                         data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\"\n                         alt=\"{{ gift.name }}\">\n\n\n                    <a class=\"gifts_grid__item-button button_primary\" href=\"#\"\n                       data-ng-bind=\"widget.texts.get\"\n                       data-ng-click=\"$event.preventDefault();open(gift)\"></a>\n\n\n                </div>\n\n            </div>\n\n        </div>\n\n        <a href=\"#\" class=\"gifts_grid__arrow gifts_grid__arrow_l slider_arrow_left\"\n           data-ng-if=\"state\"\n           data-ng-click=\"$event.preventDefault(); move(-1);\"></a>\n\n        <a href=\"#\" class=\"gifts_grid__arrow gifts_grid__arrow_r slider_arrow_right\"\n           data-ng-if=\"blocks.length && state != (blocks.length-1)\"\n           data-ng-click=\"$event.preventDefault(); move(1);\"></a>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_gift\" data-show=\"selected_gift\">\n\n        <div class=\"modal_gift_container\">\n\n            <img class=\"gift_more_img\" data-ng-src=\"{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}\"\n                 alt=\"{{ selected_gift.name }}\">\n\n            <div class=\"gift_more_block\">\n\n                <span data-ng-bind=\"selected_gift\"></span>\n\n                <span class=\"gift_more_name modal_gift_name\" data-ng-bind=\"selected_gift.name\"></span>\n\n                <span class=\"gift_more_points modal_gift_points\"\n                      data-ng-bind=\"(selected_gift.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n                <p class=\"gift_more_descr modal_gift_description\" data-ng-bind=\"selected_gift.descr\"></p>\n\n                <div class=\"modal_gift_buttons\">\n\n                    <span class=\"alink button_primary\" data-ng-click=\"$parent.$parent.selected_gift=null\">{{ 'buttons.texts.close' | tools }}</span>\n\n                    <span class=\"alink button_primary\"\n                          style=\"margin-left: 5px;\"\n                          data-ng-click=\"gift_confirm(selected_gift);\"\n                          data-ng-bind=\"widget.texts.get\"></span>\n                </div>\n\n            </div>\n        </div>\n\n\n</div>";

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(237);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./gifts-grid.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./gifts-grid.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .gifts_grid_widget .gifts_grid__header {\n  width: 90%;\n  display: block;\n  margin: 0 auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__caption {\n  width: 90%;\n  display: block;\n  margin: 0 auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__wrapper {\n  width: 100%;\n  max-width: 1200px;\n  height: auto;\n  margin: 0 auto;\n  position: relative;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__blocks {\n  display: block;\n  width: 100%;\n  padding: 0 50px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__block {\n  display: block;\n  width: 100%;\n  height: auto;\n  float: left;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item {\n  width: 33.3%;\n  height: auto;\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 3%;\n  position: relative;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .gifts_grid_widget .gifts_grid__item {\n    width: 50%;\n  }\n}\n@media (max-width: 500px) {\n  .spm_wrapper .gifts_grid_widget .gifts_grid__item {\n    width: 100%;\n  }\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-img {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-name {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-points {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-button {\n  display: inline-block;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow {\n  width: 50px;\n  height: 100px;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-repeat: no-repeat;\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow_l {\n  left: 0;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow_r {\n  right: 0;\n}\n", ""]);

// exports


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _header = __webpack_require__(239);

var _header2 = _interopRequireDefault(_header);

__webpack_require__(240);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'header',
  template: _header2.default,
  controller: function controller() {

    return function (scope) {};
  }

});

/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = "<div class=\"header_wrapper container\">\n\n  <h3 class=\"header_title\">\n    {{ widget.texts.title }}\n  </h3>\n\n  <h2 class=\"header_sub_title\">\n    {{ widget.texts.sub_title }}\n  </h2>\n\n</div>";

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(241);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./header.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./header.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_tools_widget.header .header_wrapper {\n  background-color: #888888;\n  display: inline-block;\n  width: 100%;\n  height: auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 40px 5%;\n}\n.spm_wrapper .spm_tools_widget.header .header_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 36px;\n}\n.spm_wrapper .spm_tools_widget.header .header_sub_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _imageStatuses = __webpack_require__(243);

var _imageStatuses2 = _interopRequireDefault(_imageStatuses);

__webpack_require__(244);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'image-statuses',
  template: _imageStatuses2.default,
  inject: ['MAGIC_CONFIG', 'SailPlayApi'],
  controller: function controller(MAGIC_CONFIG, SailPlayApi) {
    return function (scope) {

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = scope.widget.options.statuses || [];

      scope.user = SailPlayApi.data('load.user.info');

      scope.get_next_status = function () {

        if (!scope._statuses) return;

        var user = scope.user();

        if (!user) {
          return {
            status: scope._statuses[0],
            offset: scope._statuses[0].points
          };
        }

        var user_points = user.user_points;
        var points = user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;

        var future_statuses = scope._statuses.sort(function (a, b) {
          return a.points > b.points;
        }).filter(function (status) {
          return status.points > points;
        });

        return {
          status: future_statuses[0],
          offset: future_statuses[0] && future_statuses[0].points - points || 0
        };
      };

      scope.is_active_status = function (status) {
        var user = scope.user();
        if (!user) return false;
        return status.points <= user.user_points.confirmed + user.user_points.spent + user.user_points.spent_extra;
      };

      scope.get_status_image = function (status) {

        return scope.is_active_status(status) && status.image_active || status.image;
      };
    };
  }
});

/***/ }),
/* 243 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix container\">\n\n  <div class=\"image-status-list\">\n\n    <div class=\"next_status_info\" data-ng-show=\"get_next_status().status\">\n\n      <div class=\"next_status_name\">\n        {{ widget.texts.next_status }} <span data-ng-style=\"{ color: get_next_status().status.color  }\">{{ get_next_status().status.status }}</span>\n      </div>\n\n      <div class=\"next_status_offset\">\n        {{ widget.texts.next_status_offset }} {{ get_next_status().offset }}\n      </div>\n\n    </div>\n\n    <div class=\"image-status-list__wrapper\" data-sailplay-statuses data-ng-cloak>\n\n      <div class=\"image-status-list__progress element-progress progress_line\"\n           data-ng-style=\"getProgress(user().user_points, _statuses)\"></div>\n\n      <div class=\"image-status-list__item element-item\"\n           data-ng-class=\"{ type_active : is_active_status(item) }\"\n           data-ng-repeat=\"item in _statuses\"\n           data-ng-style=\"generateOffset($index, _statuses)\">\n\n        <!--<div class=\"image-status-list__item-point element-item-point\"></div>-->\n\n        <div class=\"element-item-point-inner\">\n          <img class=\"status_image\" data-ng-src=\"{{ get_status_image(item) }}\" alt=\"\">\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(245);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./image-statuses.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./image-statuses.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .image-status-list {\n  float: left;\n  width: 80%;\n  position: relative;\n  margin: 0 10%;\n  padding: 30px 0 80px;\n  z-index: 1;\n}\n.spm_wrapper .image-status-list .next_status_info {\n  margin-bottom: 30px;\n}\n.spm_wrapper .image-status-list__wrapper {\n  background: #F4F4F4;\n  position: relative;\n  height: 20px;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  display: block;\n  margin: 0 20px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__wrapper {\n    height: 10px;\n  }\n}\n.spm_wrapper .image-status-list__item {\n  position: absolute;\n  height: 100%;\n  width: 0;\n}\n.spm_wrapper .image-status-list__item .element-item-point-inner {\n  z-index: 1;\n  content: '';\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  margin-top: -75px;\n  margin-left: -75px;\n  top: 50%;\n  left: 50%;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background: transparent;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item .element-item-point-inner {\n    width: 120px;\n    height: 120px;\n    margin: -60px 0 0 -60px;\n  }\n}\n.spm_wrapper .image-status-list__item .element-item-point-inner .status_image {\n  width: 100%;\n  height: 100%;\n  display: block;\n  vertical-align: top;\n}\n.spm_wrapper .image-status-list__item-point {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background: #f4f4f4;\n  z-index: -1;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-point {\n    width: 30px;\n    height: 30px;\n  }\n}\n.spm_wrapper .image-status-list__item-status {\n  display: inline-block;\n  min-width: 100px;\n  left: 0;\n  position: absolute;\n  top: 60px;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-status {\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .image-status-list__item-status {\n    font-size: 12px;\n    min-width: 100%;\n    top: 50px;\n  }\n}\n.spm_wrapper .image-status-list__item-name {\n  display: inline-block;\n  min-width: 80px;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-name {\n    font-size: 12px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .image-status-list__item-name {\n    font-size: 8px;\n    min-width: 100%;\n    top: 25px;\n  }\n}\n.spm_wrapper .image-status-list__item.type_active .element-item-point-inner {\n  display: block;\n}\n.spm_wrapper .image-status-list__progress {\n  height: 10px;\n  position: absolute;\n  width: 0;\n  background: #444444;\n  z-index: 0;\n  top: 5px;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__progress {\n    height: 5px;\n    top: 2.5px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _leaderboard = __webpack_require__(247);

var _leaderboard2 = _interopRequireDefault(_leaderboard);

__webpack_require__(248);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'leaderboard',
  template: _leaderboard2.default,
  inject: ['SailPlayApi'],
  controller: function controller(SailPlayApi) {
    return function (scope, elm, attrs) {
      scope.data = SailPlayApi.data('leaderboard.load');
    };
  }

});

/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix\">\n    <div class=\"container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n        <h3 class=\"bon_header\">\n            <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4 class=\"bon_sub_header\">\n            <span class=\"caption\">{{ widget.texts.caption }}</span>\n        </h4>\n\n        <ul class=\"leaderboard__list\" data-ng-if=\"data && data()\">\n\n            <li class=\"leaderboard__list-item type_headers\">\n\n                <span class=\"leaderboard__list-item__rank rows headers\">{{ widget.texts.rank }}</span>\n\n                <span class=\"leaderboard__list-item__name rows headers\">{{ widget.texts.full_name }}</span>\n\n                <span class=\"leaderboard__list-item__score rows headers\">{{ widget.texts.score }}</span>\n\n            </li>\n\n            <li class=\"leaderboard__list-item\" data-ng-repeat=\"member in $parent.data().members.members\"\n                data-ng-class=\"{ type_current : member.is_current_user }\">\n\n                <span class=\"leaderboard__list-item__rank rank rows\" data-ng-bind=\"member.rank\"></span>\n\n                <span class=\"leaderboard__list-item__name full_name rows\">\n\n                    <img class=\"leaderboard__list-item__photo photo\" data-ng-if=\"member.pic\"\n                         data-ng-src=\"{{ $parent.member.pic | sailplay_pic }}\"\n                         alt=\"{{ $parent.member.full_name || 'n/a' }}\">\n\n                    {{ member.full_name || 'n/a' }}\n\n                </span>\n\n                <span class=\"leaderboard__list-item__score score rows\" data-ng-bind=\"member.score\"></span>\n\n            </li>\n\n        </ul>\n\n\n    </div>\n</div>\n\n";

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(249);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./leaderboard.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./leaderboard.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_tools_widget.leaderboard .container {\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n}\n.spm_wrapper .spm_tools_widget.leaderboard .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard ul li {\n  list-style: none;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list {\n  max-width: 600px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 10px;\n  margin: 0 auto 20px !important;\n  float: none;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item {\n  display: inline-block;\n  width: 100%;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  z-index: 1;\n  font-size: 0;\n  padding: 5px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_current {\n  background: #6385b5;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_current span {\n  color: white;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_headers {\n  margin-bottom: 5px;\n  margin-top: 20px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_headers span {\n  font-size: 18px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item span {\n  display: inline-block;\n  vertical-align: middle;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n  color: #676767;\n  white-space: nowrap;\n  line-height: 18px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__photo {\n  height: 18px;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__rank {\n  font-size: 18px;\n  width: 20%;\n  text-align: left;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__name {\n  font-size: 14px;\n  width: 60%;\n  text-align: center;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__score {\n  font-size: 18px;\n  width: 20%;\n  text-align: right;\n}\n", ""]);

// exports


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _pointsStatus = __webpack_require__(251);

var _pointsStatus2 = _interopRequireDefault(_pointsStatus);

var _history_pagination = __webpack_require__(252);

var _history_pagination2 = _interopRequireDefault(_history_pagination);

__webpack_require__(253);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointsStatus = {

  id: 'points-status',
  template: _pointsStatus2.default,
  inject: ['SailPlayApi', 'SailPlay', '$rootScope'],
  controller: function controller(SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // History popup
      scope.history = false;

      /**
       * Calculating progress
       */
      scope.getProgress = function (points, statusList) {

        var value = 0;

        if (!statusList || !statusList.length) return value;

        var _statusArray = statusList.map(function (item) {
          return item.points;
        });

        if (_statusArray[_statusArray.length - 1] <= points) return '100%';

        var step = (100 / _statusArray.length).toFixed(1);

        var state = 0;

        for (var i = 0, len = _statusArray.length; i < len; i++) {
          if (points < _statusArray[i]) {
            state = i;
            break;
          }
        }

        value = step * state;

        if (state != 0) {
          value += (points - _statusArray[state - 1]) * 100 / (_statusArray[state] - _statusArray[state - 1]) / _statusArray.length;
        } else {
          value += points * 100 / _statusArray[state] / _statusArray.length;
        }

        value = value > 100 ? 100 : value < 0 ? 0 : value;

        return value + '%';
      };
    };
  }

};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(PointsStatus);
}]);

_widget.Widget.run(["$templateCache", function ($templateCache) {
  $templateCache.put('points_status.history_pagination', _history_pagination2.default);
}]);

/***/ }),
/* 251 */
/***/ (function(module, exports) {

module.exports = "<div id=\"points-status\" class=\"bon_choice_main container clearfix\">\n\n    <div class=\"points-status__wrapper clearfix\">\n\n        <div class=\"points-status__left points_block clearfix\" data-ng-if=\"user()\">\n\n            <span class=\"points_confirmed\">\n                <span class=\"points_confirmed_value\" data-ng-bind=\"user().user_points.total | number\"></span>\n                <span class=\"points_confirmed_name\"\n                    data-ng-bind=\"user().user_points.total | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n            </span>\n\n            <a class=\"button_primary history_button\" href=\"#\"\n               data-ng-click=\"$event.preventDefault(); $parent.history = true;\"\n               data-ng-bind=\"widget.texts.history_button\"></a>\n\n        </div>\n\n        <div class=\"points-status__right progress_block clearfix\">\n\n            <div class=\"progress_line_main\">\n\n                <div class=\"progress_line_bg progress_bar progress_bar_border\"></div>\n\n                <div class=\"progress_line progress_bar_filled\"\n                     data-ng-style=\"{ width: getProgress(user().user_points.total, widget.options.status_list) }\">\n                </div>\n\n                <div class=\"gift_item progress_bar_border\"\n                     data-ng-repeat=\"item in widget.options.status_list track by $index\"\n                     data-ng-class=\"{ act : item.points <= user().user_points.total, progress_bar_gift_filled: item.points <=user().user_points.total, progress_bar_gift: item.points > user().user_points.total}\"\n                     data-ng-style=\"{ left: (100/widget.options.status_list.length * ($index+1)) + '%', 'background-image': 'url(' + item.image +')' }\">\n\n                    <span class=\"gift_item_hint\" data-ng-bind=\"item.points | number\"></span>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_hist\" data-show=\"history\">\n\n        <div data-sailplay-history data-sailplay-profile>\n\n            <h3>\n                <span class=\"modal_history_header\" data-ng-bind=\"widget.texts.history.header\"></span>\n            </h3>\n            <h4 class=\"modal_history_caption\" data-ng-bind=\"widget.texts.history.caption\"></h4>\n\n            <table class=\"bns_hist_table\">\n\n                <tbody>\n\n                <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n                    <td>\n                        <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n                    </td>\n                    <td>\n                        <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n                    </td>\n                    <td>\n                        <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\"\n                              data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                    </td>\n                </tr>\n\n                </tbody>\n            </table>\n\n            <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                                     data-template-url=\"points_status.history_pagination\"\n                                     data-auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n\n    </magic-modal>\n\n</div>";

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(254);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./points-status.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./points-status.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper #points-status .points-status__wrapper {\n  width: 100%;\n  max-width: 1200px;\n  height: auto;\n  margin: 0 auto;\n  position: relative;\n  padding: 30px 0;\n}\n.spm_wrapper #points-status .points-status__wrapper .points_confirmed span {\n  color: inherit;\n  font-family: inherit;\n}\n.spm_wrapper #points-status .points-status__wrapper .points_confirmed_name {\n  margin-left: 2px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left {\n  float: left;\n  width: 30%;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left > span {\n  color: #ffffff;\n  display: block;\n  font-size: 33px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left > a {\n  font-size: 14px;\n  color: #ffffff;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right {\n  float: right;\n  width: 70%;\n  padding-top: 18px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .progress_line_bg {\n  height: 14px;\n  border-top: 3px solid #000000;\n  background-color: #cccccc;\n  -webkit-border-radius: 20px;\n          border-radius: 20px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .progress_line {\n  position: absolute;\n  left: 0px;\n  top: 3px;\n  width: 0%;\n  background-color: #ffffff;\n  height: 14px;\n  -webkit-border-radius: 20px 0px 0px 20px;\n          border-radius: 20px 0px 0px 20px;\n  -webkit-transition: all 1000ms ease;\n  -o-transition: all 1000ms ease;\n  transition: all 1000ms ease;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item {\n  position: absolute;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  margin-top: -25px;\n  margin-left: -25px;\n  -webkit-border-radius: 6px;\n          border-radius: 6px;\n  background-color: #cccccc;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-top: 3px solid #000000;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item.act {\n  background-color: #ffffff;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item_hint {\n  opacity: 0;\n  visibility: hidden;\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  top: 0;\n  font-weight: bold;\n  -webkit-transition: .3s ease;\n  -o-transition: .3s ease;\n  transition: .3s ease;\n  color: white;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item:hover .gift_item_hint {\n  visibility: visible;\n  opacity: 1;\n  top: -25px;\n}\n", ""]);

// exports


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _points_rate_progress = __webpack_require__(256);

var _points_rate_progress2 = _interopRequireDefault(_points_rate_progress);

var _history_pagination = __webpack_require__(257);

var _history_pagination2 = _interopRequireDefault(_history_pagination);

__webpack_require__(258);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'points_rate_progress',
  template: _points_rate_progress2.default,
  inject: ['SailPlayApi'],
  controller: function controller(SailPlayApi) {
    return function (scope) {

      scope.show_history = false;

      // Перенести в конфиг
      var PURCHASES_EVENT = scope.widget.options.event_id;

      if (scope.widget && scope.widget.options && scope.widget.options.badge_events && scope.widget.options.badge_events.length) {
        var tags = [];
        var position = 0;
        angular.forEach(scope.widget.options.badge_events, function (array) {
          angular.forEach(array.events, function (event) {
            tags.push(event.name);
          });
        });
        SailPlayApi.call('tags.exist', { tags: tags }, function (res) {
          if (res && res.tags) {
            var badge_events = scope.widget.options.badge_events.filter(function (array) {
              return array.events.filter(function (event) {
                return res.tags.filter(function (tag) {
                  return tag.name == event.name && tag.exist == event.exist;
                }).length;
              }).length == array.events.length;
            })[0];
            position = badge_events && badge_events.position || 0;
            scope.badges_list = scope.sailplay.badges.list().multilevel_badges[position];
          }
          scope.$apply();
        });
      }

      scope.badges_list = null;

      scope.get_progress = function (sum, badges) {
        var next = scope.get_next_status(sum, badges);
        if (!next) return { width: 0 };
        var purchase_event = null;
        if (angular.isArray(next.rules)) {
          purchase_event = next.rules.filter(function (event) {
            return event.event_id == PURCHASES_EVENT;
          })[0];
        } else {
          purchase_event = next.rules.event_id == PURCHASES_EVENT ? next.rules : null;
        }
        if (!purchase_event || !purchase_event.value_to_success) return { width: 0 };
        var percents = sum > purchase_event.value_to_success ? 100 : purchase_event ? sum * 100 / purchase_event.value_to_success : 0;
        return { width: (percents < 0 ? 0 : percents > 100 ? 100 : percents) + '%' };
      };

      scope.get_offset = function (sum, badges) {
        var offset = 0;
        var next = scope.get_next_status(sum, badges);
        if (!next || !badges) return offset;
        var purchase_event = null;
        if (angular.isArray(next.rules)) {
          purchase_event = next.rules.filter(function (event) {
            return event.event_id == PURCHASES_EVENT;
          })[0];
        } else {
          purchase_event = next.rules.event_id == PURCHASES_EVENT ? next.rules : null;
        }
        offset = purchase_event && purchase_event.value_to_success && purchase_event.value_to_success > sum ? purchase_event.value_to_success - sum : 0;
        return offset;
      };

      scope.get_current_status = function (sum, badges) {
        if (!badges) return;
        var received = badges.filter(function (badge) {
          return badge.is_received;
        });
        if (!received.length) return;
        var current = received[received.length - 1];
        return current;
      };

      scope.get_next_status = function (sum, badges) {
        if (!badges) return;
        if (!badges || !badges.length) return;
        var next = badges.filter(function (badge) {
          return !badge.is_received;
        })[0];
        return next;
      };
    };
  }
});

_widget.Widget.run(["$templateCache", function ($templateCache) {
  $templateCache.put('points_rate_progress.history_pagination', _history_pagination2.default);
}]);

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "<div class=\"points_rate_progress__wrapper container\" data-sailplay-badges>\n\n    <div class=\"points_rate_progress__points points_rate_progress__blocks\" data-ng-if=\"sailplay.user.info()\">\n        <span class=\"points_rate_progress__points-confirmed\">\n          <span class=\"points_rate_progress__points-confirmed-value\"\n                data-ng-bind=\"sailplay.user.info().user_points.confirmed | number\"></span>\n          <span class=\"points_rate_progress__points-confirmed-name\"\n                data-ng-bind=\"sailplay.user.info().user_points.confirmed | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n        </span>\n        <a class=\"points_rate_progress__points-history button_link history_button\" href=\"#\"\n           data-ng-click=\"$event.preventDefault();$parent.show_history = true;\">{{ widget.texts.history_button }}</a>\n    </div>\n\n    <div class=\"points_rate_progress__progress points_rate_progress__blocks\"\n         data-ng-if=\"sailplay.user.info() && badges_list\">\n\n        <p class=\"points_rate_progress__progress-offset\">\n            <span class=\"points_rate_progress__progress-offset-text\" data-ng-bind=\"widget.texts.to_text_status\"></span>\n            <span class=\"points_rate_progress__progress-offset-value\">\n                {{ get_offset(sailplay.user.info().purchases.sum, badges_list) | number }}\n                {{ get_offset(sailplay.user.info().purchases.sum, badges_list) | sailplay_pluralize: ('rub.texts.pluralize' | tools) }}\n            </span>\n        </p>\n\n        <div class=\"points_rate_progress__progress-block\">\n            <div class=\"points_rate_progress__progress-block-line\" data-ng-style=\"get_progress(sailplay.user.info().purchases.sum, badges_list)\"></div>\n            <div class=\"points_rate_progress__progress-block-text\" data-ng-bind=\"get_next_status(sailplay.user.info().purchases.sum, badges_list).descr\"></div>\n            <!--<img class=\"points_rate_progress__progress-block-img\" data-ng-src=\"{{ get_next_status(sailplay.user.info().purchases.sum, badges_list).thumbs.url_100x100 | sailplay_pic }}\" alt=\"{{ get_next_status(sailplay.user.info().purchases.sum, badges_list).name }}\">-->\n        </div>\n\n    </div>\n\n    <div class=\"points_rate_progress__rate points_rate_progress__blocks\"\n         data-ng-if=\"sailplay.user.info() && badges_list\">\n\n        <span class=\"points_rate_progress__rate-value\" data-ng-bind=\"(get_current_status(sailplay.user.info().purchases.sum, badges_list).descr || '0%')\"></span>\n        <span class=\"points_rate_progress__rate-text\" data-ng-bind=\"widget.texts.points_rate\"></span>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_hist\" data-show=\"show_history\">\n\n        <div data-sailplay-history data-sailplay-profile>\n\n            <h3>\n                <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n                <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n            </h3>\n            <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n            <table class=\"bns_hist_table\">\n\n                <tbody>\n\n                <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n                    <td>\n                        <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n                    </td>\n                    <td>\n                        <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n                    </td>\n                    <td>\n                        <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                    </td>\n                </tr>\n\n                </tbody>\n            </table>\n\n            <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                                     data-template-url=\"points_rate_progress.history_pagination\"\n                                     data-auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n\n\n    </magic-modal>\n\n</div>";

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(259);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./points_rate_progress.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./points_rate_progress.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .points_rate_progress__wrapper {\n  font-size: 0;\n  padding-bottom: 20px;\n}\n.spm_wrapper .points_rate_progress__points {\n  width: 25%;\n  font-size: 14px;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .points_rate_progress__points-history {\n  width: 100%;\n  display: block;\n  background: black;\n  padding: 10px 0;\n  text-align: center;\n}\n.spm_wrapper .points_rate_progress__points-confirmed {\n  display: block;\n  width: 100%;\n  text-align: center;\n  padding: 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.spm_wrapper .points_rate_progress__points-confirmed-value {\n  display: block;\n  font-size: 50px;\n  font-weight: bold;\n  line-height: 1;\n}\n.spm_wrapper .points_rate_progress__points-confirmed-name {\n  display: block;\n  line-height: 1;\n  font-size: 26px;\n}\n.spm_wrapper .points_rate_progress__progress {\n  font-size: 14px;\n  margin: 0 2%;\n  width: 46%;\n  display: inline-block;\n  vertical-align: top;\n  position: relative;\n}\n.spm_wrapper .points_rate_progress__progress-offset {\n  font-size: 14px;\n  text-align: center;\n  padding: 20px 0;\n}\n.spm_wrapper .points_rate_progress__progress-block {\n  margin: 25px auto;\n  width: 80%;\n  position: relative;\n  height: 30px;\n}\n.spm_wrapper .points_rate_progress__progress-block-line {\n  position: relative;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n}\n.spm_wrapper .points_rate_progress__progress-block-img {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 60px;\n  margin-top: 15px;\n  -webkit-transform: translate3d(50%, -50%, 0);\n          transform: translate3d(50%, -50%, 0);\n}\n.spm_wrapper .points_rate_progress__progress-block-text {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 60px;\n  text-align: center;\n  line-height: 60px;\n  margin-top: 15px;\n  -webkit-transform: translate3d(50%, -50%, 0);\n          transform: translate3d(50%, -50%, 0);\n}\n.spm_wrapper .points_rate_progress__rate {\n  font-size: 14px;\n  width: 25%;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .points_rate_progress__rate-value {\n  display: block;\n  font-size: 50px;\n  font-weight: bold;\n  line-height: 1;\n  text-align: center;\n  margin: 15px 0;\n}\n.spm_wrapper .points_rate_progress__rate-text {\n  display: block;\n  font-size: 16px;\n  line-height: 1;\n  text-align: center;\n  margin: 18px auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 10px;\n}\n", ""]);

// exports


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _profile = __webpack_require__(261);

var _profile2 = _interopRequireDefault(_profile);

var _history_pagination = __webpack_require__(262);

var _history_pagination2 = _interopRequireDefault(_history_pagination);

__webpack_require__(263);

var _avatar_default = __webpack_require__(267);

var _avatar_default2 = _interopRequireDefault(_avatar_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileWidget = {

  id: 'profile',
  template: _profile2.default,
  inject: ['$rootScope'],
  controller: function controller($rootScope) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.default_avatar = _avatar_default2.default;
      $rootScope.$on('openProfile', function () {
        scope.profile.show_fill_profile = true;
      });
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function fill_profile(state) {

          scope.profile.show_fill_profile = state || false;
        }
      };
    };
  }

};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {

  MagicWidgetProvider.register(ProfileWidget);
}]);

_widget.Widget.run(["$templateCache", function ($templateCache) {
  $templateCache.put('profile.history_pagination', _history_pagination2.default);
}]);

// .directive('sailplayMagicProfile', function(MAGIC_CONFIG){
//
//   return {
//
//     restrict: "E",
//     replace: true,
//     scope: {
//       _config: '=?config'
//     },
//     templateUrl: '/html/core/widgets/profile.html',
//     link: function(scope, elm, attrs){
//
//       scope._tools = MAGIC_CONFIG.tools;
//
//       scope.show_history = false;
//
//       scope.show_fill_profile = false;
//
//       scope.fill_profile = function(state){
//
//         scope.show_fill_profile = state || false;
//
//       };
//
//     }
//
//   };
//
// });

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bon_profile_wrap container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n  <div class=\"bon_profile_info\" data-sailplay-profile data-sailplay-gifts>\n\n    <div class=\"bon_profile_top clearfix\">\n      <div class=\"bon_profile_top_left\">\n        <h3>\n          <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4>\n          <span class=\"caption\">{{ widget.texts.spoiler }}</span>\n        </h4>\n      </div>\n      <div class=\"bon_profile_right clearfix\" data-ng-if=\"user()\">\n        <div class=\"user_avatar\">\n          <img class=\"user_avatar_image\" data-ng-src=\"{{ (user().user.pic | sailplay_pic) || default_avatar}}\" alt=\"You\">\n          <a href=\"#\" class=\"logout_btn button_link\" data-ng-click=\"$event.preventDefault(); logout();\">{{ widget.texts.logout }}</a>\n        </div>\n        <div class=\"user_info\">\n          <span class=\"user_name\"  data-ng-bind=\"user().user.name || widget.texts.name_not_defined\"></span>\n          <span class=\"user_phone\" data-ng-if=\"user().user.phone\"  data-ng-bind=\"user().user.phone | tel\"></span>\n          <span class=\"user_email\" data-ng-if=\"user().user.email\"  data-ng-bind=\"user().user.email\"></span>\n        </div>\n        <div class=\"user_info\">\n          <a href=\"#\" class=\"edit_profile_btn button_link\" data-ng-click=\"$event.preventDefault(); profile.fill_profile(true);\">{{ widget.texts.edit_profile_button }}</a>\n        </div>\n      </div>\n      <div class=\"bon_profile_right clearfix\" data-ng-if=\"!user()\">\n        <button type=\"button\" class=\"sp_btn button_primary login_reg_btn\" data-ng-click=\"$event.preventDefault(); login('remote', {widget: 'profile', element: 'profile_login_button'});\">{{ widget.texts.login_reg }}</button>\n      </div>\n    </div>\n\n    <!-- status -->\n    <div class=\"status_block\" data-ng-if=\"user() && user().user_status.name\">\n      <span class=\"status_block_title\" data-ng-bind=\"widget.texts.user_status\"></span>\n      <img class=\"status_block_img\" data-ng-src=\"{{ user().user_status.pic | sailplay_pic }}\" alt=\"{{ user().user_status.name }}\">\n      <span class=\"status_block_name\" data-ng-bind=\"user().user_status.name || widget.texts.empty_status \"></span>\n    </div>\n\n    <div class=\"bon_profile_stat\">\n      <div class=\"bps_left points_block clearfix\" data-ng-if=\"user()\">\n        <span class=\"points_confirmed\">\n          <span class=\"points_confirmed_value\" data-ng-bind=\"user().user_points.confirmed | number\"></span>\n          <span class=\"points_confirmed_name\" data-ng-bind=\"user().user_points.confirmed | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n        </span>\n        <a class=\"button_link history_button\" href=\"#\" data-ng-click=\"$event.preventDefault(); profile.history = true;\">{{ widget.texts.history_button }}</a>\n      </div>\n      <div class=\"bps_right progress_block clearfix\" data-ng-if=\"progress\">\n        <div class=\"progress_line_main\">\n          <div class=\"progress_line_bg progress_bar progress_bar_border\"></div>\n          <div class=\"progress_line progress_bar_filled\" data-procent=\"0\" data-ng-style=\"{ width: progress.plenum + '%' }\">\n            <div class=\"progress_text progress_bar_flag\" data-ng-show=\"progress.next.item\" data-ng-class=\"{ right_position: progress.plenum < 50 }\">\n              <span class=\"progress_bar_flag_text\" data-ng-bind=\"progress.next.offset + ' ' + (progress.next.offset | sailplay_pluralize:('points.texts.pluralize' | tools)) + ' ' + widget.texts.before_gift\"></span>\n            </div>\n          </div>\n\n          <div class=\"gift_item progress_bar_border\" data-ng-repeat=\"item in progress.items track by $index\"\n               data-ng-class=\"{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}\"\n               data-ng-style=\"{ left: item.get_left() }\">\n\n            <span class=\"gift_item_hint\" data-ng-bind=\"item.gifts[0].points\"></span>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <magic-modal class=\"bns_overlay_hist\" data-show=\"profile.history\">\n\n    <div data-sailplay-history data-sailplay-profile>\n\n      <h3>\n        <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n        <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n      </h3>\n      <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n      <table class=\"bns_hist_table\">\n\n        <tbody>\n\n        <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n          <td>\n            <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n          </td>\n          <td>\n            <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n          </td>\n          <td>\n            <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n          </td>\n        </tr>\n\n        </tbody>\n      </table>\n\n      <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                               data-template-url=\"profile.history_pagination\"\n                               data-auto-hide=\"true\"></dir-pagination-controls>\n    </div>\n\n\n\n  </magic-modal>\n\n  <!--profile edit section-->\n  <magic-modal class=\"fill_profile_modal\" data-show=\"profile.show_fill_profile\">\n\n    <div class=\"mb_popup mb_popup_prof\" data-sailplay-fill-profile data-config=\"widget.fill_profile.config\">\n\n      <div class=\"mb_popup_top\">\n        <span class=\"modal_profile_header\">{{ widget.fill_profile.header }}</span>\n      </div>\n\n      <form name=\"fill_profile_form\" class=\"mb_popup_main mb_popup_main_mt\" data-ng-submit=\"sailplay.fill_profile.submit(fill_profile_form, profile.fill_profile);\">\n\n        <div class=\"form_field\" data-ng-repeat=\"field in sailplay.fill_profile.form.fields\" data-ng-switch=\"field.input\">\n\n          <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n            <img width=\"160px\" data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\" alt=\"\">\n          </div>\n\n          <div data-ng-switch-when=\"text\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n          <div data-ng-switch-when=\"date\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <date-picker data-model=\"field.value\"></date-picker>\n          </div>\n\n          <div data-ng-switch-when=\"select\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <div class=\"magic_select form_input\">\n              <select data-ng-model=\"field.value\" data-ng-options=\"item.value as item.text for item in field.data\"></select>\n            </div>\n          </div>\n\n          <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" data-model-view-value=\"true\" data-ui-mask=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n          <div data-ng-switch-when=\"email\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n        </div>\n\n        <div class=\"answ_text\">\n          <button type=\"submit\" class=\"sp_btn button_primary\">{{ 'buttons.texts.save' | tools }}</button>\n        </div>\n      </form>\n    </div>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(264);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./profile.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./profile.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(20);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .bon_profile_wrap {\n  float: left;\n  width: 100%;\n  padding: 0 5%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: #888888;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info {\n  width: 100%;\n  float: left;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n  float: left;\n  width: 580px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h3 {\n  float: left;\n  width: 100%;\n  font-size: 30px;\n  color: #ffffff;\n  font-family: 'RotondaC';\n  margin-top: 50px;\n  margin-bottom: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h4 {\n  float: left;\n  width: 100%;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 400;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n  float: right;\n  width: 265px;\n  margin-top: 50px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right img {\n  -webkit-border-radius: 100%;\n          border-radius: 100%;\n  -webkit-box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right span {\n  font-size: 16px;\n  font-weight: 700;\n  margin-top: 18px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .login_reg_btn {\n  float: right;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .logout_btn {\n  width: auto;\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .edit_profile_btn {\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar {\n  max-width: 81px;\n  float: right;\n  text-align: center;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info {\n  text-align: right;\n  float: left;\n  width: 165px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info span {\n  word-wrap: break-word;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar_image {\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat {\n  float: left;\n  width: 100%;\n  margin-top: 50px;\n  margin-bottom: 78px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed span {\n  color: inherit;\n  font-family: inherit;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed_name {\n  margin-left: 2px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left {\n  float: left;\n  width: auto;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > span {\n  color: #ffffff;\n  display: block;\n  font-size: 33px;\n  font-family: 'RotondaC bold';\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > a {\n  font-size: 14px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n  float: right;\n  width: 70%;\n  margin-top: 12px;\n  margin-right: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line_bg {\n  height: 14px;\n  border-top: 3px solid #000000;\n  background-color: #ffffff;\n  background-image: url(" + escape(__webpack_require__(265)) + ");\n  -webkit-border-radius: 20px;\n          border-radius: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line {\n  position: absolute;\n  left: 0px;\n  top: 3px;\n  width: 0%;\n  background-color: #ffffff;\n  height: 14px;\n  -webkit-border-radius: 20px 0px 0px 20px;\n          border-radius: 20px 0px 0px 20px;\n  -webkit-transition: all 1000ms ease;\n  -o-transition: all 1000ms ease;\n  transition: all 1000ms ease;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text {\n  min-width: 100px;\n  position: absolute;\n  right: 0px;\n  padding-top: 32px;\n  border-right: 1px solid #fff;\n  top: 0px;\n  z-index: 1;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position {\n  right: auto;\n  left: 100%;\n  border-left: 1px solid #fff;\n  border-right: none;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position span {\n  -webkit-border-radius: 0px 5px 5px 0px;\n          border-radius: 0px 5px 5px 0px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text span {\n  float: right;\n  line-height: 30px;\n  background-color: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n  font-size: 14px;\n  font-family: 'RotondaC';\n  -webkit-border-radius: 5px 0px 0px 5px;\n          border-radius: 5px 0px 0px 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item {\n  position: absolute;\n  top: 50%;\n  width: 36px;\n  height: 36px;\n  margin-top: -19px;\n  margin-left: -19px;\n  background-color: #cccccc;\n  -webkit-border-radius: 6px;\n          border-radius: 6px;\n  -webkit-background-size: 20px 22px;\n  background-size: 20px 22px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-top: 3px solid #000000;\n  background-image: url(" + escape(__webpack_require__(266)) + ");\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item.act {\n  background-color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item_hint {\n  opacity: 0;\n  visibility: hidden;\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  top: 0;\n  font-weight: bold;\n  -webkit-transition: .3s ease;\n  -o-transition: .3s ease;\n  transition: .3s ease;\n  color: white;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item:hover .gift_item_hint {\n  visibility: visible;\n  opacity: 1;\n  top: -20px;\n}\n.spm_wrapper .bon_profile_wrap .status_block {\n  width: 30%;\n  display: inline-block;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .bon_profile_wrap .status_block {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_stat .bps_left {\n    text-align: left;\n  }\n}\n@media only screen and (min-width: 1129px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    width: 100%;\n    margin-top: 30px;\n    margin-right: 0px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 60%;\n  }\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text {\n    border: none !important;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text:before {\n    content: '';\n    width: 1px;\n    background: white;\n    right: 0;\n    top: 0;\n    position: absolute;\n    height: 17px;\n    display: block;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text span {\n    position: relative;\n    left: 50%;\n    -webkit-border-radius: 5px !important;\n            border-radius: 5px !important;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n.spm_wrapper .bns_hist_table {\n  float: left;\n  width: 100%;\n  margin-top: 12px;\n}\n.spm_wrapper .bns_hist_table td {\n  vertical-align: text-top;\n  padding: 5px 11px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(1) {\n  color: #888888;\n  font-size: 13px;\n  line-height: 19px;\n  padding-right: 0px;\n  padding-left: 0px;\n  white-space: nowrap;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) {\n  color: #000000;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 19px;\n  position: relative;\n  padding-left: 0px;\n  width: 570px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2)::after {\n  position: absolute;\n  left: 0px;\n  width: 100%;\n  border-top: 1px dotted #444444;\n  top: 14px;\n  content: '';\n  display: block;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span {\n  display: block;\n  position: relative;\n  z-index: 1;\n  font-size: 13px;\n  color: #222222;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span b {\n  background-color: #ffffff;\n  padding-right: 15px;\n  padding-left: 11px;\n  font-weight: 200;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span:first-child {\n  color: #000000;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) {\n  color: #444444;\n  font-size: 14px;\n  font-weight: bold;\n  text-align: right;\n  line-height: 19px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) span {\n  display: block;\n  white-space: nowrap;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager {\n  float: right;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager a {\n  text-decoration: none;\n  color: #000;\n  margin-right: 4px;\n}\n.spm_wrapper .bns_hist_pager a.active {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAOCAYAAAB5EtGGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrslrEKwjAQhptD6tSpTl0UhD6HD6BP6wvkOQqCLk5m6mQnL+WC1xwmZu4FaqQ/+fzvK0LNcX/oKlq3x/0ZvuP9Frdt9V1vzB3Lu2q5XphPlDW4NTzMsEfMR8pq3HYF7LhXETvqNbM3+HGme5aFPW4ndtYXurLcZz3LhwCnUhe8apan2C6wqbQ/2/7JjnuVsm0kc2ZDCPGHh5SQ8DR+CLEpIQm2I/aUEGJTQlivUjbvtWCDCpFsk/vLrE2IP2tUiGQbFSLZoELkzKBC5MygQuTMoELkzKBC5Mwm8+q+OiG+l1EhstdHgAEAt8yVBryjUM8AAAAASUVORK5CYII="

/***/ }),
/* 266 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR9JREFUeNrsVt0NgjAYLIQB6ga4gS4gjsAG6gTKk88++iROIBuAE4BO4AiMwAjeZz6SLw2/EYwPXHJpUq69a/u1QakGnFfhGnRVC6BZEOu+WzWDLmgOoisHg+PzkAiNZs0e1EK3gy5rNKkwkCCTHUiru4FV6QtwCaO87LANAy0MThBSiDkYcZ8PpszS4ATOWJvwqrZyXsdIIZN5ME2NhNrQUFqPtUpsm9dkIrFW7XCZjag6k22XgS2I5JlYZami2XScPOD20kF7J0MHBnSYcY+Uusd2fsLbHRN9g4U9wP63wlY/AJVwWHNz61Bwm/XUjwtL3I9YVM5QJXylR1XeeH+EEn7Qe/aTg59MJpPJ5A9Nxngtc9MkGNjgxf9h6i3AANemSGniswSTAAAAAElFTkSuQmCC"

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACiFJREFUeNrsnV1sVMcVx8/cfPERKku1iVQSYqM2CeajmwawG6qyNoaEUMVrUuWjSmNv1IdQGjBN0qrtQ8hLSvISqKK+2hAIqRTCkoZGIk5YXkJtInlFwOYFvFS2hM1DnTohffFOz9yd+zH3Y+/uvTPXu9BjzV7brO/e+e3/nDN3Zs4CUOX2bHO6Dluymq+RVAGkBB5Ya8S2AVsd/znIsvx4GluOtUMjffmbAiJTFh5S2DqxJTk0WZbncI+zI0KdvqEgIrweDi4V43vWz4AizEzNQuSq68W2S7Liwij0NYTZXzMQqwie05h775YNkyhy27eqDJ6XMtMIM1tVEBEey659PFlENBpXVzIcZqQEpEkCyFx3OBpAajYq/FRec/5UprEkN4bXn5ozJfLYx1y3J6rqaGQlWt0h4bq3DxW5O1aIHOCpMgfGZcBzg6M0GCYhRCbMUO5NQgJMcIB1YQF6wTOgUV81Up9LJvpv3UBJGJDs7qetEpAkXoDe6rPg2X8WQVMfnRmPBkAdGxHhqQapzQ1AKgBkXwVawO8LeJzVv5/l3y+9/26Yd+c8KBRm9bb0/ntgFo+z+vNm+fOKz2V/j2cqHs1QQB3JpyzT+8lDljwl8hOORXdhOzz+e73zVP/dmo1rYGv3o3B+aATaujZAw5IGyI/m9SOzhd9ZaJ5xaOAsZI+dhrMDX+hKJKiJ4pEIR9WKJBUAjJRESgEsMHgdD8GCRfNhx5+3V3z2Ux9k4cSBj+HKxSsITWMo9aM/yIqiWAYhdpV6wi3lnGV1w4NHwo8BqSvjGgAL3O22PPcIwnsB1nWsDfUKTcsbYf3Wh+G2O27TFQxCfHRm8YpBPoD9J+eu5bKhIfKBdG/0+w/x0QC4ZuOPYMfe7RDVbr/jdljRsgKmJqZgbHSMq5DDIpHVmESQpxFkvmJ35olkOAo+txtbLly/5Lvw5rG9GOcWSL0xfqnzd+ja/wKNuTZvEtyaxcUmr/gYlJ37ZHXMCZApsfsPv5QOkNnV8atWtuaKNxJXBKvz46EFuHFClgoFkDgMeQwzcNgYGGQzX80AH+yYX/6D/Yos5bXeo5XIxq9KVyFXQ/336iH9x25l81zt29q44rkKjeYBM4T1lavE3mjzgdRjcGt1JNn1U6WThb1v7oSV61ZwzRt3P7Ts+/EAa+Rzpv4Q+bygfBVSMO9M1ipyY7uxTC0qUIoKDXs1SIk9kvB5aJPqANm4TrWxOxvrNpC/iQ6XpuFhCmrUPGLhrqjwHE5sKoJlZZWx0G6tHS3Wa8t3abBzcioxBRLXRsTZmWInFi5aEAvEu+5eDCI+KvslEkam1vzoyrViJ9i9cZzW2fO4LR7r72rUWOi0bgEiTygJWdDMCS9bPGLjQvssjGprWt5kgeP37CZQOZZyKjGlQoFCsF+0MFYlTo5PeixmeR3D38WwRS47xE45bguO4G0NtBtjyMrOuOheBXTOpkeGucEOMamiI9QGEuQH9+BhjgOfgitIajweJtV1hZqHxUsWxwrxzMl/2uKhsjcxYSgxoQSfzyA3LlvW3ATUFf7kX4cB8YdqU8rc2LLmZeDcUaHi6gyIjfLxiattbduSsdzuCYkFw8eq1lUiPgXvriYvqdCSQNsRYpxjxGJ2vgtWt6y0rsXIyFQNROUuXA3urco0fqfyf4uoxFggXhi8MCcdvDwyFgvEWGxq4tqcQJycmILiqh6x1qNJFUMknr8p7kK4MDgSP8BxvgZtYeQA5VK8VS5C6nG0lPj69jfw/vle+MXOp5XC+/o/38Ch/YfhPIYQIizeE1Cx11+ZOxv7BYuNLaATGBoYgiN/eU9XiEr7/OTnkOk7zlVIgC/dm18qIOZUdojYnZpvMDo/eF4pxHODX1qvZ9v9IOxZJCH2QPhBVFW6JbqPfaubBgMffKbUldnEQxGeZnqDfU+Oe4sdqSZ3Jq5drPZOGNvdWKyaUuTSZ06egesz1/XwoRECxMOVieT0bEDMqlMjmB0wYhPrnCo1fnJ0wFK98ZrEUqRbh0QaxLyqgY4Vm4rNUMeH/R9JB3hp5LItHmriRk8ggQOyqBCvyB8vEk81Gh1kLvfpUblqPNaXMc+v2bVIwGPXrDyQSt1ZVKMLJbyLw51vMBHIUeEl+OR9y5XNJELAU4VEdkyUVSjop0ZrWAFmdiT6AHwKBo5+KuX1Du47JKQP+9AKFCUUbjl7dlaqRs/BIz60bmqVcsr1mx92jFjUxUCHZe0Qj8s8c+BSJP7TqpaVfFkzum3++Sa4s+S6ttdOWSmznKftEDOy8AkbmsydB7ZFK/6EZ3Y+JVUSqedTfLuIdR3BO2UjgZxmH41gQuSf5JELrzt7KZlzzwF1fbE1l1Xm1L0c60p3wrLlTcJONOdOWf9Kq1AwM153LPvDwPPaqmFspTMrpqi16f3FvTtg1xsvSg9ObA3n7Y/2Q/u2dr5fu2Dbt13wBBkR5gH2INSxrG54kKnxBWzzKot4XgU/BswiOL1D+P1v9v5aX7RSaT/e1AKTE5MwNpoXMrQ5l0isK/YaN5LyElLeqI8WIJ67lvsvgmT735Lh4VlBnNrq9hjA9J+64ZFnNscyAGhFkJdHx2Di8gT41q0Q9y2qN0xPkLuRV85vAqI/GKBjKZzXpVh1KmJjFaGPPbcFfta9FeK0XgwZzeuaeTVqsSrVrEK1H6EYeipw87z9E01cZWlIdxrVyHbLtgZlM9FtqbC917jAZNcG+P1fX4GfbF0PcRsrVdv4RDusxATG3Ftfb6HuKhZqE5yfmztUaarQV6diWW6Joh5qG0ToF1cM3vVL6nV4LAMv5iW21WBspvvv/Sf0Et/rM99aU2XmxC2Yc5Duan7TxVGF/U1lRc1iRRV9ywnQyrhixmMFPms71ug1ynHvQwxjgwNDOkzWvkWgIsySNdNtCDFb9r3Qs809w1TfMUYdAI0CRwS38SG9uKcWwPkDPQtn9fYFn9DVPIvQ2bjw8MgBV+3zrQEDmTQ+DhsubACcv2g+vPz2bzFoL4cbwVo61uqN2YkD/4D+1w/qADVSwC5rxsLlNIJMe/19yXrnL6/lrq5uSHyFAB+1V4j+as/zuuveiHZf4gc6sQus+FwcW255d/TgxVLzib6G8t2H+DLGrROrUVZdmzfXlsSEOCuW+b52ZPSdbNCkbOn7E0rTeKIcG7SwGHijGxtR3PvAUuOTTjJ/u3h4T+CkbJC9d/HQNILswndmmg1ebwZjMRJHH0w4aaknfuK+JxMz01//m94ENn5pfPjx73fJ/Vwcm2tH/IirmjD983AwG08rgXgTgKwIYNkx0UWeEPZCTaB4H88cWKZSgKEhcpDshdr8Z31qzvZhn7oqBSjN0L17sdVqwmHXnaqKt5HFSWynagzgMWzVF9drRJVjVaO+EiDrsO2pQpjsenprKlJXEUymvJ6qdN0KgfbwGBSn9cXhtmQu1Anq/xcM9t+LZOIarvxPgAEABz4fqCBZ1lYAAAAASUVORK5CYII="

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _profile_nr = __webpack_require__(269);

var _profile_nr2 = _interopRequireDefault(_profile_nr);

var _history_pagination = __webpack_require__(270);

var _history_pagination2 = _interopRequireDefault(_history_pagination);

__webpack_require__(271);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileNrWidget = {

  id: 'profile_nr',
  template: _profile_nr2.default,
  inject: ['$rootScope', 'SailPlayApi'],
  controller: function controller($rootScope, SailPlayApi) {
    return function (scope, elm, attrs) {

      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function fill_profile(state) {

          scope.profile.show_fill_profile = state || false;
        }
      };
    };
  }

};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(ProfileNrWidget);
}]);

_widget.Widget.run(["$templateCache", function ($templateCache) {
  $templateCache.put('profile_nr.history_pagination', _history_pagination2.default);
}]);

/***/ }),
/* 269 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_profile_nr clearfix\" data-ng-if=\"widget.enabled\" data-ng-cloak data-sailplay-profile>\n\n    <div class=\"spm_profile_nr-left\">\n\n        <div class=\"spm_profile_nr-header\"\n             data-ng-bind=\"user() ? (widget.texts.auth.header + user().user.name) : widget.texts.no_auth.header\"></div>\n        <div class=\"spm_profile_nr-description\"\n             data-ng-bind=\"widget.texts[user() ? 'auth' : 'no_auth'].description\"></div>\n\n        <div class=\"spm_profile_nr-buttons\" data-ng-if=\"user && user()\">\n            <a href=\"#\" class=\"button_primary spm_profile_nr-edit\"\n               data-ng-bind=\"widget.texts.edit\"\n               data-ng-click=\"$event.preventDefault();profile.show_fill_profile=true;\"></a>\n            <a href=\"#\" class=\"button_primary spm_profile_nr-logout\"\n               data-ng-click=\"$event.preventDefault();logout();\"></a>\n        </div>\n\n    </div>\n\n    <div class=\"spm_profile_nr-right\">\n\n        <div data-ng-if=\"user()\">\n\n            <div class=\"spm_profile_nr-avatar\" data-ng-style=\"{'background-image': (user().user.avatar['250x250'] | sailplay_pic | background_image)}\"></div>\n\n            <div class=\"spm_profile_nr-balance\">\n                <div class=\"spm_profile_nr-balance-hover\">\n                    <span class=\"spm_profile_nr-balance-value\" data-ng-bind=\"user().user_points.confirmed | number\"></span>\n                    <span class=\"spm_profile_nr-balance-placeholder\" data-ng-bind=\"widget.texts.balance\"></span>\n                    <a href=\"\" class=\"button_primary spm_profile_nr-history\" data-ng-bind=\"widget.texts.history\"\n                       data-ng-click=\"$event.preventDefault();profile.history=true;\"></a>\n                </div>\n            </div>\n\n        </div>\n\n        <a href=\"#\" class=\"spm_profile_nr-login\"\n           data-ng-if=\"!user()\"\n           data-ng-bind=\"widget.texts.login\"\n           data-ng-click=\"$event.preventDefault();login('remote', {widget: 'profile_nr', action: 'login_button'});\"></a>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_hist\" data-show=\"profile.history\">\n\n        <div data-sailplay-history data-sailplay-profile>\n\n            <h3>\n                <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n                <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n            </h3>\n            <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n            <table class=\"bns_hist_table\">\n\n                <tbody>\n\n                <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n                    <td>\n                        <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n                    </td>\n                    <td>\n                        <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n                    </td>\n                    <td>\n                        <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                    </td>\n                </tr>\n\n                </tbody>\n            </table>\n\n            <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                                     data-template-url=\"profile.history_pagination\"\n                                     data-auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n\n\n    </magic-modal>\n\n    <!--profile edit section-->\n    <magic-modal class=\"fill_profile_modal\" data-show=\"profile.show_fill_profile\">\n\n        <div class=\"mb_popup mb_popup_prof\" data-sailplay-fill-profile data-config=\"widget.fill_profile.config\">\n\n            <div class=\"mb_popup_top\">\n                <span class=\"modal_profile_header\">{{ widget.fill_profile.header }}</span>\n            </div>\n\n            <form name=\"fill_profile_form\" class=\"mb_popup_main mb_popup_main_mt\" data-ng-submit=\"sailplay.fill_profile.submit(fill_profile_form, profile.fill_profile);\">\n\n                <div class=\"form_field\" data-ng-repeat=\"field in sailplay.fill_profile.form.fields\" data-ng-switch=\"field.input\">\n\n                    <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n                        <img width=\"160px\" data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\" alt=\"\">\n                    </div>\n\n                    <div data-ng-switch-when=\"text\" class=\"clearfix\">\n                        <label class=\"form_label\">{{ field.label }}</label>\n                        <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n                    </div>\n\n                    <div data-ng-switch-when=\"date\" class=\"clearfix\">\n                        <label class=\"form_label\">{{ field.label }}</label>\n                        <date-picker data-model=\"field.value\"></date-picker>\n                    </div>\n\n                    <div data-ng-switch-when=\"select\" class=\"clearfix\">\n                        <label class=\"form_label\">{{ field.label }}</label>\n                        <div class=\"magic_select form_input\">\n                            <select data-ng-model=\"field.value\" data-ng-options=\"item.value as item.text for item in field.data\"></select>\n                        </div>\n                    </div>\n\n                    <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n                        <label class=\"form_label\">{{ field.label }}</label>\n                        <input class=\"form_input\" type=\"text\" data-model-view-value=\"true\" data-ui-mask=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n                    </div>\n\n                    <div data-ng-switch-when=\"email\" class=\"clearfix\">\n                        <label class=\"form_label\">{{ field.label }}</label>\n                        <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n                    </div>\n\n                </div>\n\n                <div class=\"answ_text\">\n                    <button type=\"submit\" class=\"sp_btn button_primary\">{{ 'buttons.texts.save' | tools }}</button>\n                </div>\n            </form>\n        </div>\n    </magic-modal>\n\n</div>";

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(272);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./profile_nr.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./profile_nr.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_profile_nr {\n  width: 100%;\n  max-width: 1000px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n}\n.spm_wrapper .spm_profile_nr-left {\n  width: 50%;\n  float: left;\n}\n@media screen and (max-width: 850px) {\n  .spm_wrapper .spm_profile_nr-left {\n    width: 100%;\n  }\n}\n.spm_wrapper .spm_profile_nr-right {\n  width: 50%;\n  text-align: right;\n  float: left;\n}\n@media screen and (max-width: 850px) {\n  .spm_wrapper .spm_profile_nr-right {\n    width: 100%;\n    text-align: center;\n    height: 260px;\n    position: relative;\n  }\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .spm_profile_nr-right {\n    height: auto;\n  }\n}\n.spm_wrapper .spm_profile_nr-header {\n  font-size: 48px;\n  line-height: 1;\n  font-weight: bold;\n  text-transform: uppercase;\n  position: relative;\n}\n.spm_wrapper .spm_profile_nr-description {\n  font-size: 16px;\n  color: grey;\n  font-weight: 300;\n  max-width: 90%;\n  line-height: 23px;\n  margin-top: 20px;\n}\n.spm_wrapper .spm_profile_nr-buttons {\n  margin-top: 20px;\n}\n.spm_wrapper .spm_profile_nr-buttons a {\n  display: inline-block;\n  vertical-align: middle;\n}\n.spm_wrapper .spm_profile_nr-login {\n  display: inline-block;\n  width: 75%;\n  font-size: 20px;\n  height: 110px;\n  text-align: center;\n  line-height: 110px;\n  color: white;\n  text-transform: uppercase;\n  text-decoration: none;\n  -webkit-transition: opacity 0.5s ease;\n  -o-transition: opacity 0.5s ease;\n  transition: opacity 0.5s ease;\n}\n.spm_wrapper .spm_profile_nr-login:hover {\n  opacity: 0.8;\n}\n@media screen and (max-width: 850px) {\n  .spm_wrapper .spm_profile_nr-login {\n    margin-top: 10px;\n  }\n}\n.spm_wrapper .spm_profile_nr-history.button_primary {\n  display: none;\n}\n.spm_wrapper .spm_profile_nr-avatar {\n  position: absolute;\n  width: 176px;\n  height: 176px;\n  right: 220px;\n  top: 50%;\n  margin-top: -88px;\n  text-align: center;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  z-index: 3;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-position: center center;\n  background-repeat: no-repeat;\n  -webkit-box-shadow: 0px 15px 30px 0px rgba(148, 194, 161, 0.44);\n          box-shadow: 0px 15px 30px 0px rgba(148, 194, 161, 0.44);\n}\n.spm_wrapper .spm_profile_nr-avatar:before {\n  content: '';\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border: 5px solid rgba(255, 255, 255, 0.3);\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  display: block;\n  left: -5px;\n  top: -5px;\n}\n@media screen and (max-width: 850px) {\n  .spm_wrapper .spm_profile_nr-avatar {\n    right: 52%;\n  }\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .spm_profile_nr-avatar {\n    position: relative;\n    right: auto;\n    top: auto;\n    margin: 10px auto 0;\n  }\n}\n.spm_wrapper .spm_profile_nr-balance {\n  position: absolute;\n  width: 250px;\n  right: 0;\n  top: 50%;\n  margin-top: -125px;\n  text-align: center;\n  height: 250px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  z-index: 2;\n  background: #43c25c;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(0deg, #43c25c 0%, #2d964c 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: -webkit-gradient(linear, left bottom, left top, from(#43c25c), to(#2d964c));\n  background: -webkit-linear-gradient(bottom, #43c25c 0%, #2d964c 100%);\n  background: -o-linear-gradient(bottom, #43c25c 0%, #2d964c 100%);\n  background: linear-gradient(0deg, #43c25c 0%, #2d964c 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#43c25c', endColorstr='#2d964c', GradientType=1);\n  /* IE6-9 fallback on horizontal gradient */\n}\n.spm_wrapper .spm_profile_nr-balance-value {\n  font-size: 60px;\n  color: white;\n  margin-top: 80px;\n  font-weight: bold;\n  display: block;\n  line-height: 1;\n  text-align: center;\n}\n.spm_wrapper .spm_profile_nr-balance-placeholder {\n  font-size: 16px;\n  color: white;\n  margin-top: 10px;\n  display: block;\n  font-weight: 300;\n  text-align: center;\n}\n.spm_wrapper .spm_profile_nr-balance:hover span {\n  display: none;\n}\n.spm_wrapper .spm_profile_nr-balance:hover .spm_profile_nr-history {\n  margin-top: 105px;\n  display: inline-block;\n}\n.spm_wrapper .spm_profile_nr-balance-hover {\n  text-align: center;\n  display: inline-block;\n}\n@media screen and (max-width: 850px) {\n  .spm_wrapper .spm_profile_nr-balance {\n    right: 23%;\n  }\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .spm_profile_nr-balance {\n    position: relative;\n    right: auto;\n    top: auto;\n    margin: 20px auto;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _statuses = __webpack_require__(274);

var _statuses2 = _interopRequireDefault(_statuses);

__webpack_require__(275);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _widget.WidgetRegister)({
  id: 'statuses',
  template: _statuses2.default,
  inject: ['MAGIC_CONFIG', 'SailPlayApi'],
  controller: function controller(MAGIC_CONFIG, SailPlayApi) {
    return function (scope) {

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = MAGIC_CONFIG.data.statuses;

      scope.user = SailPlayApi.data('load.user.info');
      scope.purchase_status = MAGIC_CONFIG.data.purchase_status;

      scope.get_next_status = function () {

        if (!scope._statuses) return;

        var user = scope.user();

        if (!user) {
          return {
            status: scope._statuses[0],
            offset: scope._statuses[0].points
          };
        }

        var user_points = user.user_points;
        var points = user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;
        if (MAGIC_CONFIG.data.purchase_status) {
          points = user.purchases && user.purchases.sum || 0;
          user_points = user.purchases && user.purchases.sum || 0;
        }

        var future_statuses = scope._statuses.sort(function (a, b) {
          return a.points > b.points;
        }).filter(function (status) {
          return status.points > points;
        });

        return {
          status: future_statuses[0],
          offset: future_statuses[0] && future_statuses[0].points - points || 0
        };
      };
    };
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports) {

module.exports = "<div class=\"clearfix container\">\n\n  <div class=\"status-list\">\n\n    <div class=\"next_status_info\" data-ng-show=\"get_next_status().status\">\n\n      <div class=\"next_status_name\">\n        {{ widget.texts.next_status }} <span data-ng-style=\"{ color: get_next_status().status.color  }\">{{ get_next_status().status.status }}</span>\n      </div>\n\n      <div class=\"next_status_offset\">\n        {{ widget.texts.next_status_offset }} {{ get_next_status().offset }}\n      </div>\n\n    </div>\n\n    <div class=\"status-list__wrapper\" data-sailplay-statuses data-ng-cloak>\n\n      <div class=\"status-list__progress element-progress progress_line\"\n           data-ng-style=\"getProgress(purchase_status ? user().purchases.sum : user().user_points, _statuses)\"></div>\n\n      <div class=\"status-list__item element-item\"\n           data-ng-class=\"{ type_active : item.points <= user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra }\"\n           data-ng-repeat=\"item in _statuses\"\n           data-ng-style=\"generateOffset($index, _statuses)\">\n\n        <div class=\"status-list__item-point element-item-point\"></div>\n\n        <div class=\"element-item-point-inner\" data-ng-style=\"{ backgroundColor: item.color }\"></div>\n\n        <div class=\"status-list__item-name element-item-name\" data-ng-bind=\"item.name\"></div>\n        <div class=\"status-list__item-status element-item-status\" data-ng-if=\"item.status\" data-ng-bind=\"item.status\"\n             style=\"{{ (item.color) ? ('color: ' +  item.color) : '' }}\"></div>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(276);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./statuses.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./statuses.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .status-list {\n  float: left;\n  width: 90%;\n  position: relative;\n  margin: 0 5%;\n  padding: 30px 0 80px;\n  z-index: 1;\n}\n.spm_wrapper .status-list .next_status_info {\n  margin-bottom: 30px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list {\n    width: 80%;\n    margin-left: 10% !important;\n  }\n}\n.spm_wrapper .status-list__wrapper {\n  background: #F4F4F4;\n  position: relative;\n  height: 20px;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  display: block;\n  margin: 0 20px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__wrapper {\n    height: 10px;\n  }\n}\n.spm_wrapper .status-list__item {\n  position: absolute;\n  height: 100%;\n  width: 0;\n}\n.spm_wrapper .status-list__item .element-item-point-inner {\n  z-index: 1;\n  content: '';\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  display: none;\n  margin-top: -15px;\n  margin-left: -15px;\n  top: 50%;\n  left: 50%;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background: #444444;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item .element-item-point-inner {\n    width: 20px;\n    height: 20px;\n    margin: -10px 0 0 -10px;\n  }\n}\n.spm_wrapper .status-list__item-point {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background: #f4f4f4;\n  z-index: -1;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-point {\n    width: 30px;\n    height: 30px;\n  }\n}\n.spm_wrapper .status-list__item-status {\n  display: inline-block;\n  min-width: 100px;\n  left: 0;\n  position: absolute;\n  top: 60px;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 12px;\n    min-width: 100%;\n    top: 50px;\n  }\n}\n.spm_wrapper .status-list__item-name {\n  display: inline-block;\n  min-width: 80px;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 12px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 8px;\n    min-width: 100%;\n    top: 25px;\n  }\n}\n.spm_wrapper .status-list__item.type_active .element-item-point-inner {\n  display: block;\n}\n.spm_wrapper .status-list__progress {\n  height: 10px;\n  position: absolute;\n  width: 0;\n  background: #444444;\n  z-index: 0;\n  top: 5px;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__progress {\n    height: 5px;\n    top: 2.5px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(278);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(279);

var _defaults = __webpack_require__(281);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "example",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["MAGIC_CONFIG", "SailPlay"],
  controller: function controller(MAGIC_CONFIG, SailPlay) {
    return function (scope, elm, attrs) {};
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 278 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_example\">\n\n  <h1>DEMO WIDGET</h1>\n\n</div>";

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(280);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 281 */
/***/ (function(module, exports) {

module.exports = {"id":"example","enabled":true,"styles":{},"options":{}}

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(283);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(284);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "house_happy_badges",
  template: _template2.default,
  inject: [],
  controller: function controller() {
    return function (scope) {
      scope.blank_elements = new Array(10);
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 283 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid spm_badge_list clearfix\" ng-if=\"widget.enabled\" ng-cloak>\n    <div class=\"container\">\n        <div class=\"spm_badge_list-header\" ng-show=\"widget.texts.header\" ng-bind=\"widget.texts.header\"></div>\n        <div class=\"spm_badge_list-sub-header\" ng-show=\"widget.texts.sub_header\" ng-bind=\"widget.texts.sub_header\"></div>\n    </div>\n    <div class=\"spm_badge_list-container\" sailplay-badges sailplay-profile>\n\n        <div class=\"spm_badge_list-list\" ng-show=\"sailplay.badges.list().one_level_badges.length\">\n            <img class=\"spm_badge_list-list-blank\" ng-src=\"{{ widget.images.blank_item }}\" ng-repeat=\"blank in blank_elements track by $index\">\n            <div class=\"spm_badge_list-list-item\" ng-class=\"{is_received: badge.is_received || !user()}\" ng-repeat=\"badge in sailplay.badges.list().one_level_badges\">\n                <img ng-src=\"{{ badge.thumbs.url_250x250 }}\">\n            </div>\n            <img class=\"spm_badge_list-list-blank\" ng-src=\"{{ widget.images.blank_item }}\" ng-repeat=\"blank in blank_elements track by $index\">\n        </div>\n\n        <div ng-repeat=\"line in sailplay.badges.list().multilevel_badges\">\n            <div class=\"spm_badge_list-list\">\n                <img class=\"spm_badge_list-list-blank\" ng-src=\"{{ widget.images.blank_item }}\" ng-repeat=\"blank in blank_elements track by $index\">\n                <div class=\"spm_badge_list-list-item\" ng-class=\"{is_received: badge.is_received || !user()}\" ng-repeat=\"badge in line\">\n                    <img ng-src=\"{{ badge.thumbs.url_250x250 }}\">\n                </div>\n                <img class=\"spm_badge_list-list-blank\" ng-src=\"{{ widget.images.blank_item }}\" ng-repeat=\"blank in blank_elements track by $index\">\n            </div>\n        </div>\n\n    </div>\n</div>";

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(285);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .house_happy_badges .spm_badge_list {\n  position: relative;\n  background: white;\n  padding: 100px 0;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n  text-align: center;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0 0;\n  color: #000000;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-container {\n  padding-top: 50px;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 22.5px 0;\n  width: 100%;\n  overflow: hidden;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_badges .spm_badge_list-list {\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    padding: 75px 0;\n  }\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_badges .spm_badge_list-list-blank {\n    display: none;\n  }\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list-item {\n  margin: 0 10px;\n  position: relative;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list-item img {\n  width: 250px;\n  height: auto;\n  position: relative;\n  z-index: 2;\n  opacity: 0.5;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list-item.is_received:before {\n  content: \"\";\n  display: block;\n  width: 190px;\n  height: 20px;\n  margin: auto;\n  position: absolute;\n  bottom: 15px;\n  left: 20px;\n  right: 0;\n  -webkit-box-shadow: 0 20px 34px 0 rgba(155, 168, 202, 0.9);\n          box-shadow: 0 20px 34px 0 rgba(155, 168, 202, 0.9);\n  -webkit-transform: scale(0);\n      -ms-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  z-index: 1;\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list-item.is_received:hover:before {\n  -webkit-transform: scale(1);\n      -ms-transform: scale(1);\n          transform: scale(1);\n}\n.spm_wrapper .house_happy_badges .spm_badge_list-list-item.is_received img {\n  opacity: 1;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_badges .spm_badge_list-list-item {\n    margin: 20px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(287);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(288);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "house_happy_banner",
  template: _template2.default,
  inject: [],
  controller: function controller() {}
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 287 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid spm_banner clearfix\" ng-if=\"widget.enabled\" ng-cloak>\n    <div class=\"container\">\n        <div class=\"spm_banner_item\" ng-repeat=\"banner in widget.options.data track by $index\" ng-style=\"{backgroundImage: (banner.image | background_image)}\">\n            <div class=\"spm_banner_item-text\" ng-bind-html=\"banner.text | to_trusted\"></div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(289);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .house_happy_banner .spm_banner {\n  position: relative;\n}\n.spm_wrapper .house_happy_banner .spm_banner-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n}\n.spm_wrapper .house_happy_banner .spm_banner_item {\n  margin: 20px 0;\n  position: relative;\n  min-height: 100px;\n  background-position: center center;\n  -webkit-background-size: cover;\n          background-size: cover;\n  background-repeat: no-repeat;\n  padding: 15px 10px;\n  width: 100%;\n  color: white;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n", ""]);

// exports


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(291);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(292);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "house_happy_gifts",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "$interpolate"],
  controller: function controller($rootScope, SailPlay, $interpolate) {
    return function (scope, elm, attrs) {
      scope.show_gift = false;
      scope.requested_gift = false;
      scope.request_message = '';

      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          var data = {};
          var d = new Date();
          data[scope.show_gift.name + " response " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()] = scope.request_message;
          data.response = scope.request_message;
          data.sku = res.gift_sku;
          SailPlay.send('vars.add', { custom_vars: data }, function (vars_res) {
            $rootScope.$apply(function () {
              if (vars_res && vars_res.status == 'ok') {
                scope.requested_gift = angular.copy(scope.show_gift);
                scope.show_gift = false;
              } else {
                $rootScope.$broadcast('notifier:notify', {
                  header: widget.texts.modals.error.title,
                  body: vars_res.message || widget.texts.modals.error.body
                });
              }
            });
          });
        });
      });

      SailPlay.on('gift.purchase.error', function (error) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.requested_gift = false;
          $rootScope.$broadcast('notifier:notify', {
            header: widget.texts.modals.error.title,
            body: error.message || widget.texts.modals.error.body
          });
        });
      });

      scope.getGift = function (gift) {
        if (!gift || !scope.request_message || !scope.request_message.length) return;
        SailPlay.send('gifts.purchase', {
          gift: gift
        });
      };

      $rootScope.$on("gift:state", function (e, state) {
        scope.show_gift = state && angular.copy(state);
        scope.request_message = '';
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 291 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid spm_gifts clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile sailplay-gifts>\n\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"spm_gifts-container col\">\n\n        <div class=\"spm_gifts-header\" ng-show=\"widget.texts.header\" ng-bind=\"widget.texts.header\"></div>\n        <div class=\"spm_gifts-sub-header\" ng-show=\"widget.texts.sub_header\" ng-bind=\"widget.texts.sub_header\"></div>\n\n        <div class=\"spm_gifts-list\">\n\n          <div class=\"spm_gifts-item\"\n               ng-style=\"{'background-image' : ('linear-gradient(to bottom, rgba(155, 155, 155, 0), rgba(47, 51, 54, 0.99)), url('+ (gift.thumbs.url_250x250 | sailplay_pic) + ')') }\"\n               ng-repeat=\"gift in gifts() track by $index\"\n               ng-mouseenter=\"gift.actived=true\"\n               ng-mouseleave=\"gift.actived=false\"\n               ng-class=\"{type_disabled: gift.points>user().user_points.confirmed, type_enabled: gift.points<=user().user_points.confirmed, type_hovered: gift.actived}\">\n            <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n            <a href=\"#\" class=\"spm_gifts-item-button type_recieve\" ng-bind=\"widget.texts.get\"\n               ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n            <div class=\"spm_gifts-item-button type_points\"\n                 ng-bind=\"(gift.points|number)+' '+(gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n  <magic-modal show=\"$parent.$parent.show_gift\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.gift.title\"></magic-modal-title>\n    <magic-modal-body>\n      <div class=\"spm_gifts-open\">\n        <i class=\"spm_gifts-open-image\"\n           ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n        <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\"></div>\n        <div class=\"spm_gifts-open-points\"\n             ng-bind=\"($parent.show.points|number) + ' ' + ($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n        <div class=\"spm_gifts-open-descr\" ng-bind=\"$parent.show.descr\"></div>\n        <label class=\"spm_gifts-open-textarea\">\n          <span ng-bind=\"widget.texts.modals.gift.message_label\"></span>\n          <textarea ng-model=\"$parent.$parent.$parent.$parent.request_message\" placeholder=\"{{widget.texts.modals.gift.message_placeholder}}\"></textarea>\n        </label>\n        <a href=\"#\" class=\"spm_gifts-open-button spm_btn theme_1 type_filled type_big\"\n           ng-class=\"{type_disabled: !request_message || !request_message.length}\"\n           ng-bind=\"widget.texts.modals.gift.button\" ng-click=\"$event.preventDefault();getGift($parent.show)\"></a>\n      </div>\n    </magic-modal-body>\n    <magic-modal-footer>\n      <div class=\"spm_gifts-footer\" ng-bind-html=\"widget.texts.modals.success.footer | to_trusted\"></div>\n    </magic-modal-footer>\n  </magic-modal>\n\n  <magic-modal class=\"spm_gifts-success-modal\" show=\"$parent.$parent.requested_gift\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body>\n      <div class=\"spm_gifts-open\">\n        <i class=\"spm_gifts-open-image\"\n           ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n        <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\"></div>\n        <div class=\"spm_gifts-open-descr\" ng-bind-html=\"widget.texts.modals.success.body | to_trusted\"></div>\n      </div>\n    </magic-modal-body>\n    <magic-modal-footer>\n      <div class=\"spm_gifts-footer\" ng-bind-html=\"widget.texts.modals.success.footer | to_trusted\"></div>\n    </magic-modal-footer>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(293);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .house_happy_gifts .spm_gifts {\n  position: relative;\n  background: white;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 60px 0 80px;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-flex-basis: 20%;\n      -ms-flex-preferred-size: 20%;\n          flex-basis: 20%;\n  padding-right: 30px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 60px;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-container__right {\n  -webkit-flex-basis: 80%;\n      -ms-flex-preferred-size: 80%;\n          flex-basis: 80%;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0 0;\n  color: #000000;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100%;\n  margin-top: 50px;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n@media (max-width: 1200px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-list {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  width: 100%;\n  max-width: 280px;\n  min-height: 280px;\n  margin: 0 8px;\n  color: #ffffff;\n  width: 23%;\n  margin: 1%;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-transition: box-shadow 0.3s linear;\n  -o-transition: box-shadow 0.3s linear;\n  -webkit-transition: -webkit-box-shadow 0.3s linear;\n  transition: -webkit-box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear, -webkit-box-shadow 0.3s linear;\n}\n@media (max-width: 1200px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-item {\n    width: 31.3%;\n  }\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-item {\n    width: 48%;\n  }\n}\n@media (max-width: 600px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-item {\n    width: 100%;\n    margin: 1% 1% 5% 1%;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item-name {\n  margin: 0 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  text-align: center;\n  font-size: 18px;\n  color: white;\n  line-height: 24px;\n  text-shadow: 0 2px 4px #353535;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item-placeholder {\n  font-size: 22px;\n  font-weight: normal;\n  line-height: 1.45;\n  color: inherit;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item-button {\n  margin: 15px 0 30px;\n  position: relative;\n  text-align: center;\n  border: solid 1px #58aaf7;\n  font-size: 14px;\n  line-height: 1.38;\n  letter-spacing: 1.6px;\n  color: white;\n  padding: 10px 20px;\n  width: auto;\n  min-width: 180px;\n  text-transform: uppercase;\n  text-decoration: none;\n  -webkit-border-radius: 19.5px;\n          border-radius: 19.5px;\n  background-color: #58aaf7;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item-button.type_points {\n  display: block;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item-button.type_recieve {\n  display: none;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item.type_disabled .spm_gifts-item-button {\n  color: black;\n  background: white;\n  border-color: white;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item:hover.type_enabled {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_points {\n  display: none;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_recieve {\n  display: block;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-pagination {\n  margin-top: 50px;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-pagination .spm_pagination {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-pagination .spm_pagination {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-pagination .spm_pagination-direction-link {\n  color: #809797;\n  margin: 0;\n  font-size: 40px;\n  font-weight: 100;\n  line-height: 46px;\n  width: 50px;\n  height: 50px;\n  -webkit-border-radius: 3px;\n          border-radius: 3px;\n  border: solid 1px #809797;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-pagination .spm_pagination-direction-link:first-child {\n  -webkit-border-top-right-radius: 0;\n          border-top-right-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n          border-bottom-right-radius: 0;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-pagination .spm_pagination-direction-link:last-child {\n  border-left: none;\n  -webkit-border-top-left-radius: 0;\n          border-top-left-radius: 0;\n  -webkit-border-bottom-left-radius: 0;\n          border-bottom-left-radius: 0;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-footer {\n  width: 380px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-footer {\n    width: 100%;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 380px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .house_happy_gifts .spm_gifts-open {\n    width: 100%;\n  }\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-image {\n  width: 200px;\n  height: 200px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  margin: 10px 0;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #ca5b54;\n  text-align: center;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-descr {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 25px;\n  margin: 20px 0 30px;\n  color: #000000;\n  opacity: 0.5;\n  text-align: center;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-button.type_disabled {\n  background-color: #b3bcc3;\n  color: #8e9cab;\n  border-color: #b3bcc3;\n  cursor: default;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-button.type_disabled:hover {\n  opacity: 1;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-textarea {\n  display: block;\n  width: 100%;\n  margin-bottom: 25px;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-textarea span {\n  display: block;\n  margin-bottom: 10px;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-open-textarea textarea {\n  resize: none;\n  width: 100%;\n  height: 100px;\n  padding: 8px;\n  font-size: 14px;\n}\n.spm_wrapper .house_happy_gifts .spm_gifts-success-modal .spm_modal-container {\n  max-width: 500px;\n}\n", ""]);

// exports


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(295);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(296);

var _avatar = __webpack_require__(298);

var _avatar2 = _interopRequireDefault(_avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "house_happy_profile",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayProfileForm"],
  controller: function controller($rootScope, SailPlay, SailPlayProfileForm) {
    return function (scope, elm, attrs) {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;
      scope.show_info = false;
      scope.show_text = false;
      scope.lock_profile = false;
      scope.menu_active = false;
      scope.default_avatar = _avatar2.default;

      scope.force_fill_profile = false;

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.config);

      if (scope.widget.options.fill_profile_required) {

        scope.profile_form.completed().then(function (is_completed) {

          if (!is_completed) {

            scope.force_fill_profile = true;
            scope.show_profile = true;

            scope.lock_profile = true;
          }
        });
      }

      $rootScope.$on("text:state", function (e, state) {
        scope.show_text = state;
      });

      $rootScope.$on("info:state", function (e, state) {
        scope.show_info = state;
      });

      $rootScope.$on("profile:state", function (e, state, lock) {
        scope.show_profile = state;
        scope.lock_profile = lock;
      });

      $rootScope.$on("history:state", function (e, state) {
        scope.show_history = state;
      });

      scope.onSaveProfile = function (e, data) {
        if (data && data.status == "error") {
          $rootScope.$broadcast('notifier:notify', {
            header: scope.widget.texts.error,
            body: scope.widget.options.config.errors[data.status_code || data.message] || data.message
          });
        } else {
          scope.lock_profile = false;
          scope.force_fill_profile = false;
        }
        scope.show_profile = false;
        scope.$apply();
      };

      var closeMenu = function closeMenu() {
        console.log('closeMenu', scope.menu_active);
        if (scope.force_fill_profile) return;
        scope.$apply(function () {
          scope.menu_active = false;
        });
      };

      document.body.addEventListener('click', closeMenu);

      // $timeout(() => {
      //   if(scope.widget.options.fill_profile_required && !scope.sailplay.fill_profile.form.valid()) {
      //
      //     $rootScope.$broadcast('profile:state', true);
      //
      //   }
      // }, 10);

      // check params
      var params = SailPlay.url_params();
      if (params.openProfile) {
        scope.show_profile = true;
      }

      scope.$on('$destroy', function () {
        document.body.removeEventListener('click', closeMenu);
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 295 */
/***/ (function(module, exports) {

module.exports = "<section class=\"container-fluid spm_profile profile clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n  <div class=\"container state_authorized\" data-ng-if=\"user()\">\n    <div class=\"row align-items-center spm_profile_inner\">\n      <div class=\"col\">\n        <div class=\"position-relative d-flex align-items-start b-avatar mb-3\">\n          <div class=\"position-relative\">\n            <img ng-src=\"{{ widget.images.default_avatar }}\" class=\"rounded-circle cursor-pointer b-avatar-image\" ng-click=\"$root.$broadcast('profile:state', true)\">\n            <div class=\"spm_profile-welcome-name\" data-ng-if=\"widget.options.show_name\">\n              {{ widget.texts.hi }} {{ user().user.name || widget.texts.no_name }}\n            </div>\n          </div>\n\n          <div class=\"b-avatar-menu position-relative d-flex align-items-center\" ng-class=\"{type_active: $parent.$parent.menu_active}\"\n            data-spm-click-outside=\"$parent.$parent.menu_active = false;\">\n            <div class=\"b-avatar-menu__icon rounded-circle d-flex bg-primary cursor-pointer align-items-center\" ng-click=\"$event.stopPropagation();$event.preventDefault();$parent.$parent.menu_active=!$parent.$parent.menu_active\">\n              <img class=\"mw-100 h-50\" ng-src=\"{{widget.images.icon_dots}}\">\n            </div>\n            <div class=\"b-avatar-menu__list position-relative d-flex align-items-left bg-white flex-column\">\n              <a href=\"#\" class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\" ng-click=\"$event.stopPropagation();$event.preventDefault();$root.$broadcast('profile:state', true);$parent.$parent.menu_active=false\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_profile}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_my_profile\"></span>\n              </a>\n              <a href=\"#\" data-ng-if=\"widget.options.auth_type === 'remote'\" class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\"\n                data-ng-click=\"$event.preventDefault(); logout(); $parent.$parent.menu_active=false\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_logout}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_logout\"></span>\n              </a>\n              <a href=\"#\" data-ng-if=\"widget.options.auth_type === 'auth_hash'\" class=\"b-avatar-menu__item d-flex align-items-center font-weight-light text-dark py-3 pl-4 pr-5\"\n                ng-href=\"{{widget.options.logout_link}}\">\n                <i class=\"b-avatar-menu__item-icon\">\n                  <img class=\"mw-100 h-75\" ng-src=\"{{widget.images.icon_logout}}\">\n                </i>\n                <span ng-bind=\"widget.texts.menu_logout\"></span>\n              </a>\n            </div>\n          </div>\n        </div>\n        <h1 class=\"display-4 text-uppercase font-weight-bolder spm_profile-header\" ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n        <p class=\"my-4 font-weight-light spm_profile-subheader\" ng-bind-html=\"widget.texts.sub_header|to_trusted\"></p>\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold learn_more_button\" href=\"#\" role=\"button\" target=\"_blank\"\n          ng-click=\"$event.preventDefault();$root.$broadcast('text:state', true)\" ng-bind=\"widget.texts.button_text\"></a>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"container state_unauthorized\" data-ng-if=\"!user()\">\n    <div class=\"row align-items-center spm_profile_inner\">\n      <div class=\"col\">\n        <h1 class=\"display-4 text-uppercase font-weight-bolder\" ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n        <p class=\"my-4 font-weight-light\" ng-bind-html=\"widget.texts.sub_header|to_trusted\"></p>\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold profile_login_button\" href=\"#\" role=\"button\" target=\"_blank\"\n          ng-href=\"{{widget.options.login_link}}\" ng-bind=\"widget.texts.login_button_text\"></a>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"spm_profile-right\">\n    <div class=\"spm_profile-status-circle\" ng-show=\"user()\" ng-click=\"$parent.$parent.show_history=true\">\n      <div class=\"spm_profile-status-circle_name\" ng-bind=\"user().user_status.name || widget.texts.without_status\"></div>\n      <div class=\"spm_profile-status-circle_points-value\" ng-bind=\"user().user_points.confirmed | number\"></div>\n      <div class=\"spm_profile-status-circle_points-placeholder\" ng-bind=\"widget.texts.bonus_points\"></div>\n    </div>\n  </div>\n\n  <magic-modal ng-show=\"!$parent.show_profile\" show=\"$parent.$parent.show_info\">\n    <magic-modal-title>\n      <div class=\"b-avatar\">\n        <img ng-src=\"{{user().user.avatar['250x250']|sailplay_pic}}\" class=\"rounded-circle\">\n      </div>\n      <span class=\"spm_profile-info-modal-name b-name d-block my-5 text-black\" ng-bind=\"user().user.name && user().user.name + ' ' + (user().user.middle_name | nullVariable) || widget.texts.no_name_profile_title\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n\n      <div data-ng-repeat=\"field in profile_form.form.fields\" data-ng-if=\"field.value && field.name !== 'firstName' && field.name !== 'lastName' && field.name !== 'middleName'\"\n        data-ng-switch=\"field.input\">\n\n        <!-- uncomment for subscriptions field -->\n        <!--<div class=\"b-info pb-3 pt-3 pr-3 d-flex flex-column flex-column-light align-items-center spm_profile-info-modal-field spm_form_field\" data-ng-switch-when=\"subscriptions\">-->\n        <!--<label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.email === 1 }\">-->\n        <!--<input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.email\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>-->\n        <!--<span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.email_label\"></span>-->\n        <!--</label>-->\n        <!--<label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value.sms === 1 }\">-->\n        <!--<input class=\"spm_form_checkbox_input\" type=\"checkbox\" data-ng-model=\"field.value.sms\" data-ng-true-value=\"1\" data-ng-false-value=\"0\" disabled>-->\n        <!--<span class=\"spm_form_checkbox_label\" data-ng-bind=\"field.data.sms_label\"></span>-->\n        <!--</label>-->\n        <!--</div>-->\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\"\n          data-ng-switch-default>\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"field.value.split('  ').join(', ')\"></span>\n        </div>\n\n        <div class=\"b-info pb-3 pt-3 pl-3 pr-3 d-flex align-items-center flex-column flex-column-light spm_profile-info-modal-field\"\n          data-ng-switch-when=\"select\">\n          <img class=\"spm_profile-info-modal-field-icon\" data-ng-if=\"field.icon\" ng-src=\"{{ field.icon }}\">\n          <span class=\"mt-2 spm_profile-info-modal-field-value\" ng-bind=\"profile_form.get_selected_value(field).text\"></span>\n        </div>\n\n      </div>\n\n      <!--<div ng-show=\"user().user.email\" class=\"b-info mb-5 pt-3 d-flex align-items-center flex-column flex-column-light\">-->\n      <!--<img ng-src=\"{{widget.images.icon_email}}\">-->\n      <!--<span class=\"mt-2\" ng-bind=\"user().user.email\"></span>-->\n      <!--</div>-->\n\n      <!--<div ng-show=\"user().user.phone\" class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n      <!--<img ng-src=\"{{widget.images.icon_phone}}\">-->\n      <!--<span class=\"mt-2\" ng-bind=\"user().user.phone|tel\"></span>-->\n      <!--</div>-->\n\n      <!--<div ng-show=\"user().user.birth_date\" class=\"b-info mb-5 d-flex align-items-center flex-column flex-column-light\">-->\n      <!--<img ng-src=\"{{widget.images.icon_bday}}\">-->\n      <!--<span class=\"mt-2\" ng-bind=\"user().user.birth_date|date:'d MMMM yyyy'\"></span>-->\n      <!--</div>-->\n\n      <div class=\"b-info d-flex align-items-center justify-content-center spm_profile-edit-profile-button\">\n        <a class=\"btn btn-md btn-primary text-uppercase px-3 py-2 font-weight-bold\" href=\"#\" role=\"button\" ng-click=\"$event.preventDefault();$root.$broadcast('profile:state', true)\"\n          ng-bind=\"widget.texts.edit_profile\"></a>\n      </div>\n\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal ng-if=\"user()\" on-close=\"revert_profile_form\" show=\"$parent.$parent.$parent.show_profile\" prevent-close=\"lock_profile\">\n    <magic-modal-title ng-bind-html=\"widget.texts.modals.profile.title|to_trusted\"></magic-modal-title>\n    <magic-modal-body>\n\n      <form name=\"ng_profile_form\" class=\"spm_profile-form\" ng-submit=\"profile_form.submit(ng_profile_form, onSaveProfile);\">\n\n        <div class=\"spm_form_field\" ng-repeat=\"field in profile_form.form.fields\" ng-switch=\"field.input\">\n\n          <div ng-switch-when=\"text\">\n            <input class=\"spm_form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"date\">\n            <label class=\"spm_form_label \" ng-bind=\"field.label\"></label>\n            <date-picker ng-model=\"field.value\" ng-required=\"field.required\"></date-picker>\n          </div>\n\n          <div ng-switch-when=\"phone\">\n            <input class=\"spm_form_input\" type=\"text\" ui-mask=\"{{ field.placeholder }}\" ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n          <div ng-switch-when=\"email\">\n            <input class=\"spm_form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" ng-model=\"field.value\" ng-required=\"field.required\">\n            <label class=\"spm_form_label type_absolute\">{{ field.label }}</label>\n          </div>\n\n          <div ng-switch-when=\"select\">\n            <select class=\"spm_form_select\" ng-model=\"field.value\" ng-options=\"item.value as item.text for item in field.data\" ng-required=\"field.required\"></select>\n            <label class=\"spm_form_label type_absolute\" ng-bind=\"field.label\"></label>\n          </div>\n\n        </div>\n\n        <div class=\"spm_form_buttons\">\n          <button class=\"spm_btn theme_1 type_big type_cancel font-weight-bold\" ng-click=\"$parent.close()\" ng-bind=\"widget.texts.modals.profile.cancel\"></button>\n          <input type=\"submit\" class=\"spm_btn theme_1 type_filled type_big font-weight-bold\" ng-value=\"widget.texts.modals.profile.save\"\n          />\n        </div>\n\n      </form>\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal show=\"$parent.$parent.show_history\">\n    <magic-modal-title>\n      <span class=\"d-block text-left\" ng-bind=\"widget.texts.modals.history.title\"></span>\n    </magic-modal-title>\n    <magic-modal-body>\n      <div sailplay-history>\n\n        <table class=\"spm_profile-history\" ng-show=\"history().length\">\n          <tbody>\n            <tr dir-paginate=\"item in history() | itemsPerPage:5\" pagination-id=\"history_pages\">\n              <td class=\"type_lighter\" ng-bind=\"item.action_date | date:'d MMM yyyy'\"></td>\n              <td>\n                <div ng-bind=\"item|history_item\"></div>\n              </td>\n              <td></td>\n              <!--<td ng-class=\"{type_positive:item.points_delta>0, type_negative:item.points_delta<0}\"-->\n              <!--ng-bind=\"item.points_delta?(item.points_delta|number):''\"></td>-->\n            </tr>\n          </tbody>\n        </table>\n\n        <dir-pagination-controls max-size=\"7\" direction-links=\"false\" pagination-id=\"history_pages\" template-url=\"magic.pagination\"\n          auto-hide=\"true\"></dir-pagination-controls>\n\n        <div ng-hide=\"history().length\" ng-bind=\"widget.texts.modals.history.empty\"></div>\n\n      </div>\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal show=\"$parent.$parent.show_text\">\n    <magic-modal-title ng-bind-html=\"widget.texts.modals.text.title|to_trusted\"></magic-modal-title>\n    <magic-modal-body ng-bind-html=\"widget.texts.modals.text.body|to_trusted\"></magic-modal-body>\n  </magic-modal>\n\n</section>";

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(297);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .house_happy_profile .spm_profile {\n  position: relative;\n  background-repeat: repeat;\n  background-position: left top;\n  -webkit-background-size: 180px auto;\n          background-size: 180px auto;\n  background-image: url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/3983f7460fc0267d020abcd09a748848.png);\n}\n.spm_wrapper .house_happy_profile .spm_profile-right {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 50%;\n  height: 100%;\n  background-position: left center;\n  background-repeat: no-repeat;\n  -webkit-background-size: cover;\n          background-size: cover;\n}\n@media (min-width: 1200px) {\n  .spm_wrapper .house_happy_profile .spm_profile-right {\n    width: -webkit-calc(50% + 100px);\n    width: calc(50% + 100px);\n  }\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-right {\n    position: relative;\n    height: 300px;\n    width: 100%;\n    margin: 0 0 10%;\n  }\n}\n@media (max-width: 400px) {\n  .spm_wrapper .house_happy_profile .spm_profile-right {\n    margin: 50px 0 10%;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-circle {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  width: 290px;\n  height: 290px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-shadow: 0 2px 88px 0 rgba(9, 4, 38, 0.58);\n          box-shadow: 0 2px 88px 0 rgba(9, 4, 38, 0.58);\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  right: 0;\n  left: 0;\n  cursor: pointer;\n  background-image: url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/ac8c16dbae091547b21f6151ec405b27.png);\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: cover;\n          background-size: cover;\n}\n@media (min-width: 851px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-circle {\n    right: 5%;\n    left: auto;\n  }\n}\n@media (min-width: 992px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-circle {\n    right: auto;\n    left: 0;\n  }\n}\n@media (max-width: 350px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-circle {\n    width: 230px;\n    height: 230px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-circle_name {\n  font-family: 'Open Sans';\n  font-size: 24px;\n  font-weight: bold;\n  letter-spacing: 1.8px;\n  text-align: center;\n  text-transform: uppercase;\n  color: #233e51;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-circle_points-value {\n  margin-top: 20px;\n  font-family: 'Open Sans';\n  font-size: 70px;\n  font-weight: bold;\n  line-height: 0.86;\n  text-align: center;\n  color: #233e51;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-circle_points-placeholder {\n  margin-top: 18px;\n  font-family: 'Open Sans';\n  font-size: 20px;\n  line-height: 1.4;\n  text-align: center;\n  color: #233e51;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-name {\n  letter-spacing: 2px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .spm_profile_inner {\n  height: 625px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile .spm_profile_inner {\n    text-align: center;\n  }\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile .b-avatar {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar img {\n  width: 115px;\n  height: 115px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu {\n  margin-left: -15px;\n  z-index: 2;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu {\n    margin-top: 25px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__icon {\n  width: 45px;\n  height: 45px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__icon:hover {\n  -webkit-box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n          box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__item {\n  text-decoration: none;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__item-icon {\n  width: 24px;\n  height: 24px;\n  margin-right: 10px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__item:hover {\n  background-color: rgba(88, 131, 154, 0.1);\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__list {\n  opacity: 0;\n  visibility: hidden;\n  z-index: 2;\n  margin-left: -5px;\n  -webkit-box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n          box-shadow: -20px 10px 40px 0 rgba(38, 124, 160, 0.3);\n  position: absolute !important;\n  min-width: 200px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu__list:before {\n  right: 100%;\n  top: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(255, 255, 255, 0);\n  border-right-color: #ffffff;\n  border-width: 10px;\n  margin-top: -10px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-avatar .b-avatar-menu.type_active .b-avatar-menu__list {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-info {\n  min-width: 340px;\n  max-width: 100%;\n  width: 100%;\n  margin: 0 auto;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile .b-info {\n    min-width: 0;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile .b-info img {\n  max-height: 24px;\n}\n.spm_wrapper .house_happy_profile .spm_profile .btn {\n  letter-spacing: 1.6px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-welcome-name {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  left: 150%;\n  min-width: 200px;\n}\n@media (max-width: 420px) {\n  .spm_wrapper .house_happy_profile .spm_profile {\n    padding: 40px 35px;\n  }\n  .spm_wrapper .house_happy_profile .spm_profile-welcome-name {\n    left: 0;\n    width: auto;\n    top: 120%;\n    min-width: 280px;\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n  }\n  .spm_wrapper .house_happy_profile .spm_profile-header {\n    margin-top: 65px;\n  }\n  .spm_wrapper .house_happy_profile .spm_profile .spm_modal-content-body {\n    min-width: 0 !important;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 80px 30px 160px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-welcome {\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: 20px;\n  line-height: 25px;\n  color: #000000;\n  margin-bottom: 10px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-welcome {\n    font-size: 16px;\n    line-height: 20px;\n    text-align: center;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 45px;\n  line-height: 55px;\n  color: #000000;\n  max-width: 660px;\n  margin-bottom: 40px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-header {\n    font-size: 20px;\n    line-height: 26px;\n    text-align: center;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 750px) {\n  .spm_wrapper .house_happy_profile .spm_profile-content {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-points {\n  width: 280px;\n  height: 280px;\n  background: #ca5b54;\n  color: #ffffff;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 50px 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-confirmed {\n  font-size: 48px;\n  line-height: 38px;\n  margin-bottom: 10px;\n  font-weight: 800;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-placeholder {\n  font-size: 23px;\n  line-height: 27px;\n  font-weight: 800;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-unconfirmed {\n  font-size: 18px;\n  line-height: 21px;\n  font-weight: 800;\n  margin: 10px 0 20px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-unconfirmed-block {\n  opacity: 0.5;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-tooltip {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  line-height: 14px;\n  border: 1px solid #ffffff;\n  color: #ffffff;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  text-align: center;\n  margin-left: 10px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-tooltip div {\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  margin-bottom: 16px;\n  width: 212px;\n  margin-left: -106px;\n  background: #ffffff;\n  padding: 0 20px;\n  -webkit-box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n          box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n  transition: 0.3s linear;\n  font-size: 14px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-weight: 500;\n  line-height: 16px;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-tooltip div:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: -14px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 14px 12px 0 12px;\n  border-color: #ffffff transparent transparent transparent;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-points-tooltip div:after {\n    bottom: -12px;\n    left: auto;\n    right: 30px;\n  }\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-points-tooltip div {\n    margin-left: -170px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-points-tooltip:hover div {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-weight: 800;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status i {\n  width: 150px;\n  height: 150px;\n  margin-right: 20px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-color: #ffffff;\n  border: 8px solid #ffffff;\n  margin-left: -15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status i {\n    margin-left: 0;\n    margin-bottom: 10px;\n    margin-right: 0;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-info {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-placeholder {\n  font-size: 18px;\n  line-height: 25px;\n  color: #ca5b54;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-name {\n  font-size: 25px;\n  line-height: 25px;\n  color: #ca5b54;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-descr {\n  font-size: 18px;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status .spm_btn {\n  margin-top: 15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    margin-top: 30px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-history {\n  max-width: 100%;\n  margin: 0 auto;\n  width: 420px;\n  margin-bottom: 35px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td {\n  color: #000000;\n  font-weight: 500;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td.type_lighter {\n  opacity: 0.2;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td.type_positive {\n  color: #ca5b54;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td div {\n  line-height: 24px;\n  padding-right: 10px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td:nth-child(1) {\n  width: 100px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history td:nth-child(3) {\n  min-width: 80px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .house_happy_profile .spm_profile-history thead td {\n  line-height: 30px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-history tbody tr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .house_happy_profile .spm_profile-history tbody tr:first-child {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .house_happy_profile .spm_profile-history tbody td {\n  line-height: 80px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .house_happy_profile .spm_profile-history {\n    width: 100%;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-form {\n  max-width: 100%;\n  width: 340px;\n  margin: 0 auto;\n  padding-top: 24px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.spm_wrapper .house_happy_profile .spm_profile-form input[type=\"submit\"] {\n  margin-top: 20px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .house_happy_profile .spm_profile-form {\n    width: 100%;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-block-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  background: #ffffff;\n}\n.spm_wrapper .house_happy_profile .spm_profile-block-wrapper .spm_profile-container {\n  padding: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 30px;\n}\n.spm_wrapper .house_happy_profile .spm_profile-block-wrapper-close {\n  width: 21px;\n  height: 21px;\n  right: 50px;\n  top: 25px;\n  position: absolute;\n  cursor: pointer;\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n}\n.spm_wrapper .house_happy_profile .spm_profile-block-wrapper-close:hover {\n  opacity: 0.7;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-block-wrapper-close {\n    top: 100px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-list {\n  color: #ffffff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-list {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item {\n    margin-top: 20px;\n    -webkit-flex-basis: 50%;\n        -ms-flex-preferred-size: 50%;\n            flex-basis: 50%;\n  }\n}\n@media (max-width: 300px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-tooltip {\n  position: absolute;\n  z-index: 2;\n  left: 0;\n  top: -25%;\n  width: 100%;\n  font-size: 17px;\n  line-height: 22px;\n  color: #000000;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: translateY(-20%);\n      -ms-transform: translateY(-20%);\n          transform: translateY(-20%);\n  -webkit-transition: 0.3s linear;\n  -moz-transition: 0.3s linear;\n  -ms-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-tooltip {\n    font-size: 12px;\n    line-height: 16px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-image {\n  width: 138px;\n  height: 138px;\n  -webkit-border-radius: 50%;\n          border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #ffffff;\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  border: 8px solid white;\n  display: block;\n  z-index: 1;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-image {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 650px) {\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  text-transform: uppercase;\n  color: #ca5b54;\n  margin-top: 25px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-name {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-name {\n    margin-top: 10px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-descr {\n  text-align: center;\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 24px;\n  color: #000000;\n  opacity: 0.3;\n  margin: 10px 0;\n  max-width: 138px;\n  margin-bottom: 20px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-descr {\n    font-size: 13px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-descr {\n    margin-bottom: 10px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-value {\n  text-align: center;\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-value {\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item-progress {\n  position: absolute;\n  height: 8px;\n  background: white;\n  width: 100%;\n  top: 70px;\n  right: -85%;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-progress {\n    left: 8vw;\n    width: 120px;\n    height: 6px;\n    top: 35px;\n    right: auto;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item-progress {\n    display: none;\n  }\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item.type_active .spm_profile-status-item-image {\n  background-color: #ca5b54;\n  border-color: #ca5b54;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item.type_active .spm_profile-status-item-progress:after {\n  content: '';\n  background: #ca5b54;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  display: block;\n}\n.spm_wrapper .house_happy_profile .spm_profile-status-item.type_active.type_filled .spm_profile-status-item-progress:after {\n  width: 100%;\n}\n@media (min-width: 650px) {\n  .spm_wrapper .house_happy_profile .spm_profile-status-item:hover .spm_profile-status-item-tooltip {\n    opacity: 0.5;\n    visibility: visible;\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 298 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,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"

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(300);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(301);

var _defaults = __webpack_require__(303);

var _defaults2 = _interopRequireDefault(_defaults);

var _pagination = __webpack_require__(304);

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "pivko_history",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["MAGIC_CONFIG", "SailPlay", "SailPlayProfileHistory"],
  controller: function controller(MAGIC_CONFIG, SailPlay, SailPlayProfileHistory) {
    return function (scope, elm, attrs) {

      scope.history = new SailPlayProfileHistory();
    };
  }
};

_widget.Widget.run(["$templateCache", function ($templateCache) {
  $templateCache.put("pivko.history.pagination", _pagination2.default);
}]);

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 300 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_pivko_history_wrapper\">\n\n  <div class=\"spm_pivko_history_wrapper_inner\">\n\n    <div class=\"spm_pivko_history_list\">\n\n      <div class=\"spm_pivko_history_list_inner\">\n\n        <div class=\"spm_pivko_history_list_title\">\n          <span>{{ widget.options.texts.history_title }}</span>\n        </div>\n\n        <div class=\"spm_pivko_history_list_empty\" data-ng-if=\"history.empty()\">\n\n          <div class=\"spm_pivko_history_list_empty_title\">\n            <span>{{ widget.options.texts.empty_list_title }}</span>\n          </div>\n\n          <div class=\"spm_pivko_history_list_empty_button\">\n            <a href=\"{{ widget.options.empty_list_button_link }}\" target=\"_blank\">{{ widget.options.texts.empty_list_button }}</a>\n          </div>\n\n        </div>\n\n        <div class=\"spm_pivko_history_list_items\" data-ng-if=\"!history.empty()\">\n\n          <div class=\"spm_pivko_history_list_item\" data-dir-paginate=\"item in history.list() | itemsPerPage:5\" data-pagination-id=\"history_pages\">\n\n            <div class=\"spm_pivko_history_list_item_header clearfix {{ item.action }}\" data-ng-click=\"history.purchase_info(item);\" data-ng-class=\"{ opened: history.info.purchases[item.id] }\">\n\n              <div class=\"spm_pivko_history_list_item_header_title\">\n\n                <span>\n                  {{ item|history_item }} {{ item.action_date | date:'d MMM yyyy' }}\n                </span>\n\n                <span class=\"spm_pivko_history_list_item_header_open_button\" data-ng-if=\"item.action === 'purchase'\" data-ng-class=\"{ opened: history.info.purchases[item.id] }\">&rsaquo;</span>\n\n              </div>\n\n              <div data-ng-if=\"item.price\" class=\"spm_pivko_history_list_item_header_points\">\n\n                <span>\n                  {{ item.price|number }} <span class=\"spm_pivko_history_currency_symbol\">{{ widget.options.texts.currency_symbol }}</span>\n                </span>\n\n              </div>\n\n            </div>\n\n            <div class=\"spm_pivko_history_list_item_info\" data-ng-class=\"{ spm_opened: history.info.purchases[item.id] }\">\n\n              <ul class=\"spm_pivko_history_list_item_info_cart\">\n                <li class=\"spm_pivko_history_list_item_info_cart_position\" data-ng-repeat=\"cart_item in history.info.purchases[item.id].cart.cart.positions\">\n                  <div class=\"spm_pivko_history_list_item_info_cart_position_inner clearfix\">\n                    <div class=\"spm_pivko_history_list_item_info_cart_position_name\">\n                      <span>{{ cart_item.product.name || cart_item.product.sku }}</span>\n                    </div>\n                    <div class=\"spm_pivko_history_list_item_info_cart_position_price\">\n                      <span>{{ cart_item.new_price }} {{ widget.options.texts.currency_symbol }}</span>\n                    </div>\n                  </div>\n                </li>\n              </ul>\n\n            </div>\n\n            <div class=\"spm_pivko_history_list_item_body\">\n\n              <div class=\"spm_pivko_history_list_item_body_points\">\n\n                <div class=\"spm_pivko_history_list_item_body_points_debited\" data-ng-if=\"item.debited_points_delta\">\n                  <span>\n                    {{ widget.options.texts.points_debited }} {{ (item.debited_points_delta || 0 | number)+' '+(item.debited_points_delta|sailplay_pluralize:('points.texts.pluralize'|tools)) }}\n                  </span>\n                </div>\n\n                <div class=\"spm_pivko_history_list_item_body_points_credited\" data-ng-if=\"item.points_delta\">\n                  <span>\n                    {{ widget.options.texts.points_credited }} {{ (item.points_delta || 0 |number)+' '+(item.points_delta|sailplay_pluralize:('points.texts.pluralize'|tools)) }}\n                  </span>\n                </div>\n\n                <div data-ng-if=\"item.expiry_info\" class=\"spm_pivko_history_list_item_body_points_expire\">\n                  <div data-ng-repeat=\"expiry in item.expiry_info\">\n                    <span>\n                      {{ widget.options.texts.expire_text | interpolate:expiry }}\n                    </span>\n                  </div>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n          <div class=\"spm_pivko_history_list_pagination\">\n\n            <dir-pagination-controls max-size=\"7\" pagination-id=\"history_pages\" direction-links=\"true\" template-url=\"pivko.history.pagination\" auto-hide=\"true\"></dir-pagination-controls>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class=\"spm_pivko_history_help\">\n\n      <div class=\"spm_pivko_history_help_inner\">\n\n        <div class=\"spm_pivko_history_help_title\">\n          <span>{{ widget.options.texts.help_title }}</span>\n        </div>\n\n        <div class=\"spm_pivko_history_help_links\">\n\n          <div class=\"spm_pivko_history_help_links_inner\">\n\n            <div class=\"spm_pivko_history_help_links_item\" data-ng-repeat=\"link in widget.options.links\">\n\n              <div class=\"spm_pivko_history_help_links_item_inner\">\n                <a href=\"{{ link.url }}\" target=\"_blank\">\n\n                  <span class=\"spm_pivko_history_help_links_item_icon\">\n                    <img data-ng-src=\"{{ link.icon }}\" alt=\"?\">\n                  </span>\n\n                  <span class=\"spm_pivko_history_help_links_item_text\">\n                    <span>{{ link.text }}</span>\n                  </span>\n\n                </a>\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>";

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(302);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@media (min-width: 768px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_wrapper {\n    width: 100%;\n    display: table;\n    border-collapse: separate;\n  }\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_wrapper_inner {\n    display: table-row;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list {\n  background-color: #ffffff;\n  padding-top: 30px;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list {\n    width: 68%;\n    display: table-cell;\n    vertical-align: top;\n    border-right: 20px solid transparent;\n    -webkit-background-clip: padding-box;\n            background-clip: padding-box;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list {\n    margin-bottom: 15px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_title {\n  font-size: 20px;\n  font-weight: bold;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_title {\n    font-size: 20px;\n    padding: 0 30px;\n    line-height: 23px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_empty {\n  margin-top: 10px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_empty_title span {\n  font-size: 20px;\n  font-weight: 300;\n  color: #888888;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_empty_button {\n  margin-top: 20px;\n  margin-bottom: 30px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_empty_button a {\n  display: inline-block;\n  font-size: 14px;\n  padding: 15px 50px;\n  -webkit-border-radius: 25px;\n          border-radius: 25px;\n  border: none;\n  background-color: #cccccc;\n  outline: none;\n  text-decoration: none;\n  color: #222222;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_empty_button a:visited {\n  color: #222222;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_items {\n  padding: 20px 50px;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_items {\n    padding: 20px 15px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header {\n  padding: 10px 0;\n  border-bottom: 1px solid #888888;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header.opened {\n  border-bottom: none;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header.purchase {\n  cursor: pointer;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_title {\n  float: left;\n  text-align: left;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_title span {\n  font-size: 18px;\n  line-height: 21px;\n  color: #444444;\n  font-weight: normal;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_item_header_title span {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_open_button {\n  display: inline-block;\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n  margin-left: 10px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_open_button.opened {\n  -webkit-transform: rotate(-90deg) translateY(-15%);\n      -ms-transform: rotate(-90deg) translateY(-15%);\n          transform: rotate(-90deg) translateY(-15%);\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info {\n  max-height: 0;\n  overflow-y: hidden;\n  -webkit-transition: max-height 0.5s ease-in-out;\n  -o-transition: max-height 0.5s ease-in-out;\n  transition: max-height 0.5s ease-in-out;\n  -webkit-transition-delay: -0.4s;\n       -o-transition-delay: -0.4s;\n          transition-delay: -0.4s;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info.spm_opened {\n  max-height: 2000px;\n  overflow-y: hidden;\n  -webkit-transition: max-height 0.5s ease-in-out;\n  -o-transition: max-height 0.5s ease-in-out;\n  transition: max-height 0.5s ease-in-out;\n  -webkit-transition-delay: 0s;\n       -o-transition-delay: 0s;\n          transition-delay: 0s;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart {\n  display: block;\n  list-style: none;\n  padding: 20px;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  background-color: #eeeeee;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart {\n    padding: 15px 10px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position {\n  text-align: left;\n  margin-bottom: 5px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position:last-child {\n  margin-bottom: 0;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_name {\n  float: left;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_name span {\n  font-size: 14px;\n  line-height: 16px;\n  color: #444444;\n  font-weight: 300;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_name span {\n    font-size: 12px;\n    line-height: 14px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_price {\n  float: right;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_price span {\n  font-size: 14px;\n  line-height: 16px;\n  color: #444444;\n  font-weight: 300;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_item_info_cart_position_price span {\n    font-size: 12px;\n    line-height: 14px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_points {\n  float: right;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_header_points span {\n  font-size: 18px;\n  line-height: 21px;\n  color: #444444;\n  font-weight: normal;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_list_item_header_points span {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_body {\n  text-align: left;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_body_points {\n  margin: 10px 0;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_list_item_body_points span {\n  font-size: 14px;\n  line-height: 16px;\n  color: #888888;\n  font-weight: 300;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_pagination {\n  margin-top: 30px;\n  text-align: left;\n  margin-bottom: 10px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_pagination a {\n  display: inline-block;\n  font-size: 14px;\n  line-height: 16px;\n  font-weight: 300;\n  color: #444444;\n  padding: 10px;\n  text-decoration: none;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  margin-right: 2px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_pagination a:visited {\n  color: #444444;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_pagination a:first-child {\n  margin-left: -10px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_pagination_page_link.type_active,\n.spm_wrapper .pivko_history .spm_pivko_history_pagination_page_link:hover {\n  background-color: #eeeeee;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_inner {\n  background-color: #ffffff;\n  padding: 30px 0;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_history .spm_pivko_history_help {\n    width: 32%;\n    display: table-cell;\n    vertical-align: top;\n    -webkit-background-clip: padding-box;\n            background-clip: padding-box;\n  }\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_title {\n  font-size: 20px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_links {\n  margin-top: 10px;\n  padding: 10px 40px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_links a {\n  color: #444444;\n  display: block;\n  position: relative;\n  text-align: left;\n  padding: 15px 0 15px 40px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_links a:visited {\n  color: #444444;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_links_item_icon {\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top: -13px;\n}\n.spm_wrapper .pivko_history .spm_pivko_history_help_links_item_icon img {\n  width: 24px;\n  height: 24px;\n  display: block;\n}\n", ""]);

// exports


/***/ }),
/* 303 */
/***/ (function(module, exports) {

module.exports = {"id":"example","enabled":true,"styles":{},"options":{}}

/***/ }),
/* 304 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_pivko_history_pagination\" ng-if=\"1 < pages.length || !autoHide\">\n\n  <a ng-if=\"directionLinks\" class=\"spm_pivko_history_pagination_direction_link\" ng-class=\"{disabled : pagination.current == 1}\" href=\"#\"\n     ng-click=\"$event.preventDefault();setCurrent(pagination.current - 1)\">\n    &lsaquo;&lsaquo;\n  </a>\n\n  <a ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" class=\"spm_pivko_history_pagination_page_link\" ng-class=\"{type_active : pagination.current == pageNumber, type_disabled : pageNumber == '...'}\"\n     href=\"#\" ng-click=\"$event.preventDefault();setCurrent(pageNumber)\" ng-bind=\"pageNumber\"></a>\n\n  <a ng-if=\"directionLinks\" class=\"spm_pivko_history_pagination_direction_link\" ng-class=\"{disabled : pagination.current == pagination.last}\"\n     href=\"#\" ng-click=\"$event.preventDefault();setCurrent(pagination.current + 1)\">\n    &rsaquo;&rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(306);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(307);

var _defaults = __webpack_require__(314);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import DefaultAvatarImage from './avatar.gif';

var widget = {
  id: "pivko_profile",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["SailPlayProfile", "MAGIC_CONFIG", "SailPlayProfileForm", "SailPlayStatuses"],
  controller: function controller(SailPlayProfile, MAGIC_CONFIG, SailPlayProfileForm, SailPlayStatuses) {
    return function (scope, elm, attrs) {

      scope.profile = new SailPlayProfile();

      scope.profile_form = new SailPlayProfileForm(scope.widget.options.profile_form);

      scope.profile_form_utils = {

        show: false,
        error: '',
        open: function open() {
          scope.profile_form_utils.show = true;
        },
        close: function close(form) {
          scope.profile_form.revert(form);
          scope.profile_form_utils.show = false;
        },
        complete: function complete(e, data) {
          console.log(e, data);

          if (data && data.status == "error") {

            scope.profile_form_utils.error = scope.widget.options.texts.errors[data.status_code || data.message] || data.message;
          } else {
            scope.profile_form_utils.show = false;
            scope.profile_form_utils.error = '';
          }
          scope.$apply();
        }
      };

      scope.statuses = new SailPlayStatuses.TYPES[scope.widget.options.statuses.type](scope.widget.options.statuses);

      console.log(scope.statuses);
      // scope.default_avatar = DefaultAvatarImage;
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 306 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_pivko_profile_wrapper\">\n\n  <div class=\"spm_pivko_profile_wrapper_inner\">\n\n    <div class=\"spm_pivko_profile_info\">\n\n      <div class=\"spm_pivko_profile_info_inner\">\n\n        <div class=\"spm_pivko_profile_info_avatar\">\n          <img data-ng-src=\"{{(profile.user().user.avatar['250x250']|sailplay_pic) || widget.options.images.default_avatar || default_avatar}}\" alt=\"\">\n        </div>\n\n        <div class=\"spm_pivko_profile_info_name\">\n          <span>{{ profile.user().user.name || widget.options.texts.no_name }}</span>\n        </div>\n\n        <div class=\"spm_pivko_profile_info_oid\">\n\n          <div class=\"spm_pivko_profile_info_oid_label\">\n            <span>{{ widget.options.texts.oid_label }}</span>\n          </div>\n\n          <div class=\"spm_pivko_profile_info_oid_value\">\n            <span>{{ profile.user().user.origin_user_id || widget.options.texts.no_oid }}</span>\n          </div>\n\n        </div>\n\n        <div class=\"spm_pivko_profile_info_divider\"></div>\n\n        <div class=\"spm_pivko_profile_info_email\">\n          <span>{{ profile.user().user.email || widget.options.texts.no_email }}</span>\n        </div>\n\n        <div class=\"spm_pivko_profile_info_phone\">\n          <span>{{(profile.user().user.phone | masked:widget.options.phone_mask) || widget.options.texts.no_phone }}</span>\n        </div>\n\n        <div class=\"spm_pivko_profile_info_edit_button\">\n          <button type=\"button\" data-ng-click=\"profile_form_utils.open()\">{{ widget.options.texts.profile_button_text }}</button>\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class=\"spm_pivko_profile_status\">\n      <div class=\"spm_pivko_profile_status_inner\">\n\n        <div class=\"spm_pivko_profile_status_points\">\n\n          <div class=\"spm_pivko_profile_status_points_inner\">\n\n            <div class=\"spm_pivko_profile_status_points_title\">\n              <span>{{ widget.options.texts.points_title }}</span>\n            </div>\n\n            <div class=\"spm_pivko_profile_status_points_confirmed\">\n              <span>{{ profile.user().user_points.confirmed }} {{ profile.user().user_points.confirmed | sailplay_pluralize: ('points.texts.pluralize' | tools) }}</span>\n            </div>\n\n            <div class=\"spm_pivko_profile_status_points_status\">\n              <div class=\"spm_pivko_profile_status_points_status_label\">\n                <span>{{ widget.options.texts.status_label }}</span>\n              </div>\n              <div class=\"spm_pivko_profile_status_points_status_value\">\n                <span>{{ statuses.received().status || widget.options.texts.no_status }}</span>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <!-- DESKTOP PROGRESS -->\n        <div class=\"spm_pivko_profile_status_progress\">\n\n          <div class=\"spm_pivko_profile_status_progress_inner\">\n\n            <div class=\"spm_pivko_profile_status_progress_title\">\n              <span>Копи в следущем месяце больше</span>\n            </div>\n\n            <div class=\"spm_pivko_profile_status_progress_more_button\">\n              <a href=\"{{ widget.options.info_url }}\" target=\"_blank\">Подробнее ></a>\n            </div>\n\n            <div class=\"spm_pivko_profile_status_progress_line_container\">\n\n              <div class=\"spm_pivko_profile_status_progress_line\">\n\n                <div class=\"spm_pivko_profile_status_progress_line_start\"></div>\n\n                <div class=\"spm_pivko_profile_status_progress_line_wrapper\">\n                  <div class=\"spm_pivko_profile_status_progress_line_filled\" data-ng-style=\"{ width: statuses.progress() + '%' }\"></div>\n                </div>\n\n                <div class=\"spm_pivko_profile_status_progress_line_end\" data-ng-if=\"statuses.progress() === 100\"></div>\n\n                <div class=\"spm_pivko_profile_status_progress_line_list\">\n\n                  <!-- STATUS ITEM -->\n                  <div class=\"spm_pivko_profile_status_progress_line_item\" data-ng-repeat=\"status in statuses.list\" data-ng-class=\"{ current: statuses.current() === status }\" data-ng-style=\"{ left: statuses.offset($index) + '%' }\">\n\n                    <div class=\"spm_pivko_profile_status_progress_line_item_icon\">\n                      <img class=\"spm_pivko_profile_status_progress_line_item_icon_inactive\" data-ng-src=\"{{ status.img_inactive }}\" alt=\"\">\n                      <img class=\"spm_pivko_profile_status_progress_line_item_icon_active\" data-ng-src=\"{{ status.img_active }}\" alt=\"\">\n                      <img class=\"spm_pivko_profile_status_progress_line_item_icon_current\" data-ng-src=\"{{ status.img_current }}\" alt=\"\">\n                    </div>\n\n                    <div class=\"spm_pivko_profile_status_progress_line_item_name\">\n                      <span>\n                        {{ status.status }}\n                      </span>\n                    </div>\n\n                    <div class=\"spm_pivko_profile_status_progress_line_item_tooltip\">\n                      <div class=\"spm_pivko_profile_status_progress_line_item_tooltip_inner\">\n\n                        <div class=\"spm_pivko_profile_status_progress_line_item_tooltip_header\">\n\n                          <span class=\"spm_pivko_profile_status_progress_line_item_tooltip_header_start\">{{ widget.options.texts.status_tooltip_header_start }}</span>\n                          <span class=\"spm_pivko_profile_status_progress_line_item_tooltip_header_status\">\n                            {{ statuses.current().status || widget.options.texts.no_status }}\n                          </span>\n                          <span class=\"spm_pivko_profile_status_progress_line_item_tooltip_header_end\">{{ widget.options.texts.status_tooltip_header_end }}</span>\n\n                        </div>\n\n                        <div class=\"spm_pivko_profile_status_progress_line_item_tooltip_offset\" data-ng-if=\"statuses.current() !== status\">\n\n                          <span>{{ widget.options.texts.status_offset_label }}</span>\n                          <br>\n                          <span class=\"spm_pivko_profile_status_progress_line_item_tooltip_offset_points\">{{ statuses.offset_to(status) }} {{ statuses.offset_to(status) | sailplay_pluralize: ('points.texts.pluralize' | tools) }}</span>\n\n                        </div>\n\n                      </div>\n                    </div>\n\n                  </div>\n                  <!-- /////////// -->\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <!-- MOBILE PROGRESS -->\n        <div class=\"spm_pivko_profile_status_progress_mobile\">\n\n          <div class=\"spm_pivko_profile_status_progress_mobile_inner\">\n\n            <div class=\"spm_pivko_profile_status_progress_mobile_item\" data-ng-repeat=\"status in statuses.list\" data-ng-class=\"{ current: statuses.current() === status }\">\n\n              <div class=\"spm_pivko_profile_status_progress_mobile_item_inner\">\n\n                <div class=\"spm_pivko_profile_status_progress_mobile_item_icon\">\n                  <img class=\"spm_pivko_profile_status_progress_mobile_item_icon_inactive\" data-ng-if=\"statuses.current() !== status\" data-ng-src=\"{{ status.img_inactive }}\" alt=\"\">\n                  <!--<img class=\"spm_pivko_profile_status_progress_line_item_icon_active\" data-ng-src=\"{{ status.img_active }}\" alt=\"\">-->\n                  <img class=\"spm_pivko_profile_status_progress_mobile_item_icon_current\" data-ng-if=\"statuses.current() === status\" data-ng-src=\"{{ status.img_current }}\" alt=\"\">\n                </div>\n\n                <div class=\"spm_pivko_profile_status_progress_mobile_item_info\">\n\n                  <div class=\"spm_pivko_profile_status_progress_mobile_item_info_text\">\n\n                    <span data-ng-bind-html=\"status.description | to_trusted\"></span>\n\n                  </div>\n\n                  <div class=\"spm_pivko_profile_status_progress_mobile_item_info_offset\" data-ng-if=\"statuses.current() !== status\">\n\n                    <span>{{ widget.options.texts.status_offset_label }}</span>\n                    <br>\n                    <span class=\"spm_pivko_profile_status_progress_mobile_item_info_offset_points\">{{ statuses.offset_to(status) }} {{ statuses.offset_to(status) | sailplay_pluralize: ('points.texts.pluralize' | tools) }}</span>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n</div>\n\n<magic-modal-center class=\"spm_pivko_profile_modal\" on-close=\"profile_form_utils.close\" data-show=\"profile_form_utils.show\">\n  <magic-modal-title>\n    <div class=\"spm_pivko_profile_modal_title\">\n      <span ng-bind-html=\"widget.options.texts.profile_modal_title|to_trusted\"></span>\n    </div>\n  </magic-modal-title>\n  <magic-modal-body>\n\n    <div class=\"spm_pivko_profile_modal_errors\" data-ng-if=\"profile_form_utils.error\">\n      <span>{{ profile_form_utils.error }}</span>\n    </div>\n\n    <form name=\"ng_profile_form\" class=\"spm_profile-form\"\n          ng-submit=\"profile_form.submit(ng_profile_form, profile_form_utils.complete);\">\n\n      <div class=\"spm_form_field\" ng-repeat=\"field in profile_form.form.fields\"\n           ng-switch=\"field.input\">\n\n        <div ng-switch-when=\"text\">\n          <input class=\"spm_form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\"\n                 ng-model=\"field.value\" ng-required=\"field.required\">\n        </div>\n\n        <div ng-switch-when=\"date\">\n          <input class=\"spm_form_input\" type=\"date\"\n                 data-spm-date-input ng-model=\"field.value\" placeholder=\"{{ field.placeholder }}\"\n                 min=\"{{ field.data.min_date }}\" max=\"{{ field.data.max_date }}\"\n                 ng-required=\"field.required\">\n        </div>\n\n        <div ng-switch-when=\"phone\">\n          <input class=\"spm_form_input\" type=\"text\"\n                 ui-mask=\"{{ field.placeholder }}\" ng-model=\"field.value\"\n                 ng-required=\"field.required\">\n        </div>\n\n        <div ng-switch-when=\"email\">\n          <input class=\"spm_form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\"\n                 ng-model=\"field.value\" ng-required=\"field.required\">\n        </div>\n\n        <div ng-switch-when=\"select\">\n          <select class=\"spm_form_select\" ng-model=\"field.value\"\n                  ng-options=\"item.value as item.text for item in field.data\" ng-required=\"field.required\"></select>\n        </div>\n\n        <div data-ng-switch-when=\"radio\" class=\"spm_form_radio_field\">\n          <div class=\"d-inline-block align-top\" style=\"width: 25%;\">\n            <label class=\"spm_form_label\" ng-bind=\"field.label\"></label>\n          </div>\n          <div class=\"d-inline-block align-top\" style=\"width: 73%;\">\n            <label class=\"spm_form_checkbox\" data-ng-class=\"{ checked: field.value === item.value }\" data-ng-repeat=\"item in field.data\">\n              <input class=\"spm_form_checkbox_input\" type=\"radio\" data-ng-model=\"field.value\" data-ng-value=\"item.value\">\n              <span class=\"spm_form_checkbox_label\" data-ng-bind=\"item.text\"></span>\n            </label>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"spm_form_buttons\">\n        <button type=\"submit\" class=\"spm_btn spm_pivko_profile_modal_save_button\" data-ng-disabled=\"ng_profile_form.$invalid\">{{ widget.options.texts.profile_modal_save_button }}</button>\n      </div>\n\n    </form>\n\n  </magic-modal-body>\n</magic-modal-center>";

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(308);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(20);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .pivko_profile .spm_pivko_profile_wrapper {\n  text-align: left;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_wrapper {\n    width: 100%;\n    display: table;\n    border-collapse: separate;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_wrapper {\n    display: block;\n  }\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_wrapper_inner {\n    display: table-row;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_wrapper_inner {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info {\n  display: inline-block;\n  font-size: 16px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background-color: #ffffff;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_info {\n    width: 20%;\n    display: table-cell;\n    vertical-align: top;\n    border-right: 20px solid transparent;\n    -webkit-background-clip: padding-box;\n            background-clip: padding-box;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_info {\n    border-right: none;\n    display: block;\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n    width: 100%;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_avatar {\n  text-align: center;\n  padding: 25px 50px 10px 50px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_avatar img {\n  width: 120px;\n  height: 120px;\n  -webkit-border-radius: 60px;\n          border-radius: 60px;\n  display: inline-block;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_name {\n  text-align: center;\n  padding: 5px 30px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_name span {\n  font-size: 20px;\n  line-height: 23px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_oid {\n  text-align: center;\n  padding: 5px 20px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_oid_label {\n  font-size: 14px;\n  font-weight: 300;\n  color: #888888;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_oid_value {\n  font-size: 14px;\n  font-weight: 400;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_divider {\n  margin: 0 20px 10px 20px;\n  border-top: 1px solid #cccccc;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_email {\n  text-align: center;\n  padding: 0 20px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_email span {\n  font-size: 16px;\n  font-weight: 300;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_phone {\n  text-align: center;\n  padding: 0 20px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_phone span {\n  font-size: 16px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_edit_button {\n  text-align: center;\n  padding: 20px 30px 30px 30px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_edit_button button {\n  border: none;\n  outline: none;\n  font-size: 16px;\n  font-weight: 300;\n  background-color: transparent;\n  cursor: pointer;\n  color: #888888;\n  padding-left: 20px;\n  position: relative;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_info_edit_button button:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top: -9px;\n  width: 15px;\n  height: 15px;\n  -webkit-background-size: contain;\n          background-size: contain;\n  background-position: center center;\n  background-image: url(" + escape(__webpack_require__(309)) + ");\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status {\n  display: inline-block;\n  font-size: 16px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background-color: #ffffff;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status {\n    width: 80%;\n    display: table-cell;\n    vertical-align: top;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0;\n    margin-bottom: 15px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points {\n  background-color: #eeeeee;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_inner {\n  padding: 50px;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_inner {\n    padding: 30px 30px 70px 30px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_title {\n  font-size: 18px;\n  text-align: right;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_title {\n    text-align: center;\n    font-size: 14px;\n    line-height: 16px;\n    margin-bottom: 10px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_confirmed {\n  text-align: right;\n  font-size: 48px;\n  font-weight: bold;\n  line-height: 100%;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_confirmed {\n    text-align: center;\n    font-size: 36px;\n    line-height: 42px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status {\n  margin-top: 10px;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status {\n    margin-top: 5px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status_label {\n  text-align: right;\n  font-size: 14px;\n  font-weight: bold;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status_label {\n    text-align: center;\n    font-weight: normal;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status_value {\n  text-align: right;\n  font-size: 16px;\n  font-weight: bold;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_points_status_value {\n    text-align: center;\n    font-size: 14px;\n  }\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress {\n    display: none;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_title {\n  text-align: center;\n  margin: 15px auto 0 auto;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_title {\n    padding: 10px 50px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_title span {\n  font-size: 18px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_more_button {\n  text-align: center;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_more_button a {\n  display: inline-block;\n  border: none;\n  outline: none;\n  font-size: 12px;\n  font-weight: 300;\n  background-color: transparent;\n  cursor: pointer;\n  color: #888888;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_more_button a:visited {\n  color: #888888;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_more_button a {\n    font-size: 14px;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line {\n  margin: 40px 50px 70px 50px;\n  height: 6px;\n  -webkit-border-radius: 3px;\n          border-radius: 3px;\n  position: relative;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_wrapper {\n  position: absolute;\n  left: 10%;\n  width: 80%;\n  height: 100%;\n  background-color: #eeeeee;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_start {\n  position: absolute;\n  left: 0;\n  top: 0;\n  -webkit-border-radius: 3px 0 0 3px;\n          border-radius: 3px 0 0 3px;\n  height: 6px;\n  width: 10%;\n  background-color: #888888;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_end {\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-border-radius: 0 3px 3px 0;\n          border-radius: 0 3px 3px 0;\n  height: 6px;\n  width: 10%;\n  background-color: #888888;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_filled {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  background-color: #888888;\n  -webkit-transition: all 0.4s ease;\n  -o-transition: all 0.4s ease;\n  transition: all 0.4s ease;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_list {\n  position: absolute;\n  width: 80%;\n  left: 10%;\n  height: 100%;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item {\n  position: absolute;\n  width: 50px;\n  height: 80px;\n  top: -23px;\n  margin-left: -25px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon img {\n  width: 100%;\n  display: block;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon_active,\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon_current {\n  display: none !important;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_name {\n  text-align: center;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_name span {\n  font-size: 12px;\n  color: #888888;\n  font-weight: 300;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip {\n  position: absolute;\n  bottom: 130%;\n  min-width: 220px;\n  max-width: 250px;\n  left: 50%;\n  -webkit-transform: translate(-50%, 0);\n      -ms-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  -webkit-transition: opacity 0.1s ease;\n  -o-transition: opacity 0.1s ease;\n  transition: opacity 0.1s ease;\n  opacity: 0;\n  visibility: hidden;\n  background-color: #ffffff;\n  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);\n          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  background-image: url(" + escape(__webpack_require__(310)) + ");\n  background-position: center 20px;\n  -webkit-background-size: 20px 20px;\n          background-size: 20px 20px;\n  background-repeat: no-repeat;\n  padding-top: 30px;\n  z-index: 1;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip:after {\n  content: \"\";\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  background: #ffffff;\n  -webkit-transform: rotate(-135deg);\n      -ms-transform: rotate(-135deg);\n          transform: rotate(-135deg);\n  bottom: -9px;\n  margin-left: -10px;\n  left: 50%;\n  -webkit-box-shadow: -2px -2px 5px -2px rgba(0, 0, 0, 0.5);\n          box-shadow: -2px -2px 5px -2px rgba(0, 0, 0, 0.5);\n  z-index: -1;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_inner {\n  padding: 20px;\n  text-align: center;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_offset {\n  font-weight: 300;\n  font-size: 14px;\n  line-height: 16px;\n  color: #444444;\n  margin-top: 5px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_offset_points {\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_header {\n  line-height: 16px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_header span {\n  font-size: 14px;\n  line-height: 14px;\n  font-weight: 300;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_tooltip_header_status {\n  font-weight: normal !important;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item:hover .spm_pivko_profile_status_progress_line_item_tooltip {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item.current .spm_pivko_profile_status_progress_line_item_name span {\n  font-weight: 600;\n  color: #444444;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item.current .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon_current {\n  display: block !important;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item.current .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon_active,\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item.current .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_line_item_icon_inactive {\n  display: none !important;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile {\n  padding: 15px;\n  text-align: left;\n}\n@media (min-width: 768px) {\n  .spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile {\n    display: none;\n  }\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item {\n  border: 2px solid #cccccc;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  margin-bottom: 15px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item.current {\n  border: 2px solid #888888;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_icon {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  left: 20px;\n  width: 45px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_icon img {\n  display: block;\n  width: 100%;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_info {\n  font-weight: 300;\n  font-size: 14px;\n  line-height: 16px;\n  color: #444444;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_info_offset {\n  margin-top: 15px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_info_offset_points {\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_status_progress_mobile_item_inner {\n  padding: 15px 30px 15px 90px;\n  position: relative;\n  min-height: 100px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal_title {\n  text-align: center;\n  margin-bottom: 25px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal_title span {\n  font-size: 20px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal_errors {\n  text-align: left;\n  padding: 10px 30px;\n  margin-bottom: 10px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal_errors span {\n  color: #ca5b54;\n  line-height: 21px;\n  font-size: 18px;\n  font-weight: 300;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_input,\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .ng-not-empty {\n  border: 2px solid #cccccc;\n  line-height: 21px;\n  font-size: 18px;\n  padding: 15px 30px !important;\n  height: auto;\n  -webkit-border-radius: 30px;\n          border-radius: 30px;\n  font-weight: normal;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  outline: none;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_input[type=date],\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .ng-not-empty[type=date] {\n  padding: 12px 30px !important;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_radio_field {\n  padding: 0 32px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_radio_field .spm_form_label,\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_radio_field .spm_form_checkbox_label {\n  font-size: 18px;\n  line-height: 21px;\n  font-weight: normal;\n  color: #444444;\n  opacity: 1;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_label,\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_checkbox {\n  display: inline-block;\n  width: auto;\n  margin-right: 20px;\n  margin-bottom: 0;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_checkbox {\n  background-image: url(" + escape(__webpack_require__(311)) + ");\n  -webkit-background-size: 20px 20px;\n          background-size: 20px 20px;\n  background-position: center left;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_checkbox:hover {\n  background-image: url(" + escape(__webpack_require__(312)) + ");\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_checkbox.checked {\n  background-image: url(" + escape(__webpack_require__(313)) + ");\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_buttons {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_buttons button[type=submit] {\n  display: inline-block;\n  font-size: 14px;\n  line-height: 16px;\n  -webkit-border-radius: 25px;\n          border-radius: 25px;\n  padding: 17px 60px !important;\n  text-transform: none;\n  font-weight: 300;\n  background-color: #cccccc;\n  color: #444444;\n  margin: auto;\n}\n.spm_wrapper .pivko_profile .spm_pivko_profile_modal .spm_form_buttons button[type=submit]:disabled {\n  background-color: #eeeeee;\n  color: #888888;\n}\n", ""]);

// exports


/***/ }),
/* 309 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNSAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC45NTMxIDYuNjY3MjFDMTQuOTI5MyA2LjQ1NjM2IDE0LjY4MzUgNi4yOTc5MSAxNC40NzA5IDYuMjk3OTFDMTMuNzgzNiA2LjI5NzkxIDEzLjE3MzcgNS44OTQzNCAxMi45MTc5IDUuMjcwMjFDMTIuNjU2NiA0LjYzMDk1IDEyLjgyNTEgMy44ODU0MyAxMy4zMzczIDMuNDE1NTZDMTMuNDk4NSAzLjI2ODE2IDEzLjUxODEgMy4wMjE0MiAxMy4zODI5IDIuODUwMDNDMTMuMDMxMSAyLjQwMzMyIDEyLjYzMTMgMS45OTk4IDEyLjE5NDcgMS42NTAwOUMxMi4wMjM4IDEuNTEyOTEgMTEuNzcyOSAxLjUzMiAxMS42MjQ3IDEuNjk2MTRDMTEuMTc3NiAyLjE5MTI0IDEwLjM3NDYgMi4zNzUyNCA5Ljc1NDEgMi4xMTYzNEM5LjEwODM1IDEuODQ0NzEgOC43MDExNCAxLjE5MDM4IDguNzQwOTkgMC40ODc5OTlDOC43NTQxMSAwLjI2NzM3OSA4LjU5Mjg3IDAuMDc1NTU3IDguMzcyOTEgMC4wNDk5Mzk4QzcuODEyNjcgLTAuMDE0ODU2NyA3LjI0NzUxIC0wLjAxNjg2NTggNi42ODU1OSAwLjA0NTQ3NDlDNi40NjgxNSAwLjA2OTQ3MzYgNi4zMDY5MSAwLjI1Njc3NSA2LjMxNDIyIDAuNDc0NjA1QzYuMzM4NjcgMS4xNzAwNiA1LjkyNjU1IDEuODEyOTUgNS4yODcyMiAyLjA3NDgxQzQuNjc0MTIgMi4zMjUyNCAzLjg3NjczIDIuMTQyNzkgMy40MzA1NyAxLjY1MjFDMy4yODMxMSAxLjQ5MDQ3IDMuMDM2MzcgMS40NzA2MSAyLjg2NDU4IDEuNjA0NUMyLjQxNTA2IDEuOTU3MTcgMi4wMDYyNCAyLjM2MTAxIDEuNjUxMjIgMi44MDQwNEMxLjUxMjc1IDIuOTc2MjcgMS41MzMxMiAzLjIyNTkxIDEuNjk1OTggMy4zNzQwOUMyLjIxNzk5IDMuODQ2ODEgMi4zODY1NCA0LjU5ODgxIDIuMTE1MzUgNS4yNDU0M0MxLjg1NjQ0IDUuODYxOTIgMS4yMTYyNyA2LjI1OTIzIDAuNDgzNDAyIDYuMjU5MjNDMC4yNDU1ODYgNi4yNTE1OSAwLjA3NjE5NTQgNi40MTEyMSAwLjA1MDE4NjkgNi42Mjc0MkMtMC4wMTU3ODMyIDcuMTkwODkgLTAuMDE2NTY0NSA3Ljc2NTAxIDAuMDQ2OTQ5OCA4LjMzMzA2QzAuMDcwNTAyNiA4LjU0NDggMC4zMjM4MzQgOC43MDE4NSAwLjUzODc2NyA4LjcwMTg1QzEuMTkxODggOC42ODUxNyAxLjgxODkzIDkuMDg5NTIgMi4wODE5OCA5LjcyOTYxQzIuMzQ0MTggMTAuMzY4OSAyLjE3NTYzIDExLjExMzkgMS42NjI2IDExLjU4NDJDMS41MDIxNCAxMS43MzE2IDEuNDgxNzcgMTEuOTc4IDEuNjE3IDEyLjE0OTNDMS45NjU1IDEyLjU5MzIgMi4zNjUzOSAxMi45OTcxIDIuODAzNTIgMTMuMzQ5N0MyLjk3NTM2IDEzLjQ4ODIgMy4yMjU0IDEzLjQ2ODcgMy4zNzQzNiAxMy4zMDQ1QzMuODIzMSAxMi44MDgyIDQuNjI2MDcgMTIuNjI0NSA1LjI0NDEzIDEyLjg4MzlDNS44OTE1IDEzLjE1NDcgNi4yOTg3IDEzLjgwOSA2LjI1ODg1IDE0LjUxMThDNi4yNDU4NSAxNC43MzI1IDYuNDA3ODcgMTQuOTI0NyA2LjYyNjk0IDE0Ljk0OTlDNi45MTM1MyAxNC45ODMzIDcuMjAxODYgMTUgNy40OTA5NiAxNUM3Ljc2NTM5IDE1IDguMDM5ODggMTQuOTg0OSA4LjMxNDMxIDE0Ljk1NDRDOC41MzE4MSAxNC45MzA0IDguNjkyOTQgMTQuNzQzMSA4LjY4NTYzIDE0LjUyNDlDOC42NjA0NSAxMy44Mjk4IDkuMDczMyAxMy4xODY5IDkuNzExNzkgMTIuOTI1NUMxMC4zMjkgMTIuNjczNCAxMS4xMjMxIDEyLjg1NzkgMTEuNTY5MyAxMy4zNDgxQzExLjcxNzYgMTMuNTA5NCAxMS45NjI2IDEzLjUyODkgMTIuMTM1MyAxMy4zOTU0QzEyLjU4NCAxMy4wNDM2IDEyLjk5MiAxMi42NDAxIDEzLjM0ODcgMTIuMTk1OEMxMy40ODcxIDEyLjAyNCAxMy40Njc2IDExLjc3NCAxMy4zMDM5IDExLjYyNThDMTIuNzgxOSAxMS4xNTMxIDEyLjYxMjUgMTAuNDAxIDEyLjg4MzcgOS43NTQ4NEMxMy4xMzg2IDkuMTQ2NTUgMTMuNzU1IDguNzM4MTMgMTQuNDE4IDguNzM4MTNMMTQuNTEwOCA4Ljc0MDUzQzE0LjcyNTggOC43NTggMTQuOTIzNyA4LjU5MjM1IDE0Ljk0OTcgOC4zNzI4NUMxNS4wMTU4IDcuODA4ODggMTUuMDE2NiA3LjIzNTI2IDE0Ljk1MzEgNi42NjcyMVpNNy41MTE4OSAxMC4wMTc1QzYuMTMyMzMgMTAuMDE3NSA1LjAxMDE3IDguODk1NDEgNS4wMTAxNyA3LjUxNTg3QzUuMDEwMTcgNi4xMzY0IDYuMTMyMzMgNS4wMTQyMSA3LjUxMTg5IDUuMDE0MjFDOC44OTE0MSA1LjAxNDIxIDEwLjAxMzYgNi4xMzY0IDEwLjAxMzYgNy41MTU4N0MxMC4wMTM2IDguODk1NDEgOC44OTE0MSAxMC4wMTc1IDcuNTExODkgMTAuMDE3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC42NjY2NTYpIiBmaWxsPSIjOUE5QTlBIi8+Cjwvc3ZnPgo="

/***/ }),
/* 310 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjk5OTggMEM0LjkzNDU1IDAgMCA0LjkzNDYgMCAxMUMwIDE3LjA2NTMgNC45MzQ1NSAyMiAxMC45OTk4IDIyQzE3LjA2NTUgMjIgMjIgMTcuMDY1MyAyMiAxMUMyMiA0LjkzNDYgMTcuMDY1NSAwIDEwLjk5OTggMFpNMTAuOTk5OCAyMC41NTczQzUuNzMwMjkgMjAuNTU3MyAxLjQ0MjY1IDE2LjI2OTkgMS40NDI2NSAxMUMxLjQ0MjY1IDUuNzMwMDYgNS43MzAyOSAxLjQ0MjcxIDEwLjk5OTggMS40NDI3MUMxNi4yNjk3IDEuNDQyNzEgMjAuNTU3MiA1LjczMDEyIDIwLjU1NzIgMTFDMjAuNTU3MyAxNi4yNjk5IDE2LjI2OTcgMjAuNTU3MyAxMC45OTk4IDIwLjU1NzNaIiBmaWxsPSIjQkRCREJEIi8+CjxwYXRoIGQ9Ik0xMC45OTk4IDcuNjM0NTJDMTEuNDk5NSA3LjYzNDUyIDExLjkwNTQgNy4yMjkxMSAxMS45MDU0IDYuNzI5MTFDMTEuOTA1NCA2LjIyOTEgMTEuNDk5NSA1LjgyMzUzIDEwLjk5OTggNS44MjM1M0MxMC40OTk2IDUuODIzNTMgMTAuMDk0NyA2LjIyOTEgMTAuMDk0NyA2LjcyOTExQzEwLjA5NDcgNy4yMjkxMSAxMC40OTk2IDcuNjM0NTIgMTAuOTk5OCA3LjYzNDUyWiIgZmlsbD0iI0JEQkRCRCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDE2LjQwMjlDMTAuNTE3NiAxNi40MDI5IDEwLjEyNjUgMTYuMDExOCAxMC4xMjY1IDE1LjUyOTRWOS42ODA4MkMxMC4xMjY1IDkuMTk4MzkgMTAuNTE3NiA4LjgwNzI5IDExIDguODA3MjlDMTEuNDgyNSA4LjgwNzI5IDExLjg3MzYgOS4xOTgzOSAxMS44NzM2IDkuNjgwODJWMTUuNTI5NEMxMS44NzM2IDE2LjAxMTggMTEuNDgyNSAxNi40MDI5IDExIDE2LjQwMjlaIiBmaWxsPSIjQkRCREJEIi8+Cjwvc3ZnPgo="

/***/ }),
/* 311 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjkuOTc5MjEiIGN5PSIxMCIgcng9IjkuOTc5MjEiIHJ5PSIxMCIgZmlsbD0iI0VCRUJFQiIvPgo8L3N2Zz4K"

/***/ }),
/* 312 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjkuOTc5MjEiIGN5PSIxMCIgcng9IjkuOTc5MjEiIHJ5PSIxMCIgZmlsbD0iI0M0QzRDNCIvPgo8L3N2Zz4K"

/***/ }),
/* 313 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjkuOTc5MjEiIGN5PSIxMCIgcng9IjkuOTc5MjEiIHJ5PSIxMCIgZmlsbD0iI0ZGRTAyRSIvPgo8L3N2Zz4K"

/***/ }),
/* 314 */
/***/ (function(module, exports) {

module.exports = {"id":"pivko_profile","enabled":true,"styles":{},"options":{}}

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(316);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(317);

var _defaults = __webpack_require__(319);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "pivko_quests",
  template: _template2.default,
  defaults: _defaults2.default,
  inject: ["MAGIC_CONFIG", "SailPlay", "SailPlayQuests"],
  controller: function controller(MAGIC_CONFIG, SailPlay, SailPlayQuests) {
    return function (scope, elm, attrs) {

      scope.quests = new SailPlayQuests();

      scope.quests_utils = {
        custom: {
          current: false,
          close: function close() {
            scope.quests_utils.custom.current = false;
            scope.quests.reload();
          },
          open: function open(quest) {
            scope.quests_utils.custom.current = quest;
          }
        }
      };
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 316 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_pivko_quests_wrapper\">\n\n  <div class=\"spm_pivko_quests_wrapper_inner\">\n\n    <div class=\"spm_pivko_quests_title\">\n      <span>{{ widget.options.texts.title }}</span>\n    </div>\n\n    <div class=\"spm_pivko_quests_caption\">\n      <span>{{ widget.options.texts.caption }}</span>\n    </div>\n\n    <div class=\"spm_pivko_quests_list_empty\" data-ng-if=\"quests.empty()\">\n      <span>{{ widget.options.texts.empty_list_hint }}</span>\n    </div>\n\n    <div class=\"spm_pivko_quests_list\" data-ng-if=\"!quests.empty()\">\n\n      <div class=\"spm_pivko_quests_list_inner clearfix\">\n\n        <!-- SYSTEM QUESTS -->\n        <div class=\"spm_pivko_quests_list_item {{ quest.action }} {{ quest.type }} {{ quest.socialType || '' }}\" data-ng-repeat=\"quest in quests.list.system().actions\">\n\n          <div class=\"spm_pivko_quests_list_item_inner\">\n\n            <div class=\"spm_pivko_quests_list_item_header\">\n\n              <div class=\"spm_pivko_quests_list_item_header_inner clearfix\">\n\n                <div class=\"spm_pivko_quests_list_item_icon\">\n                  <img data-ng-src=\"{{ quests.data(quest).pic|sailplay_pic }}\" alt=\"\">\n                </div>\n\n                <div class=\"spm_pivko_quests_list_item_button\">\n                  <button data-sailplay-action data-styles=\"{{ quests.styles(quest) }}\" action=\"quest\" text=\"{{ quests.data(quest).button_text }}\">\n                    <span ng-bind=\"quests.data(quest).button_text\"></span>\n                  </button>\n                </div>\n\n              </div>\n\n            </div>\n\n            <div class=\"spm_pivko_quests_list_item_body\">\n\n              <div class=\"spm_pivko_quests_list_item_body_inner\">\n\n                <div class=\"spm_pivko_quests_list_item_points\">\n                  <span>+ {{ (quest.points|number)+' '+(quest.points|sailplay_pluralize:('points.texts.pluralize'|tools)) }}</span>\n                </div>\n\n                <div class=\"spm_pivko_quests_list_item_name\">\n                  <span>{{ quests.data(quest).name }}</span>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <!-- CUSTOM QUESTS -->\n        <div class=\"spm_pivko_quests_list_item spm_custom_quest {{ quest.type }}\" data-ng-repeat=\"quest in quests.list.custom()\">\n\n          <div class=\"spm_pivko_quests_list_item_inner\">\n\n            <div class=\"spm_pivko_quests_list_item_header\">\n\n              <div class=\"spm_pivko_quests_list_item_header_inner clearfix\">\n\n                <div class=\"spm_pivko_quests_list_item_icon\">\n                  <img data-ng-src=\"{{ quest.icon|sailplay_pic }}\" alt=\"\">\n                </div>\n\n                <div class=\"spm_pivko_quests_list_item_button\">\n                  <button type=\"button\" data-ng-click=\"quests_utils.custom.open(quest)\">\n                    <span ng-bind=\"quest.button_text\"></span>\n                  </button>\n                </div>\n\n              </div>\n\n            </div>\n\n            <div class=\"spm_pivko_quests_list_item_body\">\n\n              <div class=\"spm_pivko_quests_list_item_body_inner\">\n\n                <div class=\"spm_pivko_quests_list_item_points\">\n                  <span>+ {{ (quest.points|number)+' '+(quest.points|sailplay_pluralize:('points.texts.pluralize'|tools)) }}</span>\n                </div>\n\n                <div class=\"spm_pivko_quests_list_item_name\">\n                  <span>{{ quest.name }}</span>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n<magic-modal-center class=\"spm_pivko_quests_custom_modal\" on-close=\"quests_utils.custom.close\" data-show=\"quests_utils.custom.current\">\n  <magic-modal-title>\n  </magic-modal-title>\n  <magic-modal-body>\n\n    <div sailplay-action-custom action=\"quests_utils.custom.current\"></div>\n\n  </magic-modal-body>\n</magic-modal-center>";

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(318);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .pivko_quests .spm_pivko_quests_wrapper {\n  margin-bottom: 30px;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_wrapper {\n    margin-bottom: 0;\n  }\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_title {\n  font-size: 35px;\n  font-weight: bold;\n  margin-top: 20px;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_title {\n    font-size: 24px;\n    line-height: 28px;\n    margin-bottom: 10px;\n  }\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_caption {\n  font-size: 20px;\n  color: #888888;\n  font-weight: 300;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_caption {\n    font-size: 14px;\n    line-height: 16px;\n    padding: 0 15px;\n  }\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_empty {\n  font-size: 36px;\n  font-weight: 300;\n  color: #888888;\n  margin: 20px auto;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list {\n  margin-top: 30px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_inner {\n  margin-left: -10px;\n  margin-right: -10px;\n  text-align: left;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item {\n  display: inline-block;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_inner {\n  overflow: hidden;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_icon {\n  display: inline-block;\n  float: left;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_icon img {\n  width: 80px;\n  height: 80px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_button {\n  display: inline-block;\n  float: right;\n  width: auto;\n  margin-top: 25px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_button button {\n  border: none;\n  outline: none;\n  padding: 0;\n  background-color: transparent;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_button button span {\n  padding: 5px 15px;\n  color: #888888;\n  background-color: #ffffff;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  font-size: 14px;\n  line-height: 16px;\n  display: inline-block;\n  font-weight: 300;\n  cursor: pointer;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_points span {\n  font-size: 20px;\n  font-weight: bold;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_name {\n  height: 48px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_name span {\n  font-weight: 300;\n  font-size: 14px;\n  color: #888888;\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_list_item {\n    width: 33.333%;\n  }\n}\n@media only screen and (min-width: 1129px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_list_item {\n    width: 33.333%;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_list_item {\n    width: 50%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_list_item {\n    width: 100%;\n  }\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_header {\n  background-color: #cccccc;\n  padding: 10px 25px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_list_item_body {\n  background-color: #ffffff;\n  padding: 20px 30px;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .spm_modal_center_content {\n  position: relative;\n  z-index: 0;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .spm_modal_center_close {\n  z-index: 1;\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .spm_modal_center_inner {\n  padding: 0;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .spm_modal_center_inner {\n    min-height: 95.5%;\n  }\n}\n.spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 92.5vh;\n  position: relative;\n}\n@media (max-width: 767px) {\n  .spm_wrapper .pivko_quests .spm_pivko_quests_custom_modal .sailplay_action_custom_frame {\n    min-height: 94vh;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 319 */
/***/ (function(module, exports) {

module.exports = {"styles":{},"enabled":false,"id":"pivko_quests","options":{"texts":{"caption":"Выполняйте задания и получайте бонусные рубли бесплатно","title":"Задания","empty_list_hint":"Здесь скоро появятся новые задания"}}}

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(321);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(322);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "ryonet_gifts",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_success = false;
      scope.show_gift = false;
      scope.purchased_gift = false;

      scope.getGift = function (gift) {
        SailPlay.send('gifts.purchase', { gift: gift });
      };

      scope.onChange = function () {};

      $rootScope.$on("gift:state", function (e, state) {
        // if(state){
        //   scope.getGift(angular.copy(state));
        // }
        scope.show_gift = state && angular.copy(state);
      });

      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = true;
          scope.purchased_gift = res;
        });
      });

      SailPlay.on('gift.purchase.error', function (error) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = false;
          $rootScope.$broadcast('notifier:notify', {
            header: widget.texts.modals.error.title,
            body: error.message || widget.texts.modals.error.body
          });
        });
      });
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 321 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid spm_gifts clearfix\" ng-cloak sailplay-profile sailplay-gifts>\n\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"spm_gifts-container col\">\n\n        <div class=\"spm_gifts-container__left\">\n          <div class=\"spm_gifts-header\" ng-bind=\"widget.texts.header\"></div>\n          <div class=\"spm_gifts-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n          <div class=\"spm_gifts-pagination\">\n            <dir-pagination-controls direction-links=\"true\" data-page-links=\"false\" pagination-id=\"gifts_pages\"\n                                     template-url=\"magic.pagination\" auto-hide=\"true\"></dir-pagination-controls>\n          </div>\n        </div>\n\n        <div class=\"spm_gifts-container__right spm_gifts-list\">\n\n          <div class=\"spm_gifts-item\"\n               ng-style=\"{'background-image' : !gift.category && ('linear-gradient(to bottom, rgba(155, 155, 155, 0), rgba(47, 51, 54, 0.99)), url('+ (gift.thumbs.url_250x250 | sailplay_pic) + ')') }\"\n               dir-paginate=\"gift in gifts() | itemsPerPage:3 track by $index\" pagination-id=\"gifts_pages\"\n               ng-mouseenter=\"gift.actived=true\"\n               ng-mouseleave=\"gift.actived=false\"\n               ng-class=\"{type_disabled: gift.points>user().user_points.confirmed, type_enabled: gift.points<=user().user_points.confirmed, type_hovered: gift.actived, type_category: gift.category}\">\n\n              <div ng-show=\"!gift.category\"> \n                  <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n                  <a href=\"#\" class=\"spm_gifts-item-button type_recieve\" ng-bind=\"widget.texts.get\"\n                     ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n                  <div class=\"spm_gifts-item-button type_points\"\n                       ng-bind=\"(gift.points|number)+' '+(gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n              </div>\n              <div ng-show=\"gift.category\">\n                  <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n                  <div class=\"spm_gifts-item-placeholder\" ng-bind=\"widget.texts.name_placeholder\"></div>\n                  <a href=\"#\" class=\"spm_gifts-item-button type_recieve\" ng-bind=\"widget.texts.get\"\n                      ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n                  <div class=\"spm_gifts-item-button type_points\"\n                        ng-bind=\"(gift.points|number)+' '+(gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n              </div>\n\n           \n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n  <magic-modal show=\"$parent.show_gift\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.gift.title\"></magic-modal-title>\n    <magic-modal-body>\n\n      <div class=\"spm_gifts-open\">\n        <i class=\"spm_gifts-open-image\"\n           ng-show=\"!$parent.show.category\"\n           ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n        <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\" ng-show=\"!$parent.show.category\"></div>\n        <div class=\"spm_gifts-open-points\"\n             ng-bind=\"($parent.show.points|number) + ' ' + ($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n        <div class=\"spm_gifts-open-descr\" ng-bind=\"$parent.show.descr\"></div>\n        <a href=\"#\" class=\"spm_gifts-open-button spm_btn theme_1 type_filled type_big\"\n           ng-bind=\"widget.texts.modals.gift.button\" ng-click=\"$event.preventDefault();getGift($parent.show)\"></a>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n  <magic-modal class=\"spm_gifts-success-modal\" show=\"$parent.show_success\">\n    <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n    <magic-modal-body data-ng-switch=\"purchased_gift.gift_type\">\n\n      <div class=\"spm_gifts-success-modal-body\" ng-bind-html=\"purchased_gift.gift_help_text || widget.texts.modals.success.body | to_trusted\"></div>\n\n      <div data-ng-switch-when=\"coupon\" class=\"spm_gifts-success-modal-body-coupon\">\n        <div class=\"spm_gifts-success-modal-body-coupon-message\">\n          {{ widget.texts.modals.success.coupon_title }}\n        </div>\n        <div class=\"spm_gifts-success-modal-body-coupon-input\">\n          <input type=\"text\" value=\"{{ purchased_gift.coupon_number }}\" disabled>\n        </div>\n      </div>\n\n    </magic-modal-body>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(323);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .ryonet_gifts .spm_gifts {\n  position: relative;\n  background: #ecf0f0;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-container__left {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-flex-basis: 20%;\n      -ms-flex-preferred-size: 20%;\n          flex-basis: 20%;\n  padding-right: 30px;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-container__left {\n    -webkit-flex-basis: 100%;\n        -ms-flex-preferred-size: 100%;\n            flex-basis: 100%;\n    margin-bottom: 60px;\n    padding-right: 0;\n    text-align: center;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-container__right {\n  -webkit-flex-basis: 80%;\n      -ms-flex-preferred-size: 80%;\n          flex-basis: 80%;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-header {\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 35px;\n  line-height: 1;\n  color: #000000;\n  position: relative;\n  letter-spacing: 2.3px;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-sub-header {\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 25px 0;\n  color: #000000;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  width: 100%;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-list {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  width: 100%;\n  max-width: 280px;\n  min-height: 280px;\n  margin: 0 8px;\n  color: #ffffff;\n  background-color: #6a6450;\n  -webkit-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-transition: box-shadow 0.3s linear;\n  -o-transition: box-shadow 0.3s linear;\n  -webkit-transition: -webkit-box-shadow 0.3s linear;\n  transition: -webkit-box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear;\n  transition: box-shadow 0.3s linear, -webkit-box-shadow 0.3s linear;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-item {\n    width: 48%;\n    margin: 1%;\n  }\n}\n@media (max-width: 600px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-item {\n    width: 100%;\n    margin: 1% 1% 5% 1%;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item-name {\n  font-size: 80px;\n  font-weight: bold;\n  line-height: 1;\n  margin: 75px 10px 5px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  text-transform: uppercase;\n  text-align: center;\n  font-size: 28px;\n  height: 80px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item.type_category .spm_gifts-item-name {\n  font-size: 80px;\n  margin-top: 40px;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item-placeholder {\n  font-size: 22px;\n  font-weight: normal;\n  line-height: 1.45;\n  color: inherit;\n  text-align: center;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item-button {\n  position: relative;\n  text-align: center;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  font-size: 14px;\n  color: inherit;\n  line-height: 1.38;\n  letter-spacing: 1.6px;\n  padding: 10px 20px;\n  text-transform: uppercase;\n  text-decoration: none;\n  font-weight: 700;\n  -webkit-border-radius: 19.5px;\n          border-radius: 19.5px;\n  background: #eb265f;\n  border: none;\n  min-width: 180px;\n  width: auto;\n  max-width: 220px;\n  margin: 35px auto 0;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item-button.type_points {\n  display: block;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item-button.type_recieve {\n  display: none;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item.type_enabled {\n  -webkit-box-shadow: 0 15px 20px 0 rgba(202, 91, 84, 0.27);\n          box-shadow: 0 15px 20px 0 rgba(202, 91, 84, 0.27);\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item.type_disabled {\n  background-color: #b3bcc3;\n  -webkit-box-shadow: 0 11px 12px 0 rgba(168, 178, 189, 0.36);\n          box-shadow: 0 11px 12px 0 rgba(168, 178, 189, 0.36);\n  color: #8e9cab;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item.type_disabled .spm_gifts-item-button {\n  border-color: #8e9cab;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item:hover.type_enabled {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_points {\n  display: none;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-item:hover.type_enabled .spm_gifts-item-button.type_recieve {\n  display: block;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-pagination .spm_pagination {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n@media (max-width: 992px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-pagination .spm_pagination {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-pagination .spm_pagination-direction-link {\n  color: #809797;\n  margin: 0;\n  font-size: 40px;\n  font-weight: 100;\n  line-height: 46px;\n  width: 50px;\n  height: 50px;\n  -webkit-border-radius: 3px;\n          border-radius: 3px;\n  border: solid 1px #809797;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-pagination .spm_pagination-direction-link:first-child {\n  -webkit-border-top-right-radius: 0;\n          border-top-right-radius: 0;\n  -webkit-border-bottom-right-radius: 0;\n          border-bottom-right-radius: 0;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-pagination .spm_pagination-direction-link:last-child {\n  border-left: none;\n  -webkit-border-top-left-radius: 0;\n          border-top-left-radius: 0;\n  -webkit-border-bottom-left-radius: 0;\n          border-bottom-left-radius: 0;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-open {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 380px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .ryonet_gifts .spm_gifts-open {\n    width: 100%;\n  }\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-open-image {\n  width: 200px;\n  height: 200px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: contain;\n          background-size: contain;\n  margin: 10px 0;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-open-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #ca5b54;\n  text-align: center;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-open-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-open-descr {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 25px;\n  margin: 20px 0 30px;\n  color: #000000;\n  opacity: 0.5;\n  text-align: center;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-success-modal .spm_modal-container {\n  max-width: 500px;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-success-modal-body-coupon-input {\n  text-align: center;\n  margin-top: 30px;\n  font-size: 28px;\n}\n.spm_wrapper .ryonet_gifts .spm_gifts-success-modal-body-coupon-input input {\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(2);

var _template = __webpack_require__(325);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(326);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "ryonet_status_bar",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG", '$interpolate'],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG, $interpolate) {
    return function (scope, elm, attrs) {

      scope.show_list = false;
      scope.currentStatus = null;
      scope.nextStatus = null;
      scope.list = scope.widget.options.list;

      scope.statusText = function (text) {
        return $interpolate(text)(scope);
      };

      var tags = scope.list.filter(function (item) {
        return item.tag;
      }).map(function (item) {
        return item.tag;
      });
      scope.currentStatus = scope.list.find(function (item) {
        return !item.tag;
      });
      if (tags.length) {
        SailPlayApi.call('tags.exist', {
          tags: tags
        }, function (res) {
          var recieved = res.tags.filter(function (item) {
            return item.exist;
          }).map(function (item) {
            return scope.list.find(function (status) {
              return status.tag === item.name;
            });
          });
          if (recieved.length) {
            scope.currentStatus = recieved.length && recieved.pop();
            scope.nextStatus = recieved.length && recieved.shift();
          }
        });
      }
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),
/* 325 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_status-bar container-fluid status-bar clearfix\" ng-cloak sailplay-profile ng-class=\"{type_list: show_list}\">\n\n    <div ng-show=\"!show_list && user()\" class=\"container py-5\">\n        <div class=\"row align-items-top\">\n\n            <div class=\"b-points col-12 col-md-6 col-lg-4 d-flex align-items-center spm_status-bar-points\" ng-click=\"$root.$broadcast('history:state', true)\">\n                <div class=\"w-75\">\n                    <h4 class=\"font-akrobat font-weight-bold text-uppercase mb-0\" ng-bind=\"widget.texts.points.label\"></h4>\n                    <div class=\"mt-3 font-weight-light\" ng-bind-html=\"widget.texts.points.description|to_trusted\"></div>\n                </div>\n                <div class=\"display-1 points-balance mr-auto font-akrobat font-weight-bold text-uppercase\" ng-bind=\"user().user_points.confirmed|number\"></div>\n            </div>\n\n            <div class=\"b-next-status my-5 my-md-0 col-12 col-md-6 col-lg-4 d-flex flex-column align-items-left spm_status-bar-next-status\">\n                <h4 class=\"font-akrobat font-weight-bold text-uppercase mb-0\" ng-bind=\"widget.texts.status.label\"></h4>\n                <div class=\"mt-3 font-weight-light\" ng-bind-html=\"widget.texts.status.description_current |to_trusted\"></div>\n            </div>\n\n            <div class=\"b-current-status col-12 mt-5 pt-md-5 col-md-12 mt-lg-0 pt-lg-0 col-lg-4 d-flex flex-column align-items-center text-center spm_status-bar-current-status\" ng-click=\"show_list=true\">\n                <i ng-style=\"currentStatus.style\"></i>\n                <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0\" ng-bind=\"currentStatus.name\"></h2>\n                <div class=\"mt-2 font-weight-light\" ng-bind-html=\"currentStatus.description|to_trusted\"></div>\n            </div>\n\n        </div>\n    </div>\n\n    <div ng-show=\"show_list\" class=\"container py-0 py-lg-5 position-relative\">\n        <div class=\"b-list-close rounded-circle d-flex bg-primary cursor-pointer align-items-center position-absolute\"\n             ng-click=\"show_list=false\"></div>\n        <div class=\"row align-items-center justify-content-center\">\n            <div class=\"b-statuses col-md-12 my-5 my-lg-0 col-lg-4 d-flex flex-column align-items-center text-center\" ng-repeat=\"status in list track by $index\">\n                <i ng-style=\"status.style\"></i>\n                <h2 class=\"font-akrobat font-weight-bolder text-uppercase mb-0\" ng-bind=\"status.name\"></h2>\n                <div class=\"font-weight-light mt-2\" ng-bind-html=\"status.description|to_trusted\"></div>\n            </div>\n        </div>\n    </div>\n\n</div>";

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(327);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!../../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_status-bar {\n  position: relative;\n}\n", ""]);

// exports


/***/ })
]),[156]);
//# sourceMappingURL=sailplay-magic-widgets.js.map