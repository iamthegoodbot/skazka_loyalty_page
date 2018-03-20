(function() {
  var VERSION = "0.0.1";
  //simple jsonp service
  var JSONP = {
    currentScript: null,
    get: function(url, data, success, error) {
      var src = url + (url.indexOf("?") + 1 ? "&" : "?");
      var head = document.getElementsByTagName("head")[0];
      var newScript = document.createElement("script");
      var params = [];

      data = data || {};

      window.JSONP_CALLBACK = window.JSONP_CALLBACK || {};

      var callback_name =
        "sailplay_" +
        new Date().getTime() +
        Math.random()
          .toString()
          .replace(".", "");

      var jsonpTimeout = setTimeout(function() {
        try {
          head.removeChild(newScript);
        } catch (err) {}
        delete window.JSONP_CALLBACK[callback_name];
      }, 10000);

      window.JSONP_CALLBACK[callback_name] = function(data) {
        clearTimeout(jsonpTimeout);
        try {
          head.removeChild(newScript);
        } catch (err) {}
        delete window.JSONP_CALLBACK[callback_name];
        success && success(data);
      };

      data["callback"] = "JSONP_CALLBACK." + callback_name;

      for (var param_name in data) {
        params.push(param_name + "=" + encodeURIComponent(data[param_name]));
      }
      src += params.join("&");

      newScript.type = "text/javascript";
      newScript.src = src;
      newScript.onerror = function(ex) {
        try {
          head.removeChild(newScript);
        } catch (err) {}
        delete window.JSONP_CALLBACK[callback_name];
        error && error(ex);
      };

      head.insertBefore(newScript, head.firstChild);
    },
    success: null
  };

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      var s;
      s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function SPBundleLoader(options) {
    var self = this;
    self.version = VERSION;

    if (!options || !options.partner_id) {
      console.error('"partner_id" is not provided');
      return;
    }

    var _options = {
      domain: "http://sailplay.net/",
      partner_id: options.partner_id,
      config_name: options.config_name || "default"
    };

    if (options.domain) {
      _domain = options.domain;
      if (_domain[_domain.length - 1] == "/") {
        _domain += "/";
      }
      var protocol = "http://";
      if (_domain.indexOf("http://") === 0) {
        _domain.replace("http://", protocol);
      }
      if (_domain.indexOf("//") === 0) {
        _domain.replace("//", protocol);
      }
      if (_domain.indexOf(protocol) !== 0) {
        _domain = protocol + _domain;
      }
      _options.domain = _domain;
    }

    var url =
      _options.domain +
      "/js-api/" +
      _options.partner_id +
      "/loyalty-page/config/by-name/";
    var request_params = {
      name: _options.config_name
    };
    var on_success = function(response) {
      console.log("response", response);
      if (
        response &&
        response.config &&
        response.config.config &&
        response.config.config["$MAGIC_LOADER_CONFIG"]
      ) {
        var loader_config = response.config.config["$MAGIC_LOADER_CONFIG"];

        var files = {
          js: [],
          html: [],
          template: []
        };

        // Loading scripts
        loadScript(loader_config.core).then(
          function() {
            console.log("All scripts files has loaded");
            var initialParams = {
              partner_id: _options.partner_id,
              domain: _options.domain,
              lang: _options.lang,
              config: _options.config_name
            };
            self.app = new SAILPLAY.Magic(initialParams);
          },
          function() {
            console.error("Error loading file");
          }
        );
      } else {
        console.error("$MAGIC_LOADER_CONFIG is not provided");
      }
    };
    JSONP.get(url, request_params, on_success);
  }

  window.SPBundleLoader = SPBundleLoader;
})();