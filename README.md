# 🌴 Frame In Goa — HH Goa 2026

**Official photo frame generator for Hacker House Goa 2026.**

Drop your photo. Pick your frame style. Post with **#FramedInGoa** on X — the system tracks submissions automatically.

## Live App

→ Deploy to Vercel (instructions below)

## Features

- **4 Frame Styles**: Profile (1:1), Builder ID Card (portrait), Twitter/LinkedIn Banner (16:9), Team Card (up to 3 people)
- **Drag & Drop** photo upload + click to browse
- **JPG · PNG · HEIC · WEBP** support
- **Name / Role / Twitter handle** inputs for ID card + banner
- **One-click share** for X (Twitter), LinkedIn, and Instagram with pre-written text
- **Download** as high-res PNG (1080px+)
- **Score Tracker** — plug in your post stats and see your selection score live
- Uses **real HH Goa brand assets** — palm trees, sunrise scene, the full branded look

## Hashtag

All share text includes `#FramedInGoa` — this is mandatory per task rules and is how the AI system tracks submissions.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
cd hhgoa-frame-generator
vercel --prod
```

Or just connect this repo to Vercel's GitHub integration — it auto-detects Next.js.

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Tech Stack

- **Next.js 16** (App Router)
- **Vanilla CSS** (no Tailwind, no component libs)
- **HTML5 Canvas API** for frame compositing
- **Google Fonts**: Space Grotesk, JetBrains Mono, Bebas Neue
- Real brand assets from HH Goa official materials

## Score Formula

```
points = likes×1 + replies×2 + bookmarks×3 + retweets×4 + quotes×4 + views×0.02
score  = clamp(round(points / 500 × 100), 0, 100)
```

---

Built for the HH Goa 2026 Open Trials. Not AI. Just someone who wants to go to Goa. 🌴

*Powered by 2:47PM Studio · hhgoa.com*
