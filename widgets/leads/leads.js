import { WidgetRegister } from '@core/widget';
import LeadsWidgetTemplate from './leads.html';
import './leads.less';

WidgetRegister({
  id: 'leads',
  template: LeadsWidgetTemplate,
  inject: [ 
    'SailPlayApi'
  ],
  controller: (SailPlayApi) => {
    return (scope, elm, attrs) => {
      scope.leads = [
        {
          name: 'Jane Doe',
          phone: '1234567890',
          email: 'jade_doe@gmail.com',
          company: 'Jane Doe `s company',
          partners: [
            {
              fields: [
                {
                  caption: 'Name',
                  value: 'John Doe',
                },
                {
                  caption: 'Email',
                  value: 'John@doe.org',
                },
                {
                  caption: 'Phone',
                  value: '14122306109',
                },
                {
                  caption: 'From',
                  value: '100 Street, 10001',
                },
                {
                  caption: 'To',
                  value: '10002',
                },
                {
                  caption: 'When',
                  value: '1/1/16 - 1/7/16',
                }
              ]
            }
          ]
        }
      ]
      SailPlayApi.call('referral.list', {names: []})
    }; 
  }
}); 
 