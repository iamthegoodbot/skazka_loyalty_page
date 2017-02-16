import { WidgetRegister } from '@core/widget';
import LeadsWidgetTemplate from './leads.html';
import './leads.less';

WidgetRegister({
  id: 'leads',
  template: LeadsWidgetTemplate,
  inject: [
    'SailPlayApi'
  ],
  controller: (SailPlayApi) => {
    return (scope, elm, attrs) => {};
  }
});
