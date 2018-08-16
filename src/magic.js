import SAILPLAY from 'sailplay-hub';
import 'sailplay-hub-actions/sailplay.hub.actions';
import angular from 'angular';
import SailPlay from './sailplay/sailplay';
import core, { Core } from './core/core';
import Cookies from 'angular-cookie';
import NgTouch from 'angular-touch';
import Tools from './tools/tools';
import { WidgetRegister } from '@core/widget'
import DynamicLocale from 'angular-dynamic-locale';
// import NgLocale from 'angular-i18n';

import './theme/theme.less';

export let magic = angular.module('magic', [SailPlay, core, Cookies, Tools, NgTouch, DynamicLocale])

  .config(function (SailPlayProvider, MAGIC_CONFIG, SailPlayHistoryProvider, SailPlayActionsDataProvider, tmhDynamicLocaleProvider, LANG) {

    //set path for locales
    tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.7.0/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.defaultLocale(LANG);

    //authorization configurations
    if (MAGIC_CONFIG.auth) {

      SailPlayProvider.set_auth_hash_id(MAGIC_CONFIG.auth.auth_hash_id);

      SailPlayProvider.set_remote_config(MAGIC_CONFIG.auth.config || {
        background: 'transparent'
      });

      SailPlayProvider.set_auth_type(MAGIC_CONFIG.auth.type || 'cookie');

    }

    //apply data from config
    if (MAGIC_CONFIG.data) {

      SailPlayActionsDataProvider.set_actions_data(MAGIC_CONFIG.data.actions);
      SailPlayHistoryProvider.set_dictionary(MAGIC_CONFIG.data.history);

    }


  })

  .directive('sailplayMagic', function (SailPlay, ipCookie, SailPlayApi, $document, $rootScope, MAGIC_CONFIG) {

    const MagicTemplate = [
      '<div class="spm_wrapper spm-iso">',
      '<layout data-widgets="config.widgets"></layout>',
      '</div>'
    ].join('');

    return {
      restrict: 'E',
      replace: true,
      scope: {
        config: '=?'
      },
      template: MagicTemplate,
      link: function (scope) {

        scope.config = scope.config || MAGIC_CONFIG;

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
          }
          else {
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

          if (res.status === 'ok' && res.tags && res.tags.length && res.tags[0].exist) {

            scope.show_profile_action = false;
            scope.$apply();

          }

        });

        scope.gift_points_notify = function () {
          $rootScope.$broadcast('notifier:notify', { header: '', body: 'You do not currently have enough points to redeem this gift. Earn additional points by staying with us or taking the actions below!' });
        };

        scope.has_avatar = function () {

          let has_avatar = false;

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
    }

  });

//define magic class
export default class Magic {

  constructor(config) {

    config = config || {};

    SAILPLAY.send('init', config);

    SAILPLAY.on('init.success', (res) => {

      if (this.inited) return;

      SAILPLAY.send('magic.config', config.config);

    });

    SAILPLAY.on('magic.config.success', (res_config) => {

      if (this.inited || !res_config.config || !res_config.config.config.$MAGIC) return;

      Core.constant('MAGIC_CONFIG_DATA', res_config.config);

      Core.constant('MAGIC_CONFIG', res_config.config.config.$MAGIC);

      Core.constant('LANG', config.lang || 'en');

      const app_container = config.root || document.getElementsByTagName('sailplay-magic')[0];

      app_container && angular.bootstrap(app_container, [magic.name]);

      this.inited = true;

    });

    SAILPLAY.on('magic.config.error', () => {
      alert(`Cannot load config with name: ${config.config}`);
    });

    //public reference to main angular module
    this.module = magic;

    //store inited property for disable reinit
    this.inited = false;

  }

  //public method for authorize
  authorize() {

  }

  static Widget = WidgetRegister;

  static version = '${MAGIC_VERSION}';

}

//extend SAILPLAY with Magic class
SAILPLAY.Magic = SAILPLAY.Magic || Magic;