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
        var fields_obj = fields.reduce((obj, field) => {
          obj[field.name] = field.value
          return obj
        }, {})
        SailPlay.send("referral.add", Object.assign({}, {user_data: fields_obj}, {tag_type_2: MAGIC_CONFIG.data.tag_type, tag_type_3: MAGIC_CONFIG.data.invite_tag_type}), (res) => {
          if (res.status == 'ok') {
            scope.startNewLead = false
            fields.map(field => { field.value = ''; return field })
            scope.$digest();
          } else {
            $rootScope.$broadcast('notifier:notify', {body: res.message})
          }
        })
      }
    };
  }
});
