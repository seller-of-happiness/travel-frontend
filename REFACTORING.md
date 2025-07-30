# Рефакторинг проекта TRAVEL-FRONT

## Примененные принципы

### KISS (Keep It Simple, Stupid) - Делай проще

**Улучшения:**

- ✅ Упрощена логика в `ArticleCard.vue` - убрана избыточная проверка `homeStore.articles.length > 1`
- ✅ Упрощен `Header.vue` - убраны лишние div'ы и навигация
- ✅ Упрощен `ThemeSwitcher.vue` - убран неиспользуемый класс `swap-off`
- ✅ Упрощен `usePhotoSwipe.ts` - убраны избыточные экспорты
- ✅ Упрощена структура - страницы перенесены в папку `pages/`

### DRY (Don't Repeat Yourself) - Не повторяйся

**Улучшения:**

- ✅ Создан файл `types/index.ts` с общими типами - устранено дублирование интерфейсов
- ✅ Создан `useThemeClasses.ts` - устранено дублирование классов темы
- ✅ Создан `useNavigation.ts` - устранено дублирование логики навигации
- ✅ Обновлены все компоненты для использования общих composables

### YAGNI (You Aren't Gonna Need It) - Не делай лишнего

**Улучшения:**

- ✅ Удален неиспользуемый импорт `useHomeStore` из `ArticleCard.vue`
- ✅ Удалено поле `url` из интерфейса `Photo` (используется только `previewUrl` и `webpUrl`)
- ✅ Удалены файлы `.DS_Store`
- ✅ Удален старый `ArticlePage.vue` из components
- ✅ Упрощена логика выбора изображения в `ArticleCard.vue`

## Новая структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── ArticleCard.vue
│   ├── CustomPhotoSwipeAdapter.vue
│   ├── Header.vue
│   └── ThemeSwitcher.vue
├── pages/              # Страницы приложения
│   ├── HomePage.vue
│   └── ArticlePage.vue
├── composables/        # Переиспользуемая логика
│   ├── useArticlePhotos.ts
│   ├── useNavigation.ts
│   ├── usePhotoSwipe.ts
│   └── useThemeClasses.ts
├── stores/            # Состояние приложения
│   ├── article.ts
│   ├── home.ts
│   └── theme.ts
├── types/             # Общие типы
│   └── index.ts
└── router/            # Маршрутизация
    └── index.ts
```

## Преимущества новой структуры

1. **Лучшая организация кода** - страницы отделены от компонентов
2. **Меньше дублирования** - общие типы и composables
3. **Проще поддержка** - логика вынесена в composables
4. **Лучшая типизация** - единые интерфейсы
5. **Чище код** - убраны избыточные проверки и импорты
