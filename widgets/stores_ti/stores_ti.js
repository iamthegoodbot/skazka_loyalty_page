import { WidgetRegister } from '@core/widget'
import Template from './stores_ti.html'
import './stores_ti.styl'

WidgetRegister({
    id: 'stores_ti',
    template: Template,
    inject: [
        'SailPlayApi',
        'MAGIC_CONFIG',
        'TIApi'
    ],
    controller: (SailPlayApi, MAGIC_CONFIG, TIApi) => {
        return (scope, elm, attrs) => {

            scope.stores_groups = []
            const PER_PAGE = 9

            scope.needToShowLoadButton = group => {
                if (!group || !group.stores) return
                let per_page = group.per_page || PER_PAGE
                let stores = group.stores.filter(store => !store.hide)
                return stores.length > per_page && (group.page || 1) * per_page < stores.length
            }

            scope.hideLowDiscount = (store, balance) => {
                if (!store || !scope.stores_groups) return
                let stores = []
                scope.stores_groups.forEach(group => {
                    stores = stores.concat(group.stores)
                })
                let storesDiscount = stores.filter(storeItem => storeItem.title == store.title && storeItem.sum <= balance && store.sum < storeItem.sum)
                return storesDiscount.length
            }

            scope.loadMore = group => {
                if (!group.page)
                    group.page = 2
                else
                    group.page++
            }

            scope.groupSizeSmall = group => {
                if(!group) return
                let min_size = 3;
                let stores = group.stores.filter(store => !store.hide).length
                return stores < min_size
            }

            scope.getPercents = (current, needed) => {
                let value = current * 100 / needed
                return value > 100 ? 100 : value
            }

            scope.$watch(() => {
                return angular.toJson([TIApi.stores_groups, SailPlayApi.data('load.user.info')()])
            }, () => {
                if (!SailPlayApi.data('load.user.info')() || !TIApi.stores_groups) return
                let groups = TIApi.stores_groups
                let user = SailPlayApi.data('load.user.info')()
                groups.forEach(group => {
                    group.stores.forEach(store => {
                        store.hide = scope.hideLowDiscount(store, user.purchases.sum) ? true : false
                        store.is_received = user.purchases.sum >= store.sum
                    })
                    group.hide = group.stores
                        .filter(store => store.type == 'store')
                        .every(store => store.hide) ? true : false
                })
                scope.stores_groups = groups
            })

        };
    }

})
