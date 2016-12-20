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
return webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.magic = undefined;

	var _classCallCheck2 = __webpack_require__(9);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(10);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _sailplayHub = __webpack_require__(29);

	var _sailplayHub2 = _interopRequireDefault(_sailplayHub);

	__webpack_require__(30);

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _sailplay = __webpack_require__(33);

	var _sailplay2 = _interopRequireDefault(_sailplay);

	var _core = __webpack_require__(100);

	var _core2 = _interopRequireDefault(_core);

	var _angularCookie = __webpack_require__(98);

	var _angularCookie2 = _interopRequireDefault(_angularCookie);

	var _tools = __webpack_require__(102);

	var _tools2 = _interopRequireDefault(_tools);

	__webpack_require__(125);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var magic = exports.magic = _angular2.default.module('magic', [_sailplay2.default, _core2.default, _angularCookie2.default, _tools2.default]).config(function (SailPlayProvider, MAGIC_CONFIG, SailPlayHistoryProvider, SailPlayActionsDataProvider) {

	  SailPlayActionsDataProvider.set_actions_data(MAGIC_CONFIG.data.actions);

	  SailPlayProvider.set_auth_hash_id(MAGIC_CONFIG.auth.auth_hash_id);

	  SailPlayProvider.set_remote_config({
	    background: 'transparent'
	  });

	  SailPlayHistoryProvider.set_dictionary(MAGIC_CONFIG.data.history);

	  //SailPlayProvider.set_auth_type(MAGIC_CONFIG.auth.type);
	}).directive('sailplayMagic', function (SailPlay, ipCookie, SailPlayApi, $document, $rootScope, MAGIC_CONFIG) {

	  var MagicTemplate = ['<div class="spm_wrapper">', '<layout data-widgets="config.widgets"></layout>', '</div>'].join('');

	  return {
	    restrict: 'E',
	    replace: true,
	    scope: true,
	    template: MagicTemplate,
	    link: function link(scope) {

	      scope.config = MAGIC_CONFIG;

	      scope.show_statuses_list = false;

	      scope.show_profile_action = true;

	      scope.show_login = false;

	      scope.$on('sailplay-login-cancel', function () {
	        scope.show_login = false;
	      });

	      scope.$on('sailplay-login-success', function () {
	        scope.show_login = false;
	      });

	      scope.fill_profile = function () {

	        scope.show_profile_info = true;
	      };

	      scope.body_lock = function (state) {

	        if (state) {
	          $document[0].body.classList.add('body_lock');
	        } else {
	          $document[0].body.classList.remove('body_lock');
	        }
	      };

	      scope.close_profile = function () {

	        scope.show_profile_info = false;

	        scope.body_lock(false);
	      };

	      scope.on_submit_profile = function () {
	        scope.show_profile_action = false;
	        scope.close_profile();
	      };

	      scope.open_profile = function () {
	        scope.show_profile_info = true;
	        scope.body_lock(true);
	      };

	      SailPlay.on('tags.exist.success', function (res) {

	        if (res.status === 'ok' && res.tags[0].exist) {

	          scope.show_profile_action = false;
	          scope.$apply();
	        }
	      });

	      scope.gift_points_notify = function () {
	        $rootScope.$broadcast('notifier:notify', { header: '', body: 'You do not currently have enough points to redeem this gift. Earn additional points by staying with us or taking the actions below!' });
	      };

	      scope.has_avatar = function () {

	        var has_avatar = false;

	        if (SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user.pic.indexOf('no_avatar') < 0) {

	          has_avatar = true;
	        }

	        return has_avatar;
	      };

	      SailPlay.on('actions.social.connect.error', function (e) {
	        console.dir(e);
	      });

	      SailPlay.on('actions.social.connect.success', function (e) {
	        console.dir(e);
	      });
	    }
	  };
	});

	//define magic class


	//import theme styles

	var Magic = function () {
	  function Magic(config) {
	    (0, _classCallCheck3.default)(this, Magic);
	    this.module = magic;


	    config = config || {};

	    _sailplayHub2.default.send('init', config);

	    _sailplayHub2.default.on('init.success', function (res) {

	      if (!res.partner.loyalty_page_config || !res.partner.loyalty_page_config.$MAGIC) return;

	      _core.Core.constant('MAGIC_CONFIG', res.partner.loyalty_page_config.$MAGIC);

	      var app_container = config.root || document.getElementsByTagName('sailplay-magic')[0];

	      app_container && _angular2.default.bootstrap(app_container, [magic.name]);
	    });
	  }

	  //public reference to main angular module


	  (0, _createClass3.default)(Magic, [{
	    key: 'authorize',


	    //public method for authorize
	    value: function authorize() {}
	  }]);
	  return Magic;
	}();

	//extend SAILPLAY with Magic class


	exports.default = Magic;
	_sailplayHub2.default.Magic = _sailplayHub2.default.Magic || Magic;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(11);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlay = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _sailplay = __webpack_require__(34);

	var _sailplay2 = _interopRequireDefault(_sailplay);

	var _sailplay3 = __webpack_require__(35);

	var _sailplay4 = _interopRequireDefault(_sailplay3);

	var _sailplay5 = __webpack_require__(91);

	var _sailplay6 = _interopRequireDefault(_sailplay5);

	var _sailplay7 = __webpack_require__(92);

	var _sailplay8 = _interopRequireDefault(_sailplay7);

	var _sailplay9 = __webpack_require__(97);

	var _sailplay10 = _interopRequireDefault(_sailplay9);

	var _angularCookie = __webpack_require__(98);

	var _angularCookie2 = _interopRequireDefault(_angularCookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlay = exports.SailPlay = _angular2.default.module('sailplay', [_sailplay2.default, _sailplay4.default, _sailplay6.default, _sailplay8.default, _sailplay10.default, _angularCookie2.default]).run(function (SailPlay, $rootScope) {

	  SailPlay.on('init.success', function (res) {

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
	}).provider('SailPlay', function () {

	  var auth_type = 'url';

	  var auth_options = {};

	  var auth_hash_id = 'sailplay_auth_hash';

	  return {

	    set_auth_type: function set_auth_type(type, options) {

	      if (type) auth_type = type;

	      if (options) auth_options = options;
	    },

	    set_auth_hash_id: function set_auth_hash_id(name) {

	      if (name) auth_hash_id = name;
	    },

	    set_remote_config: function set_remote_config(new_config) {

	      _angular2.default.merge(auth_options, new_config);
	    },

	    $get: function $get($window, $rootScope, ipCookie) {

	      var sp = $window.SAILPLAY || {};

	      sp.authorize = function (type) {

	        type = type || auth_type;

	        switch (type) {

	          case 'url':

	            var params = sp.url_params();

	            if (params) {
	              sp.send('login', params[auth_hash_id]);
	            } else {
	              $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
	            }

	            break;

	          case 'cookie':

	            var auth_hash = ipCookie(auth_hash_id);
	            if (auth_hash) {
	              sp.send('login', auth_hash);
	            } else {
	              $rootScope.$broadcast('sailplay-login-error', { status: 'error', message: 'No auth_hash found' });
	            }
	            break;

	          case 'remote':

	            sp.send('login.remote', auth_options);

	        }
	      };

	      sp.auth_hash_id = auth_hash_id;

	      sp.set_auth_hash_cookie = function (auth_hash) {
	        ipCookie(auth_hash_id, auth_hash);
	      };

	      return sp;
	    }

	  };
	}).service('SailPlayApi', function ($q, SailPlay, $rootScope) {

	  var self = this;

	  var data = {};

	  var points = ['load.user.info', 'load.gifts.list', 'leaderboard.load', 'load.user.history', 'load.actions.list', 'load.actions.custom.list', 'load.badges.list', 'tags.exist', 'tags.add'];

	  self.points = [];

	  _angular2.default.forEach(points, function (point) {

	    SailPlay.on(point + '.success', function (res) {

	      $rootScope.$apply(function () {
	        self.data(point, res);
	        console.log('sailplay.api:' + point + '.success');
	        console.dir(self.data(point)());
	        //console.log(JSON.stringify(self.data(point)()));
	      });
	    });

	    SailPlay.on(point + '.error', function (res) {
	      $rootScope.$apply(function () {
	        console.log('sailplay.api:' + point + '.error');
	        console.dir(res);
	        self.data(point, null);
	      });
	    });
	  });

	  self.data = function (key, value) {

	    if (typeof value !== 'undefined') {

	      data[key] = _angular2.default.copy(value);
	    }

	    return function () {
	      return data[key];
	    };
	  };

	  self.call = function (name, params, callback) {

	    SailPlay.send(name, params, callback);
	  };

	  self.reset = function () {
	    data = {};
	  };
	}).filter('sailplay_pluralize', function () {
	  var cases = [2, 0, 1, 1, 1, 2];
	  return function (input, titles) {
	    input = Math.abs(input);
	    titles = titles && titles.split(',') || [];
	    return titles[input % 100 > 4 && input % 100 < 20 ? 2 : cases[input % 10 < 5 ? input % 10 : 5]];
	  };
	}).filter('sailplay_pic', function (SailPlay, $window) {

	  function repair_pic_url(url) {
	    if (/^((http|https|ftp):\/\/)/.test(url)) {
	      return url;
	    }
	    if (url.indexOf('//') === 0) {
	      return $window.location.protocol + url;
	    } else {
	      return SailPlay.config().DOMAIN + url;
	    }
	  }

	  return function (pic_url) {

	    if (!pic_url) return '';

	    return repair_pic_url(pic_url);
	  };
	}).directive('sailplayRemoteLogin', function (SailPlay) {

	  return {
	    restrict: 'A',
	    replace: true,
	    template: '<iframe></iframe>',
	    link: function link(scope, elm, attrs) {

	      var opts = scope.$eval(attrs.sailplayRemoteLogin);

	      var options = {
	        node: elm[0]
	      };

	      var logged = false;

	      console.dir(opts);
	      _angular2.default.merge(options, opts);
	      console.dir(options);

	      scope.$on('sailplay-init-success', function () {
	        SailPlay.send('login.remote', options);
	      });

	      scope.$on('sailplay-login-success', function () {
	        logged = true;
	      });

	      scope.$on('sailplay-logout-success', function () {

	        if (logged) {

	          logged = false;

	          var src = elm[0].src;

	          elm[0].src = '';

	          elm[0].src = src;
	        }
	      });

	      SailPlay.config() && SailPlay.config().partner && SailPlay.send('login.remote', options);
	    }
	  };
	}).factory('SailPlayShare', function ($window) {
	  return function (network, url, title, description, image) {

	    var share_url = '';

	    switch (network) {

	      case 'fb':

	        share_url = 'http://www.facebook.com/sharer.php?s=100';
	        share_url += '&t=' + encodeURIComponent(title);
	        share_url += '&u=' + encodeURIComponent(url);
	        break;

	      case 'tw':

	        share_url = 'https://twitter.com/intent/tweet?tw_p=tweetbutton';
	        share_url += '&original_referer=' + encodeURIComponent(url);
	        share_url += '&url=' + encodeURIComponent(url);
	        share_url += '&text=' + encodeURIComponent(description);

	    }

	    $window[0].open(share_url, '_blank', 'toolbar=0,status=0,width=626,height=436,location=no');
	  };
	});

	exports.default = SailPlay.name;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlayProfile = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlayProfile = exports.SailPlayProfile = _angular2.default.module('sailplay.profile', [])

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
	.directive('sailplayProfile', function (SailPlayApi, SailPlay, $q) {

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: true,
	    link: function link(scope) {

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
	      scope.logout = function () {

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
	      scope.login = function (type) {

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
	      scope.tags_add = function (params, callback) {

	        if (!params) return;

	        var tags = params.tags || [];

	        if (tags.length > 0) {
	          var chunk = function chunk(array, chunkSize) {
	            return [].concat.apply([], array.map(function (elem, i) {
	              return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
	            }));
	          };

	          var chunked_tags = chunk(tags, 10);

	          var tag_promises = [];

	          _angular2.default.forEach(chunked_tags, function (chunk) {

	            var promise = $q(function (resolve, reject) {

	              SailPlay.send('tags.add', { tags: chunk }, function (tags_res) {
	                if (tags_res.status === 'ok') {

	                  resolve(tags_res);

	                  //sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
	                } else {
	                  reject(tags_res);
	                  //sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
	                }
	              });
	            });

	            tag_promises.push(promise);
	          });

	          $q.all(tag_promises).then(function (tags_res) {

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
	.provider('SailPlayFillProfile', function () {

	  var profile_tag = 'Completed Profile';
	  var cookie_name = 'sailplay_profile_form';

	  return {

	    set_tag: function set_tag(tag) {

	      profile_tag = tag || profile_tag;
	    },

	    set_cookie_name: function set_cookie_name(name) {

	      cookie_name = name || cookie_name;
	    },

	    $get: function $get() {

	      this.tag = profile_tag;

	      this.cookie_name = cookie_name;

	      this.Field = function (params) {

	        this.type = params.type;
	        this.name = params.name;
	        this.label = params.label;
	        this.placeholder = params.placeholder;
	        this.input = params.input || 'text';

	        if (params.data) {
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
	.directive('sailplayFillProfile', function (SailPlay, $rootScope, $q, ipCookie, SailPlayApi, SailPlayFillProfile) {

	  return {

	    restrict: 'A',
	    scope: false,
	    link: function link(scope, elm, attrs) {

	      var config = scope.$eval(attrs.config);

	      scope.sailplay = scope.sailplay || {};

	      scope.sailplay.fill_profile = {
	        config: config,
	        form: {}
	      };

	      if (!config) {
	        console.error('Provide fill_profile_config');
	      }

	      var saved_form = false;

	      scope.$watch(function () {
	        return _angular2.default.toJson([SailPlayApi.data('load.user.info')()]);
	      }, function () {

	        var user = SailPlayApi.data('load.user.info')();

	        if (!user) return;

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

	                  form_field.value = user.user.birth_date || '';
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
	        saved_form = _angular2.default.copy(form);
	      });

	      scope.revert_profile_form = function (form) {
	        if (form) {
	          form.$setPristine();
	          form.$setUntouched();
	        }
	        scope.sailplay.fill_profile.form = _angular2.default.copy(saved_form);
	      };

	      scope.toggle_tag = function (arr, tag) {

	        if (!tag) return;

	        var index = arr.indexOf(tag);

	        if (index > -1) {

	          arr.splice(index, 1);
	        } else {

	          arr.push(tag);
	        }
	      };

	      scope.sailplay.fill_profile.submit = function (form, callback) {

	        console.dir(form);

	        if (!form || !form.$valid) {
	          return;
	        }

	        var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;

	        var req_user = _angular2.default.copy(scope.sailplay.fill_profile.form);
	        //console.log(data_user.phone, req_user.addPhone);

	        if (data_user && data_user.phone && data_user.phone.replace(/\D/g, '') == req_user.addPhone.replace(/\D/g, '')) {
	          delete req_user.addPhone;
	        }

	        if (data_user && data_user.email && data_user.email == req_user.addEmail) {
	          delete req_user.addEmail;
	        }

	        SailPlay.send('users.update', req_user, function (user_res) {

	          if (user_res.status === 'ok') {
	            var chunk = function chunk(array, chunkSize) {
	              return [].concat.apply([], array.map(function (elem, i) {
	                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
	              }));
	            };

	            var req_tags = _angular2.default.copy(scope.profile_form.tags);

	            if (!scope.profile_form.user.sex || !scope.profile_form.custom_vars.Address) {
	              req_tags.push('Profile Uncompleted');
	            } else {
	              req_tags.push(FillProfile.tag);
	            }

	            var chunked_tags = chunk(req_tags, 10);

	            var tag_promises = [];

	            _angular2.default.forEach(chunked_tags, function (chunk) {

	              var promise = $q(function (resolve, reject) {

	                SailPlay.send('tags.add', { tags: chunk }, function (tags_res) {
	                  if (tags_res.status === 'ok') {

	                    resolve(tags_res);

	                    //sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
	                  } else {
	                    reject(tags_res);
	                    //sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
	                  }
	                });
	              });

	              tag_promises.push(promise);
	            });

	            $q.all(tag_promises).then(function (tags_res) {

	              SailPlay.send('vars.add', { custom_vars: scope.profile_form.custom_vars }, function (vars_res) {

	                var response = {
	                  user: user_res,
	                  tags: tags_res,
	                  vars: vars_res
	                };

	                if (vars_res.status === 'ok') {

	                  ipCookie(FillProfile.cookie_name, scope.profile_form);

	                  $rootScope.$broadcast('notifier:notify', {

	                    header: $rootScope.locale.thanks,
	                    body: $rootScope.locale.notifications.fill_profile_success

	                  });

	                  SailPlayApi.call('load.user.info', { all: 1 });

	                  callback && callback(response);
	                  scope.$apply();
	                } else {

	                  $rootScope.$broadcast('notifier:notify', {

	                    header: $rootScope.locale.error,
	                    body: user_res.message || $rootScope.locale.notifications.default_error

	                  });
	                  scope.$apply();
	                }
	              });
	            });
	          } else {

	            $rootScope.$broadcast('notifier:notify', {

	              header: $rootScope.locale.error,
	              body: $rootScope.locale.errors && $rootScope.locale.errors[user_res.status_code] || $rootScope.locale.errors[user_res.message] || $rootScope.locale.notifications.default_error

	            });
	            $rootScope.$apply();
	          }
	        });
	      };
	    }

	  };
	});

	exports.default = SailPlayProfile.name;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlayGifts = undefined;

	var _regenerator = __webpack_require__(36);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(40);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlayGifts = exports.SailPlayGifts = _angular2.default.module('sailplay.gifts', [])

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
	.directive('sailplayGifts', function (SailPlay, SailPlayApi, $q) {

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: true,
	    link: function link(scope) {

	      scope.gifts = SailPlayApi.data('load.gifts.list');

	      var user = SailPlayApi.data('load.user.info');

	      scope.gift_purchase = function (gift) {

	        SailPlay.send('gifts.purchase', { gift: gift });
	      };

	      scope.gift_affordable = function (gift) {

	        return user() && user().user_points.confirmed >= gift.points;
	      };

	      scope.$watch(function () {
	        return _angular2.default.toJson([scope.gifts(), user()]);
	      }, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return build_progress(scope.gifts(), user());

	              case 2:
	                scope.progress = _context.sent;

	                scope.$digest();

	              case 4:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      })));

	      scope.progress = false;

	      function build_progress(gifts, user) {

	        return $q(function (resolve, reject) {

	          if (!gifts || gifts.length < 1) {
	            scope.progress = false;
	            return;
	          }

	          var target = Math.max.apply(Math, gifts.map(function (o) {
	            return o.points;
	          }));

	          var progress_value = user && user.user_points.confirmed / (target / 100) || 0;

	          var progress = {
	            items: [],
	            plenum: progress_value <= 100 ? progress_value : 100,
	            next: {
	              item: false,
	              offset: 0
	            }
	          };

	          var ProgressItem = function ProgressItem() {

	            this.gifts = [];

	            this.left = 0;

	            this.reached = false;

	            this.get_left = function () {

	              return this.left + '%';
	            };
	          };

	          gifts.sort(function (a, b) {
	            return a.points > b.points;
	          }).reduce(function (prev_gift, current_gift) {

	            var item = void 0;

	            if (!prev_gift) {

	              item = new ProgressItem();

	              item.gifts.push(current_gift);

	              progress.items.push(item);
	            } else {

	              if (Math.abs(prev_gift.points - current_gift.points) < target * 0.02) {
	                item = progress.items[progress.length - 1];
	                item && item.gifts.push(current_gift);
	              } else {
	                item = new ProgressItem();
	                item.gifts.push(current_gift);
	                progress.items.push(item);
	              }
	            }

	            item.left = parseInt(current_gift.points) / (parseInt(target) / 100);
	            item.reached = user && current_gift.points <= user.user_points.confirmed;

	            if (user && !item.reached && !progress.next.item) {

	              progress.next.item = current_gift;
	              progress.next.offset = parseInt(current_gift.points) - parseInt(user.user_points.confirmed);
	            }
	          }, 0);

	          resolve(progress);
	        });
	      }
	    }

	  };
	});

	exports.default = SailPlayGifts.name;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(38);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(39)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(41);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(73);
	__webpack_require__(77);
	module.exports = __webpack_require__(16).Promise;

/***/ },
/* 43 */
/***/ function(module, exports) {

	

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(45)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(46)
	  , defined   = __webpack_require__(47);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(49)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(50)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(51)
	  , Iterators      = __webpack_require__(52)
	  , $iterCreate    = __webpack_require__(53)
	  , setToStringTag = __webpack_require__(69)
	  , getPrototypeOf = __webpack_require__(71)
	  , ITERATOR       = __webpack_require__(70)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 51 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(54)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(69)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(70)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(55)
	  , enumBugKeys = __webpack_require__(67)
	  , IE_PROTO    = __webpack_require__(64)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(68).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(56);

	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(57)
	  , enumBugKeys = __webpack_require__(67);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(51)
	  , toIObject    = __webpack_require__(58)
	  , arrayIndexOf = __webpack_require__(61)(false)
	  , IE_PROTO     = __webpack_require__(64)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(59)
	  , defined = __webpack_require__(47);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(60);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(58)
	  , toLength  = __webpack_require__(62)
	  , toIndex   = __webpack_require__(63);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(46)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(46)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(65)('keys')
	  , uid    = __webpack_require__(66);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(51)
	  , TAG = __webpack_require__(70)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(65)('wks')
	  , uid        = __webpack_require__(66)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(51)
	  , toObject    = __webpack_require__(72)
	  , IE_PROTO    = __webpack_require__(64)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(47);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(52)
	  , TO_STRING_TAG = __webpack_require__(70)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(75)
	  , step             = __webpack_require__(76)
	  , Iterators        = __webpack_require__(52)
	  , toIObject        = __webpack_require__(58);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(49)
	  , global             = __webpack_require__(15)
	  , ctx                = __webpack_require__(17)
	  , classof            = __webpack_require__(78)
	  , $export            = __webpack_require__(14)
	  , isObject           = __webpack_require__(22)
	  , aFunction          = __webpack_require__(18)
	  , anInstance         = __webpack_require__(79)
	  , forOf              = __webpack_require__(80)
	  , speciesConstructor = __webpack_require__(84)
	  , task               = __webpack_require__(85).set
	  , microtask          = __webpack_require__(87)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(70)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(88)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(69)($Promise, PROMISE);
	__webpack_require__(89)(PROMISE);
	Wrapper = __webpack_require__(16)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(90)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(60)
	  , TAG = __webpack_require__(70)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(17)
	  , call        = __webpack_require__(81)
	  , isArrayIter = __webpack_require__(82)
	  , anObject    = __webpack_require__(21)
	  , toLength    = __webpack_require__(62)
	  , getIterFn   = __webpack_require__(83)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(52)
	  , ITERATOR   = __webpack_require__(70)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(78)
	  , ITERATOR  = __webpack_require__(70)('iterator')
	  , Iterators = __webpack_require__(52);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(21)
	  , aFunction = __webpack_require__(18)
	  , SPECIES   = __webpack_require__(70)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(17)
	  , invoke             = __webpack_require__(86)
	  , html               = __webpack_require__(68)
	  , cel                = __webpack_require__(26)
	  , global             = __webpack_require__(15)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(60)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , macrotask = __webpack_require__(85).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(60)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(19);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(15)
	  , core        = __webpack_require__(16)
	  , dP          = __webpack_require__(20)
	  , DESCRIPTORS = __webpack_require__(24)
	  , SPECIES     = __webpack_require__(70)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(70)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlayHistory = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlayHistory = exports.SailPlayHistory = _angular2.default.module('sailplay.history', [])

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
	.directive('sailplayHistory', function (SailPlayApi) {

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: true,
	    link: function link(scope) {

	      scope.history = SailPlayApi.data('load.user.history');

	      scope.history_current_page = 0;

	      scope.set_current_page = function (page) {
	        scope.history_current_page = page;
	      };
	    }

	  };
	}).provider('SailPlayHistory', function () {

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
	    "custom_action": "Custom action"
	  };

	  return {
	    set_dictionary: function set_dictionary(new_dict) {
	      _angular2.default.merge(dict, new_dict);
	    },
	    $get: function $get() {

	      return {

	        dict: dict

	      };
	    }
	  };
	}).filter('history_item', function (SailPlayHistory) {

	  var history_texts = SailPlayHistory.dict;

	  return function (historyItem) {
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
	  };
	});

	exports.default = SailPlayHistory.name;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlayActions = undefined;

	var _keys = __webpack_require__(93);

	var _keys2 = _interopRequireDefault(_keys);

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlayActions = exports.SailPlayActions = _angular2.default.module('sailplay.actions', []).provider('SailPlayActionsData', function () {

	  var actions_data = {

	    "system": {
	      "emailBinding": {
	        name: "Enter email"
	      },
	      "fillProfile": {
	        name: "Fill profile"
	      },
	      "inviteFriend": {
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

	    set_actions_data: function set_actions_data(data) {

	      _angular2.default.merge(actions_data, data);
	    },

	    $get: function $get() {

	      return actions_data;
	    }

	  };
	}).constant('TAGS_ADD_LIMIT', 10).service('QuizService', function (MAGIC_CONFIG, TAGS_ADD_LIMIT, SailPlayApi) {

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
	      return item.name == tag;
	    })[0] || {};

	    return _tag.exist;
	  };

	  self.addTags = function (data, callback) {

	    var _send_data = _angular2.default.copy(data);

	    sending(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

	    function sending(tags) {

	      SailPlayApi.call('tags.add', { tags: tags }, function () {

	        _send_data.tags = _send_data.tags.slice(TAGS_ADD_LIMIT);

	        if (_send_data.tags.length != 0) {

	          sending(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

	          return;
	        }

	        if ((0, _keys2.default)(_send_data.vars).length) {

	          SailPlayApi.call('vars.add', { custom_vars: _send_data.vars }, function () {

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
	.directive('sailplayActions', function (SailPlayApi, SailPlay, SailPlayActionsData, QuizService) {

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: true,
	    link: function link(scope) {

	      scope.actions = SailPlayApi.data('load.actions.list');
	      scope.actions_custom = SailPlayApi.data('load.actions.custom.list');

	      scope.exist = SailPlayApi.data('tags.exist');

	      scope.checkTag = QuizService.checkTag;

	      scope.perform_action = function (action) {

	        SailPlay.send('actions.perform', action);
	      };

	      SailPlay.on('actions.perform.success', function (res) {

	        scope.$apply(function () {

	          scope.on_perform && scope.on_perform(res);
	        });
	      });

	      scope.action_data = function (action) {

	        var data = {};

	        if (!action) return data;

	        data = action;

	        if (action.socialType) data = SailPlayActionsData.social[action.socialType] && SailPlayActionsData.social[action.socialType][action.action];

	        if (SailPlayActionsData.system[action.type]) data = SailPlayActionsData.system[action.type];

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
	.directive('sailplayAction', function (SailPlay, $timeout, $compile) {

	  var init_state;

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: {
	      action: '='
	    },
	    link: function link(scope, elm, attrs) {

	      init_state = elm[0].innerHTML;

	      elm.on('click', function (e) {
	        e.preventDefault();
	      });

	      function parse_action(action) {
	        $timeout(function () {
	          attrs.styles && elm.attr('data-styles', attrs.styles);
	          // console.log(attrs.styles);
	          attrs.text && elm.attr('data-text', attrs.text);
	          SailPlay.actions && action && SailPlay.actions.parse(elm[0], action);
	        }, 0);
	      }

	      scope.$watch('action', function (new_value) {
	        if (new_value) {
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
	.directive('sailplayActionCustom', function (SailPlay, $document) {

	  var init_state = void 0;

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: {
	      action: '='
	    },
	    link: function link(scope, elm, attrs) {

	      var iframe = $document[0].createElement('iframe');

	      iframe.style.backgroundColor = "transparent";
	      iframe.frameBorder = "0";
	      iframe.allowTransparency = "true";

	      elm.append(iframe);

	      scope.$watch('action', function (action) {

	        if (action) {

	          var config = SailPlay.config();

	          iframe.src = config && config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash || '';

	          iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');
	        } else {
	          iframe.src = '';
	        }
	      });
	    }

	  };
	});

	exports.default = SailPlayActions.name;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(72)
	  , $keys    = __webpack_require__(56);

	__webpack_require__(96)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SailPlayBadges = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SailPlayBadges = exports.SailPlayBadges = _angular2.default.module('sailplay.badges', []).provider('SailPlayBadges', function () {

	  var limits = [];

	  return {

	    set_limits: function set_limits(new_limits) {

	      if (new_limits) limits = new_limits;
	    },
	    $get: function $get() {

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
	.directive('sailplayBadges', function (SailPlayApi, SailPlayBadges) {

	  return {

	    restrict: 'A',
	    replace: false,
	    scope: false,
	    link: function link(scope) {

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

	exports.default = SailPlayBadges.name;

/***/ },
/* 98 */,
/* 99 */,
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Core = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _sailplay = __webpack_require__(33);

	var _sailplay2 = _interopRequireDefault(_sailplay);

	var _widget = __webpack_require__(101);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Core = exports.Core = _angular2.default.module('magic.core', [_sailplay2.default, _widget2.default]).run(function (SailPlay, SailPlayApi, $rootScope, $window, MAGIC_CONFIG, $timeout, QuizService) {

	  //we need global template reference for config
	  $rootScope.MAGIC_CONFIG = MAGIC_CONFIG;

	  //reset to unauthorized state
	  function logout_reset() {
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
	  $rootScope.$on('sailplay-login-error', function () {
	    logout_reset();
	  });

	  //when success logout
	  $rootScope.$on('sailplay-logout-success', function () {
	    logout_reset();
	  });

	  var TAGS = QuizService.getTags();

	  //wait for sailplay inited, then try to login by cookie (we need to see unauthorized content)
	  SailPlay.authorize('cookie');

	  //we need to save auth hash in cookies for authorize status tracking
	  $rootScope.$on('sailplay-login-success', function (e, data) {
	    SailPlay.set_auth_hash_cookie(SailPlay.config().auth_hash);
	    SailPlayApi.call('load.user.info', { all: 1 });
	    SailPlayApi.call('load.badges.list');
	    SailPlayApi.call('load.actions.list');
	    SailPlayApi.call('load.actions.custom.list');
	    SailPlayApi.call('load.user.history');
	    SailPlayApi.call('tags.exist', { tags: TAGS });
	    SailPlayApi.call('load.gifts.list');
	    SailPlayApi.call('leaderboard.load');
	  });

	  //unfortunately, we need to update actions list after perform
	  SailPlay.on('actions.perform.success', function () {
	    SailPlayApi.call('load.actions.list');
	  });

	  SailPlay.on('actions.perform.error', function () {
	    SailPlayApi.call('load.actions.list');
	  });

	  SailPlay.on('actions.perform.complete', function () {
	    SailPlayApi.call('load.actions.list');
	  });

	  SailPlay.on('tags.add.success', function () {
	    $timeout(function () {
	      SailPlayApi.call('tags.exist', { tags: TAGS });
	    }, 2000);
	  });

	  //also, we need update user info after gift purchase
	  SailPlay.on('gifts.purchase.success', function (res) {

	    SailPlayApi.call('load.user.info', { all: 1 });
	    SailPlayApi.call('load.user.history');
	    SailPlayApi.call('leaderboard.load');

	    $rootScope.$apply();
	  });

	  //SailPlay.on('actions.social.connect.complete', function(){
	  //  SailPlayApi.call('load.actions.list');
	  //});
	});

	exports.default = Core.name;

/***/ },
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tools = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _angularUtilsPagination = __webpack_require__(103);

	var _angularUtilsPagination2 = _interopRequireDefault(_angularUtilsPagination);

	var _angularUiMask = __webpack_require__(105);

	var _angularUiMask2 = _interopRequireDefault(_angularUiMask);

	var _layout = __webpack_require__(107);

	var _layout2 = _interopRequireDefault(_layout);

	var _widget = __webpack_require__(113);

	var _widget2 = _interopRequireDefault(_widget);

	var _notifier = __webpack_require__(117);

	var _notifier2 = _interopRequireDefault(_notifier);

	var _modal = __webpack_require__(121);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tools = exports.Tools = _angular2.default.module('magic.tools', [_angularUtilsPagination2.default, _angularUiMask2.default, _layout2.default, _widget2.default, _notifier2.default, _modal2.default]).filter('tools', function (MAGIC_CONFIG, $parse) {

	  return function (key) {
	    return $parse(key)(MAGIC_CONFIG.tools) || '';
	  };
	}).config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
	  uiMaskConfigProvider.maskDefinitions({ '_': /[0-9]/ });
	  uiMaskConfigProvider.addDefaultPlaceholder(true);
	}]).directive('overlayClick', function () {

	  return {
	    restrict: 'A',
	    replace: false,
	    scope: false,
	    link: function link(scope, elm, attrs) {

	      elm.on('click', function (e) {
	        if (e.target === elm[0]) {
	          scope.$apply(function () {
	            scope.$eval(attrs.overlayClick);
	          });
	        }
	      });
	    }
	  };
	}).controller('slick_config', function ($scope) {

	  $scope.gift_slider_config = {
	    slidesToShow: 3,
	    slidesToScroll: 1,
	    speed: 150,
	    infinite: false,
	    prevArrow: '<div class="slick-prev"></div>',
	    nextArrow: '<div class="slick-next"></div>',
	    swipeToSlide: true,
	    responsive: [{
	      breakpoint: 1000,
	      settings: {
	        slidesToShow: 2
	      }
	    }, {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1
	      }
	    }]
	  };

	  $scope.action_slider_config = {
	    slidesToShow: 3,
	    slidesToScroll: 1,
	    speed: 150,
	    infinite: false,
	    prevArrow: '<div class="slick-prev"></div>',
	    nextArrow: '<div class="slick-next"></div>',
	    swipeToSlide: true,
	    responsive: [{
	      breakpoint: 800,
	      settings: {
	        slidesToShow: 2
	      }
	    }, {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1
	      }
	    }]
	  };
	}).directive('slickCarousel', function ($compile, $timeout) {
	  return {
	    restrict: 'A',
	    link: function link(scope, element, attrs) {

	      scope.hidden = true;

	      var $element = $(element);

	      function toggle(state) {

	        if (state) {
	          $element.css('opacity', 1);
	        } else {
	          $element.css('opacity', 0);
	        }
	      }

	      var options = scope.$eval(attrs.options) || {
	        infinite: false,
	        nextArrow: '<img class="slider_arrow right" src="dist/img/right.png"/>',
	        prevArrow: '<img class="slider_arrow left" src="dist/img/left.png"/>',
	        slidesToShow: 4,
	        slidesToScroll: 4,
	        responsive: [{
	          breakpoint: 1190,
	          settings: {
	            slidesToShow: 4,
	            slidesToScroll: 4
	          }
	        }, {
	          breakpoint: 880,
	          settings: {
	            slidesToShow: 3,
	            slidesToScroll: 3
	          }
	        }, {
	          breakpoint: 600,
	          settings: {
	            slidesToShow: 2,
	            slidesToScroll: 2
	          }
	        }, {
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

	      scope.$watchCollection(function () {
	        return $element.find('[data-slick-slide]').not('.ng-hide');
	      }, function () {
	        if (!scope.process) {
	          scope.process = true;
	          toggle(false);
	          if ($element.hasClass('slick-initialized')) {
	            $element.slick('removeSlide', null, null, true);
	            $element.slick('unslick');
	          }
	          $timeout(function () {

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

	.directive('dateSelector', function ($parse) {

	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    scope: true,
	    link: function link(scope, elm, attrs, ngModelCtrl) {

	      var years = function years(startYear) {
	        var currentYear = new Date().getFullYear(),
	            years = [];
	        startYear = startYear || 1980;

	        while (startYear <= currentYear) {
	          years.push(startYear++);
	        }

	        return years.reverse();
	      };

	      scope.date_data = {
	        days: new Array(31),
	        months: new Array(12),
	        years: years(1930)
	      };

	      scope.selected_date = ['', '', ''];

	      ngModelCtrl.$formatters.push(function (modelValue) {
	        return modelValue ? _angular2.default.copy(modelValue).split('-').reverse() : ['', '', ''];
	      });

	      ngModelCtrl.$render = function () {
	        scope.selected_date = _angular2.default.copy(ngModelCtrl.$viewValue);
	      };

	      ngModelCtrl.$parsers.push(function (viewValue) {

	        return viewValue && _angular2.default.copy(viewValue).reverse().join('-');
	      });

	      ngModelCtrl.$validators.required = function (modelValue, viewValue) {

	        var valid = true;

	        _angular2.default.forEach(viewValue, function (val) {
	          if (!val || val === '') valid = false;
	        });

	        return valid;
	      };

	      scope.$watchCollection('selected_date', function () {
	        ngModelCtrl.$setViewValue(_angular2.default.copy(scope.selected_date));
	      });
	    }
	  };
	}).filter('to_trusted', ['$sce', function ($sce) {
	  return function (text) {
	    return $sce.trustAsHtml(text);
	  };
	}]).filter('background_image', function () {
	  return function (url) {
	    return url && 'url(' + url + ')' || '';
	  };
	}).service('tools', function ($document) {

	  var initial_overflow = $document[0].body.style.overflow;

	  this.body_lock = function (state) {
	    $document[0].body.style.overflow = state ? 'hidden' : initial_overflow;
	  };

	  this.stringify_widget_css = function (prefix, obj) {

	    var css_string = '';

	    for (var selector in obj) {

	      if (obj.hasOwnProperty(selector)) {

	        css_string += prefix + ' .' + selector + '{ ';

	        var selector_styles = obj[selector];

	        for (var prop in selector_styles) {

	          if (selector_styles.hasOwnProperty(prop)) {

	            css_string += prop + ':' + selector_styles[prop] + ' !important;';
	          }
	        }

	        css_string += ' }';
	      }
	    }

	    return css_string;
	  };
	}).directive('magicSlider', function (MAGIC_CONFIG) {

	  return {
	    restrict: 'A',
	    scope: true,
	    link: function link(scope, elm, attrs) {

	      scope._slider_config = MAGIC_CONFIG.tools.slider;

	      scope.left = 0;

	      scope.current_position = 0;

	      scope.show_left = false;
	      scope.show_right = true;

	      // Переделать
	      scope.set_position = function (position) {

	        var slides = elm[0].querySelectorAll('[data-magic-slide]');
	        var wrapper = elm[0].querySelectorAll('[data-magic-gallery]')[0];

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

	        if (_next == _max) {
	          scope.show_right = false;
	        }

	        if (_next == 0) {
	          scope.show_left = false;
	        }

	        if (_count_show > slides.length) {
	          scope.show_right = false;
	        }

	        scope.current_position = _next;

	        scope.left = '-' + _next * _width + 'px';
	      };
	    }
	  };
	}).directive('toolsStyles', function (tools, $document, MAGIC_CONFIG) {

	  return {

	    restrict: 'E',
	    replace: true,
	    template: '<style scoped></style>',
	    scope: {
	      widget: '=?'
	    },
	    link: function link(scope, element, attrs) {

	      function append_styles() {
	        element[0].type = 'text/css';

	        var prefix = '.spm_wrapper';

	        var tools_config = MAGIC_CONFIG.tools || [];

	        var tools_styles = '';

	        _angular2.default.forEach(tools_config, function (tool) {

	          tools_styles += tools.stringify_widget_css(prefix, tool.styles);
	        });

	        if (element[0].styleSheet) {
	          element[0].styleSheet.cssText = tools_styles;
	        } else {
	          element[0].appendChild($document[0].createTextNode(tools_styles));
	        }
	      }

	      append_styles();
	    }

	  };
	});

	exports.default = Tools.name;

/***/ },
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Layout = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _layout = __webpack_require__(108);

	var _layout2 = _interopRequireDefault(_layout);

	__webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Layout = exports.Layout = _angular2.default.module('magic.tools.layout', []).directive('layout', function () {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	      widgets: '=?'
	    },
	    template: _layout2.default,
	    link: function link(scope, elm, attrs) {}
	  };
	});

	exports.default = Layout.name;

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "<div class=\"spm_tools_layout\">\n\n  <tools-styles></tools-styles>\n\n  <div class=\"widgets_list clearfix\">\n\n    <widget data-ng-repeat=\"widget in widgets\" data-widget=\"widget\"></widget>\n\n  </div>\n\n  <notifier></notifier>\n\n</div>";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(110);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(112)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./layout.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./layout.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(111)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_layout {\n  display: block;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .type_hidden {\n  visibility: hidden;\n  opacity: 0;\n}\n.spm_wrapper .alink {\n  position: relative;\n  cursor: pointer;\n  width: 160px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #FFFFFF;\n  font-size: 14px;\n  font-weight: 500;\n  background-color: #888888;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  transition: all 300ms ease;\n  display: inline-block;\n  text-align: center;\n}\n.spm_wrapper .bn_wrap {\n  width: 100%;\n  max-width: 1500px;\n  margin: auto;\n}\n.spm_wrapper .bn_wrap * {\n  margin: 0;\n}\n.spm_wrapper .bn_wrap .bns_about_page {\n  float: left;\n  width: 100%;\n  display: none;\n  position: relative;\n}\n.spm_wrapper .bn_wrap .bns_about_page .bns_about_close {\n  float: right;\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #FFFFFF;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -70px;\n  background-color: #A11636;\n  border: 0px;\n  border-bottom: 1px solid #000;\n  text-shadow: 0 0 1px #000000;\n  position: absolute;\n  right: 5%;\n  top: 30px;\n  z-index: 120;\n  text-align: center;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about {\n  float: left;\n  width: 100%;\n  -webkit-box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.2);\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about a {\n  float: left;\n  width: 25%;\n  padding: 20px 35px;\n  box-sizing: border-box;\n  white-space: nowrap;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about a.cycle-pager-active {\n  background-color: #893E90;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about a.cycle-pager-active span {\n  color: #fff;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about a img {\n  float: right;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about a span {\n  font-size: 18px;\n  color: #292929;\n  float: left;\n  margin-top: 10px;\n  max-width: 160px;\n  white-space: normal;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about_main .b_about_item {\n  float: left;\n  width: 100%;\n  padding: 35px 50px;\n  box-sizing: border-box;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about_main .b_about_item h3 {\n  font-family: 'RotondaC';\n  font-size: 30px;\n  font-weight: normal;\n  margin-bottom: 8px;\n}\n.spm_wrapper .bn_wrap .bns_about_page .b_about_main .b_about_item span {\n  color: #292929;\n  font-size: 14px;\n  line-height: 20px;\n}\n@media screen and (max-width: 1430px) {\n  .spm_wrapper .bn_wrap .bon_choice_main .bon_choice_cat {\n    width: 100%;\n    padding: 0;\n  }\n  .spm_wrapper .bn_wrap .top_main .top_text_main {\n    width: 80%;\n  }\n  .spm_wrapper .bn_wrap .bon_choice_main .bon_choice_cat a span {\n    width: 60%;\n  }\n}\n@media screen and (max-width: 1170px) {\n  .spm_wrapper .bn_wrap .bns_about_page .b_about a span {\n    max-width: 140px;\n  }\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .bn_wrap .bns_about_page .b_about a {\n    width: 50%;\n  }\n  .spm_wrapper .bn_wrap .bns_about_page .b_about a img {\n    float: right;\n  }\n}\n@media screen and (max-width: 650px) {\n  .spm_wrapper .bn_wrap .top_main {\n    background-size: cover;\n  }\n  .spm_wrapper .bn_wrap .top_main .top_text_white_bg span {\n    padding-right: 15px;\n  }\n  .spm_wrapper .bn_wrap .bns_about_page .b_about a {\n    width: 100%;\n  }\n  .spm_wrapper .bn_wrap .bns_about_page .b_about a img {\n    float: right;\n  }\n  .spm_wrapper .bn_wrap .bns_about_page .b_about_main .b_about_item h3 {\n    margin-top: 50px;\n  }\n  .spm_wrapper .bn_wrap .bon_choice_main .bon_choice_cat a {\n    width: 100%;\n  }\n  .spm_wrapper .bn_wrap .bon_choice_main .bon_item_main .arr_right {\n    width: 50px;\n    margin-right: -50px;\n  }\n  .spm_wrapper .bn_wrap .bon_choice_main .bon_item_main .arr_left {\n    width: 50px;\n    margin-left: -37px;\n  }\n  .spm_wrapper .bns_overlay {\n    overflow-y: auto;\n  }\n  .spm_wrapper .bns_overlay .bns_overlay_iner_tr_bg {\n    top: 5%;\n    margin-top: 0px !Important;\n  }\n  .spm_wrapper .bns_overlay .b_about a {\n    width: 49.5%;\n  }\n  .spm_wrapper .bns_overlay .b_about a span {\n    width: 80%;\n  }\n}\n@media screen and (max-width: 430px) {\n  .spm_wrapper .bn_wrap .top_main .top_text_main .top_text_purp_bg .top_text_item span {\n    line-height: 19px;\n    margin-top: 10px;\n  }\n  .spm_wrapper .bns_overlay .b_about a {\n    width: 100%;\n    border: 0;\n    margin: 0px;\n    height: auto;\n  }\n  .spm_wrapper .bns_overlay .b_about a span {\n    line-height: 65px;\n  }\n  .spm_wrapper .bns_overlay .b_about a img {\n    float: left;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n  .spm_wrapper .bns_overlay .b_about_main {\n    width: 100%;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 111 */
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
/* 112 */
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Widget = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _widget = __webpack_require__(114);

	var _widget2 = _interopRequireDefault(_widget);

	__webpack_require__(115);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Widget = exports.Widget = _angular2.default.module('magic.tools.widget', []).directive('widget', function ($compile, MagicWidget, $injector) {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	      widget: '='
	    },
	    template: _widget2.default,
	    link: function link(scope, elm, attrs) {

	      var widget_wrapper = _angular2.default.element(elm[0].querySelector('[data-widget-wrapper]'));
	      console.dir(widget_wrapper);

	      scope.$watch('widget', function (widget) {

	        if (!widget) return;

	        widget_wrapper.html('');

	        var WIDGET_CONFIG = MagicWidget.get_widget_config(widget.id);

	        if (!WIDGET_CONFIG) {
	          throw 'Widget with id: ' + widget.id + ' not registered!';
	        }

	        var widget_scope = scope.$new();

	        widget_scope.widget = widget;

	        WIDGET_CONFIG.controller.$inject = WIDGET_CONFIG.inject || [];

	        $injector.invoke(WIDGET_CONFIG.controller)(widget_scope, widget_wrapper, attrs);

	        widget_wrapper.append($compile(WIDGET_CONFIG.template)(widget_scope));
	      });
	    }
	  };
	}).directive('widgetStyle', function (tools, $document) {

	  return {

	    restrict: 'E',
	    replace: true,
	    template: '<style scoped></style>',
	    scope: {
	      widget: '=?'
	    },
	    link: function link(scope, element, attrs) {

	      scope.$watch('widget', function (widget) {
	        if (!widget) return;

	        element[0].type = 'text/css';

	        var prefix = '.spm_wrapper .spm_tools_widget' + (widget.id ? '.' + widget.id : '');

	        var css_string = tools.stringify_widget_css(prefix, widget.styles);

	        if (element[0].styleSheet) {
	          element[0].styleSheet.cssText = css_string;
	        } else {
	          element[0].appendChild($document[0].createTextNode(css_string));
	        }
	      });
	    }

	  };
	});

	exports.default = Widget.name;

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "<div class=\"spm_tools_widget  {{ widget.id }}\">\n  <widget-style data-widget=\"widget\"></widget-style>\n  <div data-widget-wrapper></div>\n</div>";

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(112)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./widget.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./widget.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(111)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .spm_tools_widget {\n  position: relative;\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n", ""]);

	// exports


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Notifier = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _notifier = __webpack_require__(118);

	var _notifier2 = _interopRequireDefault(_notifier);

	__webpack_require__(119);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Notifier = exports.Notifier = _angular2.default.module('magic.tools.notifier', []).directive('notifier', function (MAGIC_CONFIG) {

	  return {

	    restrict: 'E',
	    replace: true,
	    scope: true,
	    template: _notifier2.default,
	    link: function link(scope) {

	      scope._notifier_config = MAGIC_CONFIG.tools.notifier;

	      scope._tools = MAGIC_CONFIG.tools;

	      var new_data = {

	        header: '',
	        body: ''

	      };

	      scope.$on('notifier:notify', function (e, data) {

	        scope.data = data;
	        scope.show_notifier = true;
	        console.log('notifier: ' + data.body);
	      });

	      scope.reset_notifier = function () {
	        scope.data = _angular2.default.copy(new_data);
	        scope.show_notifier = false;
	      };

	      scope.reset_notifier();
	    }

	  };
	});

	exports.default = Notifier.name;

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "<div data-ng-cloak>\n  <magic-modal class=\"bns_overlay_notify\" data-show=\"show_notifier\">\n    <div>\n      <a href=\"#\" class=\"close_overlay\" data-ng-click=\"reset_notifier();$event.preventDefault();\"></a>\n      <h3 class=\"notifier_header\" data-ng-bind-html=\"data.header | to_trusted\"></h3>\n      <h4 class=\"notifier_body\" data-ng-bind-html=\"data.body | to_trusted\" style=\"margin: 20px 0;\"></h4>\n      <a class=\"notify_link button_primary\" data-ng-click=\"reset_notifier();$event.preventDefault();\">{{ _tools.buttons.texts.ok }}</a>\n    </div>\n  </magic-modal>\n</div>";

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(120);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(112)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./notifier.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./notifier.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(111)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bns_overlay_notify {\n  text-align: center;\n}\n.spm_wrapper .bns_overlay_notify.visible {\n  display: block !important;\n}\n.spm_wrapper .bns_overlay_notify .notify_link {\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #FFFFFF;\n  font-size: 14px;\n  font-weight: 500;\n  background-color: #A11636;\n  border: 0;\n  border-bottom: 1px solid #000;\n  text-shadow: 0 0 1px #000000;\n  text-align: center;\n  display: inline-block;\n  height: 35px;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Modal = undefined;

	var _angular = __webpack_require__(31);

	var _angular2 = _interopRequireDefault(_angular);

	var _modal = __webpack_require__(122);

	var _modal2 = _interopRequireDefault(_modal);

	__webpack_require__(123);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Modal = exports.Modal = _angular2.default.module('magic.tools.modal', []).directive('magicModal', function ($parse, tools, MAGIC_CONFIG) {

	  return {
	    restrict: 'E',
	    replace: true,
	    template: _modal2.default,
	    scope: {
	      config: '=?'
	    },
	    transclude: true,
	    link: function link(scope, elm, attrs) {

	      scope._modal_config = MAGIC_CONFIG.tools.modal;

	      scope.show = false;

	      scope.close = function () {
	        $parse(attrs.show).assign(scope.$parent, false);
	        scope.$eval(attrs.onClose);
	      };

	      elm.on('click', function (e) {
	        if (e.target === elm[0]) {
	          scope.$apply(function () {
	            scope.close();
	          });
	        }
	      });

	      scope.$watch(function () {
	        return _angular2.default.toJson([scope.$parent.$eval(attrs.show)]);
	      }, function () {
	        var new_value = scope.$parent.$eval(attrs.show);
	        scope.show = new_value;
	        tools.body_lock(new_value);
	      });
	    }
	  };
	});

	exports.default = Modal.name;

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "<div class=\"bns_overlay\" data-ng-class=\"{ visible: show }\" tabindex=\"-1\" role=\"dialog\">\n\n  <div class=\"bns_overlay_iner modal_container\" data-ng-style=\"{ background: _modal_config.styles.background }\">\n    <a href=\"#\" class=\"close_overlay\" data-ng-click=\"$event.preventDefault(); close();\" data-ng-style=\"{ backgroundImage: (_modal_config.images.close | background_image) }\"></a>\n    <ng-transclude></ng-transclude>\n\n  </div>\n\n</div>";

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(112)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./modal.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./modal.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(111)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper .bns_overlay {\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 10000;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: none;\n  overflow: auto;\n}\n.spm_wrapper .bns_overlay.visible {\n  display: block;\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-top: 5%;\n  margin-bottom: 5%;\n  width: 790px;\n  margin-left: auto;\n  margin-right: auto;\n  background-color: #fff;\n  padding: 40px 40px;\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner.bns_overlay_iner_tr_bg {\n  padding: 0;\n  background-color: transparent;\n  margin-top: -275px;\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner h3 {\n  font-size: 30px;\n  float: left;\n  width: 100%;\n  margin: 0;\n  font-family: 'RotondaC';\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner h3 b {\n  float: right;\n  font-size: 16px;\n  font-family: 'Roboto', sans-serif;\n  color: #893E90;\n  line-height: 33px;\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner h4 {\n  float: left;\n  width: 100%;\n  font-size: 14px;\n  color: #242424;\n  opacity: 0.5;\n  margin-top: 3px;\n}\n.spm_wrapper .bns_overlay .bns_overlay_iner .close_overlay {\n  position: absolute;\n  right: -30px;\n  top: 0px;\n  width: 17px;\n  height: 17px;\n  display: block;\n}\n.spm_wrapper .bns_overlay .b_about {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .bns_overlay .b_about a {\n  float: left;\n  width: 24.5%;\n  height: 241px;\n  background-color: #fff;\n  text-align: center;\n  margin: 1px;\n}\n.spm_wrapper .bns_overlay .b_about a.cycle-pager-active {\n  background-color: #893E90;\n}\n.spm_wrapper .bns_overlay .b_about a.cycle-pager-active span {\n  opacity: 1;\n  color: #fff;\n}\n.spm_wrapper .bns_overlay .b_about a img {\n  margin-top: 40px;\n  margin-bottom: 30px;\n  border-radius: 100%;\n  border-top: 3px solid #D6D6D6;\n  background-color: #EDEDED;\n}\n.spm_wrapper .bns_overlay .b_about a span {\n  width: 70%;\n  text-align: center;\n  display: inline-block;\n  font-size: 17px;\n  line-height: 24px;\n  color: #292929;\n  opacity: 0.5;\n}\n.spm_wrapper .bns_overlay .b_about_main {\n  float: left;\n  width: 99%;\n  padding: 35px 50px 0px;\n  background-color: #fff;\n  box-sizing: border-box;\n}\n.spm_wrapper .bns_overlay .b_about_main .b_about_item {\n  float: left;\n  width: 100%;\n  padding: 35px 50px 0px;\n  box-sizing: border-box;\n}\n.spm_wrapper .bns_overlay .b_about_main .b_about_item h3 {\n  font-family: 'RotondaC';\n  font-size: 30px;\n  font-weight: normal;\n  margin-bottom: 8px;\n}\n.spm_wrapper .bns_overlay .b_about_main .b_about_item span {\n  color: #292929;\n  font-size: 14px;\n  line-height: 20px;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px), only screen and (max-width: 529px) {\n  .spm_wrapper .bns_overlay .bns_overlay_iner {\n    width: 100% !important;\n    box-sizing: border-box;\n    margin-top: 40px;\n    margin-bottom: 40px;\n  }\n  .spm_wrapper .bns_overlay .bns_overlay_iner .close_overlay {\n    right: 30px;\n    top: -30px;\n  }\n}\n.spm_wrapper .mb_popup {\n  display: block;\n  width: 100%;\n  float: left;\n}\n.spm_wrapper .mb_popup .mb_popup_top {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .mb_popup .mb_popup_top span {\n  float: left;\n  color: #222222;\n  font-size: 24px;\n  line-height: 100%;\n}\n.spm_wrapper .mb_popup .mb_popup_main_mt {\n  margin-top: 40px;\n}\n.spm_wrapper .mb_popup .mb_popup_main {\n  float: left;\n  width: 100%;\n}\n.spm_wrapper .mb_popup .mb_popup_main .numb_qust {\n  float: left;\n  width: 100%;\n  padding-left: 45px;\n  color: #222222;\n  font-size: 14px;\n  opacity: 0.5;\n  box-sizing: border-box;\n  margin-top: 40px;\n  margin-bottom: 10px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .qust {\n  float: left;\n  width: 100%;\n  box-sizing: border-box;\n  padding-left: 45px;\n  color: #222222;\n  font-size: 16px;\n  margin-bottom: 25px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item {\n  float: left;\n  width: 100%;\n  padding-left: 45px;\n  box-sizing: border-box;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item input {\n  display: none;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item input:checked + label:before {\n  background-color: #444444;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item label {\n  padding-left: 45px;\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  line-height: 24px;\n  float: left;\n  margin-bottom: 18px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item label:before {\n  content: '';\n  display: block;\n  width: 24px;\n  height: 24px;\n  background-color: #cccccc;\n  border-radius: 100%;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_item label.type_checkbox:before {\n  border-radius: 0;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_text {\n  float: left;\n  width: 100%;\n  box-sizing: border-box;\n  margin-top: 20px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_text input[type=\"text\"] {\n  float: left;\n  height: 57px;\n  border: 0;\n  border-top: 2px solid #cccccc;\n  border-radius: 5px;\n  padding-left: 25px;\n  width: 100%;\n  font-size: 18px;\n  outline: none;\n  box-sizing: border-box;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_text input[type=\"submit\"] {\n  float: right;\n  width: 140px;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  margin-left: -70px;\n  background-color: #888888;\n  border: 0px;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  margin-right: 45px;\n  margin-top: 12px;\n}\n.spm_wrapper .mb_popup .mb_popup_main .answ_text input[type=\"submit\"][disabled] {\n  opacity: .5;\n}\n", ""]);

	// exports


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(126);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(112)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./theme.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./theme.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(111)();
	// imports


	// module
	exports.push([module.id, ".spm_wrapper {\n  /* Eric Meyer's CSS Reset */\n  /* HTML5 display-role reset for older browsers */\n  /* End of Eric Meyer's CSS Reset */\n}\n.spm_wrapper html,\n.spm_wrapper body,\n.spm_wrapper div,\n.spm_wrapper span,\n.spm_wrapper applet,\n.spm_wrapper object,\n.spm_wrapper iframe,\n.spm_wrapper h1,\n.spm_wrapper h2,\n.spm_wrapper h3,\n.spm_wrapper h4,\n.spm_wrapper h5,\n.spm_wrapper h6,\n.spm_wrapper p,\n.spm_wrapper blockquote,\n.spm_wrapper pre,\n.spm_wrapper a,\n.spm_wrapper abbr,\n.spm_wrapper acronym,\n.spm_wrapper address,\n.spm_wrapper big,\n.spm_wrapper cite,\n.spm_wrapper code,\n.spm_wrapper del,\n.spm_wrapper dfn,\n.spm_wrapper em,\n.spm_wrapper img,\n.spm_wrapper ins,\n.spm_wrapper kbd,\n.spm_wrapper q,\n.spm_wrapper s,\n.spm_wrapper samp,\n.spm_wrapper small,\n.spm_wrapper strike,\n.spm_wrapper strong,\n.spm_wrapper sub,\n.spm_wrapper sup,\n.spm_wrapper tt,\n.spm_wrapper var,\n.spm_wrapper b,\n.spm_wrapper u,\n.spm_wrapper i,\n.spm_wrapper center,\n.spm_wrapper dl,\n.spm_wrapper dt,\n.spm_wrapper dd,\n.spm_wrapper ol,\n.spm_wrapper ul,\n.spm_wrapper li,\n.spm_wrapper fieldset,\n.spm_wrapper form,\n.spm_wrapper label,\n.spm_wrapper legend,\n.spm_wrapper table,\n.spm_wrapper caption,\n.spm_wrapper tbody,\n.spm_wrapper tfoot,\n.spm_wrapper thead,\n.spm_wrapper tr,\n.spm_wrapper th,\n.spm_wrapper td,\n.spm_wrapper article,\n.spm_wrapper aside,\n.spm_wrapper canvas,\n.spm_wrapper details,\n.spm_wrapper embed,\n.spm_wrapper figure,\n.spm_wrapper figcaption,\n.spm_wrapper footer,\n.spm_wrapper header,\n.spm_wrapper hgroup,\n.spm_wrapper menu,\n.spm_wrapper nav,\n.spm_wrapper output,\n.spm_wrapper ruby,\n.spm_wrapper section,\n.spm_wrapper summary,\n.spm_wrapper time,\n.spm_wrapper mark,\n.spm_wrapper audio,\n.spm_wrapper video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n.spm_wrapper article,\n.spm_wrapper aside,\n.spm_wrapper details,\n.spm_wrapper figcaption,\n.spm_wrapper figure,\n.spm_wrapper footer,\n.spm_wrapper header,\n.spm_wrapper hgroup,\n.spm_wrapper menu,\n.spm_wrapper nav,\n.spm_wrapper section {\n  display: block;\n}\n.spm_wrapper body {\n  line-height: 1;\n}\n.spm_wrapper ol,\n.spm_wrapper ul {\n  list-style: none;\n}\n.spm_wrapper blockquote,\n.spm_wrapper q {\n  quotes: none;\n}\n.spm_wrapper blockquote:before,\n.spm_wrapper blockquote:after,\n.spm_wrapper q:before,\n.spm_wrapper q:after {\n  content: '';\n  content: none;\n}\n.spm_wrapper table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.spm_wrapper article,\n.spm_wrapper aside,\n.spm_wrapper details,\n.spm_wrapper figcaption,\n.spm_wrapper figure,\n.spm_wrapper footer,\n.spm_wrapper header,\n.spm_wrapper hgroup,\n.spm_wrapper main,\n.spm_wrapper nav,\n.spm_wrapper section,\n.spm_wrapper summary {\n  display: block;\n}\n.spm_wrapper .sp_btn {\n  display: inline-block;\n  outline: none;\n  width: auto;\n  line-height: 35px;\n  text-decoration: none;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 500;\n  background-color: #888888;\n  border: 0;\n  border-bottom: 1px solid #000000;\n  text-shadow: 0 0 1px #000000;\n  margin-right: 45px;\n  margin-top: 12px;\n  white-space: nowrap;\n  padding-left: 20px;\n  padding-right: 20px;\n  cursor: pointer;\n}\n.spm_wrapper .sp_btn:hover {\n  background-color: #7b7b7b;\n}\n.spm_wrapper .sp_btn[disabled] {\n  opacity: .5;\n}\n.spm_wrapper .magic_select {\n  background-repeat: no-repeat;\n  background-size: 50px 50px;\n  background-position: top right;\n  overflow: hidden;\n  width: 100%;\n  float: left;\n  height: 57px;\n  border: 0;\n  border-top: 2px solid #cccccc;\n  border-radius: 5px;\n  padding-left: 25px;\n  font-size: 18px;\n  outline: none;\n  box-sizing: border-box;\n  background-color: #ffffff;\n  position: relative;\n  display: inline-block;\n}\n.spm_wrapper .magic_select select {\n  position: absolute;\n  background: transparent;\n  border: none;\n  height: 100%;\n  width: 100%;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: inherit;\n  outline: none;\n  -webkit-appearance: none;\n  box-shadow: none;\n  background-image: none;\n}\n.spm_wrapper .form_field {\n  float: left;\n  width: 50%;\n  padding-bottom: 20px;\n  padding-right: 40px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.spm_wrapper .form_field .form_label {\n  width: 100%;\n  line-height: 100%;\n  color: #222222;\n  font-size: 16px;\n  float: left;\n}\n.spm_wrapper .form_field .form_input[type=\"text\"],\n.spm_wrapper .form_field .form_input[type=\"email\"] {\n  background-color: #ffffff;\n  float: left;\n  height: 57px;\n  border: 0;\n  border-top: 2px solid #cccccc;\n  border-radius: 5px;\n  padding-left: 25px;\n  width: 100%;\n  font-size: 18px;\n  outline: none;\n  box-sizing: border-box;\n}\n@media only screen and (min-width: 530px) and (max-width: 949px), only screen and (max-width: 529px) {\n  .spm_wrapper .form_field {\n    width: 100%;\n    padding: 0 0 20px 0;\n  }\n}\n.spm_wrapper .overflow_hidden {\n  overflow: hidden;\n}\n.spm_wrapper .clearfix:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.spm_wrapper .transparent {\n  opacity: 0;\n}\n.spm_wrapper {\n  font-family: 'Roboto', sans-serif;\n}\n", ""]);

	// exports


/***/ }
])
});
;