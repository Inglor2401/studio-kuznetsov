# STUDIO KUZNETSOV

Третий портфолио-кейс — сайт вымышленной мастерской архитектуры интерьеров (Артём Кузнецов, Москва, residential premium).

## Direction

Архитектурный минимализм (вайб Vincent Van Duysen, John Pawson). Контраст к двум готовым кейсам:

- Mala Muerte — тёплый, насыщенный, декоративный
- Maya Sorokina — тёплый, мягкий, человечный
- **Studio Kuznetsov — холодный, рассудочный, премиальный**

## Brand levers (locked 2026-05-01)

| # | Lever | Value |
|---|---|---|
| 1 | Mood | Монастырская тишина |
| 2 | Refs | vincentvanduysen.com, pawson.com |
| 3 | Запрещено | Serif в display, cream/beige фоны, radius > 0, soft shadows, glassmorphism, gradient bg, эмодзи в навигации, "карточки" с фоном, Roboto/Open Sans/Montserrat/Lato |
| 4 | Шрифты | General Sans (Fontshare) display+body, JetBrains Mono для технических подписей |
| 5 | Signature | Monospace маргиналии у каждого фото + 1px линии-разделители секций |
| 6 | Radius/shadow/motion | radius=0, без shadows, fade-in 600ms + scale(1.02) на hover |
| 7 | Радикальный ход | Floor plan + section drawing на каждой странице проекта |
| 8 | Анти-список | 4 пункта: Pinterest / типовые решения / бюджет < 8 млн / без авторского надзора |
| 9 | Perf-бюджет | LCP ≤ 2.5s, page weight ≤ 2MB, image ≤ 300KB, Lighthouse ≥ 90 |

## Палитра

```
--color-bg:          #FFFFFF   pure white
--color-text:        #0A0A0A   near-black
--color-text-muted:  #6B6B6B   secondary
--color-border:      #E5E5E5   1px lines
```

Без акцентного цвета. Hover-state — opacity или border-only.

## Stack

- **Astro 6** static
- Контент: `src/data/site.ts` (typed, single source of truth)
- Шрифты: Fontshare CDN + Google Fonts CDN (на финале — self-host woff2)
- Изображения: AVIF + responsive `<picture>` (TODO)
- Деплой: Vercel

## Структура

```
studio-kuznetsov/
├─ src/
│  ├─ pages/
│  │  ├─ index.astro          (home: featured + grid + studio + anti-list + press + cta)
│  │  ├─ studio.astro         (bio + approach + press + faq)
│  │  ├─ materials.astro      (10 материалов — radical move support)
│  │  ├─ contact.astro        (3 канала + бриф-форма)
│  │  └─ projects/[slug].astro (×8 — фото + floor plan + section + материалы)
│  ├─ layouts/Layout.astro
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ ProjectGrid.astro
│  │  ├─ AntiList.astro
│  │  └─ Marginalia.astro
│  ├─ data/site.ts
│  └─ styles/global.css
└─ public/favicon.svg
```

## Команды

```bash
npm install
npm run dev      # dev сервер (localhost:4321)
npm run build    # production билд → dist/
npm run preview  # preview билда
```

## Status

- 2026-05-01: scaffold + 9 brand_levers locked, 8 фиктивных проектов в data, все страницы рендерятся
- TODO ассеты:
  - 32 фото проектов (AI-генерация: пустые архитектурные интерьеры в духе Van Duysen)
  - 8 floor plans + 8 sections (custom SVG, монохром)
  - 10 close-up материалов
  - 1 портрет Артёма (AI, Slavic male 38, architect — per memory feedback)
- TODO production:
  - Self-host шрифтов
  - AVIF + responsive picture
  - Vercel deploy
  - Lighthouse audit
