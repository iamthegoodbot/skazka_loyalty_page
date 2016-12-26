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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(139);
	__webpack_require__(143);
	__webpack_require__(149);
	__webpack_require__(153);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(162);
	__webpack_require__(166);
	module.exports = __webpack_require__(174);


/***/ },
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
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
/* 113 */
/***/ function(module, exports) {

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


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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


/***/ },
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _actions = __webpack_require__(140);

	var _actions2 = _interopRequireDefault(_actions);

	__webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _widget.WidgetRegister)({

	  id: 'actions',
	  template: _actions2.default,
	  inject: ['tools', 'SailPlayApi', 'SailPlay'],
	  controller: function controller(tools, SailPlayApi, SailPlay) {

	    return function (scope, elm, attrs) {

	      // scope._tools = MAGIC_CONFIG.tools;

	      scope.action_selected = false;
	      scope.action_custom_selected = false;

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

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "<div class=\"{{ widget.id }} clearfix\">\n\n  <div id=\"magic_actions\" class=\"more_bonus container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-actions>\n\n      <div class=\"more_bonus_main\">\n\n        <div class=\"mb_item action\" data-ng-repeat=\"action in actions().actions\" data-ng-style=\"widget.styles.action\">\n          <div class=\"mb_item_left\">\n            <span class=\"action_name\" data-ng-bind=\"action_data(action).name\"></span>\n            <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            <a class=\"sp_btn button_primary\" data-ng-click=\"action_select(action)\">{{ action_data(action).button_text }}</a>\n          </div>\n          <div class=\"mb_item_right\">\n            <img data-ng-src=\"{{ action_data(action).pic | sailplay_pic }}\" alt=\"\">\n          </div>\n        </div>\n\n        <div class=\"mb_item action\" data-ng-repeat=\"action in actions_custom()\" data-ng-style=\"widget.styles.action\">\n          <div class=\"mb_item_left\">\n            <span class=\"action_name\" data-ng-bind=\"action.name\"></span>\n            <span class=\"action_points\" data-ng-show=\"action.points\" data-ng-bind=\"((action.points || 0) | number) + ' ' + (action.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            <a class=\"sp_btn button_primary\" data-ng-click=\"action_custom_select(action)\">{{ action.button_text }}</a>\n          </div>\n          <div class=\"mb_item_right\">\n            <img data-ng-src=\"{{ action.icon | sailplay_pic }}\" alt=\"\">\n          </div>\n        </div>\n\n        <div class=\"mb_item action\" data-ng-if=\"quiz_list && quiz_list.length && ((!exist || !exist()) || !checkTag(quiz.tag, exist()))\" data-ng-repeat=\"quiz in $parent.quiz_list\" data-ng-style=\"widget.styles.action\">\n          <div class=\"mb_item_left\">\n            <span class=\"action_name\" data-ng-bind=\"quiz.name\"></span>\n            <span class=\"action_points\" data-ng-show=\"quiz.points\" data-ng-bind=\"((quiz.points || 0) | number) + ' ' + (quiz.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            <a class=\"sp_btn button_primary\" data-ng-click=\"$event.preventDefault();open_quiz(quiz)\">{{ quiz.button_text }}</a>\n          </div>\n          <div class=\"mb_item_right\">\n            <img data-ng-src=\"{{ quiz.icon | sailplay_pic }}\" alt=\"\">\n          </div>\n        </div>\n\n      </div>\n\n      <magic-modal class=\"actions_selected_modal\" data-ng-cloak data-show=\"$parent.action_selected\">\n\n        <div>\n\n          <div class=\"action_image\">\n            <img class=\"gift_more_img\" data-ng-src=\"{{ action_data(action_selected).pic | sailplay_pic }}\"\n                 alt=\"{{ action_data(action_selected).name }}\">\n          </div>\n\n          <div class=\"action_tools\">\n\n            <p>\n              <span class=\"modal_action_name\" data-ng-bind=\"action_data(action_selected).name\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:( 'points.texts.pluralize' | tools ))\"></span>\n            </p>\n\n            <p style=\"margin-top: 10px;\">\n              <span class=\"modal_action_description\" data-ng-bind=\"action_data(action_selected).description\"></span>\n            </p>\n\n\n            <p class=\"action_buttons\">\n            <span data-sailplay-action\n                  data-styles=\"{{ action_styles(action_data(action_selected)) }}\"\n                  data-action=\"action_selected\"\n                  data-text=\"{{ action_data(action_selected).button_text }}\">\n              <span class=\"sp_btn button_primary\">{{ action_data(action_selected).button_text }}</span>\n            </span>\n            </p>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.action_custom_selected\">\n\n        <div data-sailplay-action-custom data-action=\"action_custom_selected\"></div>\n\n      </magic-modal>\n\n\n      <magic-modal class=\"actions_custom_selected_modal\" data-ng-cloak data-show=\"$parent.quiz.show\">\n\n        <div class=\"quiz_main\">\n\n          <div class=\"quiz_block\" data-ng-if=\"$parent.quiz.data\">\n\n            <div class=\"quiz_block__title\" data-ng-bind=\"$parent.quiz.data.name\"></div>\n\n            <div class=\"quiz_block__counter\" data-ng-bind=\"$parent.quiz.step + ' / ' + $parent.quiz.data.data.length\"></div>\n\n            <div class=\"quiz_block__name\" data-ng-bind=\"getCurrentTest().name\"></div>\n\n            <label data-ng-repeat=\"question in getCurrentTest().answers\"\n                   data-ng-switch=\"getCurrentTest().type\"\n                   data-ng-click=\"$event.preventDefault();change(question, getCurrentTest());\">\n\n              <input data-ng-switch-when=\"many\" type=\"checkbox\"\n                     name=\"quiz_[[ $index ]]\"\n                     data-ng-checked=\"check(question)\">\n\n              <input data-ng-switch-when=\"one\" type=\"radio\"\n                     name=\"quiz\"\n                     data-ng-checked=\"check(question)\">\n\n              <span data-ng-bind=\"question.text\"></span>\n\n            </label>\n\n            <textarea name=\"variable\" data-ng-show=\"needToShowVariable()\"\n                      data-ng-model=\"models.variable\"></textarea>\n\n            <div class=\"button_wrapper clearfix\">\n\n                <span data-ng-click=\"prev();\" class=\"quiz_block__btn prev\"\n                      data-ng-class=\"{type_disabled: $parent.quiz.step == 1}\">Prev</span>\n\n              <span data-ng-click=\"next();\" class=\"quiz_block__btn next\"\n                    data-ng-class=\"{type_disabled: !canPressNext() }\"\n                    data-ng-bind=\"step == $parent.quiz.data.data.length ? 'Finish' : 'Next' \">next</span>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </magic-modal>\n\n    </div>\n\n  </div>\n</div>";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./actions.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./actions.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .more_bonus {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .more_bonus .bon_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 80px;\n}\n.spm_wrapper .more_bonus .bon_sub_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .more_bonus .more_bonus_main {\n  width: 90%;\n  margin-left: 5%;\n  float: left;\n  margin-top: 40px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item {\n  float: left;\n  width: 31%;\n  margin-right: 3.5%;\n  background-color: #eeeeee;\n  height: 175px;\n  margin-bottom: 30px;\n  position: relative;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item.act {\n  margin-bottom: 0px;\n  height: 155px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:nth-child(3n) {\n  margin-right: 0;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover span {\n  opacity: 0;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item:hover .mb_item_left a {\n  opacity: 1;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left {\n  float: left;\n  width: 64%;\n  position: relative;\n  height: 100%;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span {\n  float: left;\n  margin-left: 15%;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n  width: 70%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  max-height: 80px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(1) {\n  color: #222222;\n  font-size: 16px;\n  line-height: 22px;\n  margin-top: 29px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span:nth-child(2) {\n  color: #444444;\n  margin-top: 9px;\n  margin-right: 30px;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  font-family: Arial;\n  top: 50%;\n  margin-top: -18px;\n  left: 50%;\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  height: 35px;\n  font-weight: 500;\n  margin-left: -70px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left a.without_bg {\n  background: none;\n  border: none;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right {\n  float: right;\n  width: 36%;\n  height: 100%;\n  background-color: #E6E2DD;\n  text-align: center;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right img {\n  margin-top: 38px;\n  display: inline-block;\n  max-width: 90%;\n  max-height: 70px;\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item {\n    width: 46.5%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item:nth-child(3n) {\n    margin-right: 0;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item:nth-child(3n) {\n    margin-right: 3.5%;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item {\n    width: 46.5%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item:nth-child(3n) {\n    margin-right: 0;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item:nth-child(3n) {\n    margin-right: 3.5%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item {\n    width: 100%;\n    position: relative;\n    height: 300px;\n    margin-right: 0px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item.act {\n    margin-bottom: 0px;\n    height: 250px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left {\n    float: right;\n    margin-top: 100px;\n    height: 140px;\n    width: 100%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_left span {\n    width: 90%;\n    text-align: center;\n    margin-left: 5%;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right {\n    float: left;\n    width: 100%;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    height: 100px;\n  }\n  .spm_wrapper .more_bonus .more_bonus_main .mb_item .mb_item_right img {\n    margin-top: 23px;\n  }\n}\n.spm_wrapper .actions_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .actions_selected_modal .action_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n  max-height: 170px;\n}\n.spm_wrapper .actions_selected_modal .action_image img {\n  width: 100%;\n}\n.spm_wrapper .actions_selected_modal .action_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 69%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .actions_selected_modal [data-sailplay-action] {\n  position: relative;\n  width: 100%;\n  height: 36px;\n  display: inline-block;\n}\n.spm_wrapper .actions_selected_modal .sailplay_action_frame {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 140px !important;\n  height: 100% !important;\n  overflow: visible !important;\n  border: none !important;\n}\n.spm_wrapper .actions_selected_modal .action_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .actions_custom_selected_modal .sailplay_action_custom_frame {\n  width: 100%;\n  min-height: 400px;\n}\n.spm_wrapper .actions_custom_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_selected_modal .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .quiz_block {\n  width: 100%;\n  border-radius: 10px;\n  box-sizing: border-box;\n}\n.spm_wrapper .quiz_block .button_wrapper {\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__title {\n  width: 100%;\n  color: #57baad;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n}\n.spm_wrapper .quiz_block label {\n  display: block;\n  width: 100%;\n  font-size: 14px;\n  margin: 10px 0;\n  white-space: nowrap;\n}\n.spm_wrapper .quiz_block label input {\n  display: inline-block;\n  height: 14px;\n  width: 14px;\n  line-height: 14px;\n  vertical-align: middle;\n}\n.spm_wrapper .quiz_block label span {\n  white-space: normal;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 18px;\n}\n.spm_wrapper .quiz_block__counter {\n  width: 100%;\n  display: block;\n  margin: 5px 0;\n  text-align: center;\n  font-weight: bold;\n  font-size: 18px;\n  color: #57baad;\n}\n.spm_wrapper .quiz_block__name {\n  width: 100%;\n  display: block;\n  margin: 20px 0;\n  text-align: left;\n  font-size: 18px;\n}\n.spm_wrapper .quiz_block textarea {\n  width: 100%;\n  min-height: 150px;\n  padding: 10px;\n  resize: none;\n  border-radius: 10px;\n  font-size: 18px;\n  box-sizing: border-box;\n  border: 1px solid grey;\n  margin: 5px 0;\n}\n.spm_wrapper .quiz_block__btn {\n  width: 200px;\n  line-height: 40px;\n  text-align: center;\n  color: #ffffff;\n  background-color: #f8b01c;\n  text-decoration: none;\n  font-size: 14px;\n  border-radius: 10px;\n}\n.spm_wrapper .quiz_block__btn.next {\n  float: right;\n}\n.spm_wrapper .quiz_block__btn.prev {\n  float: left;\n}\n.spm_wrapper .quiz_block__btn.type_disabled {\n  cursor: default;\n  background-color: grey;\n}\n", ""]);

	// exports


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _badges = __webpack_require__(144);

	var _badges2 = _interopRequireDefault(_badges);

	var _badgesBadge = __webpack_require__(145);

	var _badgesBadge2 = _interopRequireDefault(_badgesBadge);

	var _badgesLine = __webpack_require__(146);

	var _badgesLine2 = _interopRequireDefault(_badgesLine);

	__webpack_require__(147);

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

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "<div class=\"widget {{ widget.id }} clearfix\">\n\n  <div class=\"container clearfix\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n    <h3 class=\"bon_header\">\n      <span class=\"header\">{{ widget.texts.header }}</span>\n    </h3>\n    <h4 class=\"bon_sub_header\">\n      <span class=\"caption\">{{ widget.texts.caption }}</span>\n    </h4>\n\n    <div data-sailplay-badges class=\"badge_lines_container clearfix\">\n\n      <sailplay-magic-badge-line class=\"multi_level\" data-ng-repeat=\"line in sailplay.badges.list().multilevel_badges\" data-line=\"line\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n      <sailplay-magic-badge-line class=\"one_level\" data-line=\"sailplay.badges.list().one_level_badges\" data-type=\"one_level\" data-config=\"widget\"></sailplay-magic-badge-line>\n\n    </div>\n\n\n  </div>\n\n</div>";

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "<div class=\"badge\">\n  <div class=\"badge_iner\" data-ng-click=\"on_click(badge)\">\n    <div class=\"badge_pic\">\n      <img data-ng-src=\"{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}\" alt=\"{{ badge.name }}\">\n    </div>\n    <span class=\"badge_name\" data-ng-bind=\"badge.name\"></span>\n    <!--<span class=\"bon_tem_info badge_points\" data-ng-bind=\"(badge.points | number) + ' ' + (gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n  </div>\n  <div class=\"badge_arrow\">\n\n  </div>\n</div>";

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_item_main clearfix\" data-ng-show=\"line.length\">\n\n    <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n      <div class=\"bon_slide_cat_item\">\n\n        <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n          <sailplay-magic-badge data-magic-slide data-badge=\"badge\" data-on-click=\"badge_select(badge);\" data-ng-repeat=\"badge in line\" data-ng-class=\"{ last: $last }\"></sailplay-magic-badge>\n\n        </div>\n\n      </div>\n\n      <!--<a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>-->\n      <!--<a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>-->\n\n    </div>\n\n  </div>\n\n  <magic-modal class=\"modal_badge_selected\" data-ng-cloak data-show=\"badge_selected\">\n\n    <div>\n\n      <div class=\"modal_badge_image\">\n        <img class=\"gift_more_img\" data-ng-src=\"{{ badge_selected.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ badge_selected.name }}\">\n      </div>\n\n      <div class=\"modal_badge_tools\">\n\n        <p>\n          <span class=\"modal_badge_name\" data-ng-bind=\"badge_selected.name\"></span>\n        </p>\n\n        <!--<p style=\"margin-top: 10px;\">-->\n          <!--<span class=\"modal_badge_points\" data-ng-bind=\"(action_selected.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:_tools.points.texts.pluralize)\"></span>-->\n        <!--</p>-->\n\n        <p style=\"margin-top: 10px;\">\n          <span class=\"modal_badge_description\" data-ng-bind=\"badge_selected.descr\"></span>\n        </p>\n\n        <p class=\"modal_badge_buttons\">\n          <span class=\"badge_share_button fb_icon\" data-ng-click=\"badge_share('fb', badge_selected)\">\n            {{ _config.texts.share_fb }}\n          </span>\n          <span class=\"badge_share_button tw_icon\" style=\"margin-right: 20px;\" data-ng-click=\"badge_share('tw', badge_selected)\">\n            {{ _config.texts.share_tw }}\n          </span>\n          <span class=\"sp_btn button_primary\" data-ng-click=\"badge_select(false);\">{{ _tools.buttons.texts.close }}</span>\n        </p>\n\n      </div>\n\n    </div>\n\n  </magic-modal>\n\n</div>";

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./badges.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./badges.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .widget.badges {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .widget.badges .bon_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC', 'Roboto', sans-serif;\n  margin-top: 80px;\n}\n.spm_wrapper .widget.badges .bon_sub_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .widget.badges .bon_slide_cat_item_wrap {\n  float: left;\n  width: 100%;\n  margin-left: 5%;\n  margin-right: 5%;\n  margin-top: 30px;\n  margin-bottom: 30px;\n  position: relative;\n}\n.spm_wrapper .widget.badges .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .widget.badges .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .widget.badges .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .widget.badges .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .widget.badges .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .widget.badges .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .widget.badges .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  transition: .3s ease;\n}\n.spm_wrapper .widget.badges .badge_lines_container {\n  margin: 30px auto;\n  float: left;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .widget.badges .one_level .badge_arrow {\n  display: none;\n}\n.spm_wrapper .widget.badges .badge {\n  position: relative;\n  width: 150px;\n  height: 190px;\n  border: 1px solid #cccccc;\n  margin-left: 30px;\n  margin-right: 30px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n}\n.spm_wrapper .widget.badges .badge .badge_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.spm_wrapper .widget.badges .badge .badge_iner span {\n  white-space: normal;\n  float: left;\n  color: #222222;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .widget.badges .badge .badge_iner .badge_name {\n  font-size: 16px;\n  width: 100%;\n  text-align: center;\n  margin-top: 10px;\n}\n.spm_wrapper .widget.badges .badge .badge_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .widget.badges .badge .badge_iner .badge_pic {\n  width: 100%;\n  max-height: 150px;\n  overflow: hidden;\n}\n.spm_wrapper .widget.badges .badge .badge_iner .badge_pic img {\n  width: 100%;\n  height: auto;\n}\n.spm_wrapper .widget.badges .badge .badge_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  -webkit-transition: all 300ms ease;\n  -moz-transition: all 300ms ease;\n  -ms-transition: all 300ms ease;\n  -o-transition: all 300ms ease;\n  transition: all 300ms ease;\n}\n.spm_wrapper .widget.badges .badge .badge_arrow {\n  position: absolute;\n  left: 100%;\n  top: 65px;\n  width: 60px;\n  height: 20px;\n  background-position: center left;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n.spm_wrapper .widget.badges .badge.last .badge_arrow {\n  display: none;\n}\n.spm_wrapper .modal_badge_selected .bns_overlay_iner {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 600px;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30%;\n  padding: 0;\n  vertical-align: middle;\n  overflow: hidden;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_image img {\n  width: 100%;\n  vertical-align: top;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_tools {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 70%;\n  padding: 0 0 0 40px;\n  vertical-align: middle;\n}\n.spm_wrapper .modal_badge_selected .modal_badge_buttons {\n  margin-top: 30px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button {\n  vertical-align: middle;\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background-position: center;\n  background-size: 20px 20px;\n  background-repeat: no-repeat;\n  cursor: pointer;\n  margin-right: 10px;\n  -webkit-transition: all 0.3s linear;\n  -moz-transition: all 0.3s linear;\n  -ms-transition: all 0.3s linear;\n  -o-transition: all 0.3s linear;\n  background-color: #cccccc;\n  border-radius: 20px;\n}\n.spm_wrapper .modal_badge_selected .badge_share_button:hover {\n  background-color: #888888;\n}\n", ""]);

	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _banner = __webpack_require__(150);

	var _banner2 = _interopRequireDefault(_banner);

	__webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _widget.WidgetRegister)({
	  id: 'banner',
	  template: _banner2.default,
	  controller: function controller() {
	    return function () {};
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n  <div class=\"bon_choice_main container block_images\" data-ng-cloak>\n    <img class=\"block_images__item\" data-ng-repeat=\"(key, value) in widget.images\" data-ng-src=\"{{ value }}\" alt=\"{{ key }}\">\n  </div>\n</div>\n";

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(152);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./banner.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./banner.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .block_images {\n  width: 100%;\n}\n.spm_wrapper .block_images__item {\n  max-width: 100%;\n}\n", ""]);

	// exports


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GiftTypeRegister = undefined;

	var _widget = __webpack_require__(101);

	var _gifts = __webpack_require__(154);

	var _gifts2 = _interopRequireDefault(_gifts);

	__webpack_require__(155);

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

	      scope.gift_unconfirm = function () {

	        scope.confirmed_gift = scope.selected_gift = scope.no_points_error = false;
	      };

	      scope.gift_unconfirm();

	      scope.gift_select = function (gift) {
	        scope.selected_gift = gift || false;
	      };

	      scope.gift_confirm = function () {

	        scope.confirmed_gift = scope.selected_gift;

	        if (!scope.user()) {

	          SailPlay.authorize('remote');
	        } else if (scope.user().user_points.confirmed < scope.confirmed_gift.points) {

	          scope.confirmed_gift = false;
	          scope.no_points_error = true;
	        }

	        scope.selected_gift = false;
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
	      console.log('registered gift types: ', gift_types);
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

	        console.log('gift type data', data);
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
	            console.log("SLIDE:", slide);
	            slide.style.width = _width - 30 + 'px';
	          });
	        }, 200);
	      }
	    }
	  };
	}]);

/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = "<div class=\"bon_choice_main container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n  <h3 class=\"bon_header\">\n    <span class=\"header\">{{ widget.texts.header }}</span>\n  </h3>\n  <h4 class=\"bon_sub_header\">\n    <span class=\"caption\">{{ widget.texts.caption }}</span>\n  </h4>\n\n  <div data-sailplay-gifts>\n    <div class=\"bon_item_main\" data-ng-show=\"gifts && gifts().length\" data-magic-slider>\n\n      <div class=\"bon_slide_cat_item_wrap\" data-magic-gallery>\n        <div class=\"bon_slide_cat_item\">\n\n          <div class=\"bon_item_line\" data-ng-style=\"{left : left}\">\n\n            <div class=\"bon_item gift\" data-magic-slide data-magic-gift data-ng-repeat=\"gift in gifts()\">\n              <div class=\"bon_item_iner\">\n                <img data-ng-src=\"{{ gift.thumbs.url_250x250 | sailplay_pic }}\" alt=\"{{ gift.name }}\">\n                <span class=\"bon_item_name gift_name\" data-ng-bind=\"gift.name\"></span>\n                <span class=\"bon_tem_info gift_points\" data-ng-bind=\"(gift.points | number) + ' ' + (gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n                <a href=\"#\" class=\"button_primary\" data-ng-click=\"gift_select(gift); $event.preventDefault();\">{{ widget.texts.get }}</a>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <a href=\"#\" class=\"arr_left arr_left slider_arrow_left\" data-ng-click=\"$event.preventDefault(); set_position('left');\" data-ng-show=\"show_left\"></a>\n        <a href=\"#\" class=\"arr_right arr_right slider_arrow_right\" data-ng-click=\"$event.preventDefault(); set_position('right');\" data-ng-show=\"show_right\"></a>\n\n      </div>\n\n    </div>\n\n    <magic-modal class=\"bns_overlay_gift\" data-ng-cloak data-show=\"$parent.selected_gift\">\n\n      <div class=\"modal_gift_container\">\n\n        <img class=\"gift_more_img\" data-ng-src=\"{{ selected_gift.thumbs.url_250x250 | sailplay_pic }}\"\n             alt=\"{{ selected_gift.name }}\">\n\n        <div class=\"gift_more_block\">\n\n          <span class=\"gift_more_name modal_gift_name\" data-ng-bind=\"selected_gift.name\"></span>\n\n          <span class=\"gift_more_points modal_gift_points\"\n                data-ng-bind=\"(selected_gift.points | number) + ' ' + (selected_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n\n          <p class=\"gift_more_descr modal_gift_description\" data-ng-bind=\"selected_gift.descr\"></p>\n\n          <div class=\"modal_gift_type_block clearfix\" data-gift-type data-types=\"widget.options.gift_types\" data-gift=\"selected_gift\"></div>\n\n          <div class=\"modal_gift_buttons\">\n            <span class=\"alink button_primary\" data-ng-click=\"gift_select(false);\">{{ 'buttons.texts.close' | tools }}</span>\n\n            <span class=\"alink button_primary\"\n                  style=\"margin-left: 5px;\"\n                  data-ng-click=\"gift_confirm();\"\n                  data-ng-bind=\"gift_affordable(selected_gift) ? widget.texts.get : widget.texts.no_points_button_text\">{{ widget.texts.get }}</span>\n          </div>\n\n        </div>\n      </div>\n\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_not_points\" data-ng-cloak data-show=\"no_points_error\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.no_points_message }}\n        </p>\n        <a class=\"alink button_primary earn_points_button\" href=\"#magic_actions\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.earn_points }}</a>\n        <a class=\"alink button_primary service_button\" target=\"_blank\" href=\"{{ widget.texts.partner_service_url }}\" data-ng-click=\"gift_unconfirm()\">{{ widget.texts.service }}</a>\n      </div>\n    </magic-modal>\n\n    <magic-modal class=\"bns_overlay_gift_complete\" data-ng-cloak data-show=\"confirmed_gift\">\n      <div>\n        <p class=\"modal_gift_description\">\n          {{ widget.texts.confirm_message_start }}\n          {{ (confirmed_gift.points | number) + ' ' + (confirmed_gift.points | sailplay_pluralize:('points.texts.pluralize' | tools)) }}.\n          {{ widget.texts.confirm_message_end }}\n        </p>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_unconfirm();\">{{ 'buttons.texts.close' | tools }}</span>\n        <span class=\"alink button_primary\" data-ng-click=\"gift_purchase(confirmed_gift);\">{{ 'buttons.texts.get' | tools }}</span>\n      </div>\n    </magic-modal>\n  </div>\n\n\n</div>";

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(156);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./gifts.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./gifts.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bon_choice_main {\n  float: left;\n  width: 100%;\n  background-color: #eeeeee;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  color: #000000;\n  font-size: 30px;\n  font-family: 'RotondaC';\n  margin-top: 80px;\n}\n.spm_wrapper .bon_choice_main .bon_sub_header {\n  float: left;\n  width: 90%;\n  margin-left: 5%;\n  font-size: 14px;\n  color: #000000;\n  margin-top: 10px;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap {\n  float: left;\n  width: 74%;\n  margin-left: 13%;\n  margin-top: 60px;\n  margin-bottom: 60px;\n  position: relative;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide {\n  display: none !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-slide-active {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_slide_cat_item_wrap.cycle-slide.cycle-sentinel {\n  display: block !important;\n}\n.spm_wrapper .bon_choice_main .bon_item_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_left {\n  position: absolute;\n  left: 0;\n  margin-left: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 20px 0px 0px 20px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/04cbb41a3a145a39e718ff25a37690d5.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .arr_right {\n  position: absolute;\n  right: 0;\n  margin-right: -110px;\n  width: 100px;\n  height: 110px;\n  border-radius: 0px 20px 20px 0px;\n  background-color: #eeeeee;\n  background-image: url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/26bbb44e136d0cf99e7099522eab8fc9.png);\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: block;\n  top: 50%;\n  margin-top: -55px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item {\n  float: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item_line {\n  position: relative;\n  left: 0;\n  transition: .3s ease;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item {\n  width: 245px;\n  height: 360px;\n  border: 1px solid #cccccc;\n  margin-left: 15px;\n  margin-right: 15px;\n  background-color: #ffffff;\n  text-align: center;\n  display: inline-block;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item:hover {\n  border: 1px solid #888888;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner {\n  position: relative;\n  float: left;\n  width: 100%;\n  height: 100%;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner span {\n  white-space: normal;\n  float: left;\n  margin-left: 30px;\n  width: 185px;\n  text-align: left;\n  color: #222222;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover span {\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner:hover a {\n  opacity: 1;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_item_name {\n  font-size: 16px;\n  position: absolute;\n  left: 0px;\n  bottom: 61px;\n  visibility: visible;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner .bon_tem_info {\n  font-size: 14px;\n  opacity: 0.5;\n  visibility: visible;\n  font-weight: 300;\n  position: absolute;\n  left: 0px;\n  bottom: 37px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner img {\n  margin-top: 30px;\n  max-height: 200px;\n}\n.spm_wrapper .bon_choice_main .bon_item_main .bon_slide_cat_item .bon_item .bon_item_iner a {\n  position: absolute;\n  bottom: 37px;\n  left: 50%;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -80px;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  opacity: 0;\n  visibility: hidden;\n}\n.spm_wrapper .bns_overlay_gift_not_points {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_not_points p {\n  padding: 20px;\n}\n.spm_wrapper .bns_overlay_gift {\n  text-align: left;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner {\n  font-size: 0;\n}\n.spm_wrapper .bns_overlay_gift .bns_overlay_iner:before {\n  vertical-align: middle;\n  display: inline-block;\n  height: 100%;\n  width: 0;\n  content: '';\n}\n.spm_wrapper .bns_overlay_gift .gift_more {\n  color: #222222;\n  font-size: 14px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_block {\n  display: inline-block;\n  vertical-align: middle;\n  width: 70%;\n  white-space: normal;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding-left: 40px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_img {\n  display: inline-block;\n  width: 30%;\n  vertical-align: middle;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_name {\n  display: inline-block;\n  width: 100%;\n  font-size: 16px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_descr {\n  display: inline-block;\n  width: 100%;\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 20px;\n}\n.spm_wrapper .bns_overlay_gift .gift_more_points {\n  display: inline-block;\n  width: 100%;\n  opacity: 0.5;\n  font-size: 14px;\n  margin-top: 10px;\n}\n.spm_wrapper .bns_overlay_gift_complete {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_gift_complete p {\n  margin: 20px 0;\n}\n", ""]);

	// exports


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _gifts = __webpack_require__(153);

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _gifts.GiftTypeRegister)({

	  id: 'custom_vars',
	  inject: ['SailPlay', 'SailPlayApi'],
	  template: '\n      <form name="custom_vars_form" class="clearfix">\n        <div class="form_field" style="width: 100%;" data-ng-repeat="field in options.data.fields" data-ng-switch="field.type">\n          <div data-ng-switch-when="date" class="clearfix">\n            <label class="form_label">{{ field.label }}</label>\n            <date-selector data-ng-model="field.value" data-max-year="{{ field.options.max_year }}" data-min-year="{{ field.options.min_year }}"></date-selector>\n          </div>\n        </div>\n      </form>\n    ',
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

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _header = __webpack_require__(159);

	var _header2 = _interopRequireDefault(_header);

	__webpack_require__(160);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _widget.WidgetRegister)({
	  id: 'header',
	  template: _header2.default,
	  controller: function controller() {

	    return function (scope) {};
	  }

	});

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "<div class=\"header_wrapper container\">\n\n  <h3 class=\"header_title\">\n    {{ widget.texts.title }}\n  </h3>\n\n  <h2 class=\"header_sub_title\">\n    {{ widget.texts.sub_title }}\n  </h2>\n\n</div>";

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(161);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./header.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./header.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_widget.header .header_wrapper {\n  background-color: #888888;\n  display: inline-block;\n  width: 100%;\n  height: auto;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 40px 5%;\n}\n.spm_wrapper .spm_tools_widget.header .header_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 36px;\n}\n.spm_wrapper .spm_tools_widget.header .header_sub_title {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 20px;\n}\n", ""]);

	// exports


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _leaderboard = __webpack_require__(163);

	var _leaderboard2 = _interopRequireDefault(_leaderboard);

	__webpack_require__(164);

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

/***/ },
/* 163 */
/***/ function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n    <div class=\"bon_choice_main container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n        <h3 class=\"bon_header\">\n            <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4 class=\"bon_sub_header\">\n            <span class=\"caption\">{{ widget.texts.caption }}</span>\n        </h4>\n\n        <ul class=\"leaderboard__list\" data-ng-if=\"data && data()\">\n\n            <li class=\"leaderboard__list-item type_headers\">\n\n                <span class=\"leaderboard__list-item__rank rows headers\">{{ widget.texts.rank }}</span>\n\n                <span class=\"leaderboard__list-item__name rows headers\">{{ widget.texts.full_name }}</span>\n\n                <span class=\"leaderboard__list-item__score rows headers\">{{ widget.texts.score }}</span>\n\n            </li>\n\n            <li class=\"leaderboard__list-item\" data-ng-repeat=\"member in $parent.data().members.members\"\n                data-ng-class=\"{ type_current : member.is_current_user }\">\n\n                <span class=\"leaderboard__list-item__rank rank rows\" data-ng-bind=\"member.rank\"></span>\n\n                <span class=\"leaderboard__list-item__name full_name rows\">\n\n                    <img class=\"leaderboard__list-item__photo photo\" data-ng-if=\"member.pic\"\n                         data-ng-src=\"{{ $parent.member.pic | sailplay_pic }}\"\n                         alt=\"{{ $parent.member.full_name || 'n/a' }}\">\n\n                    {{ member.full_name || 'n/a' }}\n\n                </span>\n\n                <span class=\"leaderboard__list-item__score score rows\" data-ng-bind=\"member.score\"></span>\n\n            </li>\n\n        </ul>\n\n\n    </div>\n</div>\n\n";

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(165);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./leaderboard.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./leaderboard.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .widget.leaderboard ul li {\n  list-style: none;\n}\n.spm_wrapper .widget.leaderboard__list {\n  max-width: 600px;\n  box-sizing: border-box;\n  padding: 0 10px;\n  margin: 0 auto 20px !important;\n  float: none;\n}\n.spm_wrapper .widget.leaderboard__list-item {\n  display: inline-block;\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  z-index: 1;\n  font-size: 0;\n  padding: 5px;\n}\n.spm_wrapper .widget.leaderboard__list-item.type_current {\n  background: #6385b5;\n}\n.spm_wrapper .widget.leaderboard__list-item.type_current span {\n  color: white;\n}\n.spm_wrapper .widget.leaderboard__list-item.type_headers {\n  margin-bottom: 5px;\n  margin-top: 20px;\n}\n.spm_wrapper .widget.leaderboard__list-item.type_headers span {\n  font-size: 18px;\n}\n.spm_wrapper .widget.leaderboard__list-item span {\n  display: inline-block;\n  vertical-align: middle;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #676767;\n  white-space: nowrap;\n  line-height: 18px;\n}\n.spm_wrapper .widget.leaderboard__list-item__photo {\n  height: 18px;\n  display: inline-block;\n  vertical-align: top;\n}\n.spm_wrapper .widget.leaderboard__list-item__rank {\n  font-size: 18px;\n  width: 20%;\n  text-align: left;\n}\n.spm_wrapper .widget.leaderboard__list-item__name {\n  font-size: 14px;\n  width: 60%;\n  text-align: center;\n}\n.spm_wrapper .widget.leaderboard__list-item__score {\n  font-size: 18px;\n  width: 20%;\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _profile = __webpack_require__(167);

	var _profile2 = _interopRequireDefault(_profile);

	var _history_pagination = __webpack_require__(168);

	var _history_pagination2 = _interopRequireDefault(_history_pagination);

	__webpack_require__(169);

	var _avatar_default = __webpack_require__(173);

	var _avatar_default2 = _interopRequireDefault(_avatar_default);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ProfileWidget = {

	  id: 'profile',
	  template: _profile2.default,
	  controller: function controller() {

	    return function (scope, elm, attrs) {

	      // scope._tools = MAGIC_CONFIG.tools;

	      scope.default_avatar = _avatar_default2.default;

	      scope.profile = {
	        history: false,
	        show_fill_profile: false,
	        fill_profile: function fill_profile(state) {

	          console.log(state);

	          scope.profile.show_fill_profile = state || false;
	        }
	      };

	      console.log('profile widget scope');
	      console.log(scope);
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

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "<div class=\"bon_profile_wrap container\" data-ng-show=\"widget.enabled\" data-ng-cloak>\n\n  <div class=\"bon_profile_info\" data-sailplay-profile>\n    <div class=\"bon_profile_top clearfix\">\n      <div class=\"bon_profile_top_left\">\n        <h3>\n          <span class=\"header\">{{ widget.texts.header }}</span>\n        </h3>\n        <h4>\n          <span class=\"caption\">{{ widget.texts.spoiler }}</span>\n        </h4>\n      </div>\n      <div class=\"bon_profile_right\" data-ng-show=\"user()\">\n        <div class=\"user_avatar\">\n          <img class=\"user_avatar_image\" data-ng-src=\"{{ (user().user.pic | sailplay_pic) || default_avatar}}\" alt=\"You\">\n          <a href=\"#\" class=\"logout_btn button_link\" data-ng-click=\"$event.preventDefault(); logout();\">{{ widget.texts.logout }}</a>\n        </div>\n        <div class=\"user_info\">\n          <span class=\"user_name\"  data-ng-bind=\"user().user.name || widget.texts.name_not_defined\"></span>\n          <span class=\"user_phone\" data-ng-if=\"user().user.phone\"  data-ng-bind=\"user().user.phone | tel\"></span>\n          <span class=\"user_email\" data-ng-if=\"user().user.email\"  data-ng-bind=\"user().user.email\"></span>\n        </div>\n        <div class=\"user_info\">\n          <a href=\"#\" class=\"edit_profile_btn button_link\" data-ng-click=\"$event.preventDefault(); profile.fill_profile(true);\">{{ widget.texts.edit_profile_button }}</a>\n        </div>\n      </div>\n      <div class=\"bon_profile_right clearfix\" data-ng-show=\"!user()\">\n        <button type=\"button\" class=\"sp_btn button_primary login_reg_btn\" data-ng-click=\"$event.preventDefault(); login('remote');\">{{ widget.texts.login_reg }}</button>\n      </div>\n    </div>\n\n    <!-- status -->\n    <div class=\"status_block\" data-ng-show=\"user() && user().user_status.name\">\n      <span class=\"status_block_title\" data-ng-bind=\"widget.texts.user_status\"></span>\n      <img class=\"status_block_img\" data-ng-src=\"{{ user().user_status.pic | sailplay_pic }}\" alt=\"{{ user().user_status.name }}\">\n      <span class=\"status_block_name\" data-ng-bind=\"user().user_status.name || widget.texts.empty_status \"></span>\n    </div>\n\n    <div class=\"bon_profile_stat\">\n      <div class=\"bps_left points_block clearfix\" data-ng-show=\"user()\">\n        <span class=\"points_confirmed\">\n          <span class=\"points_confirmed_value\" data-ng-bind=\"user().user_points.confirmed | number\"></span>\n          <span class=\"points_confirmed_name\" data-ng-bind=\"user().user_points.confirmed | sailplay_pluralize: ('points.texts.pluralize' | tools)\"></span>\n        </span>\n        <a class=\"button_link history_button\" href=\"#\" data-ng-click=\"$event.preventDefault(); profile.history = true;\">{{ widget.texts.history_button }}</a>\n      </div>\n      <div class=\"bps_right progress_block clearfix\" data-sailplay-gifts data-ng-show=\"progress\">\n        <div class=\"progress_line_main\">\n          <div class=\"progress_line_bg progress_bar progress_bar_border\"></div>\n          <div class=\"progress_line progress_bar_filled\" data-procent=\"0\" data-ng-style=\"{ width: progress.plenum + '%' }\">\n            <div class=\"progress_text progress_bar_flag\" data-ng-show=\"progress.next.item\" data-ng-class=\"{ right_position: progress.plenum < 50 }\">\n              <span class=\"progress_bar_flag_text\" data-ng-bind=\"progress.next.offset + ' ' + (progress.next.offset | sailplay_pluralize:('points.texts.pluralize' | tools)) + ' ' + widget.texts.before_gift\"></span>\n            </div>\n          </div>\n\n          <div class=\"gift_item progress_bar_border\" data-ng-repeat=\"item in progress.items track by $index\"\n               data-ng-class=\"{ act : item.reached, progress_bar_gift_filled: item.reached, progress_bar_gift: !item.reached}\"\n               data-ng-style=\"{ left: item.get_left() }\">\n\n            <span class=\"gift_item_hint\" data-ng-bind=\"item.gifts[0].points\"></span>\n\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <magic-modal class=\"bns_overlay_hist\" data-show=\"profile.history\">\n\n    <div data-sailplay-history data-sailplay-profile>\n\n      <h3>\n        <span class=\"modal_history_header\">{{ widget.texts.history.header }}</span>\n        <!--<b>У вас {{ user().user_points.confirmed + ' ' + (user().user_points.confirmed | sailplay_pluralize:_tools.points.texts.pluralize) }}</b>-->\n      </h3>\n      <h4 class=\"modal_history_caption\">{{ widget.texts.history.caption }}</h4>\n\n      <table class=\"bns_hist_table\">\n\n        <tbody>\n\n        <tr data-dir-paginate=\"item in history() | itemsPerPage:10\" data-pagination-id=\"history_pages\">\n          <td>\n            <span class=\"modal_history_date\" data-ng-bind=\"item.action_date | date:'d/MM/yyyy'\"></span>\n          </td>\n          <td>\n            <span><b class=\"modal_history_content\" data-ng-bind=\"item | history_item\"></b></span>\n          </td>\n          <td>\n            <span class=\"modal_history_points\" data-ng-if=\"item.points_delta\" data-ng-bind=\"((item.points_delta|number) || 0) + ' ' + (item.points_delta | sailplay_pluralize:('points.texts.pluralize' | tools))\"></span>\n          </td>\n        </tr>\n\n        </tbody>\n      </table>\n\n      <dir-pagination-controls data-max-size=\"7\" data-pagination-id=\"history_pages\"\n                               data-template-url=\"profile.history_pagination\"\n                               data-auto-hide=\"true\"></dir-pagination-controls>\n    </div>\n\n\n\n  </magic-modal>\n\n  <!--profile edit section-->\n  <magic-modal class=\"fill_profile_modal\" data-show=\"profile.show_fill_profile\">\n\n    <div class=\"mb_popup mb_popup_prof\" data-sailplay-fill-profile data-config=\"widget.fill_profile.config\">\n\n      <div class=\"mb_popup_top\">\n        <span class=\"modal_profile_header\">{{ widget.fill_profile.header }}</span>\n      </div>\n\n      <form name=\"fill_profile_form\" class=\"mb_popup_main mb_popup_main_mt\" data-ng-submit=\"sailplay.fill_profile.submit(fill_profile_form, profile.fill_profile);\">\n\n        <div class=\"form_field\" data-ng-repeat=\"field in sailplay.fill_profile.form.fields\" data-ng-switch=\"field.input\">\n\n          <div data-ng-switch-when=\"image\" class=\"avatar_upload clearfix\">\n            <img width=\"160px\" data-ng-src=\"{{ (field.value | sailplay_pic) || 'http://saike.ru/sailplay-magic/dist/img/profile/avatar_default.png'}}\" alt=\"\">\n          </div>\n\n          <div data-ng-switch-when=\"text\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n          <div data-ng-switch-when=\"date\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <date-picker data-model=\"field.value\"></date-picker>\n          </div>\n\n          <div data-ng-switch-when=\"select\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <div class=\"magic_select form_input\">\n              <select data-ng-model=\"field.value\" data-ng-options=\"item.value as item.text for item in field.data\"></select>\n            </div>\n          </div>\n\n          <div data-ng-switch-when=\"phone\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"text\" data-ui-mask=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n          <div data-ng-switch-when=\"email\" class=\"clearfix\">\n            <label class=\"form_label\">{{ field.label }}</label>\n            <input class=\"form_input\" type=\"email\" placeholder=\"{{ field.placeholder }}\" data-ng-model=\"field.value\">\n          </div>\n\n        </div>\n\n        <div class=\"answ_text\">\n          <button type=\"submit\" class=\"sp_btn button_primary\">{{ 'buttons.texts.save' | tools }}</button>\n        </div>\n      </form>\n    </div>\n  </magic-modal>\n\n</div>";

/***/ },
/* 168 */
/***/ function(module, exports) {

	module.exports = "<div class=\"bns_hist_pager\" data-ng-if=\"1 < pages.length || !autoHide\">\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == 1 }\" href=\"\" data-ng-click=\"setCurrent(pagination.current - 1)\">\n    &lsaquo;\n  </a>\n  <a data-ng-repeat=\"pageNumber in pages track by tracker(pageNumber, $index)\" data-ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\" href=\"\" data-ng-click=\"setCurrent(pageNumber)\">\n    {{ pageNumber }}\n  </a>\n\n  <a data-ng-if=\"directionLinks\" data-ng-class=\"{ disabled : pagination.current == pagination.last }\" href=\"\" data-ng-click=\"setCurrent(pagination.current + 1)\">\n    &rsaquo;\n  </a>\n\n</div>";

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(170);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./profile.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./profile.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bon_profile_wrap {\n  float: left;\n  width: 100%;\n  padding: 0 5%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: #888888;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info {\n  width: 100%;\n  float: left;\n  position: relative;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n  float: left;\n  width: 580px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h3 {\n  float: left;\n  width: 100%;\n  font-size: 30px;\n  color: #ffffff;\n  font-family: 'RotondaC';\n  margin-top: 50px;\n  margin-bottom: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left h4 {\n  float: left;\n  width: 100%;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 400;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n  float: right;\n  width: 265px;\n  margin-top: 50px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right img {\n  border-radius: 100%;\n  -webkit-box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right span {\n  font-size: 16px;\n  font-weight: 700;\n  margin-top: 18px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .login_reg_btn {\n  float: right;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .logout_btn {\n  width: auto;\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .edit_profile_btn {\n  font-size: 14px;\n  margin-top: 9px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar {\n  max-width: 81px;\n  float: right;\n  text-align: center;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info {\n  text-align: right;\n  float: left;\n  width: 165px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_info span {\n  word-wrap: break-word;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right .user_avatar_image {\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat {\n  float: left;\n  width: 100%;\n  margin-top: 50px;\n  margin-bottom: 78px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed span {\n  color: inherit;\n  font-family: inherit;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .points_confirmed_name {\n  margin-left: 2px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left {\n  float: left;\n  width: auto;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > span {\n  color: #ffffff;\n  display: block;\n  font-size: 33px;\n  font-family: 'RotondaC bold';\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_left > a {\n  font-size: 14px;\n  color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n  float: right;\n  width: 70%;\n  margin-top: 12px;\n  margin-right: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line_bg {\n  height: 14px;\n  border-top: 3px solid #000000;\n  background-color: #ffffff;\n  background-image: url(" + __webpack_require__(171) + ");\n  border-radius: 20px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line {\n  position: absolute;\n  left: 0px;\n  top: 3px;\n  width: 0%;\n  background-color: #ffffff;\n  height: 14px;\n  border-radius: 20px 0px 0px 20px;\n  -webkit-transition: all 1000ms ease;\n  -moz-transition: all 1000ms ease;\n  -ms-transition: all 1000ms ease;\n  -o-transition: all 1000ms ease;\n  transition: all 1000ms ease;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text {\n  min-width: 100px;\n  position: absolute;\n  right: 0px;\n  padding-top: 32px;\n  border-right: 1px solid #fff;\n  top: 0px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position {\n  right: auto;\n  left: 100%;\n  border-left: 1px solid #fff;\n  border-right: none;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text.right_position span {\n  border-radius: 0px 5px 5px 0px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .progress_line .progress_text span {\n  float: right;\n  line-height: 30px;\n  background-color: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n  font-size: 14px;\n  font-family: 'RotondaC';\n  border-radius: 5px 0px 0px 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item {\n  position: absolute;\n  top: 50%;\n  width: 36px;\n  height: 36px;\n  margin-top: -19px;\n  margin-left: -19px;\n  background-color: #cccccc;\n  border-radius: 6px;\n  -webkit-background-size: 20px 22px;\n  background-size: 20px 22px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  border-top: 3px solid #000000;\n  background-image: url(" + __webpack_require__(172) + ");\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item.act {\n  background-color: #ffffff;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item_hint {\n  opacity: 0;\n  visibility: hidden;\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  top: 0;\n  font-weight: bold;\n  transition: .3s ease;\n  color: white;\n}\n.spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main .gift_item:hover .gift_item_hint {\n  visibility: visible;\n  opacity: 1;\n  top: -20px;\n}\n.spm_wrapper .bon_profile_wrap .status_block {\n  width: 30%;\n  display: inline-block;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .bon_profile_wrap .status_block {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_stat .bps_left {\n    text-align: left;\n  }\n}\n@media only screen and (min-width: 1129px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    width: 100%;\n    margin-top: 30px;\n    margin-right: 0px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 60%;\n  }\n}\n@media only screen and (min-width: 950px) and (max-width: 1128px) {\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text {\n    border: none !important;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text:before {\n    content: '';\n    width: 1px;\n    background: white;\n    right: 0;\n    top: 0;\n    position: absolute;\n    height: 17px;\n    display: block;\n  }\n  .spm_wrapper .bon_profile_wrap .progress_line_main .progress_text span {\n    position: relative;\n    left: 50%;\n    border-radius: 5px !important;\n  }\n}\n@media only screen and (min-width: 530px) and (max-width: 949px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n@media only screen and (max-width: 529px) {\n  .spm_wrapper .bon_profile_wrap .bon_profile_info {\n    width: 100%;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_right {\n    width: 265px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_top_left {\n    width: 80%;\n    float: left;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right {\n    float: left;\n    width: 100%;\n    margin-top: 30px;\n    margin-bottom: 12px;\n  }\n  .spm_wrapper .bon_profile_wrap .bon_profile_info .bon_profile_stat .bps_right .progress_line_main {\n    float: left;\n    width: 95%;\n  }\n}\n.spm_wrapper .bns_hist_table {\n  float: left;\n  width: 100%;\n  margin-top: 12px;\n}\n.spm_wrapper .bns_hist_table td {\n  vertical-align: text-top;\n  padding: 5px 11px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(1) {\n  color: #888888;\n  font-size: 13px;\n  line-height: 19px;\n  padding-right: 0px;\n  padding-left: 0px;\n  white-space: nowrap;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) {\n  color: #000000;\n  font-size: 12px;\n  font-weight: 200;\n  line-height: 19px;\n  position: relative;\n  padding-left: 0px;\n  width: 570px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2)::after {\n  position: absolute;\n  left: 0px;\n  width: 100%;\n  border-top: 1px dotted #444444;\n  top: 14px;\n  content: '';\n  display: block;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span {\n  display: block;\n  position: relative;\n  z-index: 1;\n  font-size: 13px;\n  color: #222222;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span b {\n  background-color: #ffffff;\n  padding-right: 15px;\n  padding-left: 11px;\n  font-weight: 200;\n}\n.spm_wrapper .bns_hist_table td:nth-child(2) span:first-child {\n  color: #000000;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) {\n  color: #444444;\n  font-size: 14px;\n  font-weight: bold;\n  text-align: right;\n  line-height: 19px;\n}\n.spm_wrapper .bns_hist_table td:nth-child(3) span {\n  display: block;\n  white-space: nowrap;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager {\n  float: right;\n  font-size: 13px;\n}\n.spm_wrapper .bns_hist_pager a {\n  text-decoration: none;\n  color: #000;\n  margin-right: 4px;\n}\n.spm_wrapper .bns_hist_pager a.active {\n  font-weight: bold;\n}\n", ""]);

	// exports


/***/ },
/* 171 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAOCAYAAAB5EtGGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrslrEKwjAQhptD6tSpTl0UhD6HD6BP6wvkOQqCLk5m6mQnL+WC1xwmZu4FaqQ/+fzvK0LNcX/oKlq3x/0ZvuP9Frdt9V1vzB3Lu2q5XphPlDW4NTzMsEfMR8pq3HYF7LhXETvqNbM3+HGme5aFPW4ndtYXurLcZz3LhwCnUhe8apan2C6wqbQ/2/7JjnuVsm0kc2ZDCPGHh5SQ8DR+CLEpIQm2I/aUEGJTQlivUjbvtWCDCpFsk/vLrE2IP2tUiGQbFSLZoELkzKBC5MygQuTMoELkzKBC5Mwm8+q+OiG+l1EhstdHgAEAt8yVBryjUM8AAAAASUVORK5CYII="

/***/ },
/* 172 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR9JREFUeNrsVt0NgjAYLIQB6ga4gS4gjsAG6gTKk88++iROIBuAE4BO4AiMwAjeZz6SLw2/EYwPXHJpUq69a/u1QakGnFfhGnRVC6BZEOu+WzWDLmgOoisHg+PzkAiNZs0e1EK3gy5rNKkwkCCTHUiru4FV6QtwCaO87LANAy0MThBSiDkYcZ8PpszS4ATOWJvwqrZyXsdIIZN5ME2NhNrQUFqPtUpsm9dkIrFW7XCZjag6k22XgS2I5JlYZami2XScPOD20kF7J0MHBnSYcY+Uusd2fsLbHRN9g4U9wP63wlY/AJVwWHNz61Bwm/XUjwtL3I9YVM5QJXylR1XeeH+EEn7Qe/aTg59MJpPJ5A9Nxngtc9MkGNjgxf9h6i3AANemSGniswSTAAAAAElFTkSuQmCC"

/***/ },
/* 173 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACiFJREFUeNrsnV1sVMcVx8/cfPERKku1iVQSYqM2CeajmwawG6qyNoaEUMVrUuWjSmNv1IdQGjBN0qrtQ8hLSvISqKK+2hAIqRTCkoZGIk5YXkJtInlFwOYFvFS2hM1DnTohffFOz9yd+zH3Y+/uvTPXu9BjzV7brO/e+e3/nDN3Zs4CUOX2bHO6Dluymq+RVAGkBB5Ya8S2AVsd/znIsvx4GluOtUMjffmbAiJTFh5S2DqxJTk0WZbncI+zI0KdvqEgIrweDi4V43vWz4AizEzNQuSq68W2S7Liwij0NYTZXzMQqwie05h775YNkyhy27eqDJ6XMtMIM1tVEBEey659PFlENBpXVzIcZqQEpEkCyFx3OBpAajYq/FRec/5UprEkN4bXn5ozJfLYx1y3J6rqaGQlWt0h4bq3DxW5O1aIHOCpMgfGZcBzg6M0GCYhRCbMUO5NQgJMcIB1YQF6wTOgUV81Up9LJvpv3UBJGJDs7qetEpAkXoDe6rPg2X8WQVMfnRmPBkAdGxHhqQapzQ1AKgBkXwVawO8LeJzVv5/l3y+9/26Yd+c8KBRm9bb0/ntgFo+z+vNm+fOKz2V/j2cqHs1QQB3JpyzT+8lDljwl8hOORXdhOzz+e73zVP/dmo1rYGv3o3B+aATaujZAw5IGyI/m9SOzhd9ZaJ5xaOAsZI+dhrMDX+hKJKiJ4pEIR9WKJBUAjJRESgEsMHgdD8GCRfNhx5+3V3z2Ux9k4cSBj+HKxSsITWMo9aM/yIqiWAYhdpV6wi3lnGV1w4NHwo8BqSvjGgAL3O22PPcIwnsB1nWsDfUKTcsbYf3Wh+G2O27TFQxCfHRm8YpBPoD9J+eu5bKhIfKBdG/0+w/x0QC4ZuOPYMfe7RDVbr/jdljRsgKmJqZgbHSMq5DDIpHVmESQpxFkvmJ35olkOAo+txtbLly/5Lvw5rG9GOcWSL0xfqnzd+ja/wKNuTZvEtyaxcUmr/gYlJ37ZHXMCZApsfsPv5QOkNnV8atWtuaKNxJXBKvz46EFuHFClgoFkDgMeQwzcNgYGGQzX80AH+yYX/6D/Yos5bXeo5XIxq9KVyFXQ/336iH9x25l81zt29q44rkKjeYBM4T1lavE3mjzgdRjcGt1JNn1U6WThb1v7oSV61ZwzRt3P7Ts+/EAa+Rzpv4Q+bygfBVSMO9M1ipyY7uxTC0qUIoKDXs1SIk9kvB5aJPqANm4TrWxOxvrNpC/iQ6XpuFhCmrUPGLhrqjwHE5sKoJlZZWx0G6tHS3Wa8t3abBzcioxBRLXRsTZmWInFi5aEAvEu+5eDCI+KvslEkam1vzoyrViJ9i9cZzW2fO4LR7r72rUWOi0bgEiTygJWdDMCS9bPGLjQvssjGprWt5kgeP37CZQOZZyKjGlQoFCsF+0MFYlTo5PeixmeR3D38WwRS47xE45bguO4G0NtBtjyMrOuOheBXTOpkeGucEOMamiI9QGEuQH9+BhjgOfgitIajweJtV1hZqHxUsWxwrxzMl/2uKhsjcxYSgxoQSfzyA3LlvW3ATUFf7kX4cB8YdqU8rc2LLmZeDcUaHi6gyIjfLxiattbduSsdzuCYkFw8eq1lUiPgXvriYvqdCSQNsRYpxjxGJ2vgtWt6y0rsXIyFQNROUuXA3urco0fqfyf4uoxFggXhi8MCcdvDwyFgvEWGxq4tqcQJycmILiqh6x1qNJFUMknr8p7kK4MDgSP8BxvgZtYeQA5VK8VS5C6nG0lPj69jfw/vle+MXOp5XC+/o/38Ch/YfhPIYQIizeE1Cx11+ZOxv7BYuNLaATGBoYgiN/eU9XiEr7/OTnkOk7zlVIgC/dm18qIOZUdojYnZpvMDo/eF4pxHODX1qvZ9v9IOxZJCH2QPhBVFW6JbqPfaubBgMffKbUldnEQxGeZnqDfU+Oe4sdqSZ3Jq5drPZOGNvdWKyaUuTSZ06egesz1/XwoRECxMOVieT0bEDMqlMjmB0wYhPrnCo1fnJ0wFK98ZrEUqRbh0QaxLyqgY4Vm4rNUMeH/R9JB3hp5LItHmriRk8ggQOyqBCvyB8vEk81Gh1kLvfpUblqPNaXMc+v2bVIwGPXrDyQSt1ZVKMLJbyLw51vMBHIUeEl+OR9y5XNJELAU4VEdkyUVSjop0ZrWAFmdiT6AHwKBo5+KuX1Du47JKQP+9AKFCUUbjl7dlaqRs/BIz60bmqVcsr1mx92jFjUxUCHZe0Qj8s8c+BSJP7TqpaVfFkzum3++Sa4s+S6ttdOWSmznKftEDOy8AkbmsydB7ZFK/6EZ3Y+JVUSqedTfLuIdR3BO2UjgZxmH41gQuSf5JELrzt7KZlzzwF1fbE1l1Xm1L0c60p3wrLlTcJONOdOWf9Kq1AwM153LPvDwPPaqmFspTMrpqi16f3FvTtg1xsvSg9ObA3n7Y/2Q/u2dr5fu2Dbt13wBBkR5gH2INSxrG54kKnxBWzzKot4XgU/BswiOL1D+P1v9v5aX7RSaT/e1AKTE5MwNpoXMrQ5l0isK/YaN5LyElLeqI8WIJ67lvsvgmT735Lh4VlBnNrq9hjA9J+64ZFnNscyAGhFkJdHx2Di8gT41q0Q9y2qN0xPkLuRV85vAqI/GKBjKZzXpVh1KmJjFaGPPbcFfta9FeK0XgwZzeuaeTVqsSrVrEK1H6EYeipw87z9E01cZWlIdxrVyHbLtgZlM9FtqbC917jAZNcG+P1fX4GfbF0PcRsrVdv4RDusxATG3Ftfb6HuKhZqE5yfmztUaarQV6diWW6Joh5qG0ToF1cM3vVL6nV4LAMv5iW21WBspvvv/Sf0Et/rM99aU2XmxC2Yc5Duan7TxVGF/U1lRc1iRRV9ywnQyrhixmMFPms71ug1ynHvQwxjgwNDOkzWvkWgIsySNdNtCDFb9r3Qs809w1TfMUYdAI0CRwS38SG9uKcWwPkDPQtn9fYFn9DVPIvQ2bjw8MgBV+3zrQEDmTQ+DhsubACcv2g+vPz2bzFoL4cbwVo61uqN2YkD/4D+1w/qADVSwC5rxsLlNIJMe/19yXrnL6/lrq5uSHyFAB+1V4j+as/zuuveiHZf4gc6sQus+FwcW255d/TgxVLzib6G8t2H+DLGrROrUVZdmzfXlsSEOCuW+b52ZPSdbNCkbOn7E0rTeKIcG7SwGHijGxtR3PvAUuOTTjJ/u3h4T+CkbJC9d/HQNILswndmmg1ebwZjMRJHH0w4aaknfuK+JxMz01//m94ENn5pfPjx73fJ/Vwcm2tH/IirmjD983AwG08rgXgTgKwIYNkx0UWeEPZCTaB4H88cWKZSgKEhcpDshdr8Z31qzvZhn7oqBSjN0L17sdVqwmHXnaqKt5HFSWynagzgMWzVF9drRJVjVaO+EiDrsO2pQpjsenprKlJXEUymvJ6qdN0KgfbwGBSn9cXhtmQu1Anq/xcM9t+LZOIarvxPgAEABz4fqCBZ1lYAAAAASUVORK5CYII="

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _widget = __webpack_require__(101);

	var _statuses = __webpack_require__(175);

	var _statuses2 = _interopRequireDefault(_statuses);

	__webpack_require__(176);

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
	    };
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = "<div class=\"clearfix\">\n\n  <div class=\"status-list container\">\n\n    <div class=\"next_status_info\" data-ng-show=\"get_next_status().status\">\n\n      <div class=\"next_status_name\">\n        {{ widget.texts.next_status }} <span data-ng-style=\"{ color: get_next_status().status.color  }\">{{ get_next_status().status.status }}</span>\n      </div>\n\n      <div class=\"next_status_offset\">\n        {{ widget.texts.next_status_offset }} {{ get_next_status().offset }}\n      </div>\n\n    </div>\n\n    <div class=\"status-list__wrapper\" data-sailplay-statuses data-ng-cloak>\n\n      <div class=\"status-list__progress element-progress progress_line\"\n           data-ng-style=\"getProgress(user().user_points, _statuses)\"></div>\n\n      <div class=\"status-list__item element-item\"\n           data-ng-class=\"{ type_active : item.points <= user().user_points.confirmed + user().user_points.spent + user().user_points.spent_extra }\"\n           data-ng-repeat=\"item in _statuses\"\n           data-ng-style=\"generateOffset($index, _statuses)\">\n\n        <div class=\"status-list__item-point element-item-point\"></div>\n\n        <div class=\"element-item-point-inner\" data-ng-style=\"{ backgroundColor: item.color }\"></div>\n\n        <div class=\"status-list__item-name element-item-name\" data-ng-bind=\"item.name\"></div>\n        <div class=\"status-list__item-status element-item-status\" data-ng-if=\"item.status\" data-ng-bind=\"item.status\"\n             style=\"{{ (item.color) ? ('color: ' +  item.color) : '' }}\"></div>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(177);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(114)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./statuses.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./statuses.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(113)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .status-list {\n  float: left;\n  width: 86%;\n  position: relative;\n  margin: 0 5%;\n  padding: 30px 0 80px;\n  z-index: 1;\n}\n.spm_wrapper .status-list .next_status_info {\n  margin-bottom: 30px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list {\n    width: 80%;\n    margin-left: 10% !important;\n  }\n}\n.spm_wrapper .status-list__wrapper {\n  background: #F4F4F4;\n  position: relative;\n  height: 20px;\n  border-radius: 5px;\n  display: block;\n  margin: 0 20px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__wrapper {\n    height: 10px;\n  }\n}\n.spm_wrapper .status-list__item {\n  position: absolute;\n  height: 100%;\n  width: 0;\n}\n.spm_wrapper .status-list__item .element-item-point-inner {\n  z-index: 1;\n  content: '';\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  display: none;\n  margin-top: -15px;\n  margin-left: -15px;\n  top: 50%;\n  left: 50%;\n  border-radius: 50%;\n  background: #444444;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item .element-item-point-inner {\n    width: 20px;\n    height: 20px;\n    margin: 5px 0 0 5px;\n  }\n}\n.spm_wrapper .status-list__item-point {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 50px;\n  height: 50px;\n  transform: translate3d(-50%, -50%, 0);\n  border-radius: 50%;\n  background: #f4f4f4;\n  z-index: -1;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-point {\n    width: 30px;\n    height: 30px;\n  }\n}\n.spm_wrapper .status-list__item-status {\n  display: inline-block;\n  min-width: 100px;\n  left: 0;\n  position: absolute;\n  top: 60px;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 14px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-status {\n    font-size: 12px;\n    min-width: 100%;\n    top: 50px;\n  }\n}\n.spm_wrapper .status-list__item-name {\n  display: inline-block;\n  min-width: 80px;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  transform: translateX(-50%);\n  text-align: center;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 12px;\n  }\n}\n@media screen and (max-width: 450px) {\n  .spm_wrapper .status-list__item-name {\n    font-size: 8px;\n    min-width: 100%;\n    top: 25px;\n  }\n}\n.spm_wrapper .status-list__item.type_active .element-item-point-inner {\n  display: block;\n}\n.spm_wrapper .status-list__progress {\n  height: 10px;\n  position: absolute;\n  width: 0;\n  background: #444444;\n  z-index: 0;\n  top: 5px;\n  border-radius: 5px;\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .status-list__progress {\n    height: 5px;\n    top: 2.5px;\n  }\n}\n", ""]);

	// exports


/***/ }
])
});
;