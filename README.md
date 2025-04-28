# Type game
###### Вдохновлено [monkeytype](https://monkeytype.com)
[![quick_look_2](https://github.com/user-attachments/assets/7a5c7c89-57de-42d7-a339-cd617e4da32d)](https://type-game-nuxt.netlify.app/)

![image](https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![image](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## О проекте
Это игра про развитие скорости печати, с клавиатуры или тачскрина.
На экране в реальном времени будут показаны скорость печати, правильность, и время, затрачиваемое на тест.
Игра имеет несколько уровней сложности от классического опыта печати до завершения теста при первой же ошибке. 
Игровой процесс можно настроить под себя. Например, запретить движение по тексту,
пока текущее слово не будет введено верно. Больше опций можно посмотреть в [настройках игры](https://type-game-nuxt.netlify.app/config).
Отображение приложение кастомизируется: светлая и тёмная цветовые темы, шрифты sans, serif и mono,
размер шрифта и длина текста.
В приложении по умолчанию включены анимации: плавное движение курсора и плавный скролл рядов. Их можно отключить.  

[type-game-nuxt](https://type-game-nuxt.netlify.app/)


## Лист фич

- [x] тест скорости печати
  - [x] поддержка и с клавиатуры, и с тачскрина
  - [x] live статистика
  - [x] несколько уровней сложности
  - [x] остановка на ошибке
  - [x] свободное движение назад по тексту
- [x] кастомизация
  - [x] шрифт
  - [x] размер шрифта
  - [x] длина текста
  - [x] светлая и тёмная темы
- [x] анимации
  - [x] плавное движение курсора
  - [x] плавный скролл рядов

## Запустить локально

git clone https://github.com/kirillmihalych/type-game-nuxt.git

cd type-game-nuxt

pnpm install

pnpm dev
