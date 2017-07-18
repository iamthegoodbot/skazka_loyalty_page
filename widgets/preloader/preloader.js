import { WidgetRegister } from '@core/widget';
import WidgetPreloaderTemplate from './preloader.html'
import './preloader.less';

WidgetRegister({
  id: 'preloader',
  template: WidgetPreloaderTemplate,
  controller: function () {
    return () => {

    };
  }
});