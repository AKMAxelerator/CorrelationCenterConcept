#Correlation Center Concept (original idea by The Venus Project)

*Прототип Центра Координации (оригинальная идея - Проект Венера)*

![Изображение Центра Координации](https://www.thevenusproject.com/images/hdslides/homepage/cities02.jpg "Correlation Center")

> Всё - ресурсы, любой объект - ресурс, любой объект - точка. Но в абсолюте всё: ресурсы, объекты, точки - есть связи.


> [![IMAGE ALT TEXT](http://img.youtube.com/vi/gJQTFhkhwPA/0.jpg)](http://www.youtube.com/watch?v=gJQTFhkhwPA "Turing Machines")


> [![IMAGE ALT TEXT](http://img.youtube.com/vi/s8Zlnd_NExs/0.jpg)](http://www.youtube.com/watch?v=s8Zlnd_NExs "Алгоритм изобретения")


> [![IMAGE ALT TEXT](http://img.youtube.com/vi/rien66JuLsA/0.jpg)](http://www.youtube.com/watch?v=rien66JuLsA "Сетевое планирование и управление")



Группа во ВКонтакте: https://vk.com/correlationcenter

Репозиторий с исходным кодом: https://github.com/AKMAxelerator/CorrelationCenterConcept

Эксперементальная площадка (виртуальная машина, среда разработки): https://ide.c9.io/akmaxelerator/fobos

Текущий результат экспериментов (разработок): https://fobos-akmaxelerator.c9.io/

Координация задач команды: https://better.boon.gl/projects/68/dashboard

Презентация: https://www.icloud.com/keynote/AwBWCAESECzLjDKFEaBsxJ1C8TTfGlIaKvxIRyW9xnLQhNIyuTHWGjIiOQ-jl_DgODDHVS9G4H8hIgDfFg_hiYSa8gMCUCAQEEILxLJ_M4OYQJrDnGOJ9_jgns-AXtCOrjjIwvWghQJwiI


# Текущее состояние разработки:

## Готово:

+ Скачать все внешние зависимости в репозиторий, чтобы не было сюрпризов в будущем.
+ Адаптировать меню под мобильные телефоны.
+ Убрать лишние заголовки в секциях и отступы, меню достаточно.
+ Удаление .gitignore файла.
+ Добавлен favicon.ico
+ Реализовано редактирование одной локальной производственной цепочки с использованием https://github.com/josdejong/jsoneditor ( http://www.jsoneditoronline.org/ )
+ Решить проблему с конфликтами названий css классов json editor и bootstrap (использование iframe помогло).
+ Разрешить отображение отдельных элементов, для которых ещё нет связей, чтобы поддержать процесс редактирования непосредственно на визуализации.
    
## В разработке:

- Заменить двойной щелчёк по группе - щелчком по квадратику и ещё одним щелчком по кружочку (без фона, только граница), чтобы раскрыть группу.
- Реализовать масштабирование диаграммы по всей ширине экрана и высоте экрана.
- Реализовать Zoom скроллом и жестами на мобильниках (можно применить em или другой вид изменяемых базовых единиц).
- Реализовать редактируемое описание групп, ресурсов, связей между ресурсами. (можно попробовать http://jeremydorn.com/json-editor/)
- Добавить иконки. Сделать текст видным только при отсутствии иконки и при наведении мышкой (нажатии на телефоне).
- Обновить презентацию CorCen, описав что всё описанное ранее было ресурсом (а не объектами в общем понимании, что любой объект эквивалентен ресурсу в ресурсо-ориентированной экономике), устранить концентрацию на отдельных объектах в привычном русле мышления (энертности мышления по ТРИЗ).
- Поддержка интернационализации (английский, русский и т.п.)
- Поддержка RTL (справа на лево - иврит, арабский) и LTR (слева на право - русский, английский) написания.
- Проработать возможность объединения всех JavaScript и CSS файлов в один html файл. Провести тесты, какой вариант быстрее загружается, в каких браузерах, на каких платформах.
- Реализация безопасного JSON протокола.
- Наладка коммуникации с node.js через socket.io (альтернативный вариант - использование meteor)
- Запустить параллельно 3 ветви разработки:
  +    Реализация "режима бога" клиента подключаемого напрямую к кластеру БД с полными правами доступа. (используя http://electron.atom.io/)
  +    Реализация внешнего клиента, подключаемого через безопасный JSON протокол. (используя http://electron.atom.io/)
  +    Реализация полностью автономной системы, устанавливаемой на любую машину/устройство.
- Побрать логотип, или определиться, что он не нужен.
- Уточнить название проекта, название домена с которого он стартанёт, или определиться что они не нужны. Если нужны - нужно закупать домен сейчас.
- Следить за выгрузкой тех элементов, которые уже не отображаются. Не выполнять рендеринг и обработку тех элементов, которые в данный момент не отображаются.
- Посмотреть лог обращений к веб-серверу, подготовить иконки для обычных и мобильных браузеров.
- Исправить отображение tooltip (вести за мышкой на desktop, убирать на мобильных).
- Узнать почему страница тормозит на айфоне при переходе от главной страницы к цепям.
- Минимизировать анимацию на iphone. (возможно анимацию нужно делать опцией, вкл/выкл).
- Узнать почему на iPhone такой большой отступ в цепях.
- Проверить совместим ли svg и обычный css. + Да
- Сделать две переключаемых темы, светлую и тёмную.
- Организовать папки scripts, styles, images в папку content или static.
- Реализовать виды отображения данных:
  +    Диаграмма ганта
  +    Календарь событий
- Проанализировать возможность интеграции с проектами Bettermeans (https://github.com/mockdeep/better) и Pandora (https://github.com/Novator/Pandora).
        
## Повторяемые задачи перед каждым выпуском (версией):

- Рефакторинг, упрощение, оптимизация исходного кода.
- Завершение версии, публичное обсуждение среди кооператоров.


# Roadmap

## Space-time (unique and complete basic coordinate of Resources and Events)
- Space (solar system) page link
- Sun page link
- Earth page link
- Moon page link
- Mars time
- 3D model (switch to 2D back will be always available, 1D is just reqular line of text, for example: 2015-08-24 22:22)
- Realistic proportions
https://en.wikipedia.org/wiki/Opposition_(planets)
https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BB%D0%B0%D0%BD%D0%B5%D1%82%D1%8B

## Measurement System setting

## Directionality setting (visual data flow direction), that affects:
- Menu position
- Links (arrows) direction
- Sequence flow direction
- Time flow direction
- Graph flow direction
- Text flow direction (left to right, right to left, etc)
- etc
https://en.wikipedia.org/wiki/Writing_system#Directionality
https://en.wikipedia.org/wiki/Right-to-left

## Language setting
- Multilanguage support (legacy, only while the transition to the Venus Project)
  + English
  + Russian
  + etc
- Universal language (not designed yet)

## Resources/Enviroment/State (Anything that seems unchanging, stable)
- Meta-resources (information): classes, categories, types, etc.
- Real-resources (actual physical objects): matter, forces, energy, etc.

## Events/Changes/Transitions/Log/History/Actions (Every fact, the record of any change)
- Past events
- Events registration (manual and automatic)
- Events proof
- Registration of "supply and demand", "possible alternatives and requirements", "existed and have to be existed", reason of change in "supply and demand" is a change of enviroment. Any change or transition is event.
- Event access levels
- Public access through API

## Chain/Algorithm/Technology (Every transition that can applied on demand)
- Alternative visualizations
- Alternative editors
- Visualizations with editor capability

## Chains/Algorithms/Technologies/Processes/Transitions plan/Resources flow (Everything that builds up the ecosystem)
- Add support for multiple chains.
- Search resources for chain.
- Global chain map
- Gantt diagram
- Events planning
- BetterMeans integration

## API (Communication between systems)
- Protocol
- Access levels (user, groups, roles, etc)

## Tests (System usage, application, quality)
- Browsers
- Real world manufacture
