import { WidgetRegister, Widget } from '@core/widget';
import CardQuestsTemplate from './card-quests.html';
import Swiper from 'swiper';
//import './card-quests.less';

Widget.filter('chopOfferName', function () {
  return function (name) {

    if(name.startsWith('offer: ')){
      return name.slice(7)
    } else {
      return name
    }
    
  };
});

Widget.filter('offer', function () {
  return function (items) {
    return items && items.filter(x=>x.name.indexOf('offer: ') === 0)
    
  };
});

Widget.filter('noOffer', function () {
  return function (items) {
    return items && items.filter(x=>x.name.indexOf('offer: ') != 0)
    
  };
});

WidgetRegister({

  id: 'card-quests',
  template: CardQuestsTemplate,
  inject: [
    'tools',
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (tools, SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.action_selected = false;
      scope.action_custom_selected = false;
      scope.isProfileFilled = true
      scope.isProfileFilledAction = {
        type: 'fillProfile',
        points: 100,
        name: 'Заполните профиль',
        button: 'Заполнить профиль',
        image: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/8d1895bae3f02ff8f579f114d8d60638.svg'
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

      scope.filter = scope.widget.options && scope.widget.options.filter || {};

      scope.action_select = function (action) {

        if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

        scope.action_selected = action || false;

      };

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

      const config = {
          scrollbar: '.swiper-scrollbar',
          scrollbarHide: false,
          scrollbarDraggable: true,
          slidesPerView: 4,
          centeredSlides: false,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 15,
          grabCursor: true,
          breakpoints: {
              1150: {
                  slidesPerView: 3
              },
              800: {
                  slidesPerView: 2
              },
              500: {
                  slidesPerView: 1
              }
          }
      };

      let swiper;

      function swiperKostyl(){
        setTimeout(function(){
          swiper = new Swiper('.swiper-container', config);
        }, 1000);
      }

      SailPlay.on('load.actions.custom.list.success', ()=>{
        swiperKostyl()
      }, ()=>{
        swiperKostyl()
      })

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