module.exports = {
  "$MAGIC": {
    "widgets": [
          {
        "errors": {
          'email is not valid': 'Введите правильный E-Mail',
          '-200007': 'Пользователь с таким номером телефона уже зарегистрирован. Если аккаунт с этим номером принадлежит Вам, зайдите в личный кабинет, используя данные этого аккаунта',
          '-200010': 'Пользователь с таким адресом эл. почты уже зарегистрирован. Если аккаунт с этим адресом принадлежит Вам, зайдите в личный кабинет, используя данные этого аккаунта'
        },
        "enabled": true,
        "options": {
          "status_list": [
            {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/f0a95012b3de8428fe7d9cd2489c98da.png",
              "points": 200,
              "name": "Bronze"
            },
            {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/4509a25a97ae64a113e14c1c29ee35c4.png",
              "points": 600,
              "name": "Silver"
            },
            {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/8535dda62376552f4ece0f549dc0e594.png",
              "points": 1500,
              "name": "Gold"
            }
          ]
        },
        "texts": {
          "history_button": "History",
          "history": {
            "header": "History"
          }
        },
        "images": {},
        "id": "points-status"
      },
      {
        "fill_profile": {
          "header": "Update your profile",
          "config": {
            "fields": [
              {
                "input": "text",
                "type": "system",
                "placeholder": "Имя",
                "name": "firstName",
                "label": "Имя"
              },
              {
                "input": "text",
                "type": "system",
                "placeholder": "Фамилия",
                "name": "lastName",
                "label": "Фамилия"
              },
              {
                "input": "phone",
                "type": "system",
                "placeholder": "+7 (012) 345-67-89",
                "name": "addPhone",
                "label": "Телефон"
              },
              {
                "input": "date",
                "type": "system",
                "placeholder": "Enter your birth date",
                "name": "birthDate",
                "label": "Дата рождения"
              },
              {
                "name": "sex",
                "type": "system",
                "data": [
                  {
                    "text": "Мужской",
                    "value": 1
                  },
                  {
                    "text": "Женский",
                    "value": 2
                  }
                ],
                "input": "radio",
                "label": "Пол",
                "placeholder": "Пол"
              },
              {
                "name": "sp",
                "type": "system",
                "data": [
                  {
                    "text": "Замужем/женат",
                    "value": 1
                  },
                  {
                    "text": "Не замужем/холост",
                    "value": 2
                  }
                ],
                "input": "radio",
                "label": "Семейное положение",
                "placeholder": "Пол"
              }
            ],
            "tag": "Client filled profile"
          }
        },
        "enabled": true,
        "texts": {
          "spoiler": "Earn bonus points, get rewards, and manage your loyalty account",
          "name_not_defined": "John Doe",
          "user_status": "Your status:",
          "history_button": "History",
          "edit_profile_button": "Edit Profile",
          "header": "Greenly Rewards",
          "logout": "Logout",
          "before_gift": "until next gift",
          "history": {
            "header": "History"
          },
          "login_reg": "Login/Register"
        },
        "images": {},
        "id": "profile"
      },
      {
        "id": 'top-banner',
        "texts": {},
        "enabled": true,
        "options": {},
        "texts": {}
      },
      {
        "id": 'dates-events',
        "texts": {},
        "enabled": true,
        "options": {},
        "texts": {}
      },
      {
        "id": "multi-container",
        "enabled": true,
        "options": {},
        "texts": {}
      },

      {
        
        "texts": {
          "gift_received": 'Подарок добавлен в корзину!',
          "gift_error": 'К сожалению, вы не получили подарок!',
          "gift_error_points": 'Недостаточно баллов для получения этого подарка',
          "error": 'Ошибка',
          "perform": 'Выполнить',
          "no_points_button_text": "Not enough points",
          "gift_received_error": "Sorry, we're unable to process your request at this time",
          "get": "Get",
          "purchase_success_header": "Congratulations!",
          "earn_points": "earn points",
          "confirm_message_start": "Confirm",
          "header": "Gifts",
          "coupon_number": "Coupon number",
          "purchase_error_header": "Gift was not received.",
          "confirm_message_end": "Cancel",
          "caption": "Redeem your bonus points for these great gifts!",
          "no_points_message": "Not enough points. Try completing some of these actions:"
        },
        "images": {},
        "enabled": true,
        "id": "gifts-grid"
      },
      {
        
        "errors": {},
        "enabled": true,
        "texts": {
          "perform": "Share",
          "header": "Quests",
          "caption": "Earn extra points by completing these quests"
        },
        "images": {},
        "id": "card-quests"
      },
      {
        
        "texts": {
          "header": "Badges",
          "caption": "Earn prizes and rewards for exploring our products, referring your friends and more!"
        },
        "enabled": true,
        "id": "badges"
      }
    ],
    "data": {
      "custom_actions": {
        "static_page": {
          
        }
      },
      "actions": {
    "system": {
      "emailBinding": {
        name: "Привяжите E-Mail",
        pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/6ecebe184db25e4708b8d03def71b558.png"
      },
      "fillProfile":{
        name: "Заполните профиль",
        pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/f22be1f2b19c86d6824c936faffa6a0c.png"
      },
      "inviteFriend":{
        name: "Пригласите друга",
        pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/a6f3c1bc8ea6217bf09cdd16e1f24634.png'
      }
    },
    "social": {
      "vk": {
        "like": {
          "name": "Вступите в группу VK",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/7348ae509da7fa250fe8cc5b8d836dd8.png'
        },
        "partner_page": {
          "name": "Рассказать о нашем магазине в VK",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/7348ae509da7fa250fe8cc5b8d836dd8.png'
        },
        "purchase": {
          "name": "Поделитесь вашей покупкой в VK",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/7348ae509da7fa250fe8cc5b8d836dd8.png'
        }
      },
      "fb": {
        "like": {
          "name": "Вступите в группу Facebook",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/135cb1b4fd6ea0a83558b8b7a00d690e.png'
        },
        "partner_page": {
          "name": "Рассказать о нашем магазине в Facebook",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/135cb1b4fd6ea0a83558b8b7a00d690e.png'
        },
        "purchase": {
          "name": "Поделитесь вашей покупкой в Facebook",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/135cb1b4fd6ea0a83558b8b7a00d690e.png'
        }
      },
      "gp": {
        "like": {
          "name": "Вступите в группу Google+",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png'
        },
        "partner_page": {
          "name": "Рассказать о нашем магазине в Google+",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png'
        },
        "purchase": {
          "name": "Поделитесь вашей покупкой в Google+",
          pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png'
        }
      },
      "ok": {
        "like": {
          "name": "Вступите в группу Одноклассники"
        },
        "partner_page": {
          "name": "Рассказать о нашем магазине в Одноклассники"
        },
        "purchase": {
          "name": "Поделитесь вашей покупкой в Одноклассники"
        }
      },
      "tw": {
        "partner_page": {
          "name": "Рассказать о нашем магазине в Twitter",
          pic: 'dist/img/actions/twitter.png'
        },
        "purchase": {
          "name": "Поделитесь вашей покупкой в Twitter",
          pic: 'dist/img/actions/twitter.png'
        }
      }
    }
  },
      "history": {
        "purchase": "Покупка",
        "gift_purchase": "Подарок",
        "badge": "Получен статус: ",
        "registration": "Регистрация",
        "referral": "Регистрация друга",
        "referred": "Регистрация по приглашению",
        "referred_purchase": "Покупка приглашенного пользователя",
        "promocode": "За ввод промокода",
        "enter_group": "Вступление в группу ",
        "share_purchase": "Рассказ о покупке в ",
        "social_share": "Рассказ в ",
        "share_badge": "Рассказ о статусе в ",
        "earn_badge": 'Получен статус% ',
        "custom_action": "Экстра"
      }
    },
    "tools": {
      "forms": {
        
        "texts": {}
      },
      "fonts": {
        "options": {
          "items": [
            "https://fonts.googleapis.com/css?family=Raleway"
          ]
        }
      },
      "buttons": {
        
        "texts": {
          "close": "Закрыть",
          "save": "Сохранить",
          "ok": "OK",
          "get": "Получить"
        }
      },
      "slider": {
        
      },
      "points": {
        "texts": {
          "pluralize": "балл, балла, баллов"
        }
      },
      "modal": {
        "images": {
          "close": "http://saike.ru/sailplay-magic/lib/magic/img/tools/modal/close.png"
        },
        
      },
      "date": {
        "months": {
          "1": "Янв",
          "2": "Фев",
          "3": "Мар",
          "4": "Апр",
          "5": "Май",
          "6": "Июн",
          "7": "Июл",
          "8": "Авг",
          "9": "Сен",
          "10": "Окт",
          "11": "Нов",
          "12": "Дек"
        },
        "placeholder": {
          "month": "Месяц",
          "day": "День",
          "year": "Год"
        }
      },
      "notifier": {
        
        "texts": {
          "congratulations": "Congratulations!",
          "error": "An error occurred"
        }
      }
    },
    "auth": {
      "config": {
        "disable": true
      },
      "type": "hybrid",
      "auth_hash_id": "sailplay_magic_auth_hash"
    }
  },
  "$MOBILE": {}
}