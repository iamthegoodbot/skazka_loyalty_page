import { WidgetRegister } from '@core/widget';
import ButtonWidgetTemplate from './button.html';
import './button.less';

WidgetRegister({
  id: 'button',
  template: ButtonWidgetTemplate,
  controller: function () {
    return () => {
        
    };
  }
});