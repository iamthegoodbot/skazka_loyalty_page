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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	module.exports = __webpack_require__(182);


/***/ },

/***/ 179:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function migration_steps(version_from, version_to) {}

	var Migrator = {

	  migrations: [],

	  migrate: function migrate(config, to_version) {

	    var migration_config = Migrator.migrations.filter(function (m_config) {
	      return to_version === m_config.version;
	    });
	  },

	  create: function create(config) {
	    Migrator.migrations.push(config);
	  }

	};

	if (typeof window !== 'undefined') {

	  window.SAILPLAY = window.SAILPLAY || {};

	  window.SAILPLAY.MagicMigrator = Migrator;
	}

	exports.default = Migrator;

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(179);

	var _migrator2 = _interopRequireDefault(_migrator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_migrator2.default.create({

	  //required param version
	  version: '1.0.0'

	});

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(179);

	var _migrator2 = _interopRequireDefault(_migrator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_migrator2.default.create({

	  //required param version
	  version: '2.0.0',

	  //this function ups version of config
	  up: function up(config) {

	    //migrate names to ids
	    config.widgets && config.widgets.forEach(function (widget) {

	      widget.id = widget.name;

	      delete widget.name;
	    });

	    //add new property for magic config
	    config.$MAGIC = {};

	    //move old properties from global to $MAGIC
	    ["auth", "widgets", "tools", "data"].forEach(function (prop) {
	      config.$MAGIC[prop] = config[prop];
	      delete config[prop];
	    });

	    //add version to config
	    config.$MAGIC.version = version;

	    //update date form styles
	    var date_input_styles = config.$MAGIC.tools.forms.styles['form_date span'];

	    if (date_input_styles) {
	      config.$MAGIC.tools.forms.styles['form_date select'] = date_input_styles;
	    }

	    //update status widget
	    var status_widgets = config.$MAGIC.widgets.filter(function (widget) {
	      return widget.id === 'statuses';
	    });

	    status_widgets.forEach(function (widget) {
	      widget.styles['next_status_info'] = {
	        "display": "none"
	      };
	    });
	  }

	});

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(179);

	var _migrator2 = _interopRequireDefault(_migrator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_migrator2.default.create({

	  //required param version
	  version: '2.0.1'

	});

/***/ }

/******/ })
});
;