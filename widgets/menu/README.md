# Пример конфига

```
{
    "styles": {},
    "enabled": true,
    "id": "menu",
    "texts": {
        "logout": "Выйти",
        "edit_profile": "Редактировать профиль",
        "your_balance": "У вас"
    },
    "images": {
        "menu_icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/c8fc34bced2fdad2627cf7f5a6fe8a22.svg"
    },
    "options": {
        "items": [
            {
                "selector": ".spm_profile",
                "label": "Профиль"
            },
            {
                "selector": ".spm_gifts",
                "label": "Подарки"
            },
            {
                "selector": ".spm_quests-container",
                "label": "Задания"
            }
        ],
        "logout": "/logout"
    }
}
```