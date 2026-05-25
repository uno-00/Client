# Verdan — Client Deliverable (Khalil)

**References (quality only):** [Keeps ED Quiz](https://www.keeps.com/ed-assessment-quiz) · [MEDVi Intake](https://quad.medvi.org/intake-nwpck)  
**Not copied** — original brand, palette, typography, and UX.

---

## Brand

| | |
|---|---|
| **Name** | **Verdan** |
| **Positioning** | *Confidence backed by modern care.* |
| **Palette** | Forest `#1A3D30` · Ivory `#F8F5EF` · Sage `#8DA698` · Copper `#C07855` |
| **Reasoning** | Forest + ivory = calm, premium lifestyle-health. Distinct from Keeps (navy/yellow) and MEDVi (bright blue). Copper adds warm confidence at CTAs. |
| **Typography** | **Newsreader** (editorial display) + **DM Sans** (UI) |

---

## Assessment questions (Q1–Q5)

| # | ID | Type | Copy |
|---|-----|------|------|
| 1 | `frequency` | Single | How often do you experience difficulty? |
| 2 | `age` | Slider 18–75+ | What's your age? |
| — | *Interstitial* | — | After Q2 |
| 3 | `outcomes` | Multi | What outcomes matter most to you? |
| 4 | `duration` | Single | How long has this been a concern? |
| 5 | `health_flags` | Multi | Any of the following apply? (none exclusive) |

Insights + plan use **all five** answers (`src/utils/answers.js` → `insights.js`).

---

## Five screens (brief → build)

| Screen | Implementation | Craft notes |
|--------|----------------|-------------|
| **1. Hero / intro** | `HeroScreen.jsx` | Layered art + optional video, staggered entrance, trust row, CTA |
| **2. Question** | `QuizScreen.jsx` | Single + multi-select, age slider, card UI, micro-interactions |
| **3. Marketing interstitial** | `InterstitialScreen.jsx` | Animated stats, 3-step timeline, dark/light/dark rhythm |
| **4. Results reveal** | `ResultsRevealScreen.jsx` | Loading → progress → staggered insights → plan reveal |
| **5. Recommendation** | `RecommendationScreen.jsx` | Product card, plans, testimonial, sticky CTA |

**Imagery:** Bundled photos in `/public/images/` with local SVG fallbacks. Optional remote fallbacks load only if bundled assets fail.

---

## Run locally

```bash
cd verdan-quiz
npm install
npm run dev
```

Open **http://localhost:5173** at **390px** width (mobile DevTools).

---

## Tech

React 19 · Vite 8 · Tailwind v4 · Framer Motion 12
