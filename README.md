# Travel Frontend - Wanderlust

Современное веб-приложение для просмотра туристических маршрутов и точек интереса, построенное на Vue 3 с использованием TypeScript и Tailwind CSS.

## Описание

Travel Frontend - это интерактивное веб-приложение для путешественников, которое позволяет просматривать туристические маршруты, точки интереса и галереи фотографий. Приложение предоставляет современный пользовательский интерфейс с поддержкой темной/светлой темы и адаптивным дизайном.

## Технологии

- **Framework**: Vue 3.2+ с Composition API
- **Language**: TypeScript 4.0+
- **Build Tool**: Vite 4.0+
- **Styling**: Tailwind CSS 3.0+ + SCSS
- **State Management**: Pinia 2.0+
- **Routing**: Vue Router 4.0+
- **Photo Gallery**: Vue Photo Album + PhotoSwipe 5.4+
- **Package Manager**: npm

## Основные возможности

- 🏠 **Главная страница** - список всех туристических маршрутов
- 📄 **Детальная страница маршрута** - подробная информация о маршруте с точками интереса
- 📸 **Фотогалерея** - интерактивный просмотр фотографий с PhotoSwipe
- 🌓 **Переключение темы** - поддержка светлой и темной темы
- 📱 **Адаптивный дизайн** - оптимизация для всех устройств
- ⚡ **Быстрая загрузка** - оптимизация производительности с Vite

## Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── ArticleCard.vue      # Карточка маршрута
│   ├── CustomPhotoSwipeAdapter.vue  # Адаптер для PhotoSwipe
│   ├── Footer.vue           # Подвал сайта
│   ├── Header.vue           # Шапка сайта
│   └── ThemeSwitcher.vue    # Переключатель темы
├── pages/              # Страницы приложения
│   ├── HomePage.vue         # Главная страница
│   └── ArticlePage.vue      # Страница маршрута
├── composables/        # Переиспользуемая логика
│   ├── useArticlePhotos.ts  # Работа с фотографиями
│   ├── useNavigation.ts     # Навигация
│   ├── usePhotoSwipe.ts     # Интеграция с PhotoSwipe
│   └── useThemeClasses.ts   # Классы темы
├── stores/            # Состояние приложения (Pinia)
│   ├── article.ts          # Состояние статьи/маршрута
│   ├── home.ts             # Состояние главной страницы
│   └── theme.ts            # Состояние темы
├── types/             # TypeScript типы
│   └── index.ts            # Общие интерфейсы
├── router/            # Маршрутизация
│   └── index.ts            # Конфигурация роутера
├── assets/            # Статические ресурсы
├── App.vue            # Корневой компонент
├── main.ts            # Точка входа
└── index.css          # Глобальные стили
```

## Установка и запуск

### Предварительные требования

- Node.js 18+
- npm или yarn
- Backend API (см. [Travel Backend](https://github.com/seller-of-happiness/travel-backend))

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:3002
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3002`

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр сборки

```bash
npm run serve
```

## API Интеграция

Приложение настроено для работы с Travel Backend API

## Лицензия

MIT License

## Связанные проекты

- [Travel Backend](https://github.com/seller-of-happiness/travel-backend) - Backend API на NestJS
