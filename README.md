# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open any workout to see its specs and step-by-step instructions, lock up to five lifts into today's plan, and watch your minutes and calories add up.

**Live site:** [fitlog-nafisa2.vercel.app](https://fitlog-nafisa2.vercel.app/)

## 🛠️ Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) with Context API
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) components
- [Sonner](https://sonner.emilkowal.ski) for toast notifications
- [Lucide](https://lucide.dev) icons

## ✨ Features

1. **Workout Library** — all twelve workouts from the API shown as responsive cards with tags, equipment, duration, calories, and rating.
2. **Workout Detail Page** — two-column layout with a specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions.
3. **Today's Plan & Saved** — add lifts to today's plan (capped at 5) or save them for later; the navbar badges update live and a toast confirms every action.
4. **My Plan Page** — live stats (exercises, minutes, calories), Today's Plan / Saved tabs, "Mark as Done", remove buttons, and a friendly empty state.
5. **Sort By** — sort the library or your plan by duration, calories, or rating.
6. **Saved in localStorage** — your plan and saved lifts survive a page reload.
7. **Reliable data loading** — loading spinners, an automatic switch to a backup API if the main one fails, and a custom 404 page.
8. **Fully responsive** — works on mobile, tablet, and desktop.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 📡 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
- Backup: `https://api.api-store.workers.dev/api/fitlog`
