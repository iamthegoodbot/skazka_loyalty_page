# Руководоство по настройке и тестированию виджета

## Настройка конфига
 
Нет особенных свойств

## Требования к дизайнеру

1. картинка фона (если требуется)
3. неавторизованный (не хватает баллов) вид

## Требования к менеджеру

1. Настроить подарки
2. Настроить тип получения подарков
3. Подготовить пользователся с баллами для получения подарков

## Тест-кейсы

1. дизайн совпадает с макетом
2. карусель отображает все необходимые подарки
3. картинки подарков отображаются правильно (включая высокое разрешение)
4. карусель правильно слайдит подарки в обе стороны (если предусмотрен слайдер)
5. в случае если не хватает баллов  - кнопка получить неактивна
6. если баллов хватает кнопка получить активна и вызывает метод получения подарка, после этого открывается модалка с сообщением, заданным в подарке или конфиге, профиль обновляется (баллы), история обновляется, подарок получается

