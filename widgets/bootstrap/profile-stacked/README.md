# Руководоство по настройке

Идет речь о 

# Пример конфига

```
{
    "styles": {
        "spm_profile-block-wrapper": {
            "background": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/29b2150b570a651b4907beea24379aa2.png) no-repeat 30% -50px/auto 110%"
        },
        "spm_profile": {
            "font-family": "Acrom",
            "background": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/56a5cddb28b2ce665d011358e5e52744.png) no-repeat 30% -50px/auto 110%"
        },
        "@media (max-width: 750px) | spm_profile-block-wrapper": {
            "background-position": "30% bottom"
        },
        "@media (min-width: 1678px) | spm_profile": {
            "padding": "2% 0",
            "background-size": "cover",
            "background-position": "center bottom"
        },
        "@media (max-width: 750px) | spm_profile": {
            "background-position": "30% bottom"
        }
    },
    "enabled": true,
    "id": "profile",
    "texts": {
        "empty_status": "Нет статуса",
        "left_for_status": "Осталось<br>",
        "your_status": "Ваш статус:",
        "welcome": "Здравствуйте, ",
        "modals": {
            "profile": {
                "save": "Сохранить",
                "title": "Заполнить<br>профиль"
            },
            "history": {
                "date": "дата",
                "action": "действие",
                "points": "баллы",
                "empty": "Вы еще не совершали никаких действий",
                "title": "История"
            }
        },
        "header": "Добро пожаловать в&nbsp;бонусную программу",
        "error": "Ошибка",
        "your_discount": "Ваша скидка ",
        "open_history": "ИСТОРИЯ",
        "unconfirmed": "НЕАКТИВНЫЕ",
        "open_status": "Все статусы",
        "unconfirmed_tooltip": "Баллы которые еще не подтвердились"
    },
    "images": {
        "empty_status": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/1834f62f62f6a5011d447636714ad89d.png",
        "close": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/459234d99339b7ea5c10d772f9d62ba0.png"
    },
    "options": {
        "menu_selector": ".spm_menu",
        "config": {
            "fields": [
                {
                    "input": "text",
                    "required": true,
                    "type": "system",
                    "name": "firstName",
                    "label": "Имя"
                },
                {
                    "input": "text",
                    "required": true,
                    "type": "system",
                    "name": "lastName",
                    "label": "Фамилия"
                },
                {
                    "input": "email",
                    "required": true,
                    "type": "system",
                    "name": "addEmail",
                    "label": "Email"
                },
                {
                    "name": "addPhone",
                    "placeholder": "+7 (999) 999-99-99",
                    "required": true,
                    "label": "Телефон",
                    "input": "phone",
                    "type": "system"
                },
                {
                    "input": "date",
                    "required": true,
                    "type": "system",
                    "name": "birthDate",
                    "label": "Дата рождения"
                }
            ],
            "errors": {
                "email is not valid": "Неправильно указан email",
                "-200010": "Такой email уже используется",
                "phone is not valid": "Неправильно указан телефон",
                "-200007": "Такой телефон уже используется"
            },
            "tag": "Отредактировал профиль"
        },
        "events": {
            "SUM_PURCHASE": 10000017
        }
    }
}
```