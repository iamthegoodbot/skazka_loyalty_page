import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './top-banner.html';
import $ from 'jquery';
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

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

      window.setTimeout(function() {
        if($(window).width()>992) {
            $(".bns_about").mCustomScrollbar();
        }
      }, 500);

    }

  }
});