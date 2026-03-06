# BCA — Event Countdown

A refined countdown timer app built with **Vite + React + TypeScript + Tailwind CSS v4**.

## Quick Start

```bash
npm install
npm run dev
```

## Stack

- **Vite 6** — build tool
- **React 18** + **TypeScript**
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, CSS-based config with `@theme` in `index.css` (no `tailwind.config.js`)
- `uuid` for stable IDs
- `localStorage` for persistence no backend needed

## What I Built

**BCA (Benedict countdown app)** is a countdown collection with a luxury editorial aesthetic. The design is a high end product, where every second feels deliberate.

### Design Choices

- **4-tier urgency system** with distinct colors: Critical (red) -> Soon (amber) -> Upcoming (green) -> Horizon (blue)
- **SVG progress ring** shows how far along the event is from creation -> deadline
- **JetBrains Mono** for numbers gives a precision/instrument feel; **Playfair Display** for names adds editorial weight
- **Seconds digit** ticks in the urgency color, making time feel alive
- **Pulsing glow** on critical events creates urgency without being aggressive
- Hover reveals edit/delete; delete requires inline confirmation to prevent accidents

### Features
- ✅ Create/edit/delete countdowns (name, date/time, emoji (EMOJIS are gotten through the windows emoji key, just Windows + period), description)
- ✅ Live ticking display (days + hr:min:sec)
- ✅ Visual urgency differentiation (color, glow, label)
- ✅ Sort by soonest / most recently created / alphabetical
- ✅ Persists via localStorage
- ✅ Responsive (1/2/3 column grid)

## What I'd Improve With More Time

1. **Completion animation** —  a cinematic moment when the event arrives
2. **Drag-to-reorder** — manual ordering for power users
3. **Time zone support** — per-event timezone selection
4. **Categories/tags** — filter by type (work, personal, etc.)
5. **Compact list view** — denser layout for many events

## Challenges

- **Tailwind v4 CSS config** — `@theme` in CSS replaces `tailwind.config.js`; custom tokens like `bg-bg`, `text-text-primary`, `shadow-accent-glow` are defined in `index.css`
- **SVG ring math** — `stroke-dashoffset` with `rotate(-90deg)` to anchor at 12 o'clock
- **datetime-local dark theme** — calendar picker icon needed `filter: invert(0.6)` to be visible

## Time Spent

~3 hours
