# SAILPLAY.HUB.ACTIONS

## Описание

SAILPLAY.HUB.ACTIONS расширяет стандартный функционал SAILPLAY.HUB, позволяя быстро и удобно работать с действиями SailPlay

## Установка

Если вы используете npm:

    npm install sailplay-hub-actions --save
    
SAILPLAY.HUB.ACTIONS требует для работы сам хаб, поэтому необходимо добавить на страницу теги:

    <script src="путь до файла sailplay.hub.js"></script>
    <script src="путь до файла sailplay.hub.actions.js"></script>

## Принцип работы

В первую очередь, необходимо запустить хаб для вашей компании: 

```javascript
    SAILPLAY.send('init', { partner_id: 206 }); //инициируем модуль для партнера с айди = 206
```

Плагин добавляет в хаб следущие события:

##actions.parse

```javascript
   SAILPLAY.send('actions.parse', actions); //Находит все элементы в документе, 
   //которые помечены атрибутом "data-sp-action" и добавляет к ним функционал действий, 
   //переданных в качестве второго параметра
```

Пример html кода действия для парсинга    
    
```html

    <div data-sp-action="action._actionId"></div>
    
```

Где:

* атрибут data-sp-action - уникальный идентификатор действия.
    
## actions.perform

```javascript
   SAILPLAY.send('actions.perform', action); //Инициирует выполнение действия, переданного в качестве второго параметра.
```
  
После выполнения действия инициируются следущие события:

### actions.perform.success - действие выполнено успешно
### actions.perform.error - при выполнении действия произошла ошибка
### actions.perform.complete - статус действия обновился, необходимо обновить список
### actions.social.connect.complete - статус привязки аккаунта изменился, необходимо обновить список

Все события возвращают объект, содержащий ответы сервера.

## Так же плагин расширяет глобальный объект SAILPLAY свойством actions


## Пример испозьзования SAILPLAY.actions

```javascript

    SAILPLAY.on('actions.perform.error', function(err){
          sp_app.log(JSON.stringify(err));
        });
    
        SAILPLAY.on('actions.perform.success', function(action){
          SAILPLAY.send('load.actions.list');
          sp_app.log(JSON.stringify(action));
        });
    
        //после выполнения действия необходимо перезагрузить список
        SAILPLAY.on('actions.perform.complete', function(action){
          SAILPLAY.send('load.actions.list');
          sp_app.log(JSON.stringify(action));
        });
    
        //после привязки аккаунта необходимо перезагрузить список действий
        SAILPLAY.on('actions.social.connect.complete', function(action){
          SAILPLAY.send('load.actions.list');
          sp_app.log(JSON.stringify(action));
        });
    
        SAILPLAY.on('actions.social.connect.success', function(action){
          SAILPLAY.send('load.actions.list');
          sp_app.log(JSON.stringify(action));
        });
        
```
    
## Пример можно посмотреть тут:

[http://saike.ru/sailplay/widgets/demo/dev/](http://saike.ru/sailplay/widgets/demo/dev/)

Исходный код страницы находится в данном репозитарии в директории: /demo/dev/

##SailPlay Actions работа с мобильными платформами

Из-за плохой совместимости с технологией WebView, 
для мобильных платформ наобходимо использовать свой механизм шарингов, вступлений в группу и лайков.

Так же необходимо инициировать sailplay.hub с флагом platform = mobile.

```javascript
    SAILPLAY.send('init', { partner_id: 206, platform: 'mobile' }); //инициируем модуль для партнера с айди = 206 для мобильных платформ
```

После выполнения пользователем социального действия, для регистрации его в системе SailPlay, используйте метод **actions.perform**:


```javascript

    SAILPLAY.send('load.actions.list');
    
    SAILPLAY.on('load.actions.list.success', function(data){
    
     SAILPLAY.send('actions.perform', data.actions[0]); //регистрируем выполнение первого действия из списка, полученного с сервера SailPlay
      
    });
    
    SAILPLAY.on('actions.perform.success', function(action){
      alert('Действие выполнено успешно: ' + action._actionId);
    });
```


