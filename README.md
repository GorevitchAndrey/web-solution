# Portfolio sample projects

Next.js 14 (App Router) + Tailwind CSS. Each sample is its own route:

- `/altitude` — Fernline (luxury travel / mountain lodges)
- `/loopline` — Loopline (SaaS / AI scheduling)
- `/kuro` — Kuro (restaurant / ramen bar)
- `/kinetic` — Ferrous (creative agency / motion design)
- `/densho` — Densho (e-commerce / pour-over coffee) — redesigned

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```
npm run build
```

Configured with `output: "export"` in `next.config.mjs`, so `npm run build` produces a static
`out/` folder you can deploy anywhere (Vercel, Netlify, S3, etc). Remove that line if you end up
needing server-side features (API routes, ISR, etc) for a real client project.

Each page's color tokens and font families live in `tailwind.config.ts`, namespaced by project
(`alt-`, `loop-`, `kuro-`, `kin-`, `den-`) so you can freely copy a single page into another
project without color collisions.
