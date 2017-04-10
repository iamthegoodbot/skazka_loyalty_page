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
      scope.soligent_status = {
        show: false,
        openStatus: function(state) {
          scope.soligent_status.show = state || false;
        }
      }

      // Account model
      scope.variables = {
        sales_rep: '',
        sales_rep_phone: '',
        sales_rep_email: ''
      };

      // Current status model
      scope.current_status = null;

      // Next status model
      scope.next_status = MAGIC_CONFIG.data.status && MAGIC_CONFIG.data.status.list && MAGIC_CONFIG.data.status.list[0];

      // Watch user data
      (function observeUser(){
        SailPlayApi.observe('load.user.info').then((user) => {          
            if (!MAGIC_CONFIG.data.status || !MAGIC_CONFIG.data.status.list || !scope.user().user_status || !scope.user().user_status.name) {
              observeUser();             
              return false;
            }
            if (!user) {
              observeUser();
              return false;              
            }

            for (let i = 0, len = MAGIC_CONFIG.data.status.list.length; i < len; i++) {
              if (MAGIC_CONFIG.data.status.list[i].name.toLowerCase() == scope.user().user_status.name.toLowerCase()) {
                scope.current_status = MAGIC_CONFIG.data.status.list[i];
                scope.next_status = MAGIC_CONFIG.data.status.list[i + 1];
                break;
              }
            }

            SailPlay.send('vars.batch', {
              names: Object.keys(scope.variables)
            }, res => {
              res.vars.forEach(item => {
                scope.variables[item.name] = item.value;
              });
              scope.$digest();
            })

            if (scope.$root.$$phase != '$digest')
              scope.$digest();

            observeUser();  
        });
      }())
    };

  }

});