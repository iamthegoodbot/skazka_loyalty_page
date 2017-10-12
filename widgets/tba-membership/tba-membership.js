import { WidgetRegister } from '@core/widget';
import TbaMembershipWidgetTemplate from './tba-membership.html';
import './tba-membership.less';

WidgetRegister({
  id: 'tba-membership',
  template: TbaMembershipWidgetTemplate,
  controller: function () {
    return () => {

    };
  }
});