import { WidgetRegister } from '@core/widget';
import LinkTemplate from './link.html';
import './link.less';

WidgetRegister({
  id: 'link',
  template: LinkTemplate,
  inject: [
    'SailPlayApi'
  ],
  controller: (SailPlayApi) => {
    return (scope, elm, attrs) => {
    };
  }

});
