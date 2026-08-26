# Portfolio Novyy

Тёмный минималистичный лендинг-портфолио на чистом HTML/CSS/JS, без сборки.

## Структура

```
index.html
css/style.css
js/main.js
assets/        # изображения для секций About / Work
```

## Локальный просмотр

Открыть `index.html` в браузере, либо поднять локальный сервер:

```bash
python3 -m http.server 8000
```

## Деплой на GitHub Pages

1. Создать пустой репозиторий на GitHub (без README/лицензии).
2. В этой папке:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_РЕПОЗИТОРИЯ>
   git push -u origin main
   ```
3. В настройках репозитория: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, ветка `main`, папка `/ (root)`.
4. Через пару минут сайт будет доступен по адресу `https://<username>.github.io/<repo>/`
   (либо `https://<username>.github.io/`, если репозиторий называется `<username>.github.io`).

## Что заменить перед публикацией

- `index.html` — имя, текст About, названия/теги проектов, email и ссылки в Contact.
- `assets/` — добавить реальные изображения (фото, превью проектов) и подключить их вместо плейсхолдеров в `css/style.css` (`.photo-frame`, `.work-preview`).
