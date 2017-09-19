import { WidgetRegister } from '@core/widget';
import LeaderboardWidgetTemplate from './mobile-navbar.html';
import './mobile-navbar.less';

WidgetRegister({
  id: 'mobile-navbar',
  template: LeaderboardWidgetTemplate,
  inject: [
  ],
  controller: () => {
    return (scope, elm, attrs) => {
      scope.scrollToElement = (selector) => {
      	document.querySelector(selector).scrollIntoView()
      }
    }
  }
});
