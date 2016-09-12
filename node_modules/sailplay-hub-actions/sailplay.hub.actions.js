(function () {

  if(typeof window.SAILPLAY === 'undefined'){
    console.log('Can\'t find main SAILPLAY module');
    return;
  }

  var sp = window.SAILPLAY;

  var JSONP = sp.jsonp;

  var _actions_config = false;

  sp.actions = {};

  sp.actions.config = function(){
    return _actions_config;
  };

  //ACTIONS SECTION

  //LOAD ACTIONS LIST
  sp.on('load.actions.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.load, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        _actions_config = res.data;
        sp.send('load.actions.list.success', res.data);
      } else {
        sp.send('load.actions.list.error', res);
      }
    });
  });

  //LOAD ACTIONS LIST
  sp.on('load.actions.custom.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.custom.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.actions.custom.list.success', res.actions);
      } else {
        sp.send('load.actions.custom.list.error', res);
      }
    });
  });

  sp.on('set.actions.list', function (actions) {
    _actions_config = actions;
  });

  //PERFORM ACTION

  sp.actions.parse = function(dom, action){

    if(!sp.is_dom(dom)) {
      console.error('sp.actions.parse() need DOM element as first parameter');
      return;
    }

    if(!action) {
      console.error('sp.actions.parse() need Action object as second parameter');
      return;
    }

    if(!_actions_config.connectedAccounts && !action.force) {

      console.error('sp.actions.parse() must execute after event load.actions.list.success');
      return;

    }

    if(!action.socialType){

      //console.dir(action);
      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

      return;

    }

    if(sp.config().platform === 'mobile' && action.socialType){

      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

    }

    else {

      parse_frame();

    }

    function parse_frame(){
      var styles = dom.getAttribute('data-styles');
      var text = dom.getAttribute('data-text');

      var action_frame = document.createElement('IFRAME');
      action_frame.style.border = 'none';
      action_frame.style.width = '150px';
      action_frame.style.height = '30px';
      action_frame.style.background = 'transparent';
      action_frame.style.overflow = 'hidden';
      action_frame.setAttribute('scrolling', 'no');

      var account_connected = action.force ? true : (_actions_config.connectedAccounts[action.socialType] || false);

      action_frame.className = [ 'sailplay_action_frame', (action.socialType || ''),  (action.action || ''), (account_connected ? 'account_connected' : '')].join(' ');

      function EncodeQueryData(data)
      {
        var ret = [];
        for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
      }

      var frame_params = {
        auth_hash: sp.config().auth_hash,
        socialType: action.socialType,
        action: action.action,
        link: action.shortLink,
        pic: (action.pic || _actions_config.partnerCustomPic || sp.config().partner.logo),
        msg: (action.msg || _actions_config.messages[action.action] || sp.config().partner.name),
        account_connected: account_connected,
        force: action.force
      };

      if(action['_actionId']) frame_params._actionId = action._actionId;
      if(styles) frame_params.styles = styles;
      if(text) frame_params.text = text;

      if (action.action == 'purchase') {
        frame_params.purchasePublicKey = _actions_config.purchasePublicKey;
      }

      if (action.action == 'badge') {
        frame_params.badgeId= action.badgeId;
      }

      action_frame.src = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/v2/?' + EncodeQueryData(frame_params);
      dom.innerHTML = '';
      dom.appendChild(action_frame);

      action_frame.onload = function() {
        sp.send('actions.parse.success', action);
      };

      //gp speciefied config

    }



  };

  sp.on('actions.parse', function (actions) {

    if(sp.config() == {}){
      return;
    }

    if(actions && Array.isArray(actions)) {
      Actions.social_init(actions);
    }
    else {
      sp.send('actions.parse.error', { message: 'Actions list needed' });
    }

  });

  // SOCIAL GOOGLE PLUS CHANGE HEIGHT
  sp.on('actions.social.gp.like.mouseenter', function(){
    var elms = document.querySelectorAll('iframe[iframe-action-gp-like], iframe.gp.like');
    var originWidth,
      w,
      h = 500;
    for(var i = 0, len = elms.length; i < len; i++){
      elms[i].removeAttribute("style");
      originWidth = elms[i].parentNode. offsetWidth;
      w = +originWidth + 70;
      elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;margin-left: -35px !important;z-index: 10 !important;';
      elms[i].parentNode.style.setProperty ("overflow", "visible", "important");
    }
  });

  sp.on('actions.social.gp.like.mouseleave', function(){
    var elms = document.querySelectorAll('iframe[iframe-action-gp-like], iframe.gp.like');
    var w = 150,
      h = 27;
    for(var i = 0, len = elms.length; i < len; i++){
      elms[i].removeAttribute("style");
      elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;margin-left: auto !important;';
      elms[i].parentNode.style.setProperty ("overflow", "hidden", "important");
    }
  });

  var Actions = {};

  Actions.social_init = function(actions){

    var social_buttons = document.querySelectorAll('[data-sp-action]');

    for(var i = 0; i < social_buttons.length; i+=1) {

      (function(){
        var btn = social_buttons[i];
        var action_id = Number(btn.getAttribute('data-sp-action'));
        var action = sp.find_by_properties((actions || _actions_config.actions), { _actionId: action_id })[0];
        sp.actions.parse(btn, action);
      }());

    }

  };

  //actions v1 section

  Actions.openSocialRegNeedPopup = function (action) {
    var w;
    if (action.socialType == 'vk')
      w = Actions.popupWindow(_actions_config.social.vk.authUrl, 'social_reg', 840, 400);
    else
      w = Actions.popupWindow(_actions_config.social[action.socialType].authUrl, 'social_reg');

    var checkPopupInterval = setInterval(function () {
      if (w == null || w.closed) {
        sp.send('actions.social.connect.complete');
        clearInterval(checkPopupInterval);
      }
    }, 100);

  };

  Actions.popupWindow = function (url, title, w, h) {
    var width, height, left, top;
    if (w !== undefined && h !== undefined) {
      width = w;
      height = h;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
    } else {
      width = screen.width / 2;
      height = screen.height / 2;
      left = width - (width / 2);
      top = height - (height / 2);
    }

    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

  };

  Actions.share = function (action) {

    var frameUrl = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/?auth_hash=' + sp.config().auth_hash;
    frameUrl += '&socialType=' + action.socialType + '&action=' + action.action + '&link=' + action.shortLink + '&pic=' + (_actions_config.partnerCustomPic ? _actions_config.partnerCustomPic : sp.config().partner.logo);

    frameUrl += '&msg=' + _actions_config.messages[action.action];
    frameUrl += '&_actionId=' + action['_actionId'];

    if (action.action == 'purchase') {
      frameUrl += '&purchasePublicKey=' + _actions_config.purchasePublicKey;
    }

    var socialFrame = Actions.popupWindow(frameUrl, 'social_action', 200, 210);
    var checkPopupInterval = setInterval(function () {
      if (socialFrame == null || socialFrame.closed) {
        sp.send('actions.perform.complete', action);
        clearInterval(checkPopupInterval);
      }
    }, 200);

  };

  Actions.perform = function(action){

    if(sp.config().platform === 'mobile') {

      end_share(action);
      return;

    }

    sp.send('actions.perform.start', action);

    if (action.socialType && _actions_config.connectedAccounts) {
      if (!_actions_config.connectedAccounts[action.socialType]) {
        Actions.openSocialRegNeedPopup(action);
      } else {
        Actions.share(action);
      }
    }
    else if(!action.socialType){
      var frameUrl = sp.config().DOMAIN + '/popup/' + sp.config().partner.id + '/widgets/custom/' + action.type  + '/?auth_hash=' + sp.config().auth_hash;
      frameUrl += '&lang=' + sp.config().lang;
      frameUrl += '&from_sdk=0';
      var actionFrame = Actions.popupWindow(frameUrl, 'SailPlay', 600, 400);
      var checkPopupInterval = setInterval(function () {
        if (actionFrame == null || actionFrame.closed) {
          sp.send('actions.perform.complete', action);
          clearInterval(checkPopupInterval);
        }
      }, 200);
    }

  };

  sp.on('actions.perform', function (action, callback) {
    if(sp.config() == {}){
      return;
    }
    if (sp.config().auth_hash) {
      Actions.perform(action, callback);
    } else {
      sp.send('actions.perform.auth.error', action);
    }
  });

  function repair_pic_url(url){
    console.log(url);
    if(/^((http|https|ftp):\/\/)/.test(url)){
      return url;
    }
    if(url.indexOf('//') === 0){
      return window.location.protocol + url;
    }
    else {
      return sp.config().DOMAIN + url;
    }
  }

  function end_share(action){

    var handle_params = {
      partner_id: sp.config().partner.id,
      social_type: action.socialType,
      action: action.action,
      purchase_public_key: _actions_config.purchasePublicKey || '',
      badge_id: action.badgeId || '',
      auth_hash: sp.config().auth_hash,
      platform: sp.config().platform
    };

    sp.jsonp.get(sp.config().DOMAIN + sp.config().urls.actions.handle_social_action, handle_params,

      function(res){
        sp.send('actions.perform.success', { response: res, action: action });
      },
      function(res){
        sp.send('actions.perform.error', { error: res, action: action });
      })

  }


}());
