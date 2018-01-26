import { WidgetRegister } from '@core/widget';
import LeaderboardWidgetTemplate from './mobile-navbar.html';
import './mobile-navbar.less';

WidgetRegister({
    id: 'mobile-navbar',
    template: LeaderboardWidgetTemplate,
    inject: ['$timeout', '$rootScope'],
    controller: ($timeout, $rootScope) => {
        return (scope, elm, attrs) => {

            scope.isOpen = false;

            scope.currentTab = 1; 

            scope.onClick = item => {
                scope.isOpen = false;
                scope.currentTab = item.tab;
                $rootScope.$broadcast('mobile-navbar:click', {
                    tab: item.tab
                })
            }

            scope.$on('tab:change', function(e, data){
                scope.currentTab = data.tab || 1;
            });

        }
    }
});