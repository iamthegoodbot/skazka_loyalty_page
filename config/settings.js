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
        "history_button": "ДЕТАЛИЗАЦИЯ БАЛЛОВ",
        "history": {
          "header": "ДЕТАЛИЗАЦИЯ БАЛЛОВ"
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
            "type": "tags",
            "data": [
            {
              "text": "Замужем/женат",
              "tag": "z"
            },
            {
              "text": "Не замужем/холост",
              "tag": "nz"
            }
            ],
            "input": "radio-tag",
            "label": "Семейное положение",
            "placeholder": "Семейное положение"
          }
          ],
          "tag": "Client filled profile"
        }
      },
      "enabled": true,
      "texts": {
        "spoiler": "1",
        "name_not_defined": "J1",
        "user_status": "1",
        "history_button": "ДЕТАЛИЗАЦИЯ БАЛЛОВ",
        "edit_profile_button": "1",
        "header": "1",
        "logout": "1",
        "before_gift": "1",
        "history": {
          "header": "ДЕТАЛИЗАЦИЯ БАЛЛОВ"
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

      "errors": {},
      "enabled": true,
      "texts": {
        "perform": "Share",
        "header": "Quests",
        "caption": "Earn extra points by completing these quests"
      },
      "images": {},
      "id": "card-quests"
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
            pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/6ecebe184db25e4708b8d03def71b558.png",
            button_text: "Привяжите E-Mail"
          },
          "fillProfile":{
            name: "Заполните профиль",
            pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/f22be1f2b19c86d6824c936faffa6a0c.png",
            button_text: "Заполните профиль"
          },
          "inviteFriend":{
            name: "Пригласите друга",
            pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/a6f3c1bc8ea6217bf09cdd16e1f24634.png',
            button_text: "Пригласите друга"
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
          "get": "Выполнить"
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
          "11": "Ноя",
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