# Landing — Webs con IA

Продающий лендинг агентства (React + Vite + Tailwind + GSAP + Lenis).
Языки: ES / EN / RU (переключатель в шапке, выбор сохраняется).

## Запуск

```bash
npm install
npm run dev     # dev-сервер
npm run build   # прод-сборка в dist/
```

## Структура

- `src/i18n/` — словари es/en/ru + LangProvider
- `src/sections/` — Hero, Marquee, Pain, AiDemo, Process, Pricing, Compare, Faq, Footer
- `src/components/` — SplitText (анимации текста), MagneticButton
- `src/lib/site.ts` — номер WhatsApp и ссылки (заменить заглушку на реальный номер)
