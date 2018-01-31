import { WidgetRegister } from '@core/widget';
import LeaderboardWidgetTemplate from './mobile-navbar.html';
import './mobile-navbar.less';

WidgetRegister({
  id: 'mobile-navbar',
  template: LeaderboardWidgetTemplate,
  inject: [ '$timeout'
  ],
  controller: ($timeout) => {
    return (scope, elm, attrs) => {
      scope.scrollToElement = (selector) => {
      	document.querySelector(selector).scrollIntoView()
      }
      var animatePosition = function(event){
        window.requestAnimationFrame(function() {
          if(window.innerWidth > 650) {
            var clientRect = document.querySelector('.header_bottom') ? document.querySelector('.header_bottom').getBoundingClientRect() : 0
            var height = clientRect.height + clientRect.top
            document.querySelector('.mobile-navbar .container_nc').style['margin-top'] = height + 'px'
          } else {
            var clientRect = document.querySelector('.bon_profile_wrap') ? document.querySelector('.bon_profile_wrap').getBoundingClientRect() : 0
            if(clientRect.top < 20){
              document.querySelector('.navbar-s').style.visibility = 'visible'
            } else if (clientRect.top >= 20) {
              document.querySelector('.navbar-s').style.visibility = 'hidden'
            }
          }
        });
      }
      window.addEventListener('scroll', animatePosition)
      $timeout(animatePosition(), 1000)
    }
  }
});
