import { WidgetRegister } from '@core/widget';
import EventMessageTemplate from './event_message.html';
import './event_message.less';

WidgetRegister({
  id: 'event_message',
  template: EventMessageTemplate,
  controller: function () {
    return function (scope) {
      
    }
  }
});