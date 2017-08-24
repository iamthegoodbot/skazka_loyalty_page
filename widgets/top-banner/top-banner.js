import { WidgetRegister, Widget } from '@core/widget';
import GiftsTemplate from './top-banner.html';
import $ from 'jquery';
require("jquery-mousewheel")($);
require('../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js')($);

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