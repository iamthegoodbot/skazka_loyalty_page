import {WidgetRegister} from '@core/widget';
import WelcomeWidgetTemplate from './welcome.html';
import './welcome.less';


WidgetRegister({
  id: 'welcome',
  template: WelcomeWidgetTemplate,
  inject: [
    'SailPlay'
  ],
  controller: SailPlay => {
    return (scope, elm, attrs) => {
      scope.login = type => {
        SailPlay.authorize(type);
      }
    };
  }

});
