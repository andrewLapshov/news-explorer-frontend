# news-explorer-frontend

## Фронтенд для сервиса News Explorer в рамках дипломного проекта на курсе "Веб-разработчик" в Яндекс.Практикуме.

### Описание

Проект по созданию сервиса "News Explorer" для поиска новостей по агрегаторам новостей в Интернет-СМИ. На данном этапе реализована верстка макета проекта, логика будет реализована на этапе JavaScript. Проект состоит из двух страниц - главной страницы и личного кабинета пользователя. Сайт адаптирован под все популярные разрешения устройств. Для сборки проекта использован Webpack, Babel для транспиляции JS кода, проставлены вендорные префиксы.

### Возможности сервиса

Для поиска новостей необходимо ввести ключевое слово в строку ввода и нажать "Искать". Отобразиться список карточек из актуальных новостей за последние 7 дней. Карточки подгружаются по 3 штуки, для отрисовки следующих трех карточек необходимо нажать кнопку "Показать еще". По клику на каждой карточке открывается новость в первоисточнике.

Каждую карточку можно сохранить себе в закладки в личный кабинет, но для этого необходимо авторизоваться. При нажатии на кнопку "Авторизоваться" в шапке сайта откроется попап входа. Если аккаунт не создан - нужно нажать кнопку "Зарегистрироваться" и создать пользователя. После создания пользователя и входа появится возможность войти в личный кабинет - по нажатии на кнопку "Сохраненные статьи".

На странице "Сохраненные статьи" отображается информация по сохраненным новостям - их количество и ключевые слова. Сами новости располагаются ниже, в формате карточек аналогичной заглавной странице. Каждую новость можно удалить (по нажатию кнопки корзины в углу карточки) и также открыть в первоисточнике.
При нажатии кнопки выхода в шапке страницы происходит возврат на заглавную страницу.

### Используемые технологии

Нативный JS, CSS, HTML, Webpack, GIT, Babel.

### Локальный запуск

1. Склонировать репозиторий
2. Доставить отсутствующие модули npm
   ```
       npm install
   ```
3. Запустить локальный сервер
   ```
       npm run dev
   ```

### Продакшн сборка

1. Склонировать репозиторий
2. Доставить отсутствующие модули npm
   ```
       npm install
   ```
3. Запустить сборку проекта
   ```
       npm run build
   ```
4. Для деплоя на Github Pages
   ```
       npm run deploy
   ```

### Ссылка на проект

https://andrewlapshov.github.io/news-explorer-frontend/
