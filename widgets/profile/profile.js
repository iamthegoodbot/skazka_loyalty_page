import { Widget } from '@core/widget';
import WidgetProfileTemplate from './profile.html'
import HistoryPaginationTemplate from './history_pagination.html';
import './profile.less';
import DefaultAvatarImage from './assets/img/avatar_default.png';

function tryExtractJsonFromExtraName(nameField){
  // Some of extra actions has json in it's name field, and some doesn't
  let nameJson = ""
  let hasJson = true
  try {
    nameJson = JSON.parse(nameField)
    hasJson = nameJson.promo_name !== void 0
  } catch(e) {
    hasJson = false
  }
  return {
    hasJson,
    nameJson
  }
}

Widget.factory('isProfileFilled', ($rootScope, SailPlayApi, SailPlay) => {
  
  const obj = {
      isProfileFilled: true
    }
  
  const timeout = window.setTimeout(()=>{    
    SailPlayApi.call("tags.exist", { tags: ["Клиент заполнил профиль"] }, (obj)=>{
        console.info(obj)
        if(obj.tags[0].exist){
          $rootScope.$broadcast('isProfileFilled', true)
        } else {
          $rootScope.$broadcast('isProfileFilled', false)
        }
      }
    )
  }, 1000)

  $rootScope.$on('isProfileFilled', (event, isProfileFilledRes)=>{
    obj.isProfileFilled = isProfileFilledRes
  });

  return obj
})

Widget.filter('get_bonus_name', function () {

  const dictonary = {
          "vk": {
            "like": "Вступите в группу VK",
            "partner_page": "Рассказать о нашем магазине в VK",
            "purchase": "Поделитесь вашей покупкой в VK"
          },
          "fb": {
            "like": "Вступите в группу Facebook",
            "partner_page": "Рассказать о нашем магазине в Facebook",
            "purchase": "Поделитесь вашей покупкой в Facebook"
          },
          "gp": {
            "like": "Вступите в группу Google+",
            "partner_page": "Рассказать о нашем магазине в Google+",
            "purchase": "Поделитесь вашей покупкой в Google+"
          },
          "ok": {
            "like": "Вступите в группу Одноклассники",
            "partner_page": "Рассказать о нашем магазине в Одноклассники",
            "purchase": "Поделитесь вашей покупкой в Одноклассники"
          },
          "tw": {
            "partner_page": "Рассказать о нашем магазине в Twitter",
            "purchase": "Поделитесь вашей покупкой в Twitter"
          }
        }

  return function (item) {

    if(item.action=="extra"){
      const parseResult = tryExtractJsonFromExtraName(item.name)
      if(parseResult.hasJson){
        const name = parseResult.nameJson.promo_name
        return name
      } else {
        return item.name
      }
    } else if (item.hasOwnProperty('social_type')){
      return dictonary[item.social_type][item.social_action]
    } else if (item.action=="purchase"){
      return 'Покупка'
    } else {
      return item.name
    }
    
  }
})

Widget.filter('get_bonus_add', function () {
  return function (item) {

    if(item){
      if(item.points_delta > 0){
        return "+" + item.points_delta
      } else {
        return 0
      }
    }

    return 'no number'
    
  }
})

Widget.filter('get_bonus_sub', function () {
  return function (item) {

    if(item){
      if(item.points_delta < 0){
        return item.points_delta
      } else if(item.action == "purchase") {
        return -item.debited_points_delta
      } else {
        return 0
      }
    }

    return 'no number'
    
  }
})

const ProfileWidget = {

  id: 'profile',
  template: WidgetProfileTemplate,
  inject: ['$rootScope', 'MAGIC_CONFIG', 'SailPlayApi', 'SailPlay', 'isProfileFilled'],
  controller: function ($rootScope, MAGIC_CONFIG, SailPlayApi, SailPlay, isProfileFilled) {

    return function (scope, elm, attrs) {

      // scope._tools = MAGIC_CONFIG.tools;

      scope.default_avatar = DefaultAvatarImage;
      $rootScope.$on('openProfile', () => {
        scope.profile.show_fill_profile = true;
      })
      scope.profile = {
        history: false,
        show_fill_profile: false,
        fill_profile: function(state){
          scope.profile.show_fill_profile = state || false;
        }
      };

      scope.purchases = {

      }

      scope.getHistoryPurchases = function(id) {
        console.log('hi', Object.keys(scope.purchases))
        if(!Object.keys(scope.purchases).some(x=>x==id)){
          SailPlayApi.call('purchases.info', {id})
        }
      }

      SailPlay.on('purchases.info.success', (data)=>{
        const id = data.purchase.id
        const items = data.cart.cart.positions.map(x=>{
          return {
            name: x.product.name,
            quantity: parseInt(x.quantity)
          }
        })
        scope.purchases[id] = items
        scope.$apply()
      })

      scope._tools = MAGIC_CONFIG.tools;
      scope._statuses = MAGIC_CONFIG.data.statuses;

      scope.user = SailPlayApi.data('load.user.info');
      scope.purchase_status = MAGIC_CONFIG.data.purchase_status;

      scope.isMobile = () => document.body.clientWidth < 768

      scope.current_status = "";

      scope.get_next_status = function () {

        if(!scope._statuses) return;

        let user = scope.user();

        if(!user) {
          return {
            status: scope._statuses[0],
            offset: scope._statuses[0].points
          };
        }

        let user_points = user.user_points;
        let points =  user_points ? user_points.confirmed + user_points.spent + user_points.spent_extra : 0;
        if (MAGIC_CONFIG.data.purchase_status) {
          points = user.purchases && user.purchases.sum || 0;
          user_points = user.purchases && user.purchases.sum || 0
        }

        let future_statuses = scope._statuses.sort((a, b) => {
          return a.points > b.points;
        }).filter((status) => {
          return status.points > points;
        });

        const current_statuses = scope._statuses.filter(x=>x.points<=points)

        scope.current_status = current_statuses.reduce((acc, x)=>((acc.points<x.points) ? x : acc))

        return {
          status: future_statuses[0],
          offset: future_statuses[0] && future_statuses[0].points - points || 0
        };

      }

    }

  }

};

Widget.config(function (MagicWidgetProvider) {

  MagicWidgetProvider.register(ProfileWidget);

});

Widget.run(function ($templateCache) {
  $templateCache.put('profile.history_pagination', HistoryPaginationTemplate);
});

// .directive('sailplayMagicProfile', function(MAGIC_CONFIG){
//
//   return {
//
//     restrict: "E",
//     replace: true,
//     scope: {
//       _config: '=?config'
//     },
//     templateUrl: '/html/core/widgets/profile.html',
//     link: function(scope, elm, attrs){
//
//       scope._tools = MAGIC_CONFIG.tools;
//
//       scope.show_history = false;
//
//       scope.show_fill_profile = false;
//
//       scope.fill_profile = function(state){
//
//         scope.show_fill_profile = state || false;
//
//       };
//
//     }
//
//   };
//
// });
