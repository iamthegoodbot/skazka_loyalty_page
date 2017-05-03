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
      var _config = SailPlay.config();      
      var tagExist = '/js-api/' + _config.partner.id + '/tags/exist';     
      var tagAdd = '/js-api/' + _config.partner.id + '/tags/add';
      var tagDelete = '/js-api/' + _config.partner.id + '/tags/delete';

      scope.Math = window.Math;
      scope.setTag = (phone, tag, parent_phone) => {
        var tag_obj_delete = {
          phone: phone,
          tags: ['Closed', 'Open', 'Booked'].join(',')
        }

        var tag_obj = {
          phone: phone,
          tags: tag[0].toUpperCase() + tag.slice(1)
        }

        var parent_tag = {
          phone: parent_phone,
          tags: 'Booked_counter'
        }

        SAILPLAY.jsonp.get(_config.DOMAIN + tagDelete, tag_obj_delete, () => {
          SAILPLAY.jsonp.get(_config.DOMAIN + tagAdd, tag_obj)
          if (tag == 'booked')
            SAILPLAY.jsonp.get(_config.DOMAIN + tagAdd, parent_tag) 
        });
      }

      scope.$watch(function () {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, function () {

        var user = SailPlayApi.data('load.user.info')();
        if (!user) return;

        var obj = {
          auth_hash: _config.auth_hash,
          names: JSON.stringify(['companyName'])
        }

        scope.leads = [];
        var url = '/js-api/' + _config.partner.id + '/custom/referrals/list/'
        SAILPLAY.jsonp.get(_config.DOMAIN + url, obj, function (res) {
          var _leads = res.leads
          scope.leads = _leads;
          angular.forEach(_leads, lead => {
            var lead_obj = {
              phone: lead.phone,
              names: JSON.stringify(['move_date',
                'moving_from',
                'moving_from_zip', 'moving_to'])
            }
            SAILPLAY.jsonp.get(_config.DOMAIN + url, lead_obj, function (_res) {
              lead.partners = _res.leads
              angular.forEach(lead.partners, (_partner) => {
                var tag_obj = {
                  phone: _partner.phone,
                  tags: JSON.stringify(['Closed','Open','Booked'])
                }
                SAILPLAY.jsonp.get(_config.DOMAIN + tagExist, tag_obj, res => {
                  angular.forEach(res.tags, tag => {
                    if (tag.exist)
                      switch (tag.name) {
                        case 'Closed':
                          _partner.tag = 'closed';
                          break;
                        case 'Open':
                          _partner.tag = 'open';
                          break;
                        case 'Booked':
                          _partner.tag = 'booked';
                          break;
                        default:
                          _partner.tag = 'open';  
                      }
                    lead.partners = lead.partners.filter(obj => { return ['closed', 'booked'].indexOf(obj.tag) == -1 })                      
                    scope.$digest();
                  })
                })                
              })
              scope.$digest();
            })
          })
        })
      });

    }
  }
});