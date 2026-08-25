# Zosimov Ivan — Motion Designer Portfolio

Статичный одностраничный сайт-портфолио. Чистый HTML/CSS, без сборки и зависимостей.

## Структура

- `index.html` — разметка и контент
- `style.css` — стили (тёмная монохромная тема, каталог/масонри-сетка)

## Что нужно доделать

- Заменить 6 плейсхолдер-проектов на реальные работы (превью-картинки/видео, описания)
- Проверить/поправить блок "О себе" и список навыков
- При необходимости подключить реальные видео (YouTube/Vimeo/Behance embed или mp4 в репозитории)

## Деплой на GitHub Pages

1. Создай новый репозиторий на GitHub (например `portfolio`), без README/gitignore при инициализации через веб — они уже есть локально.
2. В этой папке выполни:

   ```bash
   git remote add origin https://github.com/<твой-username>/<репозиторий>.git
   git branch -M main
   git push -u origin main
   ```

3. На GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, ветка `main`, папка `/ (root)`. Сохрани.
4. Через 1-2 минуты сайт будет доступен по адресу:
   `https://<твой-username>.github.io/<репозиторий>/`

Если репозиторий назван `<твой-username>.github.io`, сайт будет доступен прямо по
`https://<твой-username>.github.io/` без имени репозитория в пути.
