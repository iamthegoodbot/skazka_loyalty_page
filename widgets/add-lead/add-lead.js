import { WidgetRegister } from '@core/widget';
import AddLeadWidgetTemplate from './add-lead.html';
import './add-lead.less';

WidgetRegister({
  id: 'add-lead',
  template: AddLeadWidgetTemplate,
  inject: [
    'SailPlayApi',        
    'SailPlay',    
    'MAGIC_CONFIG',
    '$rootScope'
  ],
  controller: (SailPlayApi, SailPlay, MAGIC_CONFIG, $rootScope) => {
    return (scope, elm, attrs) => {

      scope.submit = fields => {

        var _config = SailPlay.config();
        var tagAdd = '/js-api/' + _config.partner.id + '/tags/add';

        var lead_obj = {
          auth_hash: _config.auth_hash,
          tag_type_2: MAGIC_CONFIG.data.tag_type,
          tag_type_3: MAGIC_CONFIG.data.new_lead_tag_type
        }
      
        angular.forEach(fields, field => {
          lead_obj[field.name] = field.value;
        })

        var url = '/js-api/' + _config.partner.id + '/custom/referrals/add/'

        SAILPLAY.jsonp.get(_config.DOMAIN + url, lead_obj, (res) => {
          if (res.status == 'ok') {
            var set_status = {
              phone: lead_obj['phone'],
              tags: ''
            }
            SAILPLAY.jsonp.get(_config.DOMAIN + tagAdd, set_status)
            scope.startNewLead = false;
            fields.map(field => { field.value = ''; return field })
            $rootScope.$broadcast('notifier:notify', scope.widget.texts.success);
            scope.$digest();
          } else {
            $rootScope.$broadcast('notifier:notify', {body: res.message})
          }
        })
      }
    };
  }
});
