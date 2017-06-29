import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './top-banner.html';

import angular from 'angular';

WidgetRegister({
  id: 'top-banner',
  template: GiftsTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {

    return function (scope, elm, attrs) {


      scope.user = SailPlayApi.data('load.user.info')

      scope.termsOpened = false

    }

  }
});