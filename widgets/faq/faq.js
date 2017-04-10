import { WidgetRegister } from '@core/widget';
import LinkTemplate from './faq.html';
import './faq.less';

WidgetRegister({
  id: 'faq',
  template: LinkTemplate,
  inject: [
    'SailPlayApi'
  ],
  controller: (SailPlayApi) => {
    return (scope, elm, attrs) => {
      scope.faq = {
        show: false
      }
    };
  }

});
