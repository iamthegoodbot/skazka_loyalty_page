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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function compare_versions(v1, v2, options) {
	  var lexicographical = options && options.lexicographical,
	      zeroExtend = options && options.zeroExtend,
	      v1parts = v1.split('.'),
	      v2parts = v2.split('.');

	  function isValidPart(x) {
	    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	  }

	  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
	    return NaN;
	  }

	  if (zeroExtend) {
	    while (v1parts.length < v2parts.length) {
	      v1parts.push("0");
	    }while (v2parts.length < v1parts.length) {
	      v2parts.push("0");
	    }
	  }

	  if (!lexicographical) {
	    v1parts = v1parts.map(Number);
	    v2parts = v2parts.map(Number);
	  }

	  for (var i = 0; i < v1parts.length; ++i) {
	    if (v2parts.length == i) {
	      return 1;
	    }

	    if (v1parts[i] == v2parts[i]) {
	      continue;
	    } else if (v1parts[i] > v2parts[i]) {
	      return 1;
	    } else {
	      return -1;
	    }
	  }

	  if (v1parts.length != v2parts.length) {
	    return -1;
	  }

	  return 0;
	}

	var Migrator = {

	  version: '2.1.14',

	  migrations: [],

	  migrate: function migrate(config, version_from, version_to) {

	    console.log(config);

	    console.log(version_from, version_to);

	    var direction = compare_versions(version_to, version_from);
	    console.log('direction: ', direction);

	    var required_migrations = [];

	    switch (direction) {
	      case 1:
	        required_migrations = Migrator.migrations.filter(function (migration) {
	          return compare_versions(migration.version, version_from) > 0 && compare_versions(migration.version, version_to) <= 0;
	        }).sort(function (migration_a, migration_b) {
	          return compare_versions(migration_a.version, migration_b.version);
	        });
	        required_migrations.forEach(function (migration) {
	          try {
	            migration.up && migration.up(config);
	          } catch (err) {
	            console.log(err);
	          }
	        });
	        break;
	      case -1:
	        required_migrations = Migrator.migrations.filter(function (migration) {
	          return compare_versions(migration.version, version_from) <= 0 && compare_versions(migration.version, version_to) > 0;
	        }).sort(function (migration_a, migration_b) {
	          return compare_versions(migration_b.version, migration_a.version);
	        });
	        required_migrations.forEach(function (migration) {
	          try {
	            migration.down && migration.down(config);
	          } catch (err) {
	            console.log(err);
	          }
	        });
	        break;
	    }

	    console.log(required_migrations);

	    return config;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(1);

	var _migrator2 = _interopRequireDefault(_migrator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_migrator2.default.create({

	  //required param version
	  version: '1.0.0'

	});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(1);

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
	  },

	  down: function down(config) {

	    //redo status widget

	    var status_widgets = config.$MAGIC.widgets.filter(function (widget) {
	      return widget.id === 'statuses';
	    });

	    status_widgets.forEach(function (widget) {
	      delete widget.styles['next_status_info'];
	    });

	    //redo date form styles
	    var date_input_styles = config.$MAGIC.tools.forms.styles['form_date span'];

	    if (date_input_styles) {
	      delete config.$MAGIC.tools.forms.styles['form_date select'];
	    }

	    //migrate ids to names
	    config.widgets && config.widgets.forEach(function (widget) {

	      widget.id = widget.name;

	      delete widget.name;
	    });

	    //redo move old properties from global to $MAGIC
	    ["auth", "widgets", "tools", "data"].forEach(function (prop) {
	      config[prop] = config.$MAGIC[prop];
	      delete config.$MAGIC[prop];
	    });

	    //delete new property for magic config
	    delete config.$MAGIC;
	  }

	});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _migrator = __webpack_require__(1);

	var _migrator2 = _interopRequireDefault(_migrator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_migrator2.default.create({

	  //required param version
	  version: '2.0.1'

	});

/***/ })
/******/ ])
});
;