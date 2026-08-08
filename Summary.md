# Hacker House Goa 2026 — Frame & ID Card Generator
## Master Project Documentation & Context Summary for AI Agents

> **Note for AI Agents / Contributors**: This document contains complete context about the event, the prompt task, project architecture, design system, canvas rendering engine, asset mappings, and deployment instructions. Read this file to instantly resume development in any new workspace.

---

## 1. 🌴 Event & Context Details

- **Event Name**: Hacker House Goa 2026 (HH Goa 2026)
- **Dates**: October 28–31, 2026
- **Location**: Private Beach Resort, Goa, India
- **Scale**: 247 builders selected from 20,000+ registrations
- **Organizers / Partners**: Powered by **2:47 PM Studio**
- **Official Web Domain**: [hhgoa.com](https://hhgoa.com)
- **Official Hashtag**: `#FrameInGoa` (used on X / Twitter to track submissions & feature builders on the Radar)

---

## 2. 🎯 Task Requirement & Criteria

### Primary Goal
Build an **instantly recognizable, highly professional, human-engineered** HH Goa 2026 themed photo frame and ID card generator.

### Essential Features & Rules:
1. **Instantly Recognizable Identity**: Uses the official HH Goa color palette (Forest Green, Electric Yellow, Hot Pink) and brand assets.
2. **Speed & Zero Login Walls**: Instant load, fast canvas generation, no forced logins or signups.
3. **No Mandatory Manual Cropping**: Handles real photos (portrait, landscape, off-center) gracefully.
4. **Interactive Photo Drag & Zoom**: Allows users to click & drag on the preview image to reposition (pan) and zoom their photo.
5. **Personalized Details**: Full Name, Role, Tech Stack, Location, Custom Social Handles (Twitter/X, GitHub, Instagram, Portfolio/Website), Auto-Generated Builder Class (e.g. *Coastal Architect*, *Terminal Nomad*), and Unique Builder Pass ID (`#HH26-XXXXXX`).
6. **Dynamic Field Rendering**: Optional fields (Tech Stack, Socials, Location, Role) appear **ONLY** if filled out by the user. If left blank, they omit cleanly without leaving empty dashes/placeholders.
7. **Bolder Builder Class**: Styled in bold `800` weight with increased font size (+2pt).
8. **Multiple Creative Frame Modes**:
   - 🎫 **Boarding Pass** (1080×566): Vintage travel ticket aesthetic with perforation holes, dynamic fields grid, barcode, and tear-off photo stub.
   - 𝪪 **VIP Builder ID Card** (1080×1350): Luxury VIP festival badge with lanyard punch-hole, logo header, dual glowing photo rings, VIP seal, and 2x2 dynamic details grid.
   - 🌴 **Profile / PFP Frame** (1080×1080): Circular avatar with Goan architectural arch ornament, circular text wrapper, and beach sunset foliage backdrop.
   - 🤝 **Dynamic Team Frame** (1200×630): Dynamically supports **1, 2, 3, or 4 team members**. Automatically resizes and centers avatar circles based on active member count.
9. **One-Click Download & Share**:
   - `⬇ Download Frame` (saves high-resolution PNG).
   - `𝕏 Post on X` (opens X intent pre-filled with `#FrameInGoa` hashtag, user handle, and link).
10. **Hype / Selection Score Calculator**:
    - Formula: `SCORE = clamp(round((likes×1 + replies×2 + bookmarks×3 + retweets×4 + quotes×4 + views×0.02) ÷ 500 × 100), 0, 100)`

---

## 3. 🎨 Brand Design Tokens & Asset Mappings

### Color Palette:
- **Forest Green (Primary BG)**: `#0B6839` / `#052C17`
- **Electric Yellow (Accent / Badges)**: `#F5D800`
- **Hot Pink (Secondary Accent)**: `#FF2D84`
- **Warm Cream (Boarding Pass Base)**: `#F5EDD6`
- **Pure White**: `#FAFAF8`

### Typography:
- **Display Headings**: `Space Grotesk`
- **Body UI**: `Plus Jakarta Sans`
- **Monospace / Code Labels**: `JetBrains Mono`

### Image Asset Directory (`public/assets/`):
- `logo.jpeg` → Official HH Goa logo used in top-left header & VIP Builder ID card.
- `ornament-border.webp` (`64.webp`) → Decorative traditional arch frame overlaid on PFP, Boarding Pass stub, and VIP ID.
- `sunrise.png` → Beach sunrise illustration used in hero section, PFP background, and Builder ID backdrop.
- `agenda.png` → Beach bungalow & laptop illustration used in background compositions.
- `footer trees.png` (`palm-trees.png`) → Palm tree vector silhouettes used in footer & card bottoms.
- `hackers.png` → Table of builders illustration used in About section & Team Frame background.
- `signpost.png` (`details.png`) → Beach signpost illustration used in landing page CTA strip.
- `studio247.jpg` (`2:47 studio.jpg`) → 2:47 PM Studio laptop scene.
- `brand-banner.webp` → OpenGraph social preview banner.

---

## 4. 📁 Code Base Directory Structure

```
hhgoa-frame-generator/
├── app/
│   ├── globals.css         # Complete design system tokens, CSS reset, layout, and responsive styles
│   ├── layout.js           # Next.js RootLayout with font preloads & SEO metadata (#FrameInGoa)
│   ├── page.js             # Main application logic & Canvas 2D Rendering Engine
│   └── page.module.css
├── public/
│   └── assets/             # All 10 brand graphics (logo.jpeg, sunrise.png, ornament-border.webp, etc.)
├── package.json            # Next.js 16 (Turbopack) & React 19 dependencies
├── Summary.md              # THIS FILE — Master Documentation
└── README.md
```

---

## 5. 🛠️ Canvas 2D Engine Architecture (`app/page.js`)

- `drawPhoto(ctx, photo, x, y, w, h, zoom, panX, panY)`: Draws cropped photo with scale zoom (`1.0`-`2.5`) and panning shift (`-50` to `50`).
- `drawBoardingPass(ctx, photo, assets, info)`: Renders 1080×566 Boarding Pass with dynamic fields and non-overlapping text positioning.
- `drawIdCard(ctx, photo, assets, info)`: Renders 1080×1350 VIP Builder ID with lanyard hole, 2x2 details grid, logo header, and hologram seal.
- `drawPfp(ctx, photo, assets, info)`: Renders 1080×1080 Profile frame with circular text wrapper.
- `drawTeamFrame(ctx, photos, assets, info)`: Renders 1200×630 Team frame for 1 to 4 members with dynamic centering.
- `handlePointerDown`, `handlePointerMove`, `handlePointerUp`: Handles interactive click-and-drag panning directly on the live preview canvas.

---

## 6. 🚀 Local Running & Development Commands

```bash
# Navigate to project directory
cd hhgoa-frame-generator

# Install dependencies (if needed)
npm install

# Run local development server
npm run dev

# Or directly with local binary:
node_modules/.bin/next dev --port 3001

# Production build check
node_modules/.bin/next build
```

---

## 7. 📤 How to Push to GitHub & Deploy to Vercel (Manual Step-by-Step)

If you cloned a fresh empty GitHub repository to your computer (e.g., in `~/my-github-repo`), follow these exact steps:

### Step 1: Copy Project Files to Your Cloned GitHub Folder
Open your terminal and run:

```bash
# Replace /path/to/my-github-repo with your actual cloned repo path
cp -r "/home/arcreap/Documents/HH Goa 2026 Shortlisting Task:/hhgoa-frame-generator/." "/path/to/my-github-repo/"
```

Or manually copy all contents inside `hhgoa-frame-generator` into your cloned repository folder.

### Step 2: Push to GitHub via Terminal
In your terminal, navigate to your cloned repository folder:

```bash
cd "/path/to/my-github-repo"

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: HH Goa 2026 Frame Generator"

# Push to GitHub main branch
git push origin main
```

### Step 3: Deploy to Vercel (1-Click)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Select your newly pushed GitHub repository.
4. Leave framework as **Next.js** and click **"Deploy"**.
5. In ~45 seconds, your site will be LIVE on a custom `.vercel.app` URL!

---

*Handcrafted for HH Goa 2026 · Powered by 2:47 PM Studio · Built to Ship.*
