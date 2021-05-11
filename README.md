# Best edu - education platform

Клиентская часть приложения использует фреймворк [Vue.js](https://vuejs.org/) и в качестве шаблона [CoreUI](https://coreui.io/).

Веб приложение предоставляет платформу для обучения которая дает удобные инструменты для создания материала и его просмотра через web-браузер.

Для централизованного управление передачей сообщений между всеми пользователями или распределение функций синхронизации сообщений между всеми участниками сетевого взаимодействия используется в качестве web-сервера [Spring Boot web-приложение](https://github.com/IlnyrNazargulov/best-edu-backend) развернутое на отдельной машине.

Данное приложение имеет несколько важных функций:

- предоставляет удобный доступ к дисциплинам и позволяет быстро найти по имеющимся фильтрам необходимый материал;
- позволяет группировать занятия в блоки, которые в системе называются дисциплинами;
- использование конструктора для создания занятий;
- возможность прикрепить дополнительные материалы к занятию;
- предоставление пользователям с ролью "преподаватель" администрировать доступ к своим дисциплинам;
- редактировать личную карточку.

Сценарий взаимодействия с платформой для пользователя с ролью "преподаватель":

Вход в платформу
![login-page](https://nimbus-screenshots.s3.amazonaws.com/s/8d1507867afaace91f5c54f10254120a.png)

Главная страница
![main-page](https://nimbus-screenshots.s3.amazonaws.com/s/24a29690bcff6c40924e323e63bc7e82.png)

Экран с дисциплиной
![discipline-page](https://nimbus-screenshots.s3.amazonaws.com/s/d27bec30ee9921bd104887f8663b464c.png)

Экран с занятием
![exercise-page](https://nimbus-screenshots.s3.amazonaws.com/s/6e8ad3e8e0f4fcebb52f85e0137e3b71.png)

Экран с дополнительными материалами занятия
![exrta-exercise-page](https://nimbus-screenshots.s3.amazonaws.com/s/863575091f07281cb50d3a252fec5fae.png)

Экран с списком преподавателей
![teachers-page](https://nimbus-screenshots.s3.amazonaws.com/s/d1c84e53897ac678b663fbf4007b8e83.png)

Профиль пользователя
![profile-page](https://nimbus-screenshots.s3.amazonaws.com/s/4c3dbb3fe51498aefab43d9991be6795.png)

Управление доступом к дисциплине
![access-discipline](https://nimbus-screenshots.s3.amazonaws.com/s/d482138f30dd886646f6cdd4c648da4a.png)

Управление личными дисциплинами
![my-disciplines](https://nimbus-screenshots.s3.amazonaws.com/s/cd3ed79ff1bc96d4684b8159aee812b4.png)

Управление дисциплиной
![my-discipline](https://nimbus-screenshots.s3.amazonaws.com/s/e8c95cc7bdb6c06e957e2f5d43170e70.png)

Управление занятием
![my-exercise](https://nimbus-screenshots.s3.amazonaws.com/s/f39c2008bf87588ce58cb8e3ecfe738e.png)
