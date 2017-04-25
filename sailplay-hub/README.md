# SailPlay HUB

## Описание

SailPlay HUB - это инструмент, для создания собственных виджетов для работы с сервисом SailPlay. 
За счет событийного взаимодействия и независимости от внешних библиотек, модуль удобно встраивается в любой фрэймворк или, написанный Вами код.

## Установка

    npm install sailplay-hub --save
    
Для работы с SailPlay HUB, необходимо добавить на страницу тег:
    
    <script src="hub/dist/sailplay.hub.min.js"></script>

## Принцип работы

Модуль работает на системе событий. 
Модуль взаимодействует с сервером SailPlay с помощью JSONP запросов, поэтому может располагаться на любом домене. 
Основной принцип работы с модулем:

*   Инициализация события с необходимыми параметрами с помощью метода:

    ```javascript
        SAILPLAY.send( {название-события}, {объект-параметр} );
    ```

*   Модуль выполняет асинхронные операции, затем инициирует различные события и передает обработанные данные. Установить обработчик на эти события можно с помощью метода:

    ```javascript
        SAILPLAY.on( {название-события}, {функция-обработчик-принимающая-возвращаемый-объект} );
    ```

## Примеры работы с SailPlay HUB

```javascript

    SAILPLAY.send('init', { partner_id: 206 }); //инициируем модуль для партнера с айди = 206

    SAILPLAY.on('init.success', function(){ //после успешной инициализации
      SAILPLAY.send('login', '38c6285d1b1bce88a1071f116704263bf2511b18'); //авторизуем пользователя
    });

    SAILPLAY.on('login.success', function(){ //после успешной авторизации
      SAILPLAY.send('load.user.info'); //загружаем данные пользователя
      SAILPLAY.send('load.user.history'); //загружаем историю действий пользователя
      SAILPLAY.send('load.gifts.list'); //загружаем список подарков
      SAILPLAY.send('load.badges.list'); //загружаем список бейджиков
      SAILPLAY.send('load.actions.list'); //загружаем список действий
    });

    SAILPLAY.on('load.gifts.list.success', function(gifts){ //после загрузки списка подарков
      SAILPLAY.send('gifts.purchase', gifts[0]); //пользователь получает первый подарок из списка
    });

    SAILPLAY.on('load.actions.list.success', function(data){ //после загрузки списка действий
      SAILPLAY.send('actions.perform', data.actions[1]); //пользователь выполняет второе действие из списка
    });

    SAILPLAY.on('actions.perform.complete', function(){ //после выполнения действия
      SAILPLAY.send('load.actions.list'); //обновляем список действий
    });

    SAILPLAY.on('actions.social.connect.complete', function(){  //после привязки социального аккаунта пользователем
      SAILPLAY.send('load.actions.list'); //обновляем список действий
    });

```

## Полная документация

Поный список событий, на которые реагирует модуль и события, инициируемые ими можно узнать на странице:

[http://saike.ru/sailplay/widgets/hub](http://saike.ru/sailplay/widgets/hub)


