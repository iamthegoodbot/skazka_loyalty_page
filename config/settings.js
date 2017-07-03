const shareBtns = {
  "background-color": "#820d41",
  "color": "white",
  "text-decoration": "none",
  "text-transform": "uppercase",
  "padding": "7px 30px",
  "font-size": "18px",
  "border": "none",
  "display": "inline-block",
  "font-weight": "300",
  "cursor": "pointer",
  "height": "auto",
  "line-height": "120%",
  "text-align": "center"
}

const iframeStyles = {
  "actions": {
    'min-width': '600px'
  }
}

const buttonStyles = {
  "vk_share_btn": shareBtns,
  "fb_share_btn": shareBtns,
  "gp_share_btn": shareBtns,
  "tw_share_btn": shareBtns,
  "ok_share_btn": shareBtns
}

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
          "styles": iframeStyles
        }
      },
      "actions": {
        "system": { //'https://sailplays3.cdnvideo.ru/media/assets/assetfile/56a5a196f77d4e370bff945388536055.svg'
          "emailBinding": {
            name: "Привяжите E-Mail",
            pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/8d1895bae3f02ff8f579f114d8d60638.svg",
            button_text: "Привяжите E-Mail"
          },
          "fillProfile":{
            name: "Заполните профиль",
            pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/8d1895bae3f02ff8f579f114d8d60638.svg",
            button_text: "Заполните профиль"
          },
          "inviteFriend":{
            name: "Пригласите друга",
            pic: "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b1670d058c453ef73c4a808226674720.svg",
            button_text: "Пригласите друга"
          }
        },
        "social": {
          "vk": {
            "like": {
              "name": "Вступите в группу VK",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b47ee69856ae1ab5da892f8c282d96ea.svg',
              "styles": buttonStyles
            },
            "partner_page": {
              "name": "Рассказать о нашем магазине в VK",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b47ee69856ae1ab5da892f8c282d96ea.svg',
              "styles": buttonStyles
            },
            "purchase": {
              "name": "Поделитесь вашей покупкой в VK",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b47ee69856ae1ab5da892f8c282d96ea.svg',
              "styles": buttonStyles
            }
          },
          "fb": {
            "like": {
              "name": "Вступите в группу Facebook",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b146be18f41441fd1b551dceefaba44f.svg',
              "styles": buttonStyles
            },
            "partner_page": {
              "name": "Рассказать о нашем магазине в Facebook",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b146be18f41441fd1b551dceefaba44f.svg',
              "styles": buttonStyles
            },
            "purchase": {
              "name": "Поделитесь вашей покупкой в Facebook",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/b146be18f41441fd1b551dceefaba44f.svg',
              "styles": buttonStyles
            }
          },
          "gp": {
            "like": {
              "name": "Вступите в группу Google+",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png',
              "styles": buttonStyles
            },
            "partner_page": {
              "name": "Рассказать о нашем магазине в Google+",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png',
              "styles": buttonStyles
            },
            "purchase": {
              "name": "Поделитесь вашей покупкой в Google+",
              pic: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/d32fbca1089257b6cd36e83352f0da8a.png',
              "styles": buttonStyles
            }
          },
          "ok": {
            "like": {
              "name": "Вступите в группу Одноклассники",
              "styles": buttonStyles
            },
            "partner_page": {
              "name": "Рассказать о нашем магазине в Одноклассники",
              "styles": buttonStyles
            },
            "purchase": {
              "name": "Поделитесь вашей покупкой в Одноклассники",
              "styles": buttonStyles
            }
          },
          "tw": {
            "partner_page": {
              "name": "Рассказать о нашем магазине в Twitter",
              pic: 'dist/img/actions/twitter.png',
              "styles": buttonStyles
            },
            "purchase": {
              "name": "Поделитесь вашей покупкой в Twitter",
              pic: 'dist/img/actions/twitter.png',
              "styles": buttonStyles
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