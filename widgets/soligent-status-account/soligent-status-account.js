import {WidgetRegister} from '@core/widget';
import SoligentStatusAccountTmpl from './soligent-status-account.html';
import './soligent-status-account.less';

WidgetRegister({

  id: 'soligent-status-account',
  template: SoligentStatusAccountTmpl,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    'MAGIC_CONFIG',
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope, MAGIC_CONFIG) {

    return function (scope, elm, attrs) {

      // User model
      scope.user = SailPlayApi.data('load.user.info');

      // Account model
      scope.variables = {};

      // Current status model
      scope.current_status = null;

      // Next status model
      scope.next_status = MAGIC_CONFIG.data.status && MAGIC_CONFIG.data.status.list && MAGIC_CONFIG.data.status.list[0];

      scope.$watch(() => {
        return angular.toJson([scope.user()]);
      }, (new_val, old_val) => {
        if (new_val && new_val != old_val) {

          if (!MAGIC_CONFIG.data.status || !MAGIC_CONFIG.data.status.list || !scope.user().user_status || !scope.user().user_status.name) return false;

          for (let i = 0, len = MAGIC_CONFIG.data.status.length; i < len; i++) {
            if (MAGIC_CONFIG.data.status[i] == scope.user().user_status.name) {
              scope.current_status = MAGIC_CONFIG.data.status[i];
              scope.next_status = MAGIC_CONFIG.data.status[i + 1];
              break;
            }
          }

        }

      });

    };

  }

});