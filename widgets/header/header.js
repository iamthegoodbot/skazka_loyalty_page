import { WidgetRegister } from '@core/widget';
import HeaderWidgetTemplate from './header.html';
import './header.less';

WidgetRegister({
  id: 'header',
  template: HeaderWidgetTemplate,
  controller: () => {

    return (scope) => {

    };

  }

});