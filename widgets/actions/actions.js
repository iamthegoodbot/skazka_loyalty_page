import { WidgetRegister } from '@core/widget';
import ActionsWidgetTemplate from './actions.html';
import './actions.less';

WidgetRegister({

  id: 'actions',
  template: ActionsWidgetTemplate,
  inject: [
    'tools',
    'SailPlayApi',
    'SailPlay',
    '$rootScope',
    'isProfileFilled'
  ],
  controller: function (tools, SailPlayApi, SailPlay, $rootScope, isProfileFilled) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;

      scope.action_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

        scope.action_selected = action || false;

      };

      scope.isProfileFilled = true

      scope.isProfileFilledAction = {
        isActive: scope.widget.options.fillProfileActionExist,
        type: 'fillProfile',
        points: scope.widget.options.fillProfileActionPoints,
        name: 'Заполните профиль',
        button: 'ВЫПОЛНИТЬ',
        image: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/39cb8197b4e3e1a11faf51495f8d73d6.png'
      }

      scope.open_profile = function() {
        console.info(123)
        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');        
        $rootScope.$broadcast('openProfile')
      }

      $rootScope.$on('isProfileFilled', (event, isProfileFilled) => {
        scope.isProfileFilled = isProfileFilled
        window.setTimeout(()=>{
          SailPlayApi.call('load.user.history', ()=>{});
        }, 600)
      })

      SailPlay.on('actions.perform.success', function(){
       scope.$apply(function(){
         scope.action_selected = false;
       });
      });

      scope.custom_action_cb = function(){
        window.setTimeout(()=>{
          SailPlayApi.call('load.user.info', { all: 1 }, ()=>{});
          SailPlayApi.call('load.actions.custom.list', ()=>{})
          SailPlayApi.call('load.user.history', ()=>{});
        }, 2000)
      }

      SailPlay.on('actions.perform.success', function(){
        scope.$apply(function(){
          scope.action_selected = false;
        });
        window.setTimeout(()=>{
          SailPlayApi.call('load.user.info', { all: 1 }, ()=>{});
          SailPlayApi.call('load.actions.list', ()=>{});
          SailPlayApi.call('load.user.history', ()=>{});
        }, 2000)
      });

      scope.action_custom_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
        scope.action_custom_selected = action || false;

      };

      scope.action_styles = function (action_data) {
        return action_data && action_data.styles && tools.stringify_widget_css('', action_data.styles);
      };

    }

  }

});