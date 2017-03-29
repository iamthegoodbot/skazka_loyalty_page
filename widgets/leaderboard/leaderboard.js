import {
  WidgetRegister
} from '@core/widget';
import SAILPLAY from 'sailplay-hub';
import LeaderboardWidgetTemplate from './leaderboard.html';
import './leaderboard.less';

WidgetRegister({
  id: 'leaderboard',
  template: LeaderboardWidgetTemplate,
  inject: [
    'SailPlay',
    'SailPlayApi',
    'MAGIC_CONFIG'
  ],
  controller: (SailPlay, SailPlayApi, MAGIC_CONFIG) => {
    return (scope, elm, attrs) => {

      if (window._config == {}) {
        initError();
        return;
      }
      
      scope.$watch(function () {
        return angular.toJson([SailPlayApi.data('load.user.info')()]);
      }, function () {      

        var user = SailPlayApi.data('load.user.info')();
        if (!user) return;
        var _config = SailPlay.config();

        var tagsObj = {
          auth_hash: _config.auth_hash
        };

        var url = '/js-api/' + _config.partner.id + '/custom/leaderboard/' + MAGIC_CONFIG.data.leaderboard_type + '/'
        tagsObj = Object.assign({}, tagsObj, MAGIC_CONFIG.data.leaderboard_data)
        SAILPLAY.jsonp.get(_config.DOMAIN + url, tagsObj, function (res) {
          if (res.status == 'ok')
            scope.data = res.data
        });
      })
    };
  }

});