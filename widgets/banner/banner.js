import { WidgetRegister } from '@core/widget';
import BannerWidgetTemplate from './banner.html';
import './banner.less';

WidgetRegister({
  id: 'banner',
  template: BannerWidgetTemplate,
  controller: function () {
    return () => {

    };
  }
});