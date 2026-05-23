# Nexus Gotham

> **Where justice meets intelligence.**
> A cinematic gateway to the Bat-verse.

A dark, dramatic React landing experience built around an animated batsignal.
Cursor follows the bat. Idle disturbs the lamp. Stay too long, and a villain
takes a turn at the city.

## Stack

| Layer | Tool |
|---|---|
| Build | [Vite](https://vitejs.dev/) |
| Framework | [React 18](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + CSS Modules |
| Motion | Framer Motion + GSAP (deps installed; current code uses CSS-driven animation for performance) |
| Routing | React Router v6 |
| Icons | Lucide |

## Run locally

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production bundle
npm run preview  # preview built output
```

## Folder structure

```
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── Hero/        # all the cinematic hero pieces
│   ├── Layout/      # shared layout + navbar
│   ├── Navbar/
│   ├── effects/     # custom cursor, vignette, grain
│   └── svg/         # bat symbol + nav logo
├── pages/           # /, /rogues-gallery, /arsenal, /nexus, /archives
├── hooks/           # cursor tilt, device tilt, idle timer, reduced motion
├── context/         # scroll lock provider
├── styles/          # global.css with design tokens + keyframes
└── assets/images/   # static assets (legacy reference images live under /reference)
```

## Hero behavior

- **Cinematic intro** (≈3.5s): beam grows from the lens, headline letters
  stagger in, navbar slides down, CTA fades in.
- **Cursor follow**: the whole hero stage tilts in 3D (max 12° / 8°). A
  sky glow and bat micro-parallax follow the cursor.
- **Two idle levels**:
  - **~6.5s** — flicker pass (sub-flicker → glitch → blackout → thunk).
  - **60s** — full villain takeover with rotating quotes (Joker, Riddler,
    Two-Face, Scarecrow). Glass cracks, then the city restores.
- **Scroll gatekeeper**: `<body>` is locked until "Explore Gotham" is
  clicked. Triggering the CTA flashes white, fades to black, types
  "ENTERING GOTHAM…", then unlocks scroll.
- **Mobile fallback**: `DeviceOrientation` drives the same tilt CSS vars,
  taps emit ripples, and the lens "breathes" in place of cursor follow.
- **Reduced motion**: respected via `prefers-reduced-motion`. Animations
  collapse to instant transitions; the static composition still looks
  cinematic.

## Routes (placeholders for now)

- `/` — cinematic gatekeeper (this PR)
- `/rogues-gallery` — Batman villains catalog
- `/arsenal` — WayneTech gear
- `/nexus` — Justice League / wider universe (brighter palette)
- `/archives` — quotes index
- `/archives/:character` — per-character quote cards

## Design tokens

```
gotham-900   #0a0d14   base background
signal       #f5c518   bat lamp accent
nexusBlue    #0d1b3d   /nexus alt palette
```

## Roadmap

1. ✅ Phase 1 — IA & routing scaffold
2. ✅ Phase 2 — cinematic hero + animations
3. Phase 3 — content injection (villains JSON, gadgets JSON, quotes JSON)
4. Phase 4 — QA & polish (per-page transitions, full mobile QA)
