<<<<<<< HEAD
# IGNITO — Techfest of the Cosmos

A space-themed techfest website built with **React + Vite + Tailwind CSS**.
Eight flagship events orbit as planets, side competitions twinkle as stars, the
Sun and Moon host the opening and closing ceremonies, a black-hole-inspired
"Beyond the Event Horizon" section carries the schedule, and **Rocky** (from
*Project Hail Mary*) rides along as the mission mascot — tap him for a mission
update, or wait for the nebula field to react to your cursor / finger.

## Stack
- React 18
- Vite 5
- Tailwind CSS 3 (custom space palette + animation tokens in `tailwind.config.js`)
- No external UI libraries — the orbiting planets, flip-card stars, comet
  cursor, and reactive starfield are all hand-built.

## Project structure
```
ignito/
├─ public/
│  ├─ nebula-veil.jpg     ← hero backdrop (Veil Nebula reference image)
│  ├─ rocky.jpg           ← mascot image
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Events.jsx              (8 planets)
│  │  ├─ Competitions.jsx        (star grid, flip-to-reveal)
│  │  ├─ CelestialSpecials.jsx   (Sun + Moon ceremonies)
│  │  ├─ Interstellar.jsx        (event horizon / schedule)
│  │  ├─ Contact.jsx
│  │  ├─ Footer.jsx
│  │  ├─ RockyMascot.jsx         (floating interactive mascot)
│  │  ├─ StarfieldCanvas.jsx     (pointer/touch-reactive canvas)
│  │  └─ CustomCursor.jsx
│  ├─ data/
│  │  ├─ eventsData.js
│  │  └─ competitionsData.js
│  ├─ hooks/useReveal.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ package.json
```

## Run locally
```bash
npm install
npm run dev
```
Visit `http://localhost:5173`.

## Build for production
```bash
npm run build
npm run preview   # sanity-check the production build locally
```
This outputs a static `dist/` folder.

## Deploy

### Vercel (recommended)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
4. Deploy — no environment variables needed.

### Netlify
1. Push to GitHub, then **New site from Git** on Netlify.
2. Build command: `npm run build`. Publish directory: `dist`.

## Content notes
- All event, competition, and schedule content is dummy/sample data meant to
  be replaced with real fest information — see `src/data/*.js`.
- Replace `public/rocky.jpg` and `public/nebula-veil.jpg` with your own
  licensed imagery before any public/production deployment; the bundled
  files are placeholders carried over from the design brief.
- Colors, type, and animation tokens live in `tailwind.config.js` — change
  the `nebula-*`, `star-*`, and `void` colors there to re-theme the whole site.

## Accessibility
- Respects `prefers-reduced-motion` (starfield freezes, CSS transitions
  collapse to near-zero duration).
- Keyboard-focusable nav, planet buttons, and star cards all show a visible
  focus ring via Tailwind's default focus styles plus custom `ring-*` states.
- Custom cursor only replaces the pointer on fine-pointer (mouse/trackpad)
  devices; touch devices keep native touch behavior throughout.
=======
# Ignito
>>>>>>> 8c00195e560baff139b4732e67d1eecc53c3fe9b
