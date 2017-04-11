import { WidgetRegister } from '@core/widget';
import TextWidgetTemplate from './text-block.html';
import './text-block.less';

WidgetRegister({
  id: 'text-block',
  template: TextWidgetTemplate,
  controller: () => {

    return (scope) => {

    };

  }

});