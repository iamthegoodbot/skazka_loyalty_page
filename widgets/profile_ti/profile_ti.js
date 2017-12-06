import { Widget } from '@core/widget'
import Template from './profile_ti.html'
import PaginationTemplate from './history_pagination.html'
import './profile_ti.styl'

const ProfileTiWidget = {
  id: 'profile_ti',
  template: Template,
  inject: ['$rootScope', 'SailPlay', 'SailPlayApi', '$filter', 'MAGIC_CONFIG', 'TIApi'],
  controller($rootScope, SailPlay, SailPlayApi, $filter, MAGIC_CONFIG, TIApi) {
    return (scope, elm, attrs) => {

      const BODY_LOCKED_CLASS = 'ti-lock-scroll'
      const HIDE_MESSAGE_TIME = 4000
      const LEN_CONFIRM_CODE = 4
      let hideMessage;

      scope.purchase_details = null
      scope.confirmation = []
      scope.confirmation_data = {
        email: null,
        phone: null,
        code: null
      }
      scope.success = false
      scope.error = false

      scope.popups = {
        history: false,
        profile: false
      }

      scope.getLevelOffset = balance => {
        let groups = TIApi.stores_groups
        if (!groups) return
        let next = groups.filter(group => group.sum > balance)[0]
        return next ? next.sum - balance : false
      }

      scope.openPurchase = purchase => {
        if (!SailPlay.config()) return;
        let requestParams = {
          id: purchase.id,
          auth_hash: SailPlay.config().auth_hash
        }
        SailPlay.jsonp.get(SailPlay.config().DOMAIN + SailPlay.config().urls.purchases.get, requestParams, response => {
          scope.purchase_details = angular.copy(response)
          scope.$digest()
        })
      }

      scope.closePurchase = () => {
        scope.purchase_details = null
      }

      let confirmation_id = null

      // params -> it is custom object. for verify
      // response -> response of update request
      scope.profileEditHandler = (params, response) => {
        confirmation_id = null
        if (!~scope.confirmation.indexOf('phone'))
          scope.confirmation_data.phone = null
        if (!~scope.confirmation.indexOf('email'))
          scope.confirmation_data.email = null
        scope.confirmation_data.code = null
        // scope.confirmation = []
        // reset popup message
        if (hideMessage) {
          clearTimeout(hideMessage)
          if (!scope.confirmation.length) {
            scope.error = null
            scope.success = null
          } else {
            hideMessage = setTimeout(() => {
              scope.success = null
              scope.error = null
              scope.$digest()
            }, HIDE_MESSAGE_TIME)
          }
        }
        // Common error catcher
        if (response && response.status == 'error') {
          scope.catchErrors(response)
          return
        }
        if (params && params.identifier == 'phone') {
          // Verify phone
          let requestParams = {
            auth_hash: SailPlay.config().auth_hash,
            phone: params.value
          };
          scope.updatePhone(requestParams, res => {
            if (res.status == 'ok') {
              confirmation_id = res.confirmation_id
              scope.confirmation_data.phone = res.phone
              scope.confirmation[0] = 'phone'
            } else {
              scope.catchErrors(res)
              return;
            }
            scope.goToBottom()
            scope.$digest()
          })
        } else if (params && params.addEmail) {
          // Verify email
          scope.confirmation_data.email = params.addEmail
          scope.success = scope.widget.texts.profile.success
          if(scope.confirmation_data.phone && scope.confirmation[0] == 'phone') {
            scope.confirmation_data.phone = null
            scope.confirmation[0] = null
          }
          scope.confirmation[scope.confirmation[0] ? 1 : 0] = 'email'
          scope.goToBottom()
          scope.$digest()
          hideMessage = setTimeout(() => {
            scope.success = false
            scope.$digest()
          }, HIDE_MESSAGE_TIME)
        } else {
          scope.confirmation_data.email = null
          scope.confirmation_data.phone = null
          scope.confirmation = []
          // Common flow
          scope.success = scope.widget.texts.profile.success
          scope.goToBottom()
          hideMessage = setTimeout(() => {
            scope.success = false
            scope.$digest()
          }, HIDE_MESSAGE_TIME)
        }

      }

      scope.goToBottom = () => {
        setTimeout(() => {
          document.querySelector('.ti_popup.ti_profile_form').scrollTo(0,document.querySelector('.ti_popup.ti_profile_form .ti_popup_content').scrollHeight)
        }, 100)
      }

      scope.changePhone = () => {
        confirmation_id = null
        scope.error = false
        scope.success = false
        scope.confirmation_data.phone = null
        scope.confirmation = scope.confirmation_data.email ? ['email'] : []
      }

      scope.updatePhone = (params, callback) => {
        SailPlay.jsonp.get(SailPlay.config().DOMAIN + SailPlay.config().urls.users.update_phone, params, callback);
      }

      scope.sendSms = () => {
        let requestParams = {
          auth_hash: SailPlay.config().auth_hash,
          phone: scope.confirmation_data.phone
        };
        scope.updatePhone(requestParams, res => {
          if (res.status == 'ok') {
            confirmation_id = res.confirmation_id
            scope.confirmation_data.phone = res.phone
          } else {
            scope.catchErrors(res)
            return
          }
          scope.$digest()
        })
      }

      scope.confirmUpdatePhone = (e) => {
        if (scope.confirmation_data.code && scope.confirmation_data.code.length == LEN_CONFIRM_CODE) {
          let params = {
            auth_hash: SailPlay.config().auth_hash,
            code: scope.confirmation_data.code,
            confirmation_id
          }
          SailPlay.jsonp.get(SailPlay.config().DOMAIN + SailPlay.config().urls.users.confirm_update_phone, params, response => {
            // reset popup message
            if (hideMessage) {
              clearTimeout(hideMessage)
              if (!scope.confirmation.length) {
                scope.error = null
                scope.success = null
              }
            }
            // Common error catcher
            if (response && response.status == 'error') {
              scope.catchErrors(response)
              return
            } else if (response.confirmed) {
              scope.error = false;
              // Success flow
              SailPlayApi.call('load.user.info', { all: 1, purchases: 1 }, () => {
                confirmation_id = null
                scope.confirmation_data.phone = null
                if (scope.confirmation_data.email) {
                  scope.confirmation = ['email']
                } else {
                  scope.confirmation = []
                }
                scope.success = scope.widget.texts.profile.success
                scope.$digest()
                scope.goToBottom()
                hideMessage = setTimeout(() => {
                  scope.success = false
                  scope.$digest()
                }, HIDE_MESSAGE_TIME)
              });
            } else if (!response.confirmed) {
              scope.success = false
              scope.error = scope.widget.texts.profile.errors['wrong_code']
              scope.goToBottom()
              scope.$digest()
            }
            scope.$digest()
          });
        }
      }

      scope.catchErrors = res => {
        let code = res.status_code
        if (res.attempts_left == 0) {
          code = '-5117'
        }
        if (!code) {
          code = res.message
        }
        scope.success = false
        scope.error = scope.widget.texts.profile.errors[code]
        scope.goToBottom()
        scope.$digest()
        hideMessage = setTimeout(() => {
          scope.error = false
          scope.$digest()
        }, HIDE_MESSAGE_TIME)
      }

      scope.getFieldsByColumn = (fields, column) => {
        if (!fields) return []
        let pageSize = Math.floor(fields.length / scope.widget.options.profile_config.cols)
        return fields.slice(column * pageSize, column * pageSize + pageSize)
      }

      scope.openPopup = name => {
        scope.popups[name] = true
        document.documentElement.classList.add(BODY_LOCKED_CLASS)
      }

      scope.closePopup = name => {
        scope.popups[name] = false
        scope.error = false
        scope.success = false
        scope.confirmation = []
        document.documentElement.classList.remove(BODY_LOCKED_CLASS)
      }

      scope.formatDate = (dateString, months) => {
        if (!dateString) return
        let date = new Date(dateString)
        return [date.getUTCDate(), months && months[date.getUTCMonth() + 1] || date.getUTCMonth(), date.getFullYear()].join(' ')
      }

      scope.getGender = gender => {
        return gender == 1 ? scope.widget.texts.history.male : gender == 2 ? scope.widget.texts.history.female : scope.widget.texts.undefined
      }


    }
  }
}

Widget.service('TIApi', ($http, MAGIC_CONFIG) => {

  class TIApi {

    constructor() {
      this.stores_groups = []
    }

    loadStores() {
      return $http.get(MAGIC_CONFIG.data.stores_url)
    }

  }

  return new TIApi;

})

Widget.config(MagicWidgetProvider => {
  MagicWidgetProvider.register(ProfileTiWidget)
})

Widget.run(($templateCache, TIApi) => {
  $templateCache.put('profile_ti.history_pagination', PaginationTemplate)
  TIApi.loadStores().then(res => {
    TIApi.stores_groups = res.data.stores_groups
  })
})