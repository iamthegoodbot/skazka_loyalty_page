(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	__webpack_require__(108);
	__webpack_require__(114);
	__webpack_require__(118);
	__webpack_require__(122);
	__webpack_require__(126);
	__webpack_require__(130);
	__webpack_require__(134);
	__webpack_require__(135);
	__webpack_require__(139);
	__webpack_require__(143);
	__webpack_require__(147);
	__webpack_require__(151);
	__webpack_require__(156);
	__webpack_require__(161);
	module.exports = __webpack_require__(169);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Widget = undefined;
	exports.WidgetRegister = WidgetRegister;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Widget = exports.Widget = _angular2.default.module('magic.widget', []).provider('MagicWidget', function () {

	  var registered_widgets = [];

	  var get_widget_config = function get_widget_config(widget_id) {
	    return registered_widgets.filter(function (widget) {
	      return widget.id === widget_id;
	    })[0];
	  };

	  return {
	    register: function register(widget_config) {
	      var unique = !get_widget_config(widget_config.id);
	      unique && registered_widgets.push(widget_config);
	      console.log('registered widgets: ', registered_widgets);
	    },
	    $get: function $get() {

	      return {

	        registered: function registered() {
	          return registered_widgets;
	        },
	        get_widget_config: get_widget_config

	      };
	    }
	  };
	});

	//basic widget decorator
	function WidgetRegister(config) {

	  Widget.config(["MagicWidgetProvider", function (MagicWidgetProvider) {

	    MagicWidgetProvider.register(config);
	  }]);

	  return Widget;
	}

	exports.default = Widget.name;

/***/ }),
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
/* 74 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _actions = __webpack_require__(105);

	var _actions2 = _interopRequireDefault(_actions);

	__webpack_require__(106);

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

	        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

	        scope.action_selected = action || false;
	      };

	      scope.open_profile = function () {
	        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
	        $rootScope.$broadcast('openProfile');
	      };

	      SailPlay.on('actions.perform.success', function () {
	        scope.$apply(function () {
	          scope.action_selected = false;
	        });
	      });

	      scope.action_custom_select = function (action) {

	        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
	        scope.action_custom_selected = action || false;
	      };

	      scope.action_styles = function (action_data) {
	        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
	      };
	    };
	  }

	});

/***/ }),
/* 105 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"{{ widget.id }} clearfix\">\n\n  <div id=\"magic_actions\" class=\"more_bonus container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-actions class=\"clearfix\">\n\n      <div class=\"more_bonus_main\">\n\n        <div class=\"spm_row clearfix\">\n\n          <div class=\"spm_col\" data-ng-repeat=\"action in actions().actions\">\n            <div class=\"mb_item action\" data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"action_data(action).name\"></span>\n                <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-if=\"action_data(action).just_open_profile\" data-ng-click=\"open_profile()\">{{ action_data(action).button_text }}</a>                \n                <a class=\"sp_btn button_primary\" data-ng-if=\"!action_data(action).just_open_profile\" data-ng-click=\"action_select(action)\">{{ action_data(action).button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ action_data(action).pic | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n          <div class=\"spm_col\" data-ng-repeat=\"action in actions_custom()\">\n            <div class=\"mb_item action\" data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"action.name\"></span>\n                <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-click=\"action_custom_select(action)\">{{ action.button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ action.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n          <div class=\"spm_col\" data-ng-repeat=\"quiz in $parent.quiz_list\" data-ng-if=\"quiz_list && quiz_list.length && ((!exist || !exist()) || !checkTag(quiz.tag, exist()))\" >\n            <div class=\"mb_item action\"data-ng-style=\"widget.styles.action\">\n              <div class=\"mb_item_left\">\n                <span class=\"action_name\" data-ng-bind=\"quiz.name\"></span>\n                <span class=\"action_points\" data-ng-show=\"quiz.points\" data-ng-bind=\"((quiz.points || 0) | number) + ' ' + (quiz.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                <a class=\"sp_btn button_primary\" data-ng-click=\"$event.preventDefault();open_quiz(quiz)\">{{ quiz.button_text }}</a>\n              </div>\n              <div class=\"mb_item_right\">\n                <img data-ng-src=\"{{ quiz.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <magic-modal class=\"actions_selected_modal\" data-ng-cloak data-show=\"$parent.action_selected\">\n\n        <div>\n\n          <div class=\"action_image\">\n            <img class=\"gift_more_img\" data-ng-src=\"{{ action_data(action_selected).pic | sailplay_pic }}\"\n                 alt=\"{{ action_data(action_selected).name }}\">\n          </div>\n\n          <div class=\"action_tools\">\n\n            <p>\n              <span class=\"modal_action_name\" data-ng-bind=\"action_data(action_selected).name\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_description\" data-ng-bind=\"action_data(action_selected).description\"></span>\n            </p>\n\n\n            <p class=\"action_buttons\">\n            <span data-sailplay-action\n                  data-styles=\"{{ action_styles(action_data(action_selected)) }}\"\n                  data-action=\"action_selected\"\n                  data-text=\"{{ action_data(action_selected).button_text }}\">\n              <span class=\"sp_btn button_primary\">{{ action_data(action_selected).button_text }}</span>\n            </span>\n            </p>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.action_custom_selected\">\n\n        <div data-sailplay-action-custom data-action=\"action_custom_selected\"></div>\n\n      </magic-modal>\n\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.quiz.show\">\n\n        <div class=\"quiz_main\">\n\n          <div class=\"quiz_block\" data-ng-if=\"$parent.quiz.data\">\n\n            <div class=\"quiz_block__title\" data-ng-bind=\"$parent.quiz.data.name\"></div>\n\n            <div class=\"quiz_block__counter\" data-ng-bind=\"$parent.quiz.step + ' / ' + $parent.quiz.data.data.length\"></div>\n\n            <div class=\"quiz_block__name\" data-ng-bind=\"getCurrentTest().name\"></div>\n\n            <label data-ng-repeat=\"question in getCurrentTest().answers\"\n                   data-ng-switch=\"getCurrentTest().type\"\n                   data-ng-click=\"$event.preventDefault();change(question, getCurrentTest());\">\n\n              <input data-ng-switch-when=\"many\" type=\"checkbox\"\n                     name=\"quiz_[[ $index ]]\"\n                     data-ng-checked=\"check(question)\">\n\n              <input data-ng-switch-when=\"one\" type=\"radio\"\n                     name=\"quiz\"\n                     data-ng-checked=\"check(question)\">\n\n              <span data-ng-bind=\"question.text\"></span>\n\n            </label>\n\n            <textarea name=\"variable\" data-ng-show=\"needToShowVariable()\"\n                      data-ng-model=\"models.variable\"></textarea>\n\n            <div class=\"button_wrapper clearfix\">\n\n                <span data-ng-click=\"prev();\" class=\"quiz_block__btn prev\"\n                      data-ng-class=\"{type_disabled: $parent.quiz.step == 1}\">Prev</span>\n\n              <span data-ng-click=\"next();\" class=\"quiz_block__btn next\"\n                    data-ng-class=\"{type_disabled: !canPressNext() }\"\n                    data-ng-bind=\"step == $parent.quiz.data.data.length ? 'Finish' : 'Next' \">next</span>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(107);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./actions.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./actions.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .more_bonus {\n  float: left;\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .more_bonus .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n}\n.spm_wrapper .more_bonus .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .more_bonus .more_bonus_main {\n  margin: 40px 0 0 0;\n  float: left;\n}\n.spm_wrapper .more_bonus .more_bonus_main .spm_col {\n  width: 33.3%;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item {\n  background-color: #eeeeee;\n  height: 175px;\n  margin-bottom: 30px;\n  position: relative;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item.act {\n  margin-bottom: 0px;\n  height: 155px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover span {\n  opacity: 0;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover .mb_item_left a {\n  opacity: 1;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left {\n  float: left;\n  width: 64%;\n  position: relative;\n  height: 100%;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span {\n  float: left;\n  margin-left: 15%;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  width: 70%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  max-height: 80px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(1) {\n  color: #222222;\n  font-size: 16px;\n  line-height: 22px;\n  margin-top: 29px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(2) {\n  color: #444444;\n  margin-top: 9px;\n  margin-right: 30px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  font-family: Arial;\n  top: 50%;\n  margin-top: -18px;\n  left: 50%;\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  height: 35px;\n  font-weight: 500;\n  margin-left: -70px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a.without_bg {\n  background: none;\n  border: none;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right {\n  float: right;\n  width: 36%;\n  height: 100%;\n  background-color: #E6E2DD;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right img {\n  margin-top: 38px;\n  display: inline-block;\n  max-width: 90%;\n  max-height: 70px;\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 50%;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 50%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col {\n    width: 100%;\n    position: relative;\n    margin-right: 0px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item {\n    height: auto;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col.act {\n    margin-bottom: 0px;\n    height: 250px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_left {\n    float: right;\n    margin-top: 100px;\n    height: 140px;\n    width: 100%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_left span {\n    width: 90%;\n    text-align: center;\n    margin-left: 5%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_right {\n    float: left;\n    width: 100%;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    height: 100px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .spm_col .mb_item_right img {\n    margin-top: 23px;\n  }\n}\n.spm_wrapper .actions_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .actions_selected_modal .action_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n  max-height: 170px;\n}\n.spm_wrapper .actions_selected_modal .action_image img {\n  width: 100%;\n}\n.spm_wrapper .actions_selected_modal .action_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 69%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .actions_selected_modal [data-sailplay-action] {\n  position: relative;\n  width: 100%;\n  height: 36px;\n  display: inline-block;\n}\n.spm_wrapper .actions_selected_modal .sailplay_action_frame {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 140px !important;\n  height: 100% !important;\n  overflow: visible !important;\n  border: none !important;\n}\n.spm_wrapper .actions_selected_modal .action_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .actions_custom_selected_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 400px;\n}\n.spm_wrapper .actions_custom_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_block {\n  width: 100%;\n  border-radius: 10px;\n  box-sizing: border-box;\n}\n.spm_wrapper .quiz_block .button_wrapper {\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__title {\n  width: 100%;\n  color: #57baad;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n}\n.spm_wrapper .quiz_block label {\n  display: block;\n  width: 100%;\n  font-size: 14px;\n  margin: 10px 0;\n  white-space: nowrap;\n}\n.spm_wrapper .quiz_block label input {\n  display: inline-block;\n  height: 14px;\n  width: 14px;\n  line-height: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .quiz_block label span {\n  white-space: normal;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 18px;\n}\n.spm_wrapper .quiz_block__counter {\n  width: 100%;\n  display: block;\n  margin: 5px 0;\n  text-align: center;\n  font-weight: bold;\n  font-size: 18px;\n  color: #57baad;\n}\n.spm_wrapper .quiz_block__name {\n  width: 100%;\n  display: block;\n  margin: 20px 0;\n  text-align: left;\n  font-size: 18px;\n}\n.spm_wrapper .quiz_block textarea {\n  width: 100%;\n  min-height: 150px;\n  padding: 10px;\n  resize: none;\n  border-radius: 10px;\n  font-size: 18px;\n  box-sizing: border-box;\n  border: 1px solid grey;\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__btn {\n  width: 200px;\n  line-height: 40px;\n  text-align: center;\n  color: #ffffff;\n  background-color: #f8b01c;\n  text-decoration: none;\n  font-size: 14px;\n  border-radius: 10px;\n}\n.spm_wrapper .quiz_block__btn.next {\n  float: right;\n}\n.spm_wrapper .quiz_block__btn.prev {\n  float: left;\n}\n.spm_wrapper .quiz_block__btn.type_disabled {\n  cursor: default;\n  background-color: grey;\n}\n", ""]);

	// exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _badges = __webpack_require__(109);

	var _badges2 = _interopRequireDefault(_badges);

	var _badgesBadge = __webpack_require__(110);

	var _badgesBadge2 = _interopRequireDefault(_badgesBadge);

	var _badgesLine = __webpack_require__(111);

	var _badgesLine2 = _interopRequireDefault(_badgesLine);

	__webpack_require__(112);

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
/* 109 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"container clearfix\">\n\n  <div class=\"\">\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n  </div>\n\n\n  <div data-sailplay-badges class=\"badge_lines_container clearfix\">\n\n    <sailplay-magic-badge-line class=\"multi_level\" data-ng-repeat=\"line in sailplay.badges.list().multilevel_badges\" data-line=\"line\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n    <sailplay-magic-badge-line class=\"one_level\" data-line=\"sailplay.badges.list().one_level_badges\" data-type=\"one_level\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n  </div>\n\n\n</div>";

/***/ }),
/* 110 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"badge\">\n  <div class=\"badge_iner\" data-ng-click=\"on_click(badge)\">\n    <div class=\"badge_pic\">\n      <img data-ng-src=\"{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}\" alt=\"{{ badge.name }}\">\n    </div>\n    <span class=\"badge_name\" data-ng-bind=\"badge.name\"></span>\n    <!--<span class=\"bon_tem_info badge_points\" data-ng-bind=\"(badge.points | number) + ' ' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n  </div>\n  <div class=\"badge_arrow\">\n\n  </div>\n</div>";

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_item_main clearfix\" data-ng-show=\"line.length\">\n\n    <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n      <div class=\"bon_slide_cat_item\">\n\n        <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n          <sailplay-magic-badge data-magic-slide data-badge=\"badge\" data-on-click=\"badge_select(badge);\" data-ng-repeat=\"badge in line\" data-ng-class=\"{ last: $last }\"></sailplay-magic-badge>\n\n        </div>\n\n      </div>\n\n      <!--<a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>-->\n      <!--<a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>-->\n\n    </div>\n\n  </div>\n\n  <magic-modal class=\"modal_badge_selected\" data-ng-cloak data-show=\"badge_selected\">\n\n    <div>\n\n      <div class=\"modal_badge_image\">\n        <img class=\"gift_more_img\" data-ng-src=\"{{ badge_selected.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ badge_selected.name }}\">\n      </div>\n\n      <div class=\"modal_badge_tools\">\n\n        <p>\n          <span class=\"modal_badge_name\" data-ng-bind=\"badge_selected.name\"></span>\n        </p>\n\n        <!--<p style=\"margin-top: 10px;\">-->\n          <!--<span class=\"modal_badge_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n        <!--</p>-->\n\n        <p style=\"margin-top: 10px;\">\n          <span class=\"modal_badge_description\" data-ng-bind=\"badge_selected.descr\"></span>\n        </p>\n\n        <p class=\"modal_badge_buttons\">\n          <span class=\"badge_share_button fb_icon\" data-ng-click=\"badge_share('fb', badge_selected)\">\n            {{ _config.texts.share_fb }}\n          </span>\n          <span class=\"badge_share_button tw_icon\" style=\"margin-right: 20px;\" data-ng-click=\"badge_share('tw', badge_selected)\">\n            {{ _config.texts.share_tw }}\n          </span>\n          <span class=\"sp_btn button_primary\" data-ng-click=\"badge_select(false);\">{{ _tools.buttons.texts.close }}</span>\n        </p>\n\n      </div>\n\n    </div>\n\n  </magic-modal>\n\n</div>";

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(113);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./badges.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./badges.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_widget.badges {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .container {\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC', 'Roboto', sans-serif;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap {\n  float: left;\n  width: 100%;\n  margin-top: 30px;\n  margin-bottom: 30px;\n  position: relative;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  transition: .3s ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge_lines_container {\n  margin: 30px auto;\n  float: left;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.badges .one_level .badge_arrow {\n  display: none;\n}\n.spm_wrapper .spm_tools_widget.badges .badge {\n  position: relative;\n  width: 150px;\n  height: 190px;\n  border: 1px solid #cccccc;\n  margin-left: 30px;\n  margin-right: 30px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner span {\n  white-space: normal;\n  float: left;\n  color: #222222;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_name {\n  font-size: 16px;\n  width: 100%;\n  text-align: center;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_pic {\n  width: 100%;\n  max-height: 150px;\n  overflow: hidden;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner .badge_pic img {\n  width: 100%;\n  height: auto;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .spm_tools_widget.badges .badge .badge_arrow {\n  position: absolute;\n  left: 100%;\n  top: 65px;\n  width: 60px;\n  height: 20px;\n  background-position: center left;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n.spm_wrapper .spm_tools_widget.badges .badge.last .badge_arrow {\n  display: none;\n}\n.spm_wrapper .modal_badge_selected .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image img {\n  width: 100%;\n  vertical-align: top;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 70%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button {\n  vertical-align: middle;\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background-position: center;\n  background-size: 20px 20px;\n  background-repeat: no-repeat;\n  cursor: pointer;\n  margin-right: 10px;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  background-color: #cccccc;\n  border-radius: 20px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button:hover {\n  background-color: #888888;\n}\n", ""]);

	// exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _banner = __webpack_require__(115);

	var _banner2 = _interopRequireDefault(_banner);

	__webpack_require__(116);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _widget.WidgetRegister)({
	  id: 'banner',
	  template: _banner2.default,
	  controller: function controller() {
	    return function () {};
	  }
	});

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_choice_main container block_images\" data-ng-cloak>\n    <img class=\"block_images__item\" data-ng-repeat=\"(key, value) in widget.images\" data-ng-src=\"{{ value }}\" alt=\"{{ key }}\">\n  </div>\n</div>\n";

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(117);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./banner.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./banner.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .block_images {\n  width: 100%;\n}\n.spm_wrapper .block_images__item {\n  max-width: 100%;\n}\n", ""]);

	// exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _cardQuests = __webpack_require__(119);

	var _cardQuests2 = _interopRequireDefault(_cardQuests);

	__webpack_require__(120);

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

	        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

	        scope.action_selected = action || false;
	      };

	      SailPlay.on('actions.perform.success', function () {
	        scope.$apply(function () {
	          scope.action_selected = false;
	        });
	      });

	      scope.action_custom_select = function (action) {

	        if (!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
	        scope.action_custom_selected = action || false;
	      };

	      scope.action_styles = function (action_data) {
	        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
	      };
	    };
	  }

	});

/***/ }),
/* 119 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"container clearfix\" id=\"magic_actions\">\n\n  <div class=\"card_quests\">\n\n    <h3 class=\"card_quests_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n\n    <h4 class=\"card_quests_caption\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-actions class=\"card_quests_list clearfix\">\n\n      <div class=\"spm_row clearfix\">\n\n          <div class=\"spm_col quest_card_container\" data-ng-repeat=\"action in actions().actions | filter:filter\">\n\n            <div class=\"quest_card\" title=\"{{ action_data(action).name }}\">\n\n              <div class=\"quest_card_image\">\n                <img data-ng-src=\"{{ action_data(action).pic | sailplay_pic }}\" alt=\"\">\n              </div>\n\n              <div class=\"quest_card_tools\">\n\n                <div class=\"quest_card_info\">\n                  <span class=\"quest_card_name ellipsis\" data-ng-bind=\"action_data(action).name\"></span>\n                  <span class=\"quest_card_points ellipsis\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                </div>\n\n                <div class=\"quest_card_buttons\">\n                  <a class=\"button_primary\" data-ng-click=\"action_select(action)\">{{ action_data(action).button_text }}</a>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n          <div class=\"spm_col quest_card_container\" data-ng-repeat=\"action in actions_custom() | filter:filter\">\n\n            <div class=\"quest_card\" title=\"{{ action.name }}\">\n\n              <div class=\"quest_card_image\">\n                <img data-ng-src=\"{{ action.icon | sailplay_pic }}\" alt=\"\">\n              </div>\n\n              <div class=\"quest_card_tools\">\n\n                <div class=\"quest_card_info\">\n                  <span class=\"quest_card_name ellipsis\" data-ng-bind=\"action.name\"></span>\n                  <span class=\"quest_card_points ellipsis\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n                </div>\n\n                <div class=\"quest_card_buttons\">\n                  <a class=\"button_primary\" data-ng-click=\"action_custom_select(action)\">{{ action.button_text }}</a>\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n\n      <magic-modal class=\"actions_selected_modal\" data-ng-cloak data-show=\"$parent.action_selected\">\n\n        <div>\n\n          <div class=\"action_image\">\n            <img class=\"gift_more_img\" data-ng-src=\"{{ action_data(action_selected).pic | sailplay_pic }}\"\n                 alt=\"{{ action_data(action_selected).name }}\">\n          </div>\n\n          <div class=\"action_tools\">\n\n            <p>\n              <span class=\"modal_action_name\" data-ng-bind=\"action_data(action_selected).name\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_description\" data-ng-bind=\"action_data(action_selected).description\"></span>\n            </p>\n\n\n            <p class=\"action_buttons\">\n            <span data-sailplay-action\n                  data-styles=\"{{ action_styles(action_data(action_selected)) }}\"\n                  data-action=\"action_selected\"\n                  data-text=\"{{ action_data(action_selected).button_text }}\">\n              <span class=\"sp_btn button_primary\">{{ action_data(action_selected).button_text }}</span>\n            </span>\n            </p>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.action_custom_selected\">\n\n        <div data-sailplay-action-custom data-action=\"action_custom_selected\"></div>\n\n      </magic-modal>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(121);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./card-quests.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./card-quests.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .card_quests {\n  width: 90%;\n  margin: 40px 5%;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .card_quests .card_quests_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 20px;\n}\n.spm_wrapper .card_quests .card_quests_caption {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 20px;\n}\n.spm_wrapper .card_quests .card_quests_list {\n  margin: 20px 0 20px 0;\n}\n.spm_wrapper .card_quests .quest_card_container {\n  width: 25%;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .card_quests .quest_card_container {\n    width: 50%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .card_quests .quest_card_container {\n    width: 100%;\n  }\n}\n.spm_wrapper .card_quests .quest_card .quest_card_image {\n  background-color: #888888;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_image img {\n  width: 100%;\n  display: block;\n  vertical-align: top;\n}\n.spm_wrapper .card_quests .quest_card:hover .quest_card_tools .quest_card_info {\n  opacity: 0;\n}\n.spm_wrapper .card_quests .quest_card:hover .quest_card_tools .quest_card_buttons {\n  opacity: 1;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools {\n  background-color: #cccccc;\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info {\n  opacity: 1;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info .quest_card_name {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 20px;\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_info .quest_card_points {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  width: 100%;\n  padding: 0 20px 20px 20px;\n  font-size: 18px;\n  font-weight: bold;\n}\n.spm_wrapper .card_quests .quest_card .quest_card_tools .quest_card_buttons {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding-top: 20px;\n  text-align: center;\n}\n.spm_wrapper .actions_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .actions_selected_modal .action_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n  max-height: 170px;\n}\n.spm_wrapper .actions_selected_modal .action_image img {\n  width: 100%;\n}\n.spm_wrapper .actions_selected_modal .action_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 69%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .actions_selected_modal [data-sailplay-action] {\n  position: relative;\n  width: 100%;\n  height: 36px;\n  display: inline-block;\n}\n.spm_wrapper .actions_selected_modal .sailplay_action_frame {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 140px !important;\n  height: 100% !important;\n  overflow: visible !important;\n  border: none !important;\n}\n.spm_wrapper .actions_selected_modal .action_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .actions_custom_selected_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 400px;\n}\n.spm_wrapper .actions_custom_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n", ""]);

	// exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _charityPro = __webpack_require__(123);

	var _charityPro2 = _interopRequireDefault(_charityPro);

	__webpack_require__(124);

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
/* 123 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"sp_cp-widget container clearfix\">\n\n    <div class=\"sp_cp-widget__wrap clearfix\">\n\n        <div class=\"sp_cp-widget__left\" data-ng-show=\"user && user()\">\n\n            <a class=\"sp_cp-widget__btn sp_cp-widget__search-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_search\"\n               data-ng-if=\"show_search_link && widget.options.search_link\"\n               data-ng-href=\"{{ widget.options.search_link }}\" target=\"_blank\"></a>\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_subscriptions\"\n               data-ng-if=\"widget.options.subscriptions_link\"\n               data-ng-href=\"{{ widget.options.subscriptions_link }}\" target=\"_blank\"></a>\n\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-bind=\"widget.texts.button_form\"\n               data-ng-if=\"show_request_charity\"\n               data-ng-click=\"$event.preventDefault();$parent.show_form=true;\"></a>\n\n\n            <a href=\"#\" class=\"sp_cp-widget__btn sp_cp-widget__form-btn button_primary\"\n               data-ng-if=\"widget.options.payments_link\"\n               data-ng-bind=\"widget.texts.button_payments\"\n               data-ng-href=\"{{ widget.options.payments_link }}\" target=\"_blank\"></a>\n\n        </div>\n\n        <div class=\"sp_cp-widget__right\" data-ng-show=\"user && user()\">\n\n            <select class=\"sp_cp-widget__select\" data-ng-model=\"charity\"\n                    data-ng-disabled=\"disabled\"\n                    data-ng-change=\"charity_change()\"\n                    data-ng-options=\"item.tag as item.name for item in widget.options.charities\">\n                <option value=\"\" disabled selected ng-hide=\"charity\"\n                        data-ng-bind=\"widget.texts.select_charity\"></option>\n            </select>\n\n        </div>\n\n    </div>\n\n    <magic-modal class=\"sp_cp-widget__form\" data-show=\"show_form\">\n\n        <div class=\"sp_cp-widget__form-header\" data-ng-bind=\"widget.texts.request_charity_header\"></div>\n\n        <div class=\"sp_cp-widget__invalid-fields\" data-ng-if=\"!form\">Invalid form fields</div>\n\n        <form name=\"request_charity\" data-ng-submit=\"charity_form_submit(request_charity)\" data-ng-show=\"form\">\n\n            <div class=\"form_field\" data-ng-repeat=\"field in form\"\n                 data-ng-class=\"{type_full: field.full_width}\"\n                 data-ng-switch=\"field.input\">\n\n                <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n                    <img width=\"160px\"\n                         data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\"\n                         alt=\"\">\n                </div>\n\n                <div data-ng-switch-when=\"textarea\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <textarea class=\"form_textarea\" placeholder=\"{{ field.placeholder }}\"\n                              data-ng-required=\"field.required\" data-ng-model=\"field.value\"></textarea>\n                </div>\n\n                <div data-ng-switch-when=\"text\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n                <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"text\" data-ui-mask=\"{{ field.placeholder }}\"\n                           data-model-view-value=\"true\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n                <div data-ng-switch-when=\"date\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <date-picker data-model=\"field.value\"></date-picker>\n                </div>\n\n                <div data-ng-switch-when=\"select\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <div class=\"magic_select form_input\">\n                        <select data-ng-model=\"field.value\"\n                                data-ng-required=\"field.required\"\n                                data-ng-options=\"item.value as item.text for item in field.data\"></select>\n                    </div>\n                </div>\n\n                <div data-ng-switch-when=\"email\" class=\"clearfix\">\n                    <label class=\"form_label\" data-ng-bind-html=\"field.label | to_trusted\"></label>\n                    <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\"\n                           data-ng-required=\"field.required\" data-ng-model=\"field.value\">\n                </div>\n\n            </div>\n\n            <div class=\"sp_cp-widget__form-submit_wrapper clearfix\">\n\n                <button type=\"submit\" class=\"sp_btn button_primary sp_cp-widget__form-submit_button\"\n                        data-ng-bind=\"widget.texts.request_charity_submit\"></button>\n\n                <button type=\"button\" class=\"sp_btn button_primary sp_cp-widget__form-back_button\"\n                        data-ng-bind=\"widget.texts.request_charity_back\"\n                        data-ng-click=\"charity_form_close(request_charity);\"></button>\n\n            </div>\n\n        </form>\n\n    </magic-modal>\n\n\n</div>";

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(125);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./charity-pro.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./charity-pro.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .sp_cp-widget {\n  /* -------------------- Select Box Styles: stackoverflow.com Method */\n  /* -------------------- Source: http://stackoverflow.com/a/5809186 */\n}\n.spm_wrapper .sp_cp-widget form {\n  padding: 20px 40px 40px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px), only screen and (max-width: 529px) {\n  .spm_wrapper .sp_cp-widget .form_field {\n    width: 100%;\n    padding: 0 40px 20px 0;\n  }\n}\n.spm_wrapper .sp_cp-widget__wrap {\n  position: relative;\n  height: auto;\n  width: 100%;\n  padding: 50px 5%;\n  box-sizing: border-box;\n}\n.spm_wrapper .sp_cp-widget__left {\n  width: 50%;\n  float: left;\n  text-align: left;\n  font-size: 0;\n}\n.spm_wrapper .sp_cp-widget__left a {\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.spm_wrapper .sp_cp-widget__right {\n  width: 50%;\n  float: left;\n  text-align: right;\n}\n.spm_wrapper .sp_cp-widget__invalid-fields {\n  padding: 10px 0;\n  text-align: center;\n}\n.spm_wrapper .sp_cp-widget__select {\n  -webkit-appearance: button;\n  -webkit-border-radius: 2px;\n  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);\n  -webkit-padding-end: 20px;\n  -webkit-padding-start: 2px;\n  -webkit-user-select: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: black;\n  font-size: 16px;\n  box-sizing: border-box;\n  padding-left: 10px;\n  border-radius: 10px;\n  border: 2px solid black;\n  line-height: 46px;\n  height: 50px;\n  background-image: url('https://d3sailplay.cdnvideo.ru/media/assets/assetfile/303e1f38393495b1a059952843abeeb0.png');\n  background-repeat: no-repeat;\n  background-position: right 10px center;\n  background-size: 10px;\n  background-color: transparent;\n  outline: none;\n}\n.spm_wrapper .sp_cp-widget__select[disabled] {\n  opacity: .7;\n}\n", ""]);

	// exports


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _event_message = __webpack_require__(127);

	var _event_message2 = _interopRequireDefault(_event_message);

	__webpack_require__(128);

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
/* 127 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"event_message__wrapper container\">\n\n    <div class=\"event_message\" data-ng-repeat=\"item in messages\">\n\n        <img class=\"event_message__icon\" data-ng-src=\"{{ item.icon }}\" alt=\"{{ item.text }}\">\n        <span class=\"event_message__text\" data-ng-bind=\"item.text\"></span>\n\n    </div>\n\n</div>";

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(129);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./event_message.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./event_message.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .event_message__wrapper {\n  text-align: center;\n  width: 100%;\n}\n.spm_wrapper .event_message__icon {\n  max-height: 80%;\n  display: inline-block;\n  vertical-align: middle;\n}\n.spm_wrapper .event_message__text {\n  margin-left: 5px;\n  display: inline-block;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GiftTypeRegister = undefined;

	var _widget = __webpack_require__(62);

	var _gifts = __webpack_require__(131);

	var _gifts2 = _interopRequireDefault(_gifts);

	__webpack_require__(132);

	var _angular = __webpack_require__(31);

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

	          SailPlay.authorize('remote');
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
/* 131 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bon_choice_main container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n  <h3 class=\"bon_header\">\n    <span class=\"header\">{{ widget.texts.header }}</span>\n  </h3>\n  <h4 class=\"bon_sub_header\">\n    <span class=\"caption\">{{ widget.texts.caption }}</span>\n  </h4>\n\n  <div data-sailplay-gifts class=\"clearfix\">\n    <div class=\"bon_item_main\" data-ng-show=\"gifts && gifts().length\" data-magic-slider>\n\n      <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n        <div class=\"bon_slide_cat_item\">\n\n          <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n            <div class=\"bon_item gift\" data-magic-slide data-magic-gift data-ng-repeat=\"gift in gifts()\">\n              <div class=\"bon_item_iner\">\n                <img data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\" alt=\"{{ gift.name }}\">\n                <span class=\"bon_item_name gift_name\" data-ng-bind=\"gift.name\"></span>\n                <span class=\"bon_tem_info gift_points\" data-ng-bind=\"(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                <a href=\"#\" class=\"button_primary\" data-ng-click=\"gift_select(gift); $event.preventDefault();\">{{ widget.texts.get }}</a>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>\n        <a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>\n\n      </div>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_gift\" data-ng-cloak data-show=\"modals.selected_gift\">\n\n      <div class=\"modal_gift_container\">\n\n        <img class=\"gift_more_img\" data-ng-src=\"{{ modals.selected_gift.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ modals.selected_gift.name }}\">\n\n        <div class=\"gift_more_block\">\n\n          <span class=\"gift_more_name modal_gift_name\" data-ng-bind=\"modals.selected_gift.name\"></span>\n\n          <span class=\"gift_more_points modal_gift_points\"\n                data-ng-bind=\"(modals.selected_gift.points | number) + ' ' + (modals.selected_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n          <p class=\"gift_more_descr modal_gift_description\" data-ng-bind=\"modals.selected_gift.descr\"></p>\n\n          <div class=\"modal_gift_type_block clearfix\" data-gift-type data-types=\"widget.options.gift_types\" data-gift=\"modals.selected_gift\"></div>\n\n          <div class=\"modal_gift_buttons\">\n            <span class=\"alink button_primary\" data-ng-click=\"gift_select(false);\">{{ 'buttons.texts.close' | tools }}</span>\n\n            <span class=\"alink button_primary\"\n                  style=\"margin-left: 5px;\"\n                  data-ng-click=\"gift_confirm();\"\n                  data-ng-bind=\"gift_affordable(modals.selected_gift) ? widget.texts.get : widget.texts.no_points_button_text\">{{ widget.texts.get }}</span>\n          </div>\n\n        </div>\n      </div>\n\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_not_points\" data-ng-cloak data-show=\"modals.no_points_error\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.no_points_message }}\n        </p>\n        <a class=\"alink button_primary earn_points_button\" href=\"#magic_actions\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.earn_points }}</a>\n        <a class=\"alink button_primary service_button\" target=\"_blank\" href=\"{{ widget.texts.partner_service_url }}\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.service }}</a>\n      </div>\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_complete\" data-ng-cloak data-show=\"modals.confirmed_gift\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.confirm_message_start }}\n          {{ (modals.confirmed_gift.points | number) + ' ' + (modals.confirmed_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools)) }}.\n          {{ widget.texts.confirm_message_end }}\n        </p>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_unconfirm();\">{{ 'buttons.texts.close' | tools }}</span>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_purchase(modals.confirmed_gift);\">{{ 'buttons.texts.get' | tools }}</span>\n      </div>\n    </magic-modal>\n  </div>\n\n\n</div>";

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(133);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./gifts.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./gifts.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bon_choice_main {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 80px;\n}\n.spm_wrapper .bon_choice_main .bon_sub_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap {\n  float: left;\n  width: 74%;\n  margin-left: 13%;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  position: relative;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  transition: .3s ease;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item {\n  width: 245px;\n  height: 360px;\n  border: 1px solid #cccccc;\n  margin-left: 15px;\n  margin-right: 15px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item:hover {\n  border: 1px solid #888888;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner span {\n  white-space: normal;\n  float: left;\n  margin-left: 30px;\n  width: 185px;\n  text-align: left;\n  color: #222222;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover span {\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover a {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_item_name {\n  font-size: 16px;\n  position: absolute;\n  left: 0px;\n  bottom: 61px;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  visibility: visible;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner img {\n  margin-top: 30px;\n  max-height: 200px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bns_overlay_gift_not_points {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_not_points p {\n  padding: 20px;\n}\n.spm_wrapper .bns_overlay_gift {\n  text-align: left;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner {\n  font-size: 0;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner:before {\n  vertical-align: middle;\n  display: inline-block;\n  height: 100%;\n  width: 0;\n  content: '';\n}\n.spm_wrapper .bns_overlay_gift .gift_more {\n  color: #222222;\n  font-size: 14px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_block {\n  display: inline-block;\n  vertical-align: middle;\n  width: 70%;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding-left: 40px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_img {\n  display: inline-block;\n  width: 30%;\n  vertical-align: middle;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_name {\n  display: inline-block;\n  width: 100%;\n  font-size: 16px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_descr {\n  display: inline-block;\n  width: 100%;\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 20px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_points {\n  display: inline-block;\n  width: 100%;\n  opacity: 0.5;\n  font-size: 14px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift_complete {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_complete p {\n  margin: 20px 0;\n}\n", ""]);

	// exports


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _gifts = __webpack_require__(130);

	var _angular = __webpack_require__(31);

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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _giftsGrid = __webpack_require__(136);

	var _giftsGrid2 = _interopRequireDefault(_giftsGrid);

	__webpack_require__(137);

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
	        len = Math.ceil(gifts.length / block_size);
	        i = 0;
	        do {
	          if (i == len - 1) {
	            page = gifts.slice(block_size * i);
	          } else {
	            page = gifts.slice(block_size * i, block_size * i + block_size);
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

	        if (!scope.user()) SailPlay.authorize('remote');else if (scope.user().user_points.confirmed < gift.points) {

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
/* 136 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bon_choice_main container clearfix gifts_grid_widget\">\n\n    <h3 class=\"gifts_grid___header\">\n        <span class=\"header\" data-ng-bind=\"widget.texts.header\"></span>\n    </h3>\n\n    <h4 class=\"gifts_grid___caption\">\n        <span class=\"caption\" data-ng-bind=\"widget.texts.caption\"></span>\n    </h4>\n\n    <div class=\"gifts_grid__wrapper clearfix\">\n\n        <div class=\"gifts_grid__blocks clearfix\">\n\n            <div class=\"gifts_grid__block clearfix\">\n\n                <div class=\"gifts_grid__item clearfix\"\n                     data-ng-class=\"{\n                     'gift-available': isAvailableGift(gift),\n                     'gift-unavailable': !isAvailableGift(gift)\n                     }\"\n                     data-ng-repeat=\"gift in blocks[state] | filter:filter | orderBy:orderBy track by $index\">\n\n                    <img class=\"gifts_grid__item-img gift_img\"\n                         data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\"\n                         alt=\"{{ gift.name }}\">\n\n                    <span class=\"gifts_grid__item-name gift_name\" data-ng-bind=\"gift.name\"></span>\n\n                    <span class=\"gifts_grid__item-points gift_points\"\n                          data-ng-bind=\"(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n                    <a class=\"gifts_grid__item-button button_primary\" href=\"#\"\n                       data-ng-bind=\"widget.texts.get\"\n                       data-ng-click=\"$event.preventDefault();open(gift)\"></a>\n\n\n                </div>\n\n            </div>\n\n        </div>\n\n        <a href=\"#\" class=\"gifts_grid__arrow gifts_grid__arrow_l slider_arrow_left\"\n           data-ng-if=\"state\"\n           data-ng-click=\"$event.preventDefault(); move(-1);\"></a>\n\n        <a href=\"#\" class=\"gifts_grid__arrow gifts_grid__arrow_r slider_arrow_right\"\n           data-ng-if=\"blocks.length && state != (blocks.length-1)\"\n           data-ng-click=\"$event.preventDefault(); move(1);\"></a>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_gift\" data-show=\"selected_gift\">\n\n        <div class=\"modal_gift_container\">\n\n            <img class=\"gift_more_img\" data-ng-src=\"{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}\"\n                 alt=\"{{ selected_gift.name }}\">\n\n            <div class=\"gift_more_block\">\n\n                <span data-ng-bind=\"selected_gift\"></span>\n\n                <span class=\"gift_more_name modal_gift_name\" data-ng-bind=\"selected_gift.name\"></span>\n\n                <span class=\"gift_more_points modal_gift_points\"\n                      data-ng-bind=\"(selected_gift.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n                <p class=\"gift_more_descr modal_gift_description\" data-ng-bind=\"selected_gift.descr\"></p>\n\n                <div class=\"modal_gift_buttons\">\n\n                    <span class=\"alink button_primary\" data-ng-click=\"$parent.$parent.selected_gift=null\">{{ 'buttons.texts.close' | tools }}</span>\n\n                    <span class=\"alink button_primary\"\n                          style=\"margin-left: 5px;\"\n                          data-ng-click=\"gift_confirm(selected_gift);\"\n                          data-ng-bind=\"widget.texts.get\"></span>\n                </div>\n\n            </div>\n        </div>\n\n\n</div>";

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(138);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./gifts-grid.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./gifts-grid.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .gifts_grid_widget .gifts_grid__header {\n  width: 90%;\n  display: block;\n  margin: 0 auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__caption {\n  width: 90%;\n  display: block;\n  margin: 0 auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__wrapper {\n  width: 100%;\n  max-width: 1200px;\n  height: auto;\n  margin: 0 auto;\n  position: relative;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__blocks {\n  display: block;\n  width: 100%;\n  padding: 0 50px;\n  box-sizing: border-box;\n  position: relative;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__block {\n  display: block;\n  width: 100%;\n  height: auto;\n  float: left;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item {\n  width: 33.3%;\n  height: auto;\n  float: left;\n  box-sizing: border-box;\n  padding: 3%;\n  position: relative;\n}\n@media (max-width: 800px) {\n  .spm_wrapper .gifts_grid_widget .gifts_grid__item {\n    width: 50%;\n  }\n}\n@media (max-width: 500px) {\n  .spm_wrapper .gifts_grid_widget .gifts_grid__item {\n    width: 100%;\n  }\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-img {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-name {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-points {\n  display: inline-block;\n  width: 100%;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__item-button {\n  display: inline-block;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow {\n  width: 50px;\n  height: 100px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow_l {\n  left: 0;\n}\n.spm_wrapper .gifts_grid_widget .gifts_grid__arrow_r {\n  right: 0;\n}\n", ""]);

	// exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _header = __webpack_require__(140);

	var _header2 = _interopRequireDefault(_header);

	__webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _widget.WidgetRegister)({
	  id: 'header',
	  template: _header2.default,
	  controller: function controller() {

	    return function (scope) {};
	  }

	});

/***/ }),
/* 140 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"header_wrapper container\">\n\n  <h3 class=\"header_title\">\n    {{ widget.texts.title }}\n  </h3>\n\n  <h2 class=\"header_sub_title\">\n    {{ widget.texts.sub_title }}\n  </h2>\n\n</div>";

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./header.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./header.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_widget.header .header_wrapper {\n  background-color: #888888;\n  display: inline-block;\n  width: 100%;\n  height: auto;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 40px 5%;\n}\n.spm_wrapper .spm_tools_widget.header .header_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 36px;\n}\n.spm_wrapper .spm_tools_widget.header .header_sub_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 20px;\n}\n", ""]);

	// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _imageStatuses = __webpack_require__(144);

	var _imageStatuses2 = _interopRequireDefault(_imageStatuses);

	__webpack_require__(145);

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
/* 144 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"clearfix container\">\n\n  <div class=\"image-status-list\">\n\n    <div class=\"next_status_info\" data-ng-show=\"get_next_status().status\">\n\n      <div class=\"next_status_name\">\n        {{ widget.texts.next_status }} <span data-ng-style=\"{ color: get_next_status().status.color  }\">{{ get_next_status().status.status }}</span>\n      </div>\n\n      <div class=\"next_status_offset\">\n        {{ widget.texts.next_status_offset }} {{ get_next_status().offset }}\n      </div>\n\n    </div>\n\n    <div class=\"image-status-list__wrapper\" data-sailplay-statuses data-ng-cloak>\n\n      <div class=\"image-status-list__progress element-progress progress_line\"\n           data-ng-style=\"getProgress(user().user_points, _statuses)\"></div>\n\n      <div class=\"image-status-list__item element-item\"\n           data-ng-class=\"{ type_active : is_active_status(item) }\"\n           data-ng-repeat=\"item in _statuses\"\n           data-ng-style=\"generateOffset($index, _statuses)\">\n\n        <!--<div class=\"image-status-list__item-point element-item-point\"></div>-->\n\n        <div class=\"element-item-point-inner\">\n          <img class=\"status_image\" data-ng-src=\"{{ get_status_image(item) }}\" alt=\"\">\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(146);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./image-statuses.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./image-statuses.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .image-status-list {\n  float: left;\n  width: 80%;\n  position: relative;\n  margin: 0 10%;\n  padding: 30px 0 80px;\n  z-index: 1;\n}\n.spm_wrapper .image-status-list .next_status_info {\n  margin-bottom: 30px;\n}\n.spm_wrapper .image-status-list__wrapper {\n  background: #F4F4F4;\n  position: relative;\n  height: 20px;\n  border-radius: 5px;\n  display: block;\n  margin: 0 20px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__wrapper {\n    height: 10px;\n  }\n}\n.spm_wrapper .image-status-list__item {\n  position: absolute;\n  height: 100%;\n  width: 0;\n}\n.spm_wrapper .image-status-list__item .element-item-point-inner {\n  z-index: 1;\n  content: '';\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  margin-top: -75px;\n  margin-left: -75px;\n  top: 50%;\n  left: 50%;\n  border-radius: 50%;\n  background: transparent;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item .element-item-point-inner {\n    width: 120px;\n    height: 120px;\n    margin: -60px 0 0 -60px;\n  }\n}\n.spm_wrapper .image-status-list__item .element-item-point-inner .status_image {\n  width: 100%;\n  height: 100%;\n  display: block;\n  vertical-align: top;\n}\n.spm_wrapper .image-status-list__item-point {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  transform: translate3d(-50%, -50%, 0);\n  border-radius: 50%;\n  background: #f4f4f4;\n  z-index: -1;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-point {\n    width: 30px;\n    height: 30px;\n  }\n}\n.spm_wrapper .image-status-list__item-status {\n  display: inline-block;\n  min-width: 100px;\n  left: 0;\n  position: absolute;\n  top: 60px;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-status {\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .image-status-list__item-status {\n    font-size: 12px;\n    min-width: 100%;\n    top: 50px;\n  }\n}\n.spm_wrapper .image-status-list__item-name {\n  display: inline-block;\n  min-width: 80px;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__item-name {\n    font-size: 12px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .image-status-list__item-name {\n    font-size: 8px;\n    min-width: 100%;\n    top: 25px;\n  }\n}\n.spm_wrapper .image-status-list__item.type_active .element-item-point-inner {\n  display: block;\n}\n.spm_wrapper .image-status-list__progress {\n  height: 10px;\n  position: absolute;\n  width: 0;\n  background: #444444;\n  z-index: 0;\n  top: 5px;\n  border-radius: 5px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .image-status-list__progress {\n    height: 5px;\n    top: 2.5px;\n  }\n}\n", ""]);

	// exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _leaderboard = __webpack_require__(148);

	var _leaderboard2 = _interopRequireDefault(_leaderboard);

	__webpack_require__(149);

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
/* 148 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n    <div class=\"container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n        <h3 class=\"bon_header\">\n            <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4 class=\"bon_sub_header\">\n            <span class=\"caption\">{{ widget.texts.caption }}</span>\n        </h4>\n\n        <ul class=\"leaderboard__list\" data-ng-if=\"data && data()\">\n\n            <li class=\"leaderboard__list-item type_headers\">\n\n                <span class=\"leaderboard__list-item__rank rows headers\">{{ widget.texts.rank }}</span>\n\n                <span class=\"leaderboard__list-item__name rows headers\">{{ widget.texts.full_name }}</span>\n\n                <span class=\"leaderboard__list-item__score rows headers\">{{ widget.texts.score }}</span>\n\n            </li>\n\n            <li class=\"leaderboard__list-item\" data-ng-repeat=\"member in $parent.data().members.members\"\n                data-ng-class=\"{ type_current : member.is_current_user }\">\n\n                <span class=\"leaderboard__list-item__rank rank rows\" data-ng-bind=\"member.rank\"></span>\n\n                <span class=\"leaderboard__list-item__name full_name rows\">\n\n                    <img class=\"leaderboard__list-item__photo photo\" data-ng-if=\"member.pic\"\n                         data-ng-src=\"{{ $parent.member.pic | sailplay_pic }}\"\n                         alt=\"{{ $parent.member.full_name || 'n/a' }}\">\n\n                    {{ member.full_name || 'n/a' }}\n\n                </span>\n\n                <span class=\"leaderboard__list-item__score score rows\" data-ng-bind=\"member.score\"></span>\n\n            </li>\n\n        </ul>\n\n\n    </div>\n</div>\n\n";

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(150);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./leaderboard.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./leaderboard.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_widget.leaderboard .container {\n  width: 100%;\n  padding: 80px 5% 40px 5%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .bon_header {\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n}\n.spm_wrapper .spm_tools_widget.leaderboard .bon_sub_header {\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard ul li {\n  list-style: none;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list {\n  max-width: 600px;\n  box-sizing: border-box;\n  padding: 0 10px;\n  margin: 0 auto 20px !important;\n  float: none;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item {\n  display: inline-block;\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  z-index: 1;\n  font-size: 0;\n  padding: 5px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_current {\n  background: #6385b5;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_current span {\n  color: white;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_headers {\n  margin-bottom: 5px;\n  margin-top: 20px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item.type_headers span {\n  font-size: 18px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item span {\n  display: inline-block;\n  vertical-align: middle;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #676767;\n  white-space: nowrap;\n  line-height: 18px;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__photo {\n  height: 18px;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__rank {\n  font-size: 18px;\n  width: 20%;\n  text-align: left;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__name {\n  font-size: 14px;\n  width: 60%;\n  text-align: center;\n}\n.spm_wrapper .spm_tools_widget.leaderboard .leaderboard__list-item__score {\n  font-size: 18px;\n  width: 20%;\n  text-align: right;\n}\n", ""]);

	// exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _pointsStatus = __webpack_require__(152);

	var _pointsStatus2 = _interopRequireDefault(_pointsStatus);

	var _history_pagination = __webpack_require__(153);

	var _history_pagination2 = _interopRequireDefault(_history_pagination);

	__webpack_require__(154);

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

	      scope.getPercents = function (index) {
	        var percents = 0;
	        if (!scope.user() || !scope.user().purchases) return percents;
	        var prev = scope.widget.options.status_list[index - 1];
	        if (!prev) {
	          prev = { sum: 0 };
	        }
	        var cur = scope.widget.options.status_list[index];
	        var points = scope.user().purchases.sum;
	        percents = (points - prev.sum) / (cur.sum - prev.sum) * 100;
	        percents = percents < 0 ? 0 : percents > 100 ? 100 : percents;
	        return Math.round(percents);
	      };

	      /**
	       * Calculating progress
	       */
	      scope.getProgress = function (points, statusList) {

	        var value = 0;

	        if (!statusList || !statusList.length) return value;

	        var _statusArray = statusList.map(function (item) {
	          return item.sum;
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
/* 152 */
/***/ (function(module, exports) {

	module.exports = "<div id=\"points-status\" class=\"bon_choice_main container clearfix\">\n\n    <div class=\"points-status__wrapper clearfix\">\n\n        <div class=\"points-status__left points_block clearfix\" data-ng-if=\"user()\">\n\n            <span class=\"points_confirmed\">\n                <span class=\"points_confirmed_value\" data-ng-bind=\"user().user_points.total | number\"></span>\n                <span class=\"points_confirmed_name\"\n                    data-ng-bind=\"user().user_points.total | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n            </span>\n\n            <a class=\"button_primary history_button\" href=\"#\"\n               data-ng-click=\"$event.preventDefault(); $parent.history = true;\"\n               data-ng-bind=\"widget.texts.history_button\"></a>\n\n        </div>\n\n        <div class=\"points-status__right progress_block clearfix\">\n\n            <div class=\"progress_line_main\">\n\n                <div class=\"progress_line_bg progress_bar progress_bar_border\"></div>\n\n                <div class=\"progress_line progress_bar_filled\"\n                     data-ng-style=\"{ width: getProgress(user().purchases.sum, widget.options.status_list) }\">\n                </div>\n\n                <div class=\"gift_item progress_bar_border\"\n                     data-ng-repeat=\"item in widget.options.status_list track by $index\"\n                     data-ng-class=\"{ act : item.sum <= user().purchases.sum, progress_bar_gift_filled: item.sum <=user().purchases.sum, progress_bar_gift: item.sum > user().purchases.sum}\"\n                     data-ng-style=\"{ left: (100/widget.options.status_list.length * ($index)) + '%', 'width': (100/widget.options.status_list.length) + '%' }\">\n\n                    <img class=\"gift_item_image\" data-ng-if=\"item.image\" data-ng-src=\"{{ item.image }}\">\n                    <span class=\"gift_item_percents\" data-ng-bind=\"getPercents($index) + '%'\"></span>\n                    <span class=\"gift_item_title\" data-ng-bind=\"item.title\"></span>\n                    <span class=\"gift_item_name\" data-ng-bind=\"item.name\"></span>\n                    <span class=\"gift_item_text\" data-ng-bind-html=\"item.description | to_trusted\"></span>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_hist\" data-show=\"history\">\n\n        <div data-sailplay-history data-sailplay-profile>\n\n            <h3>\n                <span class=\"modal_history_header\" data-ng-bind=\"widget.texts.history.header\"></span>\n            </h3>\n            <h4 class=\"modal_history_caption\" data-ng-bind=\"widget.texts.history.caption\"></h4>\n\n            <table class=\"bns_hist_table\">\n\n                <tbody>\n\n                <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n                    <td>\n                        <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n                    </td>\n                    <td>\n                        <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n                    </td>\n                    <td>\n                        <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\"\n                              data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                    </td>\n                </tr>\n\n                </tbody>\n            </table>\n\n            <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                                     data-template-url=\"points_status.history_pagination\"\n                                     data-auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n\n    </magic-modal>\n\n</div>";

/***/ }),
/* 153 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(155);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./points-status.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./points-status.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper #points-status .points-status__wrapper {\n  width: 100%;\n  max-width: 1200px;\n  height: auto;\n  margin: 0 auto;\n  position: relative;\n  padding: 30px 0;\n}\n.spm_wrapper #points-status .points-status__wrapper .points_confirmed span {\n  color: inherit;\n  font-family: inherit;\n}\n.spm_wrapper #points-status .points-status__wrapper .points_confirmed_name {\n  margin-left: 2px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left {\n  float: left;\n  width: 30%;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left > span {\n  color: #ffffff;\n  display: block;\n  font-size: 33px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__left > a {\n  font-size: 14px;\n  color: #ffffff;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right {\n  float: right;\n  width: 70%;\n  padding-top: 18px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .progress_line_bg {\n  height: 14px;\n  border-top: 3px solid #000000;\n  background-color: #cccccc;\n  border-radius: 20px;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .progress_line {\n  position: absolute;\n  left: 0px;\n  top: 3px;\n  width: 0%;\n  background-color: #ffffff;\n  height: 14px;\n  border-radius: 20px 0px 0px 20px;\n  -webkit-transition: all 1000ms ease;\n  -moz-transition: all 1000ms ease;\n  -ms-transition: all 1000ms ease;\n  -o-transition: all 1000ms ease;\n  transition: all 1000ms ease;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item {\n  position: absolute;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  margin-top: -25px;\n  margin-left: -25px;\n  border-radius: 6px;\n  background-color: #cccccc;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-top: 3px solid #000000;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item.act {\n  background-color: #ffffff;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item_hint {\n  opacity: 0;\n  visibility: hidden;\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  top: 0;\n  font-weight: bold;\n  transition: .3s ease;\n  color: white;\n}\n.spm_wrapper #points-status .points-status__wrapper .points-status__right .progress_line_main .gift_item:hover .gift_item_hint {\n  visibility: visible;\n  opacity: 1;\n  top: -25px;\n}\n", ""]);

	// exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _points_rate_progress = __webpack_require__(157);

	var _points_rate_progress2 = _interopRequireDefault(_points_rate_progress);

	var _history_pagination = __webpack_require__(158);

	var _history_pagination2 = _interopRequireDefault(_history_pagination);

	__webpack_require__(159);

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
/* 157 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"points_rate_progress__wrapper container\" data-sailplay-badges>\n\n    <div class=\"points_rate_progress__points points_rate_progress__blocks\" data-ng-if=\"sailplay.user.info()\">\n        <span class=\"points_rate_progress__points-confirmed\">\n          <span class=\"points_rate_progress__points-confirmed-value\"\n                data-ng-bind=\"sailplay.user.info().user_points.confirmed | number\"></span>\n          <span class=\"points_rate_progress__points-confirmed-name\"\n                data-ng-bind=\"sailplay.user.info().user_points.confirmed | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n        </span>\n        <a class=\"points_rate_progress__points-history button_link history_button\" href=\"#\"\n           data-ng-click=\"$event.preventDefault();$parent.show_history = true;\">{{ widget.texts.history_button }}</a>\n    </div>\n\n    <div class=\"points_rate_progress__progress points_rate_progress__blocks\"\n         data-ng-if=\"sailplay.user.info() && badges_list\">\n\n        <p class=\"points_rate_progress__progress-offset\">\n            <span class=\"points_rate_progress__progress-offset-text\" data-ng-bind=\"widget.texts.to_text_status\"></span>\n            <span class=\"points_rate_progress__progress-offset-value\">\n                {{ get_offset(sailplay.user.info().purchases.sum, badges_list) | number }}\n                {{ get_offset(sailplay.user.info().purchases.sum, badges_list) | sailplay_pluralize: ('rub.texts.pluralize' | tools) }}\n            </span>\n        </p>\n\n        <div class=\"points_rate_progress__progress-block\">\n            <div class=\"points_rate_progress__progress-block-line\" data-ng-style=\"get_progress(sailplay.user.info().purchases.sum, badges_list)\"></div>\n            <div class=\"points_rate_progress__progress-block-text\" data-ng-bind=\"get_next_status(sailplay.user.info().purchases.sum, badges_list).descr\"></div>\n            <!--<img class=\"points_rate_progress__progress-block-img\" data-ng-src=\"{{ get_next_status(sailplay.user.info().purchases.sum, badges_list).thumbs.url_100x100 | sailplay_pic }}\" alt=\"{{ get_next_status(sailplay.user.info().purchases.sum, badges_list).name }}\">-->\n        </div>\n\n    </div>\n\n    <div class=\"points_rate_progress__rate points_rate_progress__blocks\"\n         data-ng-if=\"sailplay.user.info() && badges_list\">\n\n        <span class=\"points_rate_progress__rate-value\" data-ng-bind=\"(get_current_status(sailplay.user.info().purchases.sum, badges_list).descr || '0%')\"></span>\n        <span class=\"points_rate_progress__rate-text\" data-ng-bind=\"widget.texts.points_rate\"></span>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_hist\" data-show=\"show_history\">\n\n        <div data-sailplay-history data-sailplay-profile>\n\n            <h3>\n                <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n                <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n            </h3>\n            <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n            <table class=\"bns_hist_table\">\n\n                <tbody>\n\n                <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n                    <td>\n                        <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n                    </td>\n                    <td>\n                        <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n                    </td>\n                    <td>\n                        <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                    </td>\n                </tr>\n\n                </tbody>\n            </table>\n\n            <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                                     data-template-url=\"points_rate_progress.history_pagination\"\n                                     data-auto-hide=\"true\"></dir-pagination-controls>\n        </div>\n\n\n\n    </magic-modal>\n\n</div>";

/***/ }),
/* 158 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(160);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./points_rate_progress.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./points_rate_progress.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .points_rate_progress__wrapper {\n  font-size: 0;\n  padding-bottom: 20px;\n}\n.spm_wrapper .points_rate_progress__points {\n  width: 25%;\n  font-size: 14px;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .points_rate_progress__points-history {\n  width: 100%;\n  display: block;\n  background: black;\n  padding: 10px 0;\n  text-align: center;\n}\n.spm_wrapper .points_rate_progress__points-confirmed {\n  display: block;\n  width: 100%;\n  text-align: center;\n  padding: 20px;\n  box-sizing: border-box;\n}\n.spm_wrapper .points_rate_progress__points-confirmed-value {\n  display: block;\n  font-size: 50px;\n  font-weight: bold;\n  line-height: 1;\n}\n.spm_wrapper .points_rate_progress__points-confirmed-name {\n  display: block;\n  line-height: 1;\n  font-size: 26px;\n}\n.spm_wrapper .points_rate_progress__progress {\n  font-size: 14px;\n  margin: 0 2%;\n  width: 46%;\n  display: inline-block;\n  vertical-align: top;\n  position: relative;\n}\n.spm_wrapper .points_rate_progress__progress-offset {\n  font-size: 14px;\n  text-align: center;\n  padding: 20px 0;\n}\n.spm_wrapper .points_rate_progress__progress-block {\n  margin: 25px auto;\n  width: 80%;\n  position: relative;\n  height: 30px;\n}\n.spm_wrapper .points_rate_progress__progress-block-line {\n  position: relative;\n  border-radius: 5px;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n}\n.spm_wrapper .points_rate_progress__progress-block-img {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 60px;\n  margin-top: 15px;\n  transform: translate3d(50%, -50%, 0);\n}\n.spm_wrapper .points_rate_progress__progress-block-text {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 60px;\n  text-align: center;\n  line-height: 60px;\n  margin-top: 15px;\n  transform: translate3d(50%, -50%, 0);\n}\n.spm_wrapper .points_rate_progress__rate {\n  font-size: 14px;\n  width: 25%;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .points_rate_progress__rate-value {\n  display: block;\n  font-size: 50px;\n  font-weight: bold;\n  line-height: 1;\n  text-align: center;\n  margin: 15px 0;\n}\n.spm_wrapper .points_rate_progress__rate-text {\n  display: block;\n  font-size: 16px;\n  line-height: 1;\n  text-align: center;\n  margin: 18px auto;\n  box-sizing: border-box;\n  padding: 0 10px;\n}\n", ""]);

	// exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _profile = __webpack_require__(162);

	var _profile2 = _interopRequireDefault(_profile);

	var _history_pagination = __webpack_require__(163);

	var _history_pagination2 = _interopRequireDefault(_history_pagination);

	__webpack_require__(164);

	var _avatar_default = __webpack_require__(168);

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
/* 162 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bon_profile_wrap container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n  <div class=\"bon_profile_info\" data-sailplay-profile data-sailplay-gifts>\n\n    <div class=\"bon_profile_top clearfix\">\n      <div class=\"bon_profile_top_left\">\n        <h3>\n          <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4>\n          <span class=\"caption\">{{ widget.texts.spoiler }}</span>\n        </h4>\n        <a class=\"link\" data-ng-href=\"{{ widget.texts.href }}\" data-ng-bind=\"widget.texts.button\"></a>\n      </div>\n      <div class=\"bon_profile_right clearfix\" data-ng-if=\"user()\">\n        <div class=\"user_avatar\">\n          <img class=\"user_avatar_image\" data-ng-src=\"{{ (user().user.pic | sailplay_pic) || default_avatar}}\" alt=\"You\">\n          <a href=\"#\" class=\"logout_btn button_link\" data-ng-click=\"$event.preventDefault(); logout();\">{{ widget.texts.logout }}</a>\n        </div>\n        <div class=\"user_info\">\n          <span class=\"user_name\"  data-ng-bind=\"user().user.name || widget.texts.name_not_defined\"></span>\n          <span class=\"user_phone\" data-ng-if=\"user().user.phone\"  data-ng-bind=\"user().user.phone | tel\"></span>\n          <span class=\"user_email\" data-ng-if=\"user().user.email\"  data-ng-bind=\"user().user.email\"></span>\n        </div>\n        <div class=\"user_info\">\n          <a href=\"#\" class=\"edit_profile_btn button_link\" data-ng-click=\"$event.preventDefault(); profile.fill_profile(true);\">{{ widget.texts.edit_profile_button }}</a>\n        </div>\n      </div>\n      <div class=\"bon_profile_right clearfix\" data-ng-if=\"!user()\">\n        <button type=\"button\" class=\"sp_btn button_primary login_reg_btn\" data-ng-click=\"$event.preventDefault(); login('remote');\">{{ widget.texts.login_reg }}</button>\n      </div>\n    </div>\n\n    <!-- status -->\n    <!--<div class=\"status_block\" data-ng-if=\"user() && user().user_status.name\">-->\n    <div class=\"status_block\" data-ng-if=\"user()\">\n      <span class=\"status_block_title\" data-ng-bind=\"widget.texts.user_status\"></span>\n      <img class=\"status_block_img\" data-ng-src=\"{{ user().user_status.pic | sailplay_pic }}\"\n           alt=\"{{ user().user_status.name }}\">\n      <div>\n        <a class=\"status_block_name button_link\"\n           data-ng-click=\"$event.preventDefault();$parent.$parent.show_status = true;\"\n           data-ng-bind=\"widget.texts.status || widget.texts.empty_status \"></a>\n      </div>\n    </div>\n\n    <div class=\"bon_profile_stat\">\n      <div class=\"bps_left points_block clearfix\" data-ng-if=\"user()\">\n        <div class=\"points_block_balance\">\n            <span class=\"points_block_label\" data-ng-bind=\"widget.texts.your_balance\"></span>\n            <span class=\"points_confirmed\">\n                  <span class=\"points_confirmed_name\" data-ng-bind=\"user().purchases.sum | sailplay_pluralize: ('currency.texts.pluralize' | tools)\"></span>\n                  <span class=\"points_confirmed_value\" data-ng-bind=\"user().purchases.sum | number\"></span>\n            </span>\n        </div>\n        <div class=\"points_block_points\">\n            <span class=\"points_block_label\" data-ng-bind=\"widget.texts.your_points\"></span>\n            <span class=\"points_confirmed\">\n                  <span class=\"points_confirmed_name\" data-ng-bind=\"user().user_points.confirmed | sailplay_pluralize: ('currency.texts.pluralize' | tools)\"></span>\n                  <span class=\"points_confirmed_value\" data-ng-bind=\"user().user_points.confirmed | number\"></span>\n            </span>\n        </div>\n        <a class=\"button_link history_button\" href=\"#\" data-ng-click=\"$event.preventDefault(); profile.history = true;\">{{ widget.texts.history_button }}</a>\n      </div>\n      <div class=\"bps_right progress_block clearfix\" data-ng-if=\"progress\">\n        <div class=\"progress_line_main\">\n          <div class=\"progress_line_bg progress_bar progress_bar_border\"></div>\n          <div class=\"progress_line progress_bar_filled\" data-procent=\"0\" data-ng-style=\"{ width: progress.plenum + '%' }\">\n            <div class=\"progress_text progress_bar_flag\" data-ng-show=\"progress.next.item\" data-ng-class=\"{ right_position: progress.plenum < 50 }\">\n              <span class=\"progress_bar_flag_text\" data-ng-bind=\"progress.next.offset + ' ' + (progress.next.offset | sailplay_pluralize:('points.texts.pluralize' | tools)) + ' ' + widget.texts.before_gift\"></span>\n            </div>\n          </div>\n\n          <div class=\"gift_item progress_bar_border\" data-ng-repeat=\"item in progress.items track by $index\"\n               data-ng-class=\"{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}\"\n               data-ng-style=\"{ left: item.get_left() }\">\n\n            <span class=\"gift_item_hint\" data-ng-bind=\"item.gifts[0].points\"></span>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <magic-modal class=\"bns_overlay_hist\" data-show=\"show_status\">\n    <div data-ng-bind-html=\"widget.options.status_popup | to_trusted\"></div>\n  </magic-modal>\n\n  <magic-modal class=\"bns_overlay_hist\" data-show=\"profile.history\">\n\n    <div data-sailplay-history data-sailplay-profile>\n\n      <h3>\n        <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n        <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n      </h3>\n      <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n      <table class=\"bns_hist_table\">\n\n        <tbody>\n\n        <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n          <td>\n            <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n          </td>\n          <td>\n            <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n          </td>\n          <td>\n            <span class=\"modal_history_points\" data-ng-if=\"item.price\" data-ng-bind=\"item.price + ' ' + ' ' + (item.price | sailplay_pluralize:('currency.texts.pluralize' | tools))\"></span>\n            <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"(item.price ? '(': '') + ((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools)) + (item.price ? ')': '')\"></span>\n          </td>\n        </tr>\n\n        </tbody>\n      </table>\n\n      <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                               data-template-url=\"profile.history_pagination\"\n                               data-auto-hide=\"true\"></dir-pagination-controls>\n    </div>\n\n\n\n  </magic-modal>\n\n  <!--profile edit section-->\n  <magic-modal class=\"fill_profile_modal\" data-show=\"profile.show_fill_profile\">\n\n    <div class=\"mb_popup mb_popup_prof\" data-sailplay-fill-profile data-config=\"widget.fill_profile.config\">\n\n      <div class=\"mb_popup_top\">\n        <span class=\"modal_profile_header\">{{ widget.fill_profile.header }}</span>\n      </div>\n\n      <form name=\"fill_profile_form\" class=\"mb_popup_main mb_popup_main_mt\" data-ng-submit=\"sailplay.fill_profile.submit(fill_profile_form, profile.fill_profile);\">\n\n        <div class=\"form_field\" data-ng-repeat=\"field in sailplay.fill_profile.form.fields\" data-ng-switch=\"field.input\">\n\n          <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n            <img width=\"160px\" data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\" alt=\"\">\n          </div>\n\n          <div data-ng-switch-when=\"text\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\" data-ng-required=\"{{ field.required }}\">\n          </div>\n\n          <div data-ng-switch-when=\"date\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <date-picker data-model=\"field.value\" data-ng-required=\"{{ field.required }}\"></date-picker>\n          </div>\n\n          <div data-ng-switch-when=\"select\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <div class=\"magic_select form_input\">\n              <select data-ng-model=\"field.value\" data-ng-options=\"item.value as item.text for item in field.data\" data-ng-required=\"{{ field.required }}\"></select>\n            </div>\n          </div>\n\n          <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" data-model-view-value=\"true\" data-ui-mask=\"{{ field.placeholder }}\" data-ng-model=\"field.value\" data-ng-required=\"{{ field.required }}\">\n          </div>\n\n          <div data-ng-switch-when=\"email\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\" data-ng-required=\"{{ field.required }}\">\n          </div>\n\n        </div>\n\n        <div class=\"answ_text\">\n          <button type=\"submit\" class=\"sp_btn button_primary\">{{ 'buttons.texts.save' | tools }}</button>\n        </div>\n      </form>\n    </div>\n  </magic-modal>\n\n</div>";

/***/ }),
/* 163 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(165);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./profile.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./profile.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bon_profile_wrap {\n  float: left;\n  width: 100%;\n  padding: 0 5%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: #888888;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info {\n  width: 100%;\n  float: left;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n  float: left;\n  width: 580px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h3 {\n  float: left;\n  width: 100%;\n  font-size: 30px;\n  color: #ffffff;\n  font-family: 'RotondaC';\n  margin-top: 50px;\n  margin-bottom: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h4 {\n  float: left;\n  width: 100%;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 400;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n  float: right;\n  width: 265px;\n  margin-top: 50px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right img {\n  border-radius: 100%;\n  -webkit-box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right span {\n  font-size: 16px;\n  font-weight: 700;\n  margin-top: 18px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .login_reg_btn {\n  float: right;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .logout_btn {\n  width: auto;\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .edit_profile_btn {\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar {\n  max-width: 81px;\n  float: right;\n  text-align: center;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info {\n  text-align: right;\n  float: left;\n  width: 165px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info span {\n  word-wrap: break-word;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar_image {\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat {\n  float: left;\n  width: 100%;\n  margin-top: 50px;\n  margin-bottom: 78px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed span {\n  color: inherit;\n  font-family: inherit;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed_name {\n  margin-left: 2px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left {\n  float: left;\n  width: auto;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > span {\n  color: #ffffff;\n  display: block;\n  font-size: 33px;\n  font-family: 'RotondaC bold';\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > a {\n  font-size: 14px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n  float: right;\n  width: 70%;\n  margin-top: 12px;\n  margin-right: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line_bg {\n  height: 14px;\n  border-top: 3px solid #000000;\n  background-color: #ffffff;\n  background-image: url(" + __webpack_require__(166) + ");\n  border-radius: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line {\n  position: absolute;\n  left: 0px;\n  top: 3px;\n  width: 0%;\n  background-color: #ffffff;\n  height: 14px;\n  border-radius: 20px 0px 0px 20px;\n  -webkit-transition: all 1000ms ease;\n  -moz-transition: all 1000ms ease;\n  -ms-transition: all 1000ms ease;\n  -o-transition: all 1000ms ease;\n  transition: all 1000ms ease;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text {\n  min-width: 100px;\n  position: absolute;\n  right: 0px;\n  padding-top: 32px;\n  border-right: 1px solid #fff;\n  top: 0px;\n  z-index: 1;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position {\n  right: auto;\n  left: 100%;\n  border-left: 1px solid #fff;\n  border-right: none;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position span {\n  border-radius: 0px 5px 5px 0px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text span {\n  float: right;\n  line-height: 30px;\n  background-color: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n  font-size: 14px;\n  font-family: 'RotondaC';\n  border-radius: 5px 0px 0px 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item {\n  position: absolute;\n  top: 50%;\n  width: 36px;\n  height: 36px;\n  margin-top: -19px;\n  margin-left: -19px;\n  background-color: #cccccc;\n  border-radius: 6px;\n  -webkit-background-size: 20px 22px;\n  background-size: 20px 22px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-top: 3px solid #000000;\n  background-image: url(" + __webpack_require__(167) + ");\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item.act {\n  background-color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item_hint {\n  opacity: 0;\n  visibility: hidden;\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  top: 0;\n  font-weight: bold;\n  transition: .3s ease;\n  color: white;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item:hover .gift_item_hint {\n  visibility: visible;\n  opacity: 1;\n  top: -20px;\n}\n.spm_wrapper .bon_profile_wrap .status_block {\n  width: 30%;\n  display: inline-block;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .bon_profile_wrap .status_block {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_stat .bps_left {\n    text-align: left;\n  }\n}\n@media only screen and (min-width: 1129px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    width: 100%;\n    margin-top: 30px;\n    margin-right: 0px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 60%;\n  }\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text {\n    border: none !important;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text:before {\n    content: '';\n    width: 1px;\n    background: white;\n    right: 0;\n    top: 0;\n    position: absolute;\n    height: 17px;\n    display: block;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text span {\n    position: relative;\n    left: 50%;\n    border-radius: 5px !important;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n.spm_wrapper .bns_hist_table {\n  float: left;\n  width: 100%;\n  margin-top: 12px;\n}\n.spm_wrapper .bns_hist_table td {\n  vertical-align: text-top;\n  padding: 5px 11px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(1) {\n  color: #888888;\n  font-size: 13px;\n  line-height: 19px;\n  padding-right: 0px;\n  padding-left: 0px;\n  white-space: nowrap;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) {\n  color: #000000;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 19px;\n  position: relative;\n  padding-left: 0px;\n  width: 570px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2)::after {\n  position: absolute;\n  left: 0px;\n  width: 100%;\n  border-top: 1px dotted #444444;\n  top: 14px;\n  content: '';\n  display: block;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span {\n  display: block;\n  position: relative;\n  z-index: 1;\n  font-size: 13px;\n  color: #222222;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span b {\n  background-color: #ffffff;\n  padding-right: 15px;\n  padding-left: 11px;\n  font-weight: 200;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span:first-child {\n  color: #000000;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) {\n  color: #444444;\n  font-size: 14px;\n  font-weight: bold;\n  text-align: right;\n  line-height: 19px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) span {\n  display: block;\n  white-space: nowrap;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager {\n  float: right;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager a {\n  text-decoration: none;\n  color: #000;\n  margin-right: 4px;\n}\n.spm_wrapper .bns_hist_pager a.active {\n  font-weight: bold;\n}\n", ""]);

	// exports


/***/ }),
/* 166 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAOCAYAAAB5EtGGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrslrEKwjAQhptD6tSpTl0UhD6HD6BP6wvkOQqCLk5m6mQnL+WC1xwmZu4FaqQ/+fzvK0LNcX/oKlq3x/0ZvuP9Frdt9V1vzB3Lu2q5XphPlDW4NTzMsEfMR8pq3HYF7LhXETvqNbM3+HGme5aFPW4ndtYXurLcZz3LhwCnUhe8apan2C6wqbQ/2/7JjnuVsm0kc2ZDCPGHh5SQ8DR+CLEpIQm2I/aUEGJTQlivUjbvtWCDCpFsk/vLrE2IP2tUiGQbFSLZoELkzKBC5MygQuTMoELkzKBC5Mwm8+q+OiG+l1EhstdHgAEAt8yVBryjUM8AAAAASUVORK5CYII="

/***/ }),
/* 167 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR9JREFUeNrsVt0NgjAYLIQB6ga4gS4gjsAG6gTKk88++iROIBuAE4BO4AiMwAjeZz6SLw2/EYwPXHJpUq69a/u1QakGnFfhGnRVC6BZEOu+WzWDLmgOoisHg+PzkAiNZs0e1EK3gy5rNKkwkCCTHUiru4FV6QtwCaO87LANAy0MThBSiDkYcZ8PpszS4ATOWJvwqrZyXsdIIZN5ME2NhNrQUFqPtUpsm9dkIrFW7XCZjag6k22XgS2I5JlYZami2XScPOD20kF7J0MHBnSYcY+Uusd2fsLbHRN9g4U9wP63wlY/AJVwWHNz61Bwm/XUjwtL3I9YVM5QJXylR1XeeH+EEn7Qe/aTg59MJpPJ5A9Nxngtc9MkGNjgxf9h6i3AANemSGniswSTAAAAAElFTkSuQmCC"

/***/ }),
/* 168 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACiFJREFUeNrsnV1sVMcVx8/cfPERKku1iVQSYqM2CeajmwawG6qyNoaEUMVrUuWjSmNv1IdQGjBN0qrtQ8hLSvISqKK+2hAIqRTCkoZGIk5YXkJtInlFwOYFvFS2hM1DnTohffFOz9yd+zH3Y+/uvTPXu9BjzV7brO/e+e3/nDN3Zs4CUOX2bHO6Dluymq+RVAGkBB5Ya8S2AVsd/znIsvx4GluOtUMjffmbAiJTFh5S2DqxJTk0WZbncI+zI0KdvqEgIrweDi4V43vWz4AizEzNQuSq68W2S7Liwij0NYTZXzMQqwie05h775YNkyhy27eqDJ6XMtMIM1tVEBEey659PFlENBpXVzIcZqQEpEkCyFx3OBpAajYq/FRec/5UprEkN4bXn5ozJfLYx1y3J6rqaGQlWt0h4bq3DxW5O1aIHOCpMgfGZcBzg6M0GCYhRCbMUO5NQgJMcIB1YQF6wTOgUV81Up9LJvpv3UBJGJDs7qetEpAkXoDe6rPg2X8WQVMfnRmPBkAdGxHhqQapzQ1AKgBkXwVawO8LeJzVv5/l3y+9/26Yd+c8KBRm9bb0/ntgFo+z+vNm+fOKz2V/j2cqHs1QQB3JpyzT+8lDljwl8hOORXdhOzz+e73zVP/dmo1rYGv3o3B+aATaujZAw5IGyI/m9SOzhd9ZaJ5xaOAsZI+dhrMDX+hKJKiJ4pEIR9WKJBUAjJRESgEsMHgdD8GCRfNhx5+3V3z2Ux9k4cSBj+HKxSsITWMo9aM/yIqiWAYhdpV6wi3lnGV1w4NHwo8BqSvjGgAL3O22PPcIwnsB1nWsDfUKTcsbYf3Wh+G2O27TFQxCfHRm8YpBPoD9J+eu5bKhIfKBdG/0+w/x0QC4ZuOPYMfe7RDVbr/jdljRsgKmJqZgbHSMq5DDIpHVmESQpxFkvmJ35olkOAo+txtbLly/5Lvw5rG9GOcWSL0xfqnzd+ja/wKNuTZvEtyaxcUmr/gYlJ37ZHXMCZApsfsPv5QOkNnV8atWtuaKNxJXBKvz46EFuHFClgoFkDgMeQwzcNgYGGQzX80AH+yYX/6D/Yos5bXeo5XIxq9KVyFXQ/336iH9x25l81zt29q44rkKjeYBM4T1lavE3mjzgdRjcGt1JNn1U6WThb1v7oSV61ZwzRt3P7Ts+/EAa+Rzpv4Q+bygfBVSMO9M1ipyY7uxTC0qUIoKDXs1SIk9kvB5aJPqANm4TrWxOxvrNpC/iQ6XpuFhCmrUPGLhrqjwHE5sKoJlZZWx0G6tHS3Wa8t3abBzcioxBRLXRsTZmWInFi5aEAvEu+5eDCI+KvslEkam1vzoyrViJ9i9cZzW2fO4LR7r72rUWOi0bgEiTygJWdDMCS9bPGLjQvssjGprWt5kgeP37CZQOZZyKjGlQoFCsF+0MFYlTo5PeixmeR3D38WwRS47xE45bguO4G0NtBtjyMrOuOheBXTOpkeGucEOMamiI9QGEuQH9+BhjgOfgitIajweJtV1hZqHxUsWxwrxzMl/2uKhsjcxYSgxoQSfzyA3LlvW3ATUFf7kX4cB8YdqU8rc2LLmZeDcUaHi6gyIjfLxiattbduSsdzuCYkFw8eq1lUiPgXvriYvqdCSQNsRYpxjxGJ2vgtWt6y0rsXIyFQNROUuXA3urco0fqfyf4uoxFggXhi8MCcdvDwyFgvEWGxq4tqcQJycmILiqh6x1qNJFUMknr8p7kK4MDgSP8BxvgZtYeQA5VK8VS5C6nG0lPj69jfw/vle+MXOp5XC+/o/38Ch/YfhPIYQIizeE1Cx11+ZOxv7BYuNLaATGBoYgiN/eU9XiEr7/OTnkOk7zlVIgC/dm18qIOZUdojYnZpvMDo/eF4pxHODX1qvZ9v9IOxZJCH2QPhBVFW6JbqPfaubBgMffKbUldnEQxGeZnqDfU+Oe4sdqSZ3Jq5drPZOGNvdWKyaUuTSZ06egesz1/XwoRECxMOVieT0bEDMqlMjmB0wYhPrnCo1fnJ0wFK98ZrEUqRbh0QaxLyqgY4Vm4rNUMeH/R9JB3hp5LItHmriRk8ggQOyqBCvyB8vEk81Gh1kLvfpUblqPNaXMc+v2bVIwGPXrDyQSt1ZVKMLJbyLw51vMBHIUeEl+OR9y5XNJELAU4VEdkyUVSjop0ZrWAFmdiT6AHwKBo5+KuX1Du47JKQP+9AKFCUUbjl7dlaqRs/BIz60bmqVcsr1mx92jFjUxUCHZe0Qj8s8c+BSJP7TqpaVfFkzum3++Sa4s+S6ttdOWSmznKftEDOy8AkbmsydB7ZFK/6EZ3Y+JVUSqedTfLuIdR3BO2UjgZxmH41gQuSf5JELrzt7KZlzzwF1fbE1l1Xm1L0c60p3wrLlTcJONOdOWf9Kq1AwM153LPvDwPPaqmFspTMrpqi16f3FvTtg1xsvSg9ObA3n7Y/2Q/u2dr5fu2Dbt13wBBkR5gH2INSxrG54kKnxBWzzKot4XgU/BswiOL1D+P1v9v5aX7RSaT/e1AKTE5MwNpoXMrQ5l0isK/YaN5LyElLeqI8WIJ67lvsvgmT735Lh4VlBnNrq9hjA9J+64ZFnNscyAGhFkJdHx2Di8gT41q0Q9y2qN0xPkLuRV85vAqI/GKBjKZzXpVh1KmJjFaGPPbcFfta9FeK0XgwZzeuaeTVqsSrVrEK1H6EYeipw87z9E01cZWlIdxrVyHbLtgZlM9FtqbC917jAZNcG+P1fX4GfbF0PcRsrVdv4RDusxATG3Ftfb6HuKhZqE5yfmztUaarQV6diWW6Joh5qG0ToF1cM3vVL6nV4LAMv5iW21WBspvvv/Sf0Et/rM99aU2XmxC2Yc5Duan7TxVGF/U1lRc1iRRV9ywnQyrhixmMFPms71ug1ynHvQwxjgwNDOkzWvkWgIsySNdNtCDFb9r3Qs809w1TfMUYdAI0CRwS38SG9uKcWwPkDPQtn9fYFn9DVPIvQ2bjw8MgBV+3zrQEDmTQ+DhsubACcv2g+vPz2bzFoL4cbwVo61uqN2YkD/4D+1w/qADVSwC5rxsLlNIJMe/19yXrnL6/lrq5uSHyFAB+1V4j+as/zuuveiHZf4gc6sQus+FwcW255d/TgxVLzib6G8t2H+DLGrROrUVZdmzfXlsSEOCuW+b52ZPSdbNCkbOn7E0rTeKIcG7SwGHijGxtR3PvAUuOTTjJ/u3h4T+CkbJC9d/HQNILswndmmg1ebwZjMRJHH0w4aaknfuK+JxMz01//m94ENn5pfPjx73fJ/Vwcm2tH/IirmjD983AwG08rgXgTgKwIYNkx0UWeEPZCTaB4H88cWKZSgKEhcpDshdr8Z31qzvZhn7oqBSjN0L17sdVqwmHXnaqKt5HFSWynagzgMWzVF9drRJVjVaO+EiDrsO2pQpjsenprKlJXEUymvJ6qdN0KgfbwGBSn9cXhtmQu1Anq/xcM9t+LZOIarvxPgAEABz4fqCBZ1lYAAAAASUVORK5CYII="

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(62);

	var _statuses = __webpack_require__(170);

	var _statuses2 = _interopRequireDefault(_statuses);

	__webpack_require__(171);

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
/* 170 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"clearfix container\">\n\n  <div class=\"status-list\">\n\n    <div class=\"next_status_info\" data-ng-show=\"get_next_status().status\">\n\n      <div class=\"next_status_name\">\n        {{ widget.texts.next_status }} <span data-ng-style=\"{ color: get_next_status().status.color  }\">{{ get_next_status().status.status }}</span>\n      </div>\n\n      <div class=\"next_status_offset\">\n        {{ widget.texts.next_status_offset }} {{ get_next_status().offset }}\n      </div>\n\n    </div>\n\n    <div class=\"status-list__wrapper\" data-sailplay-statuses data-ng-cloak>\n\n      <div class=\"status-list__progress element-progress progress_line\"\n           data-ng-style=\"getProgress(purchase_status ? user().purchases.sum : user().user_points, _statuses)\"></div>\n\n      <div class=\"status-list__item element-item\"\n           data-ng-class=\"{ type_active : item.points <= user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra }\"\n           data-ng-repeat=\"item in _statuses\"\n           data-ng-style=\"generateOffset($index, _statuses)\">\n\n        <div class=\"status-list__item-point element-item-point\"></div>\n\n        <div class=\"element-item-point-inner\" data-ng-style=\"{ backgroundColor: item.color }\"></div>\n\n        <div class=\"status-list__item-name element-item-name\" data-ng-bind=\"item.name\"></div>\n        <div class=\"status-list__item-status element-item-status\" data-ng-if=\"item.status\" data-ng-bind=\"item.status\"\n             style=\"{{ (item.color) ? ('color: ' +  item.color) : '' }}\"></div>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>";

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(172);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./statuses.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./statuses.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(74)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .status-list {\n  float: left;\n  width: 90%;\n  position: relative;\n  margin: 0 5%;\n  padding: 30px 0 80px;\n  z-index: 1;\n}\n.spm_wrapper .status-list .next_status_info {\n  margin-bottom: 30px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list {\n    width: 80%;\n    margin-left: 10% !important;\n  }\n}\n.spm_wrapper .status-list__wrapper {\n  background: #F4F4F4;\n  position: relative;\n  height: 20px;\n  border-radius: 5px;\n  display: block;\n  margin: 0 20px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__wrapper {\n    height: 10px;\n  }\n}\n.spm_wrapper .status-list__item {\n  position: absolute;\n  height: 100%;\n  width: 0;\n}\n.spm_wrapper .status-list__item .element-item-point-inner {\n  z-index: 1;\n  content: '';\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  display: none;\n  margin-top: -15px;\n  margin-left: -15px;\n  top: 50%;\n  left: 50%;\n  border-radius: 50%;\n  background: #444444;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item .element-item-point-inner {\n    width: 20px;\n    height: 20px;\n    margin: -10px 0 0 -10px;\n  }\n}\n.spm_wrapper .status-list__item-point {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  transform: translate3d(-50%, -50%, 0);\n  border-radius: 50%;\n  background: #f4f4f4;\n  z-index: -1;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-point {\n    width: 30px;\n    height: 30px;\n  }\n}\n.spm_wrapper .status-list__item-status {\n  display: inline-block;\n  min-width: 100px;\n  left: 0;\n  position: absolute;\n  top: 60px;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 12px;\n    min-width: 100%;\n    top: 50px;\n  }\n}\n.spm_wrapper .status-list__item-name {\n  display: inline-block;\n  min-width: 80px;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 12px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 8px;\n    min-width: 100%;\n    top: 25px;\n  }\n}\n.spm_wrapper .status-list__item.type_active .element-item-point-inner {\n  display: block;\n}\n.spm_wrapper .status-list__progress {\n  height: 10px;\n  position: absolute;\n  width: 0;\n  background: #444444;\n  z-index: 0;\n  top: 5px;\n  border-radius: 5px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__progress {\n    height: 5px;\n    top: 2.5px;\n  }\n}\n", ""]);

	// exports


/***/ })
])
});
;