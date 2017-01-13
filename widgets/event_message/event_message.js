import {WidgetRegister} from '@core/widget';
import EventMessageTemplate from './event_message.html';
import './event_message.less';

WidgetRegister({
  id: 'event_message',
  template: EventMessageTemplate,
  inject: [
    'SailPlayApi',
    'SailPlay',
    '$rootScope'
  ],
  controller: function (SailPlayApi, SailPlay, $rootScope) {
    return function (scope) {

      let tags = [];
      scope.exist = null;
      scope.messages = [];

      angular.forEach(scope.widget.options.content, function (text) {
        angular.forEach(text.events, function (event) {
          tags.push(event.name);
        });
      });

      if (tags.length) {
        SailPlay.send('tags.exist', {tags: tags}, function (res) {
          if (res && res.tags) {
            scope.exist = res.tags;
            scope.update();
            scope.$digest();
          }
        });
      }

      scope.update = function () {

        function check(events) {
          var array = events.filter(function (event) {
            return scope.exist.filter(function (exist_event) {
              return exist_event.name == event.name && exist_event.exist == event.exist
            }).length
          });
          return array.length == events.length;
        }

        scope.messages = scope.widget.options.content.filter(function (item) {
          return check(item.events)
        });

        console.log('scope.messages', scope.messages);
      }

    }
  }
});