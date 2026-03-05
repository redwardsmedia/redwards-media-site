# Site Refresh v2 — Design Document

**Date:** 2026-03-05
**Status:** Approved
**Branch:** TBD (from main)

---

## Context

The brand redesign (v1) shipped successfully — static HTML converted to React components with shared brand tokens. First impressions are positive but several content, positioning, and design refinements are needed based on live review.

## Changes

### 1. Bug Fixes

#### 1a. Nav disappears on back-navigation from Reel Scripter
- **Problem:** Navigating to `/reelscripter/` then clicking browser back button causes the Nav to disappear. The path-based router in `App.jsx` re-renders on popstate but HomePage's Nav may not remount correctly.
- **Fix:** Add a `popstate` event listener in `App.jsx` so the router re-evaluates `window.location.pathname` on browser back/forward navigation. Use React state to track the current path instead of reading it once on mount.

#### 1b. Hero image not loading
- **Problem:** The hero section image area appears broken or empty on the live site.
- **Fix:** Investigate whether `hero-exterior.jpg` loads correctly. Check CSS sizing on `.hero__image` container. May need explicit dimensions or aspect-ratio to prevent collapse.

### 2. Replace Packages Section with Value-First Block

**Remove:** The 4-column pricing grid with detailed per-package features and prices.

**Replace with:** A compact "value-first" section that:
- Leads with the friction-free, all-inclusive positioning
- Headline: communicates "everything included, nothing extra"
- 3-4 tight bullet points: AI photo editing, virtual staging, clutter removal, 24hr turnaround — all built into every package
- Price anchor line: "All-inclusive packages start at $400"
- Single CTA button → Aryeo booking URL
- Emphasizes: you never pick add-ons, no a-la-carte stress, everything is handled

**Rationale:** Prevents price scraping by competitors, requires prospects to take one additional step (Book Now → enter address) to see full pricing. The $400 anchor positions Redwards as premium without exposing the full menu. The value messaging sells the *why* before the *how much*.

**Nav update:** Remove or rename "Packages" nav link.

### 3. TrustBar Stats Update

**Current (inaccurate):**
- 500+ Properties Delivered
- 24hr Standard Turnaround
- 8+ Years in Real Estate Media

**Updated (3 stats):**
- `500+` — Properties Delivered
- `24hr` — Standard Turnaround
- `8+` — Years as a Creative

The "3+ years in real estate media specifically" fact gets woven into the About section copy instead.

### 4. About Section Copy Refresh

Keep the two-column photo + text layout. Update copy to hit three layers:

**The Creative (lead):**
- 8+ years as a videographer and marketer
- Cinematic eye — every piece tailored to the client, the brand, and the property
- Not template-driven; consistently high quality and engaging
- Presents clients' brands in the best possible light

**The Operator (middle):**
- Friction-free shoots — fast, efficient on-site, won't take all day
- All AI enhancements built in (editing, staging, clutter removal, twilights)
- Newest tech, consistently high quality results
- Problems solved proactively — you don't have to ask

**Strategist tease (close — one line):**
- Something like: "Beyond listing media, I help agents build brands that compound."
- No CTA yet — just planting the seed for the retainer/content creator offering

### 5. Design Upgrades — Parallax + Visual Signature

#### 5a. Parallax Effects
- **Hero:** Subtle parallax on the hero image — background scrolls at a slower rate than content. CSS `transform: translateY()` driven by scroll position (lightweight JS, no library).
- **Section reveals:** Enhance existing `useScrollReveal` with slightly more pronounced fade-up + translate animations.

#### 5b. Visual Signature — Angled Dividers
- **Angled section transitions:** Subtle diagonal clip-paths or SVG dividers between key sections (hero → trust bar, about → process, etc.). Creates visual flow instead of flat horizontal breaks.
- Keep angles subtle (2-4 degrees) — premium, not gimmicky.

#### 5c. Visual Signature — Redwood Accent Line
- A thin vertical or horizontal accent line/element in the redwood brand color that recurs in key sections (hero, about, CTA) as a visual throughline.
- Could be a left-border on blockquotes, a decorative line next to section headers, or a persistent side accent.

#### 5d. Gradient Fade Transitions
- Sections blend into each other with soft background gradient overlaps using the brand palette (sand → white → sage → charcoal) instead of hard color breaks.

### 6. Services Section Visual Upgrade

**Current:** 3 cards with Lucide icon circles (Camera, Video, View).

**Updated:** Replace the icon circles with actual property thumbnail images that represent each service:
- Photography card → a property photo example
- Cinematic Video card → a video still / frame grab
- Virtual Tours card → a 360 tour screenshot or wide-angle interior

Uses existing images from `/images/` directory. Cards keep the same text content but the visual is more compelling and tangible.

### 7. Copy Polish (Throughout)

Thread these messaging themes across Hero, Services, About, and the new Value section:
- **Tailored:** Every video and photo set is custom to the client, brand, and property
- **Friction-free:** Fast on-site, everything included, no add-on stress
- **Consistently high quality:** Newest tech, AI-powered enhancements, proactive problem-solving
- **Premium positioning:** Not just expensive — the experience itself is premium

---

## Out of Scope

- Logo icon design (separate future project)
- Content creator/retainer section (light tease only)
- ScriptIQ integration
- Mobile responsive testing (follow-up pass)

## Files Affected

- `src/App.jsx` — router fix for popstate
- `src/components/site/Hero.jsx` + `Hero.css` — image fix, parallax
- `src/components/site/TrustBar.jsx` — stat updates
- `src/components/site/Services.jsx` + `Services.css` — thumbnail images replacing icons
- `src/components/site/Packages.jsx` + `Packages.css` — full rewrite → ValueSection
- `src/components/site/About.jsx` — copy refresh
- `src/components/shared/Nav.jsx` — remove/update Packages link
- `src/styles/global.css` — angled dividers, gradient transitions, accent line utilities
- `src/hooks/useParallax.js` — new hook for scroll-driven parallax
- `src/pages/HomePage.jsx` — swap Packages for ValueSection
