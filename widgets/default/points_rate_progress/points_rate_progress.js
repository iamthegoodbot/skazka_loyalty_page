import {Widget, WidgetRegister} from '@core/widget';
import PointsRateProgressTemplate from './points_rate_progress.html';
import HistoryPaginationTemplate from './history_pagination.html';
import './points_rate_progress.less';

WidgetRegister({
  id: 'points_rate_progress',
  template: PointsRateProgressTemplate,
  inject: [
    'SailPlayApi'
  ],
  controller: function (SailPlayApi) {
    return function (scope) {

      scope.show_history = false;

      // Перенести в конфиг
      const PURCHASES_EVENT = scope.widget.options.event_id;

      if (scope.widget && scope.widget.options && scope.widget.options.badge_events && scope.widget.options.badge_events.length) {
        let tags = [];
        let position = 0;
        angular.forEach(scope.widget.options.badge_events, function (array) {
          angular.forEach(array.events, function (event) {
            tags.push(event.name);
          });
        });
        SailPlayApi.call('tags.exist', {tags: tags}, function (res) {
          if (res && res.tags) {
            let badge_events = scope.widget.options.badge_events.filter(function (array) {
              return array.events.filter(function (event) {
                  return res.tags.filter(function (tag) {
                    return tag.name == event.name && tag.exist == event.exist
                  }).length
                }).length == array.events.length
            })[0];
            position = badge_events && badge_events.position || 0;
            scope.badges_list = scope.sailplay.badges.list().multilevel_badges[position]
          }
          scope.$apply();
        });
      }

      scope.badges_list = null;

      scope.get_progress = function (sum, badges) {
        let next = scope.get_next_status(sum, badges);
        if (!next) return {width: 0};
        let purchase_event = null;
        if (angular.isArray(next.rules)) {
          purchase_event = next.rules.filter(function (event) {
            return event.event_id == PURCHASES_EVENT
          })[0]
        } else {
          purchase_event = next.rules.event_id == PURCHASES_EVENT ? next.rules : null;
        }
        if (!purchase_event || !purchase_event.value_to_success) return {width: 0};
        let percents = sum > purchase_event.value_to_success ? 100 : purchase_event ? sum * 100 / purchase_event.value_to_success : 0;
        return {width: (percents < 0 ? 0 : percents > 100 ? 100 : percents) + '%'};
      };

      scope.get_offset = function (sum, badges) {
        let offset = 0;
        let next = scope.get_next_status(sum, badges);
        if (!next || !badges) return offset;
        let purchase_event = null;
        if (angular.isArray(next.rules)) {
          purchase_event = next.rules.filter(function (event) {
            return event.event_id == PURCHASES_EVENT
          })[0]
        } else {
          purchase_event = next.rules.event_id == PURCHASES_EVENT ? next.rules : null;
        }
        offset = purchase_event && purchase_event.value_to_success && purchase_event.value_to_success > sum ? (purchase_event.value_to_success - sum) : 0;
        return offset
      };

      scope.get_current_status = function (sum, badges) {
        if (!badges) return;
        let received = badges.filter(function (badge) {
          return badge.is_received
        });
        if (!received.length) return;
        let current = received[received.length - 1];
        return current;
      };

      scope.get_next_status = function (sum, badges) {
        if (!badges) return;
        if (!badges || !badges.length) return;
        let next = badges.filter(function (badge) {
          return !badge.is_received
        })[0];
        return next;
      }

    }
  }
});

Widget.run(function ($templateCache) {
  $templateCache.put('points_rate_progress.history_pagination', HistoryPaginationTemplate);
});