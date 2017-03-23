import { WidgetRegister } from '@core/widget';
import LeadsWidgetTemplate from './leads.html';
import './leads.less';

WidgetRegister({
  id: 'leads',
  template: LeadsWidgetTemplate,
  inject: [ 
    'SailPlayApi',
    'SailPlay',
    'MAGIC_CONFIG'
  ],
  controller: (SailPlayApi, SailPlay) => {
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
            },
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
            },
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

      scope.$watch(function () {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, function () {      

        var _config = SailPlay.config();

        var obj = {
          auth_hash: _config.auth_hash,
          names: JSON.stringify(['move_date', 
          'moving_from',
          'moving_from_zip', 'moving_to'])
        }

        var url = '/js-api/' + _config.partner.id + '/custom/referrals/list/'      
        SAILPLAY.jsonp.get(_config.DOMAIN + url, obj, function (res) {
          angular.forEach(res.leads, lead => {
            SAILPLAY.jsonp.get(_config.DOMAIN + url, obj, function (res) {

            })
          })
        })
      }); 

    }
  }
}); 
 