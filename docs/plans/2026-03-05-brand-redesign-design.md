# Redwards Media Website — Brand Redesign Design

**Date:** 2026-03-05
**Scope:** Main marketing site + Reel Scripter brand alignment
**Approach:** React component conversion + brand token system + copy refresh + section restructure

---

## 1. Architecture

### Stack
- React 19 + Vite (existing)
- Lucide React (new — icon library per brand doc)
- No routing library — simple conditional rendering for `/` vs `/reelscripter/`
- Vercel deployment (existing)

### File Structure

```
src/
  main.jsx                       # Entry point (existing, minor updates)
  App.jsx                        # Router — main site vs Reel Scripter
  styles/
    brand.css                    # All CSS custom properties from brand doc Section 14
    global.css                   # Reset, base styles, scroll-reveal, utilities
  components/
    shared/
      Nav.jsx                    # Frosted glass nav, mobile hamburger
      Footer.jsx                 # Logo, links, contact, social, copyright
      Logo.jsx                   # "REDWARDS MEDIA" with Redwood accent on MEDIA
      Button.jsx                 # Primary, CTA Filled, Outline, Text variants
      SectionHeader.jsx          # Tag + Title + Description reusable pattern
      Badge.jsx                  # Pills (e.g. "Most Popular")
    site/
      Hero.jsx                   # Two-column hero with stagger animations
      TrustBar.jsx               # Stats strip (500+, 24hr, 8+ years)
      Services.jsx               # 3-card service grid
      FeaturedWork.jsx           # Video showcase with play overlays
      About.jsx                  # Rohan's story — two-column photo + text
      Process.jsx                # 3-step Book/Shoot/Deliver
      Packages.jsx               # 4-column pricing grid
      Testimonials.jsx           # Client quotes + stats
      Gallery.jsx                # Asymmetric masonry grid
      CTASection.jsx             # Final conversion section
    reelscripter/
      ReelScripterApp.jsx        # Extracted from current monolithic App.jsx
  pages/
    HomePage.jsx                 # Composes all site/ components in order
    ReelScripterPage.jsx         # Wraps Reel Scripter
  hooks/
    useScrollReveal.js           # IntersectionObserver for fadeUp animations
    useMediaQuery.js             # Responsive breakpoint detection
```

### Brand Token System

`brand.css` is a direct implementation of brand doc Section 14. Both the main site and Reel Scripter import it. Every component references tokens — no raw color/spacing/font values anywhere.

Key token groups:
- Colors: `--color-charcoal`, `--color-redwood`, `--color-warm-white`, etc.
- Typography: `--font-display` (Playfair Display), `--font-body` (DM Sans)
- Spacing: `--space-xs` through `--space-3xl`
- Radius: `--radius-sm` through `--radius-full`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Easing: `--ease-reveal`, `--ease-interact`

### Routing

Vite multi-page approach:
- `/` serves the main marketing site (HomePage)
- `/reelscripter/` serves Reel Scripter (ReelScripterPage)

Update `vite.config.js` to handle both entry points. Update `vercel.json` rewrites accordingly.

---

## 2. Section Design (Main Site)

### Page Flow (top to bottom)

1. Navigation
2. Hero
3. Trust Bar (NEW)
4. Services
5. Featured Work
6. About / Story (MOVED from hidden sub-page)
7. Process
8. Packages
9. Testimonials (REWORKED)
10. Gallery
11. CTA
12. Footer

### 2.1 Navigation

Sticky frosted glass nav per brand doc:
```
background: rgba(253, 252, 250, 0.92)
backdrop-filter: blur(20px)
border-bottom: 1px solid rgba(44, 41, 38, 0.06)
```

Links: Home | Services | Packages | About | Reel Scripter | **Book a Shoot** (CTA)

- All links are anchor scrolls (no more `showPage()` hack)
- Instagram link moves to footer
- Mobile: Lucide `Menu` / `X` icons for hamburger
- Nav CTA: charcoal bg, 0.6rem 1.4rem padding, 0.8rem font, 6px radius

### 2.2 Hero

Two-column grid: text (1fr) | image (1.2fr)

**Copy:**
- Tag: "Premium Real Estate Media — Greater Boston"
- H1: "Your listings deserve content that matches the level you're operating at."
- Description: "I help ambitious agents and teams discover and showcase the best version of themselves — through cinematic photography, video, and content that actually converts."
- Primary CTA: "Book a Shoot" → Aryeo order link
- Secondary CTA: "See the Work →" → scrolls to Featured Work

**Hero image:** Property exterior with floating stat badge ("500+" / "Properties Delivered")

**Animation:** Brand doc stagger timing — tag 0.2s, H1 0.35s, desc 0.5s, CTAs 0.65s

**Typography:**
- H1: Playfair Display, `clamp(2.5rem, 4.5vw, 3.8rem)`, weight 400
- Tag: DM Sans, 0.75rem, weight 500, uppercase, letter-spacing 0.12em, Redwood color
- Desc: DM Sans, 0.92rem, line-height 1.7

### 2.3 Trust Bar (NEW)

Replaces the silent showcase image strip.

Centered horizontal strip on sand-light background:
> **500+** Properties Delivered · **24hr** Standard Turnaround · **8+** Years in Real Estate Media

Numbers in Playfair Display (stat size from brand doc). Labels in DM Sans body.

### 2.4 Services

3-card grid on warm-white background.

**Section header:**
- Tag: "What We Do"
- Title: "Everything your listing needs. Nothing it doesn't."
- Desc: "Every package is built around what actually sells homes — not a checklist of extras you'll never use."

**Cards:**

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | `Camera` | Photography | Clean, bright, true-to-life listing photos. Drone aerials. Twilight exteriors. Edited, color-corrected, and MLS-ready — usually back in your hands within 24 hours. |
| 2 | `Video` | Cinematic Video | Signature reels built around you, not a template. Property tours, social clips, and content with real personality — every frame intentional, every edit polished. |
| 3 | `View` | Virtual Tours & More | 360 virtual tours, interactive floorplans, and property websites. The full digital package for listings that need to stand out online. |

**Icon containers:** 48x48px, Redwood (#AE4A3E) background, white icon, 10px border-radius per brand doc.

**Card style:** sand-light bg, 14px radius, 2.5rem/2rem padding. Hover: translateY(-4px), shadow-md, redwood top-border reveal.

### 2.5 Featured Work

Video showcase section.

**Section header:**
- Tag: "Featured Work"
- Title: "See what intentional content looks like."

**Layout:** One large 16:9 video spanning full width, 2-3 smaller vertical reels below in a row.

Custom play button overlay: Lucide `Play` icon, charcoal circle bg → Redwood on hover + scale(1.1). Thumbnails from existing images or video stills. YouTube/Vimeo embeds lazy-loaded on click.

### 2.6 About / Story

Two-column: headshot photo (left) | text (right)

**Copy:**
- Tag: "Meet Rohan"
- Title: "I'm here to bring out *your best.*" (italic in Redwood per brand doc)
- Para 1: "I'm a videographer and photographer based in Cambridge, MA. For the past eight-plus years, I've been helping real estate agents discover and showcase the best version of themselves — on camera, on social, and in every piece of content they put out there."
- Para 2: "My philosophy is simple — every video is an ad. No filler. No throwaway content. Every frame should have depth, personality, and lasting value."
- Para 3: "Most agents are nervous on camera — that's normal. I don't do scripted lines or forced poses. I create a space where your real personality comes through, and the final product always makes you feel like you nailed it."

**Photo:** headshot.jpg, 14px radius per brand doc for feature photos.

### 2.7 Process (How It Works)

Keep existing 3-step structure. Just restyle with brand tokens.

**Steps:**
1. **Book** — "Choose your package and pick your date. Book online in under a minute — no calls, no back-and-forth."
2. **Shoot** — "We handle everything on set. Professional, efficient, and comfortable — your personality shines through."
3. **Deliver** — "Edited, color-corrected, and MLS-ready. Your content is in your hands within 24 hours."

Sand-light background. Numbered steps with connecting line. Step numbers in Playfair Display, Redwood color.

### 2.8 Packages

4-column pricing grid.

**Section header:**
- Tag: "Pricing"
- Title: "Simple, transparent pricing."
- Desc: "Every package includes professional editing, color correction, and MLS-ready files. No hidden fees."

| Package | Price | Featured | Description |
|---------|-------|----------|-------------|
| Base | $400 | No | Photos, drone, and a market-ready listing |
| Standard | $650 | Yes ("Most Popular") | Everything in Base + 360 Tour |
| Pro | From $900 | No | Everything in Standard + Signature Reel |
| Max | From $1,300 | No | The full production package |

Keep existing feature lists per card. Featured card: 2px Redwood border, scale(1.03).

Checkmark icons: 18px circle, Redwood bg, white check inside per brand doc.

### 2.9 Testimonials

**Section header:**
- Tag: "What Agents Say"
- Title: "Built on real relationships."

**Primary content:** Client testimonial cards (if quotes available). Each card: quote text, client name, title/brokerage.

**Secondary content:** Stats row below testimonials — 500+ properties, 24hr turnaround, 8+ years. These stay regardless.

**Placeholder approach:** Build the testimonial card component, populate with 2-3 placeholder quotes that can be swapped for real ones.

### 2.10 Gallery

Asymmetric masonry grid (items 1 & 4 span 2 columns).

**Section header:**
- Tag: "Portfolio"
- Title: "See the difference."

5 images from existing assets. Gallery items: 10px radius, cream placeholder bg, hover scale(1.02) + shadow-lg.

### 2.11 CTA Section

Dark section (charcoal background).

**Copy (keep existing — it's on-brand):**
- Title: "Ready to see yourself in your best light?"
- Desc: "Book a shoot in minutes, or just reach out — I'm always happy to talk through what would work best for you. No pressure, no pitch. Just a conversation."
- CTA: "Book a Shoot" (Redwood filled button)

Dark section typography per brand doc: heading in warm-white, body in rgba(255,255,255,0.65).

### 2.12 Footer

Charcoal background.

- Logo (REDWARDS MEDIA — "MEDIA" in Redwood Soft #C47068)
- Tagline: "Premium real estate content in Greater Boston."
- Contact: Email, Phone, Instagram links
- Nav links: Home, Services, Packages, Reel Scripter, Book a Shoot
- Copyright: "2026 Redwards Media. All Rights Reserved."
- Footer text color: rgba(255,255,255,0.50)

---

## 3. Reel Scripter Updates

Styling pass only — no functional changes.

- Import shared `brand.css` tokens
- Replace any hardcoded colors/fonts with CSS custom properties
- Update button, card, and form component styles to match brand spec
- Ensure Playfair Display is loaded (or confirm DM Sans only for the app context)
- Verify mobile responsiveness uses brand breakpoints

---

## 4. Key Technical Decisions

### Scroll Reveal System
Custom `useScrollReveal` hook using IntersectionObserver. Applies `.revealed` class to trigger CSS transitions matching brand doc:
```css
opacity: 0 → 1, translateY(24px) → 0, duration 0.7s, ease var(--ease-reveal)
```

### Image Handling
- Keep existing images in `public/images/`
- All images lazy-loaded
- Alt text for accessibility/SEO
- `object-fit: cover` for consistent aspect ratios

### SEO Preservation
- Keep all existing meta tags, OG tags, schema markup
- Update meta description to match new hero copy
- Maintain canonical URL structure

### Google Fonts
Replace Cormorant Garamond with Playfair Display:
```
fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap
```

### Build Process
Update `vite.config.js`:
- Remove `/reelscripter/` base path (main site now serves from root)
- Configure multi-page build or single SPA with path-based rendering
- Update `copy-site.mjs` script (may no longer be needed)

Update `vercel.json`:
- Adjust rewrites for new routing structure
- Keep API routes for Reel Scripter

---

## 5. What's NOT Changing

- Reel Scripter functionality (AI script generation, password auth, hook selection)
- Aryeo booking link destinations
- Contact information
- Package pricing and features
- Image assets (using existing photos)
- Vercel deployment platform
- API routes (auth.js, generate.js)

---

## 6. Success Criteria

- [ ] All CSS custom properties match brand doc Section 14 exactly
- [ ] Playfair Display replaces Cormorant Garamond throughout
- [ ] Sage color corrected from #8E9478 to #8B9E83
- [ ] All components match brand doc specs (buttons, cards, nav, badges)
- [ ] Lucide icons replace inline SVGs
- [ ] Copy updated per section designs above
- [ ] About section visible on main page flow (not hidden)
- [ ] Trust bar replaces showcase strip
- [ ] Mobile responsive at all brand breakpoints (640px, 1024px, 1200px)
- [ ] Scroll reveal animations match brand doc timing
- [ ] Reel Scripter uses shared brand tokens
- [ ] SEO meta tags preserved and updated
- [ ] Site builds and deploys successfully on Vercel
