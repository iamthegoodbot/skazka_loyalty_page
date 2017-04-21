import { WidgetRegister } from '@core/widget';
import ImageWidgetTemplate from './image-block.html';
import './image-block.less';

WidgetRegister({
  id: 'image-block',
  template: ImageWidgetTemplate,
  controller: () => {

    return (scope) => {

    };

  }

});