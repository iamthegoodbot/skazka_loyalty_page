webpackJsonp([1],{

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
__webpack_require__(150);
__webpack_require__(154);
module.exports = __webpack_require__(158);


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(10);

var _template = __webpack_require__(147);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(148);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "gifts",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_success = false;
      scope.show_gift = false;
      scope.gifts = SailPlayApi.data("load.gifts.list");
      scope.CIRCLE_R = 140;

      scope.getGift = function (gift) {
        SailPlay.send('gifts.purchase', { gift: gift });
      };

      scope.onChange = function () {
        var offset = elm[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        window.scrollTo(0, offset);
      };

      $rootScope.$on("gift:state", function (e, state) {
        scope.show_gift = state && angular.copy(state);
      });

      scope.getGiftProgress = function (points, gift) {
        var val = 0;
        var progress = 0;

        if (points) {
          val = parseInt(points / gift.points * 100);
        }

        if (isNaN(val)) {
          val = 100;
        } else {
          var r = scope.CIRCLE_R;
          var c = Math.PI * (r * 2);

          if (val < 0) {
            val = 0;
          }
          if (val > 100) {
            val = 100;
          }

          progress = (100 - val) / 100 * c;
        }

        return progress;
      };

      SailPlay.on('gifts.purchase.success', function (res) {
        $rootScope.$apply(function () {
          scope.show_gift = false;
          scope.show_success = true;
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

/***/ 147:
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_gifts clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n    <div class=\"spm_gifts-container\">\n\n        <div class=\"spm_gifts-container__left\">\n            <div class=\"spm_gifts-header\" ng-bind=\"widget.texts.header\"></div>\n            <div class=\"spm_gifts-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n        </div>\n\n        <div class=\"spm_gifts-list\">\n\n            <div class=\"spm_gifts-item\"\n                dir-paginate=\"gift in gifts() | itemsPerPage:6 track by $index\" pagination-id=\"gifts_pages\"\n                ng-click=\"gift.actived=true\"\n                ng-mouseleave=\"gift.actived=false\"\n                ng-class=\"{type_disabled: gift.points>user().user_points.confirmed, type_enabled: gift.points<=user().user_points.confirmed, type_hovered: gift.actived}\">\n                <svg class=\"spm_gifts-item-progress\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 300 300\" xml:space=\"preserve\">\n                    <circle class=\"spm_gifts-item-progress-bg\" ng-attr-r=\"{{CIRCLE_R}}\" cx=\"150\" cy=\"150\"/>\n                    <circle class=\"spm_gifts-item-progress-value\" ng-attr-r=\"{{CIRCLE_R}}\" cx=\"150\" cy=\"150\" fill=\"transparent\" stroke-dasharray=\"879.64\" ng-style=\"{strokeDashoffset: getGiftProgress(user().user_points.confirmed, gift)}\" stroke-dashoffset=\"0\"></circle>\n                </svg>\n                <i class=\"spm_gifts-item-image\" ng-style=\"{'background-image': (gift.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n                <div class=\"spm_gifts-item-name\" ng-bind=\"gift.name\"></div>\n                <div class=\"spm_gifts-item-points\" ng-bind=\"(gift.points|number) + ' ' + (gift.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n                <a ng-if=\"gift.points<=user().user_points.confirmed\" href=\"#\" class=\"spm_gifts-item-button spm_btn theme_1 type_filled type_big\" ng-bind=\"widget.texts.get\" ng-click=\"$event.preventDefault();$root.$broadcast('gift:state', gift)\"></a>\n                <div ng-if=\"gift.points>user().user_points.confirmed\" class=\"spm_gifts-item-locked\" ng-bind=\"widget.texts.not_enough_points\"></div>\n            </div>\n\n        </div>\n\n        <div class=\"spm_gifts-pagination\">\n            <dir-pagination-controls on-page-change=\"onChange()\" max-size=\"7\" pagination-id=\"gifts_pages\" template-url=\"magic.pagination\" auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n    </div>\n\n    <magic-modal show=\"$parent.$parent.show_gift\">\n        <magic-modal-title ng-bind=\"widget.texts.modals.gift.title\"></magic-modal-title>\n        <magic-modal-body>\n\n            <div class=\"spm_gifts-open\">\n                <i class=\"spm_gifts-open-image\" ng-style=\"{'background-image': ($parent.show.thumbs.url_250x250 | sailplay_pic | background_image)}\"></i>\n                <div class=\"spm_gifts-open-name\" ng-bind=\"$parent.show.name\"></div>\n                <div class=\"spm_gifts-open-points\" ng-bind=\"($parent.show.points|number) + ' ' + ($parent.show.points|sailplay_pluralize:('points.texts.pluralize' | tools))\"></div>\n                <div class=\"spm_gifts-open-descr\" ng-bind=\"$parent.show.descr\"></div>\n                <a href=\"#\" class=\"spm_gifts-open-button spm_btn theme_1 type_filled type_big\" ng-bind=\"widget.texts.modals.gift.button\" ng-click=\"$event.preventDefault();getGift($parent.show)\"></a>\n            </div>\n\n        </magic-modal-body>\n    </magic-modal>\n\n    <magic-modal show=\"$parent.$parent.show_success\">\n        <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n        <magic-modal-body ng-bind-html=\"widget.texts.modals.success.body|to_trusted\"></magic-modal-body>\n    </magic-modal>\n\n</div>";

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(149);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_gifts {\n  position: relative;\n}\n.spm_wrapper .spm_gifts-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  box-sizing: border-box;\n  padding: 50px 30px;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.spm_wrapper .spm_gifts-container__left {\n  flex-basis: 260px;\n}\n.spm_wrapper .spm_gifts-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 55px;\n  line-height: 65px;\n  color: #000000;\n  position: relative;\n}\n.spm_wrapper .spm_gifts-header:after {\n  content: \"\";\n  display: block;\n  width: 50px;\n  height: 5px;\n  background: #FA5A93;\n  margin: 5px 0 10px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_gifts-header {\n    font-size: 45px;\n    line-height: 55px;\n  }\n}\n.spm_wrapper .spm_gifts-sub-header {\n  font-weight: 500;\n  font-size: 24px;\n  line-height: 28px;\n  color: #000000;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_gifts-sub-header {\n    font-size: 20px;\n    line-height: 22px;\n  }\n}\n.spm_wrapper .spm_gifts-list {\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  margin: 0 -100px;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .spm_wrapper .spm_gifts-list {\n    margin: 0 -50px;\n  }\n}\n@media (max-width: 1200px) {\n  .spm_wrapper .spm_gifts-list {\n    margin: 0 -50px;\n  }\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_gifts-list {\n    margin: 0;\n  }\n}\n.spm_wrapper .spm_gifts-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: relative;\n  width: 260px;\n  margin: 25px 40px;\n}\n@media (max-width: 400px) {\n  .spm_wrapper .spm_gifts-item {\n    margin: 25px 5%;\n  }\n}\n.spm_wrapper .spm_gifts-item-progress {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  margin: auto;\n  -webkit-transition: 0.3 linear;\n  -moz-transition: 0.3 linear;\n  -ms-transition: 0.3 linear;\n  -o-transition: 0.3 linear;\n}\n.spm_wrapper .spm_gifts-item-progress circle {\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 1s linear;\n  fill: none;\n  stroke: #E8DFE3;\n  stroke-width: 16;\n  stroke-miterlimit: 10;\n}\n.spm_wrapper .spm_gifts-item-progress-value {\n  transform: rotate(-90deg);\n  transform-origin: 50% 50%;\n  stroke: #FA5A93 !important;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .spm_wrapper .spm_gifts-item-progress {\n    top: -40px;\n  }\n}\n.spm_wrapper .spm_gifts-item-image {\n  display: block;\n  width: 260px;\n  height: 260px;\n  border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center 50%;\n  background-size: auto 50%;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  transition: all 0.3s linear;\n}\n.spm_wrapper .spm_gifts-item-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #FA5A93;\n  text-align: center;\n}\n.spm_wrapper .spm_gifts-item-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .spm_gifts-item-button {\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  top: 110px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  text-align: center;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  transition: all 0.3s linear;\n}\n.spm_wrapper .spm_gifts-item-locked {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 26px;\n  color: #000000;\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  top: 120px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  text-transform: uppercase;\n  text-align: center;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  transition: all 0.3s linear;\n}\n.spm_wrapper .spm_gifts-item:hover .spm_gifts-item-image,\n.spm_wrapper .spm_gifts-item:hover .spm_gifts-item-progress {\n  opacity: 0.2;\n}\n.spm_wrapper .spm_gifts-item:hover .spm_gifts-item-button {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .spm_gifts-item:hover .spm_gifts-item-locked {\n  opacity: 1;\n  visibility: visible;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .spm_gifts-item.type_hovered .spm_gifts-item-image,\n  .spm_wrapper .spm_gifts-item.type_hovered .spm_gifts-item-progress {\n    opacity: 0.2;\n  }\n  .spm_wrapper .spm_gifts-item.type_hovered .spm_gifts-item-button {\n    opacity: 1;\n    visibility: visible;\n  }\n  .spm_wrapper .spm_gifts-item.type_hovered .spm_gifts-item-locked {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n.spm_wrapper .spm_gifts-pagination {\n  margin-top: 25px;\n}\n.spm_wrapper .spm_gifts-pagination a {\n  font-size: 16px;\n  width: 45px;\n  height: 45px;\n  line-height: 45px;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.3);\n}\n.spm_wrapper .spm_gifts-pagination .spm_pagination-direction-link {\n  border: 1px solid rgba(0, 0, 0, 0.3);\n  margin: 0 40px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_gifts-pagination .spm_pagination-direction-link {\n    margin: 0;\n  }\n}\n.spm_wrapper .spm_gifts-open {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 380px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .spm_gifts-open {\n    width: 100%;\n  }\n}\n.spm_wrapper .spm_gifts-open-image {\n  width: 200px;\n  height: 200px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n  margin: 10px 0;\n}\n.spm_wrapper .spm_gifts-open-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  margin: 10px 0;\n  text-transform: uppercase;\n  color: #FA5A93;\n  text-align: center;\n}\n.spm_wrapper .spm_gifts-open-points {\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .spm_gifts-open-descr {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 25px;\n  margin: 20px 0 30px;\n  color: #000000;\n  opacity: 0.5;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(10);

var _template = __webpack_require__(151);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "menu",
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

/***/ 151:
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_menu clearfix\" ng-show=\"widget.enabled\" ng-cloak sailplay-profile>\n    <div class=\"spm_menu-wrapper\">\n\n        <div class=\"spm_menu-container\">\n\n            <div class=\"spm_menu-list\" ng-show=\"widget.options.items && widget.options.items.length\">\n                <a class=\"spm_menu-item\" ng-repeat=\"item in widget.options.items track by $index\" ng-click=\"$event.preventDefault();onClick(item)\">\n                    <i ng-style=\"{'background-image': ((item.icon || widget.images.menu_icon)|background_image)}\"></i>\n                    <span ng-bind=\"item.label\"></span>\n                </a>\n            </div>\n\n            <div class=\"spm_menu-profile\" ng-show=\"user && user()\">\n                <i ng-style=\"{'background-image': (user().user.avatar['250x250'] | sailplay_pic | background_image)}\" ng-click=\"$parent.active=true\"></i>\n                <div class=\"spm_menu-profile-balance\" ng-click=\"$parent.active=true\">\n                    <span class=\"spm_menu-profile-balance_label\" ng-bind=\"widget.texts.your_balance\"></span>\n                    <span class=\"spm_menu-profile-balance_value\" ng-bind=\"(user().user_points.confirmed|number) + ' ' + (user().user_points.confirmed | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                </div>\n                <div class=\"spm_menu-profile-dropdown\" ng-class=\"{type_open: $parent.active}\">\n                    <a href=\"#\" class=\"spm_menu-profile-dropdown-item type_mobile\" ng-repeat=\"item in widget.options.items track by $index\" ng-bind=\"item.label\" ng-click=\"$event.preventDefault();onClick(item)\"></a>\n                    <a href=\"#\" class=\"spm_menu-profile-dropdown-item\" ng-bind=\"widget.texts.edit_profile\" ng-click=\"$event.preventDefault();active=false;$root.$broadcast('profile:state', true)\"></a>\n                    <a class=\"spm_menu-profile-dropdown-item\" ng-href=\"{{widget.options.logout}}\" ng-bind=\"widget.texts.logout\"></a>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>";

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_menu {\n  width: 100%;\n  height: 94px;\n  color: #ffffff;\n  position: relative;\n}\n.spm_wrapper .spm_menu-wrapper {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 94px;\n  background: #4D2962;\n  z-index: 10;\n}\n.spm_wrapper .spm_menu-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  box-sizing: border-box;\n  padding: 0 30px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.spm_wrapper .spm_menu-list {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-list {\n    display: none;\n  }\n}\n.spm_wrapper .spm_menu-item {\n  display: flex;\n  align-items: baseline;\n  margin-right: 6vw;\n  font-size: 18px;\n}\n.spm_wrapper .spm_menu-item i {\n  margin-right: 10px;\n  width: 12px;\n  height: 12px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n}\n.spm_wrapper .spm_menu-item span {\n  cursor: pointer;\n  text-transform: uppercase;\n}\n.spm_wrapper .spm_menu-item:last-child {\n  margin-right: 0;\n}\n.spm_wrapper .spm_menu-profile {\n  display: flex;\n  align-items: center;\n  position: relative;\n  flex-basis: 260px;\n  height: 100%;\n}\n.spm_wrapper .spm_menu-profile i {\n  margin-right: 15px;\n  width: 62px;\n  height: 62px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  border: 1px solid #ffffff;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n}\n.spm_wrapper .spm_menu-profile-balance {\n  display: flex;\n  flex-direction: column;\n}\n.spm_wrapper .spm_menu-profile-balance_label {\n  font-size: 16px;\n  line-height: 18px;\n}\n.spm_wrapper .spm_menu-profile-balance_value {\n  color: #FA5A93;\n  font-size: 18px;\n  line-height: 21px;\n}\n.spm_wrapper .spm_menu-profile-dropdown {\n  position: absolute;\n  left: 0;\n  top: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  background: #ffffff;\n  padding: 0 20px;\n  box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  transform: translateY(20%);\n  opacity: 0;\n  visibility: hidden;\n  transition: 0.3s linear;\n}\n.spm_wrapper .spm_menu-profile-dropdown:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: -13px;\n  left: 19px;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 0 12px 14px 12px;\n  border-color: transparent transparent #ffffff transparent;\n}\n.spm_wrapper .spm_menu-profile-dropdown a {\n  display: inline-block;\n  text-transform: uppercase;\n  cursor: pointer;\n  font-size: 14px;\n  line-height: 16px;\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n  position: relative;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.spm_wrapper .spm_menu-profile-dropdown a:last-child {\n  border-bottom: none;\n}\n.spm_wrapper .spm_menu-profile-dropdown a:hover {\n  color: #000000;\n}\n.spm_wrapper .spm_menu-profile-dropdown-item.type_mobile {\n  display: none;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-profile-dropdown-item.type_mobile {\n    display: block;\n  }\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_menu-profile-dropdown.type_open {\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@media (min-width: 800px) {\n  .spm_wrapper .spm_menu-profile:hover .spm_menu-profile-dropdown {\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(10);

var _template = __webpack_require__(155);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(156);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SUM_PURCHASE_EVENT = 10000017;
var widget = {
  id: "profile",
  template: _template2.default,
  inject: ["$rootScope", "SailPlay", "SailPlayApi", "MAGIC_CONFIG"],
  controller: function controller($rootScope, SailPlay, SailPlayApi, MAGIC_CONFIG) {
    return function (scope, elm, attrs) {
      scope.show_history = false;
      scope.show_profile = false;
      scope.show_status = false;

      $rootScope.$on("profile:state", function (e, state) {
        scope.show_profile = state;
      });

      $rootScope.$on("history:state", function (e, state) {
        scope.show_history = state;
      });

      $rootScope.$on("status:state", function (e, state) {
        var offset = elm[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        var menuBlock = document.querySelector(scope.widget.options.menu_selector);
        if (menuBlock) {
          offset -= menuBlock.offsetHeight;
        }
        window.scrollTo(0, offset);
        scope.show_status = state;
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

      scope.getLeftForStatus = function (sum, badge) {
        if (badge.rules && badge.rules.length) {
          var needSum = 0;
          badge.rules.forEach(function (rule) {
            if (rule.event_id == (scope.widget.options.events.SUM_PURCHASE || DEFAULT_SUM_PURCHASE_EVENT)) {
              needSum = rule.value_to_success;
            }
          });
          return needSum ? parseInt(needSum - sum) : null;
        }
      };
    };
  }
};

_widget.Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {
  MagicWidgetProvider.register(widget);
}]);

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_profile clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n    <div class=\"spm_profile-container\">\n\n        <div class=\"spm_profile-welcome\" ng-bind-html=\"(user().user.first_name ? widget.texts.welcome + user().user.first_name : '&nbsp;')|to_trusted\"></div>\n        <h1 class=\"spm_profile-header\" ng-bind-html=\"widget.texts.header|to_trusted\"></h1>\n\n        <div class=\"spm_profile-content\">\n\n            <div class=\"spm_profile-points\" ng-if=\"user().user_points\">\n                <div class=\"spm_profile-points-confirmed\" ng-bind=\"user().user_points.confirmed|number\"></div>\n                <div class=\"spm_profile-points-placeholder\" ng-bind=\"user().user_points.confirmed|sailplay_pluralize:('points.texts.pluralize' | tools)\"></div>\n                <div class=\"spm_profile-points-unconfirmed\">\n                    <span class=\"spm_profile-points-unconfirmed-block\">+ {{user().user_points.unconfirmed|number}} {{widget.texts.unconfirmed}}</span>\n                    <span class=\"spm_profile-points-tooltip\">?\n                        <div ng-bind-html=\"widget.texts.unconfirmed_tooltip|to_trusted\"></div>\n                    </span>\n                </div>\n                <a href=\"#\" class=\"spm_btn theme_1\" ng-bind=\"widget.texts.open_history\" ng-click=\"$event.preventDefault();$root.$broadcast('history:state', true)\"></a>\n            </div>\n\n            <div class=\"spm_profile-status\" sailplay-badges>\n                <i ng-style=\"{'background-image': ((((sailplay.badges.list().multilevel_badges[0]|lastReceived).descr|json).pic||widget.images.empty_status)|background_image)}\"></i>\n                <div class=\"spm_profile-status-info\">\n                    <span class=\"spm_profile-status-placeholder\" ng-bind=\"widget.texts.your_status\"></span>\n                    <span class=\"spm_profile-status-name\" ng-bind=\"(sailplay.badges.list().multilevel_badges[0]|lastReceived).name||widget.texts.empty_status\"></span>\n                    <span class=\"spm_profile-status-descr\" ng-bind=\"((sailplay.badges.list().multilevel_badges[0]|lastReceived).descr|json).value\"></span>\n                    <a href=\"#\" class=\"spm_btn theme_1 type_filled\" ng-bind=\"widget.texts.open_status\" ng-click=\"$event.preventDefault();$root.$broadcast('status:state', true)\"></a>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class=\"spm_profile-block-wrapper\" sailplay-badges ng-show=\"$parent.show_status\">\n        <div class=\"spm_profile-container\">\n\n            <i class=\"spm_profile-block-wrapper-close\" ng-click=\"$root.$broadcast('status:state', false)\" ng-style=\"{'background-image': (widget.images.close | background_image)}\"></i>\n\n            <div class=\"spm_profile-status-list\">\n\n                <div class=\"spm_profile-status-item\" ng-repeat=\"badge in sailplay.badges.list().multilevel_badges[0]\" ng-class=\"{type_active: badge.is_received, type_filled: (badge[$index+1] && badge[$index+1].is_received)}\">\n                    <div ng-if=\"!badge.is_received && (getLeftForStatus(user().purchases.sum, badge))\" class=\"spm_profile-status-item-tooltip\"\n                        ng-bind-html=\"(widget.texts.left_for_status + (getLeftForStatus(user().purchases.sum, badge)|number) + ' ' + (getLeftForStatus(user().purchases.sum, badge)|sailplay_pluralize:('currency.texts.pluralize' | tools)))|to_trusted\"></div>\n                    <div class=\"spm_profile-status-item-image\" ng-style=\"{'background-image': ((badge.is_received ? (badge.descr|json).pic : (badge.descr|json).pic_gs)|background_image)}\"></div>\n                    <div class=\"spm_profile-status-item-name\" ng-bind=\"badge.name\"></div>\n                    <div class=\"spm_profile-status-item-descr\" ng-bind=\"(badge.descr|json).text\"></div>\n                    <div class=\"spm_profile-status-item-value\" ng-bind=\"(badge.descr|json).value\"></div>\n                    <div ng-if=\"!$last\" class=\"spm_profile-status-item-progress\"></div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n    <magic-modal show=\"$parent.$parent.show_history\">\n        <magic-modal-title ng-bind=\"widget.texts.modals.history.title\"></magic-modal-title>\n        <magic-modal-body>\n            <div sailplay-history>\n\n                <table class=\"spm_profile-history\" ng-show=\"history().length\">\n                    <thead>\n                        <tr>\n                            <td class=\"type_lighter\" ng-bind=\"widget.texts.modals.history.date\"></td>\n                            <td class=\"type_lighter\" ng-bind=\"widget.texts.modals.history.action\"></td>\n                            <td class=\"type_lighter\" ng-bind=\"widget.texts.modals.history.points\"></td>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr dir-paginate=\"item in history() | itemsPerPage:5\" pagination-id=\"history_pages\">\n                            <td class=\"type_lighter\" ng-bind=\"item.action_date | date:'d.MM.yyyy'\"></td>\n                            <td>\n                                <div ng-bind=\"item|history_item\"></div>\n                            </td>\n                            <td ng-class=\"{type_positive:item.points_delta>0, type_negative:item.points_delta<0}\" ng-bind=\"item.points_delta?(item.points_delta|number):''\"></td>\n                        </tr>\n                    </tbody>\n                </table>\n\n                <dir-pagination-controls max-size=\"7\" direction-links=\"false\" pagination-id=\"history_pages\" template-url=\"magic.pagination\"\n                    auto-hide=\"true\"></dir-pagination-controls>\n\n                <div ng-hide=\"history().length\" ng-bind=\"widget.texts.modals.history.empty\"></div>\n\n            </div>\n        </magic-modal-body>\n    </magic-modal>\n\n    <magic-modal show=\"$parent.$parent.show_profile\">\n        <magic-modal-title ng-bind-html=\"widget.texts.modals.profile.title|to_trusted\"></magic-modal-title>\n        <magic-modal-body>\n\n            <form name=\"profile_form\" class=\"spm_profile-form\" sailplay-fill-profile config=\"widget.options.config\" ng-submit=\"sailplay.fill_profile.submit(profile_form, onSaveProfile);\">\n\n                <div class=\"spm_form_field\" ng-repeat=\"field in sailplay.fill_profile.form.fields\" ng-switch=\"field.input\">\n\n                    <div ng-switch-when=\"text\">\n                        <label class=\"spm_form_label\" ng-bind=\"field.label\"></label>\n                        <input class=\"spm_form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" ng-model=\"field.value\" ng-required=\"field.required\">\n                    </div>\n\n                    <div ng-switch-when=\"date\">\n                        <label class=\"spm_form_label\" ng-bind=\"field.label\"></label>\n                        <date-picker ng-model=\"field.value\" ng-required=\"field.required\"></date-picker>\n                    </div>\n\n                    <div ng-switch-when=\"phone\">\n                        <label class=\"spm_form_label\">{{ field.label }}</label>\n                        <input class=\"spm_form_input\" type=\"text\" model-view-value=\"true\" ui-mask=\"{{ field.placeholder }}\" ng-model=\"field.value\"\n                            ng-required=\"field.required\">\n                    </div>\n\n                    <div ng-switch-when=\"email\">\n                        <label class=\"spm_form_label\">{{ field.label }}</label>\n                        <input class=\"spm_form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" ng-model=\"field.value\" ng-required=\"field.required\">\n                    </div>\n\n                </div>\n\n                <input type=\"submit\" class=\"spm_btn theme_1 type_filled type_big\" ng-value=\"widget.texts.modals.profile.save\" />\n\n            </form>\n\n        </magic-modal-body>\n    </magic-modal>\n\n</div>";

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(157);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_profile {\n  position: relative;\n}\n.spm_wrapper .spm_profile-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  box-sizing: border-box;\n  padding: 80px 30px 160px;\n}\n.spm_wrapper .spm_profile-welcome {\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: 20px;\n  line-height: 25px;\n  color: #000000;\n  margin-bottom: 10px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-welcome {\n    font-size: 16px;\n    line-height: 20px;\n    text-align: center;\n  }\n}\n.spm_wrapper .spm_profile-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 45px;\n  line-height: 55px;\n  color: #000000;\n  max-width: 660px;\n  margin-bottom: 40px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-header {\n    font-size: 20px;\n    line-height: 26px;\n    text-align: center;\n  }\n}\n.spm_wrapper .spm_profile-content {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n@media (max-width: 750px) {\n  .spm_wrapper .spm_profile-content {\n    flex-direction: column;\n  }\n}\n.spm_wrapper .spm_profile-points {\n  width: 280px;\n  height: 280px;\n  background: #4D2962;\n  color: #ffffff;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 50px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.spm_wrapper .spm_profile-points-confirmed {\n  font-size: 48px;\n  line-height: 38px;\n  margin-bottom: 10px;\n  font-weight: 800;\n}\n.spm_wrapper .spm_profile-points-placeholder {\n  font-size: 23px;\n  line-height: 27px;\n  font-weight: 800;\n}\n.spm_wrapper .spm_profile-points-unconfirmed {\n  font-size: 18px;\n  line-height: 21px;\n  font-weight: 800;\n  margin: 10px 0 20px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n.spm_wrapper .spm_profile-points-unconfirmed-block {\n  opacity: 0.5;\n}\n.spm_wrapper .spm_profile-points-tooltip {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  line-height: 14px;\n  border: 1px solid #ffffff;\n  color: #ffffff;\n  border-radius: 50%;\n  text-align: center;\n  margin-left: 10px;\n}\n.spm_wrapper .spm_profile-points-tooltip div {\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  margin-bottom: 16px;\n  width: 212px;\n  margin-left: -106px;\n  background: #ffffff;\n  padding: 0 20px;\n  box-shadow: 0px 0px 10px 0px rgba(51, 8, 32, 0.35);\n  transform: translateY(-20%);\n  opacity: 0;\n  visibility: hidden;\n  transition: 0.3s linear;\n  font-size: 14px;\n  box-sizing: border-box;\n  font-weight: 500;\n  line-height: 16px;\n  color: rgba(0, 0, 0, 0.5);\n  padding: 20px 0;\n}\n.spm_wrapper .spm_profile-points-tooltip div:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: -14px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 14px 12px 0 12px;\n  border-color: #ffffff transparent transparent transparent;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-points-tooltip div:after {\n    bottom: -12px;\n    left: auto;\n    right: 30px;\n  }\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-points-tooltip div {\n    margin-left: -170px;\n  }\n}\n.spm_wrapper .spm_profile-points-tooltip:hover div {\n  transform: translateY(0);\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .spm_profile-status {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 800;\n}\n.spm_wrapper .spm_profile-status i {\n  width: 150px;\n  height: 150px;\n  margin-right: 20px;\n  border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n  background-color: #ffffff;\n  border: 8px solid #ffffff;\n  margin-left: -15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-status i {\n    margin-left: 0;\n    margin-bottom: 10px;\n    margin-right: 0;\n  }\n}\n.spm_wrapper .spm_profile-status-info {\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  flex-direction: column;\n}\n.spm_wrapper .spm_profile-status-placeholder {\n  font-size: 18px;\n  line-height: 25px;\n  color: #4D2962;\n}\n.spm_wrapper .spm_profile-status-name {\n  font-size: 25px;\n  line-height: 25px;\n  color: #4D2962;\n}\n.spm_wrapper .spm_profile-status-descr {\n  font-size: 18px;\n  line-height: 25px;\n  color: #000000;\n}\n.spm_wrapper .spm_profile-status .spm_btn {\n  margin-top: 15px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_profile-status {\n    flex-direction: column;\n    margin-top: 30px;\n  }\n}\n.spm_wrapper .spm_profile-history {\n  max-width: 100%;\n  width: 380px;\n  margin-bottom: 35px;\n}\n.spm_wrapper .spm_profile-history td {\n  color: #000000;\n  font-weight: 500;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .spm_profile-history td.type_lighter {\n  opacity: 0.2;\n}\n.spm_wrapper .spm_profile-history td.type_positive {\n  color: #FA5A93;\n}\n.spm_wrapper .spm_profile-history td div {\n  line-height: 24px;\n  padding-right: 10px;\n}\n.spm_wrapper .spm_profile-history td:nth-child(1) {\n  width: 100px;\n}\n.spm_wrapper .spm_profile-history td:nth-child(3) {\n  min-width: 80px;\n}\n.spm_wrapper .spm_profile-history thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .spm_profile-history thead td {\n  line-height: 30px;\n}\n.spm_wrapper .spm_profile-history tbody tr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.spm_wrapper .spm_profile-history tbody td {\n  line-height: 80px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .spm_profile-history {\n    width: 100%;\n  }\n}\n.spm_wrapper .spm_profile-form {\n  max-width: 100%;\n  width: 280px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n.spm_wrapper .spm_profile-form input[type=\"submit\"] {\n  margin-top: 20px;\n}\n@media (max-width: 600px) {\n  .spm_wrapper .spm_profile-form {\n    width: 100%;\n  }\n}\n.spm_wrapper .spm_profile-block-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  background: #ffffff;\n}\n.spm_wrapper .spm_profile-block-wrapper .spm_profile-container {\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 30px;\n}\n.spm_wrapper .spm_profile-block-wrapper-close {\n  width: 21px;\n  height: 21px;\n  right: 50px;\n  top: 25px;\n  position: absolute;\n  cursor: pointer;\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n}\n.spm_wrapper .spm_profile-block-wrapper-close:hover {\n  opacity: 0.7;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-block-wrapper-close {\n    top: 100px;\n  }\n}\n.spm_wrapper .spm_profile-status-list {\n  color: #ffffff;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  width: 100%;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-status-list {\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n}\n.spm_wrapper .spm_profile-status-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: relative;\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-status-item {\n    margin-top: 20px;\n    flex-basis: 50%;\n  }\n}\n@media (max-width: 300px) {\n  .spm_wrapper .spm_profile-status-item {\n    flex-basis: 100%;\n  }\n}\n.spm_wrapper .spm_profile-status-item-tooltip {\n  position: absolute;\n  z-index: 2;\n  left: 0;\n  top: -25%;\n  width: 100%;\n  font-size: 17px;\n  line-height: 22px;\n  color: #000000;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-20%);\n  -webkit-transition: 0.3s linear;\n  -moz-transition: 0.3s linear;\n  -ms-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-tooltip {\n    font-size: 12px;\n    line-height: 16px;\n  }\n}\n.spm_wrapper .spm_profile-status-item-image {\n  width: 138px;\n  height: 138px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  background: #ffffff;\n  position: relative;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n  border: 8px solid white;\n  display: block;\n  z-index: 1;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-image {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 650px) {\n}\n.spm_wrapper .spm_profile-status-item-name {\n  font-size: 18px;\n  font-weight: 800;\n  line-height: 25px;\n  text-transform: uppercase;\n  color: #FA5A93;\n  margin-top: 25px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-name {\n    font-size: 14px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-status-item-name {\n    margin-top: 10px;\n  }\n}\n.spm_wrapper .spm_profile-status-item-descr {\n  text-align: center;\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 24px;\n  color: #000000;\n  opacity: 0.3;\n  margin: 10px 0;\n  max-width: 138px;\n  margin-bottom: 20px;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-descr {\n    font-size: 13px;\n    line-height: 16px;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-status-item-descr {\n    margin-bottom: 10px;\n  }\n}\n.spm_wrapper .spm_profile-status-item-value {\n  text-align: center;\n  font-size: 30px;\n  font-weight: bold;\n  line-height: 25px;\n  color: #000000;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-value {\n    font-size: 18px;\n    line-height: 20px;\n  }\n}\n.spm_wrapper .spm_profile-status-item-progress {\n  position: absolute;\n  height: 8px;\n  background: white;\n  width: 100%;\n  top: 70px;\n  right: -85%;\n}\n@media (max-width: 850px) {\n  .spm_wrapper .spm_profile-status-item-progress {\n    left: 8vw;\n    width: 120px;\n    height: 6px;\n    top: 35px;\n    right: auto;\n  }\n}\n@media (max-width: 650px) {\n  .spm_wrapper .spm_profile-status-item-progress {\n    display: none;\n  }\n}\n.spm_wrapper .spm_profile-status-item.type_active .spm_profile-status-item-image {\n  background-color: #FA5A93;\n  border-color: #FA5A93;\n}\n.spm_wrapper .spm_profile-status-item.type_active .spm_profile-status-item-progress:after {\n  content: '';\n  background: #FA5A93;\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  display: block;\n}\n.spm_wrapper .spm_profile-status-item.type_active.type_filled .spm_profile-status-item-progress:after {\n  width: 100%;\n}\n@media (min-width: 650px) {\n  .spm_wrapper .spm_profile-status-item:hover .spm_profile-status-item-tooltip {\n    opacity: 0.5;\n    visibility: visible;\n    transform: translateY(0);\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widget = __webpack_require__(10);

var _template = __webpack_require__(159);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(160);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widget = {
  id: "quests",
  template: _template2.default,
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

/***/ 159:
/***/ (function(module, exports) {

module.exports = "<div class=\"spm_quests clearfix\" ng-if=\"widget.enabled\" ng-cloak sailplay-profile>\n\n    <div class=\"spm_quests-container\">\n\n        <div class=\"spm_quests-header\" ng-bind=\"widget.texts.header\"></div>\n        <div class=\"spm_quests-sub-header\" ng-bind=\"widget.texts.sub_header\"></div>\n\n        <div class=\"spm_quests-list\" sailplay-actions>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions().actions\" ng-mouseenter=\"action.loaded=true\">\n                <i class=\"spm_quests-item-icon\" ng-style=\"{backgroundImage: (action_data(action).pic|sailplay_pic|background_image)}\"></i>\n                <div class=\"spm_quests-item-content\">\n                    <div class=\"spm_quests-item-name\" ng-bind=\"action_data(action).name\"></div>\n                    <div class=\"spm_quests-item-points\" ng-show=\"action.points\" ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n                </div>\n                <div class=\"spm_quests-item-hover\" ng-if=\"action.loaded\" sailplay-action styles=\"{{ action_styles(action_data(action)) }}\"\n                    action=\"action\" text=\"{{ action_data(action).button_text }}\">\n                    <span ng-bind=\"action_data(action).button_text\"></span>\n                </div>\n            </div>\n\n            <div class=\"spm_quests-item\" ng-repeat=\"action in actions_custom()\" ng-mouseenter=\"action.loaded=true\">\n                <i class=\"spm_quests-item-icon\" ng-style=\"{backgroundImage: (action.icon|sailplay_pic|background_image)}\"></i>\n                <div class=\"spm_quests-item-content\">\n                    <div class=\"spm_quests-item-name\" ng-bind=\"action.name\"></div>\n                    <div class=\"spm_quests-item-points\" ng-show=\"action.points\" ng-bind=\"(action.points|number)+' '+(action.points|sailplay_pluralize:('points.texts.pluralize'|tools))\"></div>\n                </div>\n                <div class=\"spm_quests-item-hover\" ng-if=\"action.loaded\" sailplay-action-custom action=\"action\"></div>\n            </div>\n\n        </div>\n\n    </div>\n\n    <magic-modal show=\"$parent.$parent.show_success\">\n        <magic-modal-title ng-bind=\"widget.texts.modals.success.title\"></magic-modal-title>\n        <magic-modal-body ng-bind-html=\"widget.texts.modals.success.body|to_trusted\"></magic-modal-body>\n    </magic-modal>\n\n</div>";

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(161);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".spm_wrapper .spm_quests {\n  position: relative;\n}\n.spm_wrapper .spm_quests-container {\n  width: 100%;\n  height: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  box-sizing: border-box;\n  padding: 50px 30px;\n}\n.spm_wrapper .spm_quests-header {\n  font-weight: 800;\n  text-transform: uppercase;\n  font-size: 55px;\n  line-height: 65px;\n  color: #ffffff;\n  position: relative;\n}\n.spm_wrapper .spm_quests-header:after {\n  content: \"\";\n  display: block;\n  width: 50px;\n  height: 5px;\n  background: #FA5A93;\n  margin: 5px 0 10px;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_quests-header {\n    font-size: 45px;\n    line-height: 55px;\n  }\n}\n.spm_wrapper .spm_quests-sub-header {\n  font-weight: 500;\n  font-size: 24px;\n  line-height: 28px;\n  color: #ffffff;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_quests-sub-header {\n    font-size: 20px;\n    line-height: 22px;\n  }\n}\n.spm_wrapper .spm_quests-list {\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  margin: 0 -40px;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_quests-list {\n    margin: 0;\n  }\n}\n.spm_wrapper .spm_quests-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  position: relative;\n  width: 330px;\n  height: 130px;\n  box-sizing: border-box;\n  padding: 0 20px;\n  margin: 25px 30px;\n  overflow: hidden;\n  border-radius: 5px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_quests-item {\n    margin: 25px 5%;\n    width: 90%;\n    flex-wrap: wrap;\n    padding: 20px;\n    height: auto;\n  }\n}\n.spm_wrapper .spm_quests-item-hover {\n  display: none;\n  opacity: 0;\n  background: #FA5A93;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  -webkit-transition: 0.3s linear;\n  -moz-transition: 0.3s linear;\n  -ms-transition: 0.3s linear;\n  -o-transition: 0.3s linear;\n  transition: 0.3s linear;\n  align-items: center;\n  justify-content: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #ffffff;\n  font-family: Arial;\n}\n.spm_wrapper .spm_quests-item-hover iframe {\n  width: 100% !important;\n  height: 100% !important;\n}\n.spm_wrapper .spm_quests-item-hover > * {\n  cursor: pointer;\n}\n.spm_wrapper .spm_quests-item-icon {\n  width: 75px;\n  height: 75px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n}\n.spm_wrapper .spm_quests-item-content {\n  margin-left: 15px;\n  flex-basis: 65%;\n}\n@media (max-width: 500px) {\n  .spm_wrapper .spm_quests-item-content {\n    flex-basis: 100%;\n    margin-left: 0;\n    margin-top: 15px;\n  }\n}\n.spm_wrapper .spm_quests-item-name {\n  font-size: 17px;\n  line-height: 24px;\n  color: #ffffff;\n  font-weight: 500;\n}\n.spm_wrapper .spm_quests-item-points {\n  margin-top: 10px;\n  font-size: 20px;\n  line-height: 24px;\n  color: #FA5A93;\n  font-weight: 800;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .spm_quests-item {\n    margin: 25px 5px;\n  }\n}\n.spm_wrapper .spm_quests-item:hover {\n  border-color: #FA5A93;\n}\n.spm_wrapper .spm_quests-item:hover .spm_quests-item-hover {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .spm_quests:hover .spm_quests-item-hover {\n  display: flex;\n}\n", ""]);

// exports


/***/ })

},[145]);