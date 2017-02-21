import { WidgetRegister } from '@core/widget';
import ProfileRegisterTemplate from './profile-progress.html';
import './profile-progress.less'

WidgetRegister({
  id: "profile-progress",
  template: ProfileRegisterTemplate,
  controller: () => {
    return (scope) => {};
  }
})