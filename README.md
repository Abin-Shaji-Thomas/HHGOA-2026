# Frame In Goa — HH Goa 2026

A Next.js web app for creating event photo frames and VIP-style passes for Hacker House Goa 2026. Visitors can personalize a design in the browser and export/share the result.

## Features

- Boarding pass, VIP builder ID, profile, and team-frame designs
- Browser canvas-based image composition and export
- Photo positioning and scaling controls
- Share text using the event hashtag
- Radar score calculator based on the metrics entered by the visitor

The score is a convenience estimate using the formula shown in the app; it is not an official selection decision.

## Local development

Requirements: Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. See `package.json` for the available scripts. For a production build, use the scripts defined there; deployment settings are in `vercel.json`.

## Structure

- `app/` — Next.js App Router pages and app-level styles
- `public/` — static assets
- `package.json` and `package-lock.json` — scripts and dependency lock
- `next.config.mjs` — Next.js configuration
- `vercel.json` — Vercel configuration

## Live app

[hhgoa-2026-five.vercel.app](https://hhgoa-2026-five.vercel.app/)

## Privacy

The app processes the photo and pass details in the browser for rendering. Review the current implementation and deployment configuration before entering personal information; do not upload sensitive images or information.
