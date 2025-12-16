# COGITO.ART - Investment Hub

React + TypeScript + Supabase проект для систематической торговли и инвестиций.

## 🚀 Деплой на GitHub Pages

Проект автоматически деплоится на GitHub Pages при каждом push в main ветку.

### ✅ Исправлено для корректной работы:

1. **React Router с basename** - добавлен `/cap-and-dev` в BrowserRouter
2. **404 Handling** - создан `public/404.html` для SPA роутинга
3. **Redirect Script** - добавлен в `index.html` для обработки GitHub Pages редиректов

### Первоначальная настройка

1. **Включите GitHub Pages в настройках репозитория:**
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "GitHub Actions"
   - Сохраните изменения

2. **Добавьте секреты Supabase:**
   - Перейдите в Settings → Secrets and variables → Actions
   - Создайте следующие секреты:
     - `VITE_SUPABASE_URL` - URL вашего Supabase проекта
     - `VITE_SUPABASE_ANON_KEY` - Anon ключ от Supabase

3. **Запустите деплой:**
   - Перейдите в Actions → Deploy to GitHub Pages
   - Нажмите "Run workflow"
   - Или просто сделайте push в main ветку

### После деплоя

Ваш сайт будет доступен по адресу:
```
https://kisa134.github.io/cap-and-dev/
```

### Локальная разработка

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:3000`

### Технические детали

- **Base Path**: `/cap-and-dev/` (настроено в `vite.config.ts`)
- **Router**: BrowserRouter с basename
- **404 Handling**: Через GitHub Pages SPA redirect workaround
- **Database**: Supabase PostgreSQL с RLS
- **Auth**: Supabase Auth (email/password)

