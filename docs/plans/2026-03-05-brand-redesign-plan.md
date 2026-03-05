# Brand Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the Redwards Media static HTML site to React components with a shared brand token system, refreshed copy, and restructured sections per the approved design doc.

**Architecture:** React 19 + Vite SPA with path-based rendering (`/` for main site, `/reelscripter/` for Reel Scripter). Shared `brand.css` token system imported by all components. Lucide React for icons. IntersectionObserver-based scroll reveal animations.

**Tech Stack:** React 19, Vite 6.2, Lucide React, CSS Custom Properties, Vercel

**Design Doc:** `docs/plans/2026-03-05-brand-redesign-design.md`
**Brand Reference:** `C:\Claude\brand-design-system.md` (Sections 7, 9, 14 are most critical)

---

## Phase 1: Foundation — Dependencies, Tokens, Global Styles

### Task 1: Install Lucide React

**Files:**
- Modify: `package.json`

**Step 1: Install dependency**

Run: `cd /c/Claude/redwards-media-site && npm install lucide-react`
Expected: Package added to dependencies in package.json

**Step 2: Verify install**

Run: `node -e "require('lucide-react'); console.log('OK')"`
Expected: `OK`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react icon library"
```

---

### Task 2: Create brand.css token system

**Files:**
- Create: `src/styles/brand.css`

**Step 1: Create the brand token file**

Create `src/styles/brand.css` — direct implementation of brand doc Section 14:

```css
/* ==========================================================================
   Brand Design Tokens — Redwards Media
   Source: brand-design-system.md Section 14
   ========================================================================== */

:root {
  /* Colors — Primary */
  --color-charcoal: #2C2926;
  --color-redwood: #AE4A3E;
  --color-warm-white: #FDFCFA;

  /* Colors — Secondary */
  --color-sage: #8B9E83;
  --color-sage-soft: #A8B8A1;
  --color-redwood-soft: #C47068;
  --color-charcoal-light: #4A4541;

  /* Colors — Neutrals */
  --color-sand: #F5F0EB;
  --color-sand-light: #FAF8F5;
  --color-cream: #EDE8E0;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-base: 10px;
  --radius-lg: 12px;
  --radius-xl: 14px;
  --radius-pill: 20px;
  --radius-full: 50%;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(44, 41, 38, 0.06);
  --shadow-md: 0 4px 20px rgba(44, 41, 38, 0.08);
  --shadow-lg: 0 12px 40px rgba(44, 41, 38, 0.1);

  /* Easing */
  --ease-reveal: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-interact: cubic-bezier(0.4, 0, 0.2, 1);

  /* Container */
  --container-max: 1200px;
  --container-padding: 2rem;
}
```

**Step 2: Verify file exists and tokens match brand doc**

Run: `wc -l src/styles/brand.css`
Expected: ~55 lines

**Step 3: Commit**

```bash
git add src/styles/brand.css
git commit -m "feat: add brand.css token system from brand doc Section 14"
```

---

### Task 3: Create global.css with reset, base styles, and utilities

**Files:**
- Create: `src/styles/global.css`

**Step 1: Create global stylesheet**

Create `src/styles/global.css`:

```css
/* ==========================================================================
   Global Styles — Redwards Media
   Reset + Base + Scroll Reveal + Utilities
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');

/* Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-charcoal);
  background: var(--color-warm-white);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

ul, ol {
  list-style: none;
}

/* Base Typography */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.2;
  color: var(--color-charcoal);
}

h1 { font-size: clamp(2.5rem, 4.5vw, 3.8rem); }
h2 { font-size: clamp(2rem, 3vw, 2.8rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); }

p {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
}

/* Scroll Reveal Animation */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-reveal), transform 0.7s var(--ease-reveal);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for hero */
.stagger-1 { transition-delay: 0.2s; }
.stagger-2 { transition-delay: 0.35s; }
.stagger-3 { transition-delay: 0.5s; }
.stagger-4 { transition-delay: 0.65s; }

/* Utility: Container */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Utility: Section padding */
.section {
  padding: var(--space-3xl) 0;
}

/* Utility: Section tag text */
.section-tag {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-redwood);
  margin-bottom: var(--space-sm);
}

/* Utility: Section title */
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 400;
  color: var(--color-charcoal);
  margin-bottom: var(--space-sm);
}

/* Utility: Section description */
.section-desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
  max-width: 600px;
}

/* Dark section variant */
.section-dark {
  background: var(--color-charcoal);
}

.section-dark h2,
.section-dark h3 {
  color: var(--color-warm-white);
}

.section-dark p {
  color: rgba(255, 255, 255, 0.65);
}

/* Responsive */
@media (max-width: 1024px) {
  :root {
    --container-padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  :root {
    --container-padding: 1rem;
  }

  .section {
    padding: var(--space-2xl) 0;
  }
}
```

**Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global.css with reset, base typography, scroll reveal, utilities"
```

---

### Task 4: Update index.html for main site entry

**Files:**
- Modify: `index.html`

**Step 1: Update index.html to serve the full app (not just Reel Scripter)**

Replace the contents of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#2C2926" />

  <!-- Main site SEO meta (overridden by React for Reel Scripter) -->
  <title>Redwards Media — Premium Real Estate Media in Greater Boston</title>
  <meta name="description" content="Premium real estate photography, cinematic video, drone, virtual tours, and content creation for ambitious agents and teams in Greater Boston." />

  <!-- Open Graph -->
  <meta property="og:title" content="Redwards Media — Premium Real Estate Media" />
  <meta property="og:description" content="Cinematic photography, video, and content that actually converts. Greater Boston." />
  <meta property="og:image" content="/images/og-image.jpg" />
  <meta property="og:url" content="https://redwardsmedia.com" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Redwards Media — Premium Real Estate Media" />
  <meta name="twitter:description" content="Cinematic photography, video, and content that actually converts." />
  <meta name="twitter:image" content="/images/og-image.jpg" />

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Redwards Media",
    "description": "Premium real estate media — photography, cinematic video, drone, virtual tours, and content creation in Greater Boston.",
    "url": "https://redwardsmedia.com",
    "telephone": "+1-617-921-8530",
    "email": "rohan@redwardsmedia.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cambridge",
      "addressRegion": "MA"
    },
    "image": "https://redwardsmedia.com/images/og-image.jpg",
    "priceRange": "$400-$1300+"
  }
  </script>

  <!-- Reel Scripter PWA (only applies on /reelscripter/) -->
  <link rel="manifest" href="/reelscripter/manifest.json" />
  <link rel="apple-touch-icon" href="/reelscripter/icon-192.png" />
  <link rel="icon" type="image/png" href="/reelscripter/icon-192.png" />

  <style>
    body { margin: 0; background: #FDFCFA; -webkit-font-smoothing: antialiased; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update index.html for full site entry with SEO meta tags"
```

---

### Task 5: Update Vite config for root-level build

**Files:**
- Modify: `vite.config.js`

**Step 1: Update vite.config.js**

Remove the `/reelscripter/` base path. Build the entire app from root:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
```

**Step 2: Update package.json build script**

Remove the `copy-site.mjs` post-build step since the main site is now part of the React build:

Change the build script from:
```
"build": "vite build && node scripts/copy-site.mjs"
```
To:
```
"build": "vite build"
```

Also add a `copy-public` script for the images (Vite auto-copies `public/` to `dist/`):
No change needed — Vite handles `public/` folder automatically.

**Step 3: Commit**

```bash
git add vite.config.js package.json
git commit -m "feat: update vite config for root-level build, remove copy-site post-build"
```

---

### Task 6: Update Vercel rewrites for new routing

**Files:**
- Modify: `vercel.json`

**Step 1: Update vercel.json**

The main site now builds from Vite at root. Reel Scripter is a path within the SPA. Update rewrites:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/reelscripter/api/:path*", "destination": "/api/:path*" },
    { "source": "/reelscripter/manifest.json", "destination": "/reelscripter/manifest.json" },
    { "source": "/reelscripter/sw.js", "destination": "/reelscripter/sw.js" },
    { "source": "/reelscripter/icon-192.png", "destination": "/reelscripter/icon-192.png" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

The catch-all `/(.*) → /index.html` ensures both `/` and `/reelscripter/` are handled by the SPA. Static assets in `/reelscripter/` (manifest, SW, icon) are served directly.

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: update vercel.json rewrites for SPA routing"
```

---

## Phase 2: Custom Hooks

### Task 7: Create useScrollReveal hook

**Files:**
- Create: `src/hooks/useScrollReveal.js`

**Step 1: Create the hook**

```javascript
import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.js
git commit -m "feat: add useScrollReveal hook with IntersectionObserver"
```

---

### Task 8: Create useMediaQuery hook

**Files:**
- Create: `src/hooks/useMediaQuery.js`

**Step 1: Create the hook**

```javascript
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useMediaQuery.js
git commit -m "feat: add useMediaQuery hook for responsive breakpoints"
```

---

## Phase 3: Shared Components

### Task 9: Create Logo component

**Files:**
- Create: `src/components/shared/Logo.jsx`

**Step 1: Create Logo component**

Per brand doc Section 10 — "MEDIA" always in accent color.

```jsx
import './Logo.css';

export function Logo({ variant = 'light' }) {
  return (
    <a href="/" className={`logo logo--${variant}`}>
      REDWARDS <span className="logo__accent">MEDIA</span>
    </a>
  );
}
```

**Step 2: Create Logo.css**

Create `src/components/shared/Logo.css`:

```css
.logo {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-charcoal);
}

.logo--dark {
  color: rgba(255, 255, 255, 0.80);
}

.logo__accent {
  color: var(--color-redwood);
}

.logo--dark .logo__accent {
  color: var(--color-redwood-soft);
}
```

**Step 3: Commit**

```bash
git add src/components/shared/Logo.jsx src/components/shared/Logo.css
git commit -m "feat: add Logo component with light/dark variants"
```

---

### Task 10: Create Button component

**Files:**
- Create: `src/components/shared/Button.jsx`
- Create: `src/components/shared/Button.css`

**Step 1: Create Button component**

Per brand doc Section 7 — four button variants.

```jsx
import './Button.css';

export function Button({ children, variant = 'primary', href, onClick, className = '' }) {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return <button className={cls} onClick={onClick}>{children}</button>;
}
```

**Step 2: Create Button.css**

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.85rem 2rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Primary — charcoal bg */
.btn--primary {
  background: var(--color-charcoal);
  color: var(--color-warm-white);
}
.btn--primary:hover {
  background: var(--color-redwood);
  transform: translateY(-1px);
}

/* CTA Filled — redwood bg */
.btn--cta {
  background: var(--color-redwood);
  color: var(--color-warm-white);
}
.btn--cta:hover {
  background: var(--color-redwood-soft);
  transform: translateY(-2px);
}

/* Outline */
.btn--outline {
  background: transparent;
  border: 1.5px solid var(--color-charcoal);
  color: var(--color-charcoal);
}
.btn--outline:hover {
  background: var(--color-charcoal);
  color: var(--color-warm-white);
}

/* Text / Secondary */
.btn--text {
  background: transparent;
  color: var(--color-charcoal);
  padding: 0;
  text-transform: none;
  letter-spacing: normal;
  font-size: 0.92rem;
}
.btn--text:hover {
  color: var(--color-redwood);
}

/* Nav CTA — smaller Primary */
.btn--nav {
  background: var(--color-charcoal);
  color: var(--color-warm-white);
  padding: 0.6rem 1.4rem;
  font-size: 0.8rem;
}
.btn--nav:hover {
  background: var(--color-redwood);
  transform: translateY(-1px);
}
```

**Step 3: Commit**

```bash
git add src/components/shared/Button.jsx src/components/shared/Button.css
git commit -m "feat: add Button component with primary, cta, outline, text, nav variants"
```

---

### Task 11: Create SectionHeader component

**Files:**
- Create: `src/components/shared/SectionHeader.jsx`
- Create: `src/components/shared/SectionHeader.css`

**Step 1: Create SectionHeader component**

Reusable pattern: tag + title + optional description.

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './SectionHeader.css';

export function SectionHeader({ tag, title, description, align = 'center' }) {
  const ref = useScrollReveal();

  return (
    <div className={`section-header section-header--${align} reveal`} ref={ref}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
```

**Step 2: Create SectionHeader.css**

```css
.section-header {
  margin-bottom: var(--space-2xl);
}

.section-header--center {
  text-align: center;
}

.section-header--center .section-desc {
  margin-left: auto;
  margin-right: auto;
}

.section-header--left {
  text-align: left;
}
```

**Step 3: Commit**

```bash
git add src/components/shared/SectionHeader.jsx src/components/shared/SectionHeader.css
git commit -m "feat: add SectionHeader component with tag/title/description pattern"
```

---

### Task 12: Create Badge component

**Files:**
- Create: `src/components/shared/Badge.jsx`
- Create: `src/components/shared/Badge.css`

**Step 1: Create Badge component**

Per brand doc Section 7 — Badges/Pills.

```jsx
import './Badge.css';

export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
```

**Step 2: Create Badge.css**

```css
.badge {
  display: inline-block;
  background: var(--color-redwood);
  color: var(--color-warm-white);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-pill);
}
```

**Step 3: Commit**

```bash
git add src/components/shared/Badge.jsx src/components/shared/Badge.css
git commit -m "feat: add Badge pill component"
```

---

### Task 13: Create Nav component

**Files:**
- Create: `src/components/shared/Nav.jsx`
- Create: `src/components/shared/Nav.css`

**Step 1: Create Nav component**

Frosted glass sticky nav per brand doc Section 7. Mobile hamburger with Lucide icons.

```jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import './Nav.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
];

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__inner container">
        <Logo />

        <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="nav" href={BOOKING_URL}>Book a Shoot</Button>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>
    </nav>
  );
}
```

**Step 2: Create Nav.css**

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(253, 252, 250, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(44, 41, 38, 0.06);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav__link {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-charcoal);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav__link:hover {
  color: var(--color-redwood);
}

.nav__toggle {
  display: none;
  color: var(--color-charcoal);
}

/* Mobile */
@media (max-width: 1024px) {
  .nav__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav__links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(253, 252, 250, 0.98);
    backdrop-filter: blur(20px);
    padding: var(--space-lg);
    gap: var(--space-md);
    border-bottom: 1px solid rgba(44, 41, 38, 0.06);
  }

  .nav__links--open {
    display: flex;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/shared/Nav.jsx src/components/shared/Nav.css
git commit -m "feat: add Nav component with frosted glass, mobile hamburger"
```

---

### Task 14: Create Footer component

**Files:**
- Create: `src/components/shared/Footer.jsx`
- Create: `src/components/shared/Footer.css`

**Step 1: Create Footer component**

Per design doc Section 2.12.

```jsx
import { Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';
import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
  { label: 'Book a Shoot', href: 'https://book.aryeo.com/order/redwards-media' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo variant="dark" />
          <p className="footer__tagline">Premium real estate content in Greater Boston.</p>
        </div>

        <div className="footer__links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
          ))}
        </div>

        <div className="footer__contact">
          <a href="mailto:rohan@redwardsmedia.com" className="footer__contact-link">
            <Mail size={16} strokeWidth={1.5} /> rohan@redwardsmedia.com
          </a>
          <a href="tel:+16179218530" className="footer__contact-link">
            <Phone size={16} strokeWidth={1.5} /> (617) 921-8530
          </a>
          <a href="https://instagram.com/redwardsmedia" className="footer__contact-link" target="_blank" rel="noopener noreferrer">
            @redwardsmedia
          </a>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>&copy; 2026 Redwards Media. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
```

**Step 2: Create Footer.css**

```css
.footer {
  background: var(--color-charcoal);
  padding: var(--space-3xl) 0 var(--space-lg);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer__tagline {
  color: rgba(255, 255, 255, 0.50);
  font-size: 0.85rem;
  margin-top: var(--space-xs);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer__link {
  color: rgba(255, 255, 255, 0.50);
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: var(--color-warm-white);
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer__contact-link {
  color: rgba(255, 255, 255, 0.50);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.footer__contact-link:hover {
  color: var(--color-warm-white);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: var(--space-lg);
  text-align: center;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    text-align: center;
  }

  .footer__contact {
    align-items: center;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/shared/Footer.jsx src/components/shared/Footer.css
git commit -m "feat: add Footer component with logo, links, contact, copyright"
```

---

## Phase 4: Site Section Components

### Task 15: Create Hero section

**Files:**
- Create: `src/components/site/Hero.jsx`
- Create: `src/components/site/Hero.css`

**Step 1: Create Hero component**

Per design doc Section 2.2 — two-column grid with stagger animations.

```jsx
import { ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Hero.css';

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

export function Hero() {
  const ref = useScrollReveal();

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero__inner container">
        <div className="hero__text">
          <span className="hero__tag reveal stagger-1">Premium Real Estate Media — Greater Boston</span>
          <h1 className="hero__title reveal stagger-2">
            Your listings deserve content that matches the level you're operating at.
          </h1>
          <p className="hero__desc reveal stagger-3">
            I help ambitious agents and teams discover and showcase the best version of themselves — through cinematic photography, video, and content that actually converts.
          </p>
          <div className="hero__ctas reveal stagger-4">
            <Button variant="primary" href={BOOKING_URL}>Book a Shoot</Button>
            <Button variant="text" href="#featured-work">
              See the Work <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
        <div className="hero__image reveal">
          <img src="/images/hero-exterior.jpg" alt="Premium property exterior photography by Redwards Media" loading="eager" />
          <div className="hero__stat-badge">
            <span className="hero__stat-number">500+</span>
            <span className="hero__stat-label">Properties Delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Hero.css**

```css
.hero {
  padding: var(--space-3xl) 0;
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top right, rgba(174, 74, 62, 0.06), transparent 70%);
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-2xl);
  align-items: center;
}

.hero__tag {
  display: block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-redwood);
  margin-bottom: var(--space-md);
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.5vw, 3.8rem);
  font-weight: 400;
  line-height: 1.15;
  color: var(--color-charcoal);
  margin-bottom: var(--space-md);
}

.hero__desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
  margin-bottom: var(--space-xl);
  max-width: 520px;
}

.hero__ctas {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.hero__image {
  position: relative;
}

.hero__image img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}

.hero__stat-badge {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: var(--color-warm-white);
  border-radius: var(--radius-xl);
  padding: var(--space-sm) var(--space-md);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.hero__stat-number {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-charcoal);
}

.hero__stat-label {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-charcoal-light);
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__desc {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero__ctas {
    justify-content: center;
  }

  .hero__stat-badge {
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Hero.jsx src/components/site/Hero.css
git commit -m "feat: add Hero section with two-column layout and stagger animations"
```

---

### Task 16: Create TrustBar section

**Files:**
- Create: `src/components/site/TrustBar.jsx`
- Create: `src/components/site/TrustBar.css`

**Step 1: Create TrustBar component**

Per design doc Section 2.3 — replaces silent showcase strip.

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './TrustBar.css';

const STATS = [
  { number: '500+', label: 'Properties Delivered' },
  { number: '24hr', label: 'Standard Turnaround' },
  { number: '8+', label: 'Years in Real Estate Media' },
];

export function TrustBar() {
  const ref = useScrollReveal();

  return (
    <section className="trust-bar reveal" ref={ref}>
      <div className="trust-bar__inner container">
        {STATS.map((stat, i) => (
          <div className="trust-bar__stat" key={i}>
            <span className="trust-bar__number">{stat.number}</span>
            <span className="trust-bar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Create TrustBar.css**

```css
.trust-bar {
  background: var(--color-sand-light);
  padding: var(--space-xl) 0;
}

.trust-bar__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2xl);
}

.trust-bar__stat {
  text-align: center;
}

.trust-bar__number {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 500;
  color: var(--color-charcoal);
}

.trust-bar__label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-charcoal-light);
}

@media (max-width: 640px) {
  .trust-bar__inner {
    flex-direction: column;
    gap: var(--space-lg);
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/TrustBar.jsx src/components/site/TrustBar.css
git commit -m "feat: add TrustBar stats section"
```

---

### Task 17: Create Services section

**Files:**
- Create: `src/components/site/Services.jsx`
- Create: `src/components/site/Services.css`

**Step 1: Create Services component**

Per design doc Section 2.4 — 3-card grid with icon containers.

```jsx
import { Camera, Video, View } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    icon: Camera,
    title: 'Photography',
    description: "Clean, bright, true-to-life listing photos. Drone aerials. Twilight exteriors. Edited, color-corrected, and MLS-ready — usually back in your hands within 24 hours.",
  },
  {
    icon: Video,
    title: 'Cinematic Video',
    description: "Signature reels built around you, not a template. Property tours, social clips, and content with real personality — every frame intentional, every edit polished.",
  },
  {
    icon: View,
    title: 'Virtual Tours & More',
    description: "360 virtual tours, interactive floorplans, and property websites. The full digital package for listings that need to stand out online.",
  },
];

export function Services() {
  const ref = useScrollReveal();

  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHeader
          tag="What We Do"
          title="Everything your listing needs. Nothing it doesn't."
          description="Every package is built around what actually sells homes — not a checklist of extras you'll never use."
        />
        <div className="services__grid reveal" ref={ref}>
          {SERVICES.map((service) => (
            <div className="services__card" key={service.title}>
              <div className="services__icon">
                <service.icon size={24} strokeWidth={1.8} color="#FDFCFA" />
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Services.css**

```css
.services {
  background: var(--color-warm-white);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.services__card {
  background: var(--color-sand-light);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-lg);
  transition: transform 0.35s var(--ease-interact), box-shadow 0.35s var(--ease-interact);
  border-top: 3px solid transparent;
}

.services__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-top-color: var(--color-redwood);
}

.services__icon {
  width: 48px;
  height: 48px;
  background: var(--color-redwood);
  border-radius: var(--radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
}

.services__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin-bottom: var(--space-sm);
  color: var(--color-charcoal);
}

.services__desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
}

@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Services.jsx src/components/site/Services.css
git commit -m "feat: add Services section with 3-card grid and Lucide icons"
```

---

### Task 18: Create FeaturedWork section

**Files:**
- Create: `src/components/site/FeaturedWork.jsx`
- Create: `src/components/site/FeaturedWork.css`

**Step 1: Create FeaturedWork component**

Per design doc Section 2.5 — video showcase with play overlays.

```jsx
import { useState } from 'react';
import { Play } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedWork.css';

const FEATURED_VIDEO = {
  thumbnail: '/images/showcase-living.jpg',
  embedUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  alt: 'Featured property tour by Redwards Media',
};

const REELS = [
  { thumbnail: '/images/showcase-exterior.jpg', embedUrl: '', alt: 'Signature Reel 1' },
  { thumbnail: '/images/hero-kitchen.jpg', embedUrl: '', alt: 'Signature Reel 2' },
  { thumbnail: '/images/hero-exterior.jpg', embedUrl: '', alt: 'Signature Reel 3' },
];

function VideoCard({ video, aspect = 'landscape' }) {
  const [playing, setPlaying] = useState(false);

  if (playing && video.embedUrl) {
    return (
      <div className={`featured-work__video featured-work__video--${aspect}`}>
        <iframe
          src={`${video.embedUrl}?autoplay=1`}
          title={video.alt}
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`featured-work__video featured-work__video--${aspect}`}
      onClick={() => video.embedUrl && setPlaying(true)}
    >
      <img src={video.thumbnail} alt={video.alt} loading="lazy" />
      <button className="featured-work__play" aria-label="Play video">
        <Play size={28} strokeWidth={1.8} fill="currentColor" />
      </button>
    </div>
  );
}

export function FeaturedWork() {
  const ref = useScrollReveal();

  return (
    <section className="featured-work section" id="featured-work">
      <div className="container">
        <SectionHeader
          tag="Featured Work"
          title="See what intentional content looks like."
        />
        <div className="featured-work__grid reveal" ref={ref}>
          <VideoCard video={FEATURED_VIDEO} aspect="landscape" />
          <div className="featured-work__reels">
            {REELS.map((reel, i) => (
              <VideoCard key={i} video={reel} aspect="portrait" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create FeaturedWork.css**

```css
.featured-work {
  background: var(--color-sand-light);
}

.featured-work__grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.featured-work__video {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-base);
  cursor: pointer;
  background: var(--color-cream);
}

.featured-work__video--landscape {
  aspect-ratio: 16 / 9;
}

.featured-work__video--portrait {
  aspect-ratio: 9 / 16;
}

.featured-work__video img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-work__video iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

.featured-work__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--color-charcoal);
  color: var(--color-warm-white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.3s ease;
  padding-left: 4px;
}

.featured-work__video:hover .featured-work__play {
  background: var(--color-redwood);
  transform: translate(-50%, -50%) scale(1.1);
}

.featured-work__reels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 640px) {
  .featured-work__reels {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  .featured-work__play {
    width: 48px;
    height: 48px;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/FeaturedWork.jsx src/components/site/FeaturedWork.css
git commit -m "feat: add FeaturedWork section with video showcase and play overlays"
```

---

### Task 19: Create About section

**Files:**
- Create: `src/components/site/About.jsx`
- Create: `src/components/site/About.css`

**Step 1: Create About component**

Per design doc Section 2.6 — two-column photo + text, now on the main page flow.

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './About.css';

export function About() {
  const ref = useScrollReveal();

  return (
    <section className="about section" id="about">
      <div className="about__inner container reveal" ref={ref}>
        <div className="about__image">
          <img src="/images/headshot.jpg" alt="Rohan Edwards — Redwards Media founder" loading="lazy" />
        </div>
        <div className="about__text">
          <span className="section-tag">Meet Rohan</span>
          <h2 className="section-title">I'm here to bring out <em>your best.</em></h2>
          <p>
            I'm a videographer and photographer based in Cambridge, MA. For the past eight-plus years, I've been helping real estate agents discover and showcase the best version of themselves — on camera, on social, and in every piece of content they put out there.
          </p>
          <p>
            My philosophy is simple — every video is an ad. No filler. No throwaway content. Every frame should have depth, personality, and lasting value.
          </p>
          <p>
            Most agents are nervous on camera — that's normal. I don't do scripted lines or forced poses. I create a space where your real personality comes through, and the final product always makes you feel like you nailed it.
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create About.css**

```css
.about {
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top left, rgba(139, 158, 131, 0.08), transparent 70%);
}

.about__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-2xl);
  align-items: center;
}

.about__image img {
  width: 100%;
  border-radius: var(--radius-xl);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}

.about__text .section-title em {
  font-style: italic;
  color: var(--color-redwood);
}

.about__text p {
  margin-top: var(--space-sm);
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
}

@media (max-width: 1024px) {
  .about__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .about__image {
    max-width: 400px;
    margin: 0 auto;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/About.jsx src/components/site/About.css
git commit -m "feat: add About section with two-column photo and story"
```

---

### Task 20: Create Process section

**Files:**
- Create: `src/components/site/Process.jsx`
- Create: `src/components/site/Process.css`

**Step 1: Create Process component**

Per design doc Section 2.7 — 3-step Book/Shoot/Deliver.

```jsx
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Process.css';

const STEPS = [
  {
    number: '01',
    title: 'Book',
    description: "Choose your package and pick your date. Book online in under a minute — no calls, no back-and-forth.",
  },
  {
    number: '02',
    title: 'Shoot',
    description: "We handle everything on set. Professional, efficient, and comfortable — your personality shines through.",
  },
  {
    number: '03',
    title: 'Deliver',
    description: "Edited, color-corrected, and MLS-ready. Your content is in your hands within 24 hours.",
  },
];

export function Process() {
  const ref = useScrollReveal();

  return (
    <section className="process section">
      <div className="container">
        <SectionHeader
          tag="How It Works"
          title="Simple from start to finish."
        />
        <div className="process__steps reveal" ref={ref}>
          {STEPS.map((step) => (
            <div className="process__step" key={step.number}>
              <span className="process__number">{step.number}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Process.css**

```css
.process {
  background: var(--color-sand-light);
}

.process__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  position: relative;
}

/* Connecting line between steps */
.process__steps::before {
  content: '';
  position: absolute;
  top: 28px;
  left: calc(16.67% + 20px);
  right: calc(16.67% + 20px);
  height: 2px;
  background: var(--color-cream);
}

.process__step {
  text-align: center;
  position: relative;
}

.process__number {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-redwood);
  margin-bottom: var(--space-md);
  position: relative;
  z-index: 1;
  background: var(--color-sand-light);
  padding: 0 var(--space-sm);
}

.process__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin-bottom: var(--space-xs);
  color: var(--color-charcoal);
}

.process__desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
}

@media (max-width: 640px) {
  .process__steps {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .process__steps::before {
    display: none;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Process.jsx src/components/site/Process.css
git commit -m "feat: add Process section with 3-step Book/Shoot/Deliver"
```

---

### Task 21: Create Packages section

**Files:**
- Create: `src/components/site/Packages.jsx`
- Create: `src/components/site/Packages.css`

**Step 1: Create Packages component**

Per design doc Section 2.8 — 4-column pricing grid. Keep existing feature lists from `site-root.html`.

Reference `site-root.html` for the exact feature lists per package. The data below is extracted from the current site:

```jsx
import { Check } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { Badge } from '../shared/Badge';
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Packages.css';

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

const PACKAGES = [
  {
    name: 'Base',
    price: '$400',
    priceNote: null,
    featured: false,
    description: 'Photos, drone, and a market-ready listing.',
    features: [
      'Interior & exterior photos',
      'Drone aerials',
      'Photo editing & color correction',
      'MLS-ready format',
      '24hr turnaround',
    ],
  },
  {
    name: 'Standard',
    price: '$650',
    priceNote: null,
    featured: true,
    description: 'Everything in Base + 360 Tour.',
    features: [
      'Everything in Base',
      '360 virtual tour',
      'Interactive floorplan',
      'Property website',
      '24hr turnaround',
    ],
  },
  {
    name: 'Pro',
    price: 'From $900',
    priceNote: null,
    featured: false,
    description: 'Everything in Standard + Signature Reel.',
    features: [
      'Everything in Standard',
      'Signature Reel (60-90s)',
      'Social media cut-downs',
      'Agent brand content',
      '48hr video turnaround',
    ],
  },
  {
    name: 'Max',
    price: 'From $1,300',
    priceNote: null,
    featured: false,
    description: 'The full production package.',
    features: [
      'Everything in Pro',
      'Extended cinematic video',
      'Twilight photography',
      'Custom property website',
      'Priority turnaround',
    ],
  },
];

export function Packages() {
  const ref = useScrollReveal();

  return (
    <section className="packages section" id="packages">
      <div className="container">
        <SectionHeader
          tag="Pricing"
          title="Simple, transparent pricing."
          description="Every package includes professional editing, color correction, and MLS-ready files. No hidden fees."
        />
        <div className="packages__grid reveal" ref={ref}>
          {PACKAGES.map((pkg) => (
            <div className={`packages__card ${pkg.featured ? 'packages__card--featured' : ''}`} key={pkg.name}>
              {pkg.featured && <Badge>Most Popular</Badge>}
              <h3 className="packages__name">{pkg.name}</h3>
              <div className="packages__price">{pkg.price}</div>
              <p className="packages__description">{pkg.description}</p>
              <ul className="packages__features">
                {pkg.features.map((feature) => (
                  <li key={feature} className="packages__feature">
                    <span className="packages__check">
                      <Check size={12} strokeWidth={2.5} color="#FDFCFA" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={pkg.featured ? 'cta' : 'primary'} href={BOOKING_URL} className="packages__cta">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Packages.css**

```css
.packages {
  background: var(--color-warm-white);
}

.packages__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  align-items: start;
}

.packages__card {
  background: var(--color-warm-white);
  border: 1px solid var(--color-cream);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s var(--ease-interact), box-shadow 0.35s var(--ease-interact);
}

.packages__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.packages__card--featured {
  border: 2px solid var(--color-redwood);
  transform: scale(1.03);
  box-shadow: var(--shadow-md);
}

.packages__card--featured:hover {
  transform: scale(1.03) translateY(-4px);
}

.packages__name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin-top: var(--space-sm);
  margin-bottom: var(--space-xs);
  color: var(--color-charcoal);
}

.packages__price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-charcoal);
  margin-bottom: var(--space-xs);
}

.packages__description {
  font-size: 0.85rem;
  color: var(--color-charcoal-light);
  margin-bottom: var(--space-md);
}

.packages__features {
  flex: 1;
  margin-bottom: var(--space-lg);
}

.packages__feature {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--color-charcoal-light);
  padding: 0.4rem 0;
}

.packages__check {
  width: 18px;
  height: 18px;
  min-width: 18px;
  background: var(--color-redwood);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.packages__cta {
  width: 100%;
  text-align: center;
}

@media (max-width: 1024px) {
  .packages__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .packages__card--featured {
    transform: none;
  }
}

@media (max-width: 640px) {
  .packages__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Packages.jsx src/components/site/Packages.css
git commit -m "feat: add Packages section with 4-column pricing grid"
```

---

### Task 22: Create Testimonials section

**Files:**
- Create: `src/components/site/Testimonials.jsx`
- Create: `src/components/site/Testimonials.css`

**Step 1: Create Testimonials component**

Per design doc Section 2.9 — placeholder testimonial cards + stats row.

```jsx
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: "Rohan made me feel like I actually knew what I was doing on camera. The content he creates isn't just good — it's me, but better.",
    name: 'Placeholder Client',
    title: 'Real Estate Agent',
  },
  {
    quote: "24 hours. That's all it took to get back the most incredible listing photos I've ever had. I send every single listing to Redwards now.",
    name: 'Placeholder Client',
    title: 'Listing Agent, Greater Boston',
  },
  {
    quote: "The Signature Reel changed everything for my brand. People recognize me from my videos before I even introduce myself.",
    name: 'Placeholder Client',
    title: 'Luxury Real Estate Agent',
  },
];

const STATS = [
  { number: '500+', label: 'Properties Delivered' },
  { number: '24hr', label: 'Standard Turnaround' },
  { number: '8+', label: 'Years in Real Estate Media' },
];

export function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="testimonials section">
      <div className="container">
        <SectionHeader
          tag="What Agents Say"
          title="Built on real relationships."
        />

        <div className="testimonials__grid reveal" ref={ref}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonials__card" key={i}>
              <blockquote className="testimonials__quote">"{t.quote}"</blockquote>
              <div className="testimonials__author">
                <span className="testimonials__name">{t.name}</span>
                <span className="testimonials__title">{t.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__stats">
          {STATS.map((stat, i) => (
            <div className="testimonials__stat" key={i}>
              <span className="testimonials__stat-number">{stat.number}</span>
              <span className="testimonials__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Testimonials.css**

```css
.testimonials {
  background: var(--color-sand-light);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.testimonials__card {
  background: var(--color-warm-white);
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-lg);
  border: 1px solid var(--color-cream);
}

.testimonials__quote {
  font-family: var(--font-display);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-charcoal);
  margin-bottom: var(--space-md);
}

.testimonials__name {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-charcoal);
}

.testimonials__title {
  font-size: 0.78rem;
  color: var(--color-charcoal-light);
}

.testimonials__stats {
  display: flex;
  justify-content: center;
  gap: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-cream);
}

.testimonials__stat {
  text-align: center;
}

.testimonials__stat-number {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-charcoal);
}

.testimonials__stat-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-charcoal-light);
}

@media (max-width: 1024px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 640px) {
  .testimonials__stats {
    flex-direction: column;
    gap: var(--space-lg);
    align-items: center;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Testimonials.jsx src/components/site/Testimonials.css
git commit -m "feat: add Testimonials section with quote cards and stats"
```

---

### Task 23: Create Gallery section

**Files:**
- Create: `src/components/site/Gallery.jsx`
- Create: `src/components/site/Gallery.css`

**Step 1: Create Gallery component**

Per design doc Section 2.10 — asymmetric masonry grid (items 1 & 4 span 2 columns).

```jsx
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Gallery.css';

const GALLERY_ITEMS = [
  { src: '/images/gallery-drone.jpg', alt: 'Drone aerial of luxury property', span: true },
  { src: '/images/gallery-exterior.jpg', alt: 'Twilight exterior photography' },
  { src: '/images/gallery-kitchen.jpg', alt: 'Modern kitchen interior' },
  { src: '/images/gallery-living.jpg', alt: 'Living room natural light', span: true },
  { src: '/images/gallery-openplan.jpg', alt: 'Open plan living and dining' },
];

export function Gallery() {
  const ref = useScrollReveal();

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <SectionHeader
          tag="Portfolio"
          title="See the difference."
        />
        <div className="gallery__grid reveal" ref={ref}>
          {GALLERY_ITEMS.map((item, i) => (
            <div className={`gallery__item ${item.span ? 'gallery__item--span' : ''}`} key={i}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Gallery.css**

```css
.gallery {
  background: var(--color-warm-white);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.gallery__item {
  border-radius: var(--radius-base);
  overflow: hidden;
  background: var(--color-cream);
  transition: transform 0.35s var(--ease-interact), box-shadow 0.35s var(--ease-interact);
}

.gallery__item:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.gallery__item--span {
  grid-column: span 2;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16 / 10;
}

.gallery__item--span img {
  aspect-ratio: 2 / 1;
}

@media (max-width: 640px) {
  .gallery__grid {
    grid-template-columns: 1fr;
  }

  .gallery__item--span {
    grid-column: 1;
  }

  .gallery__item img,
  .gallery__item--span img {
    aspect-ratio: 16 / 10;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/site/Gallery.jsx src/components/site/Gallery.css
git commit -m "feat: add Gallery section with asymmetric masonry grid"
```

---

### Task 24: Create CTA section

**Files:**
- Create: `src/components/site/CTASection.jsx`
- Create: `src/components/site/CTASection.css`

**Step 1: Create CTASection component**

Per design doc Section 2.11 — dark charcoal conversion section.

```jsx
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './CTASection.css';

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

export function CTASection() {
  const ref = useScrollReveal();

  return (
    <section className="cta-section section-dark section reveal" ref={ref}>
      <div className="cta-section__inner container">
        <h2 className="cta-section__title">Ready to see yourself in your best light?</h2>
        <p className="cta-section__desc">
          Book a shoot in minutes, or just reach out — I'm always happy to talk through what would work best for you. No pressure, no pitch. Just a conversation.
        </p>
        <Button variant="cta" href={BOOKING_URL}>Book a Shoot</Button>
      </div>
    </section>
  );
}
```

**Step 2: Create CTASection.css**

```css
.cta-section__inner {
  text-align: center;
  max-width: 700px;
}

.cta-section__title {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  margin-bottom: var(--space-md);
}

.cta-section__desc {
  margin-bottom: var(--space-xl);
  font-size: 0.95rem;
}
```

**Step 3: Commit**

```bash
git add src/components/site/CTASection.jsx src/components/site/CTASection.css
git commit -m "feat: add CTASection with dark charcoal background"
```

---

## Phase 5: Page Composition & Routing

### Task 25: Create HomePage component

**Files:**
- Create: `src/pages/HomePage.jsx`

**Step 1: Create HomePage**

Composes all site sections in the design doc order:

```jsx
import { Nav } from '../components/shared/Nav';
import { Hero } from '../components/site/Hero';
import { TrustBar } from '../components/site/TrustBar';
import { Services } from '../components/site/Services';
import { FeaturedWork } from '../components/site/FeaturedWork';
import { About } from '../components/site/About';
import { Process } from '../components/site/Process';
import { Packages } from '../components/site/Packages';
import { Testimonials } from '../components/site/Testimonials';
import { Gallery } from '../components/site/Gallery';
import { CTASection } from '../components/site/CTASection';
import { Footer } from '../components/shared/Footer';

export function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedWork />
      <About />
      <Process />
      <Packages />
      <Testimonials />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: add HomePage composing all site sections in order"
```

---

### Task 26: Create ReelScripterPage wrapper

**Files:**
- Create: `src/pages/ReelScripterPage.jsx`
- Move: `src/App.jsx` → `src/components/reelscripter/ReelScripterApp.jsx`

**Step 1: Copy existing App.jsx to its new location**

```bash
mkdir -p src/components/reelscripter
cp src/App.jsx src/components/reelscripter/ReelScripterApp.jsx
```

**Step 2: Update the export name in ReelScripterApp.jsx**

In `src/components/reelscripter/ReelScripterApp.jsx`, the default export is already `App`. Rename it to `ReelScripterApp`:

Change: `export default function App()` → `export default function ReelScripterApp()`

**Step 3: Create ReelScripterPage.jsx**

```jsx
import ReelScripterApp from '../components/reelscripter/ReelScripterApp';

export function ReelScripterPage() {
  return <ReelScripterApp />;
}
```

**Step 4: Commit**

```bash
git add src/components/reelscripter/ReelScripterApp.jsx src/pages/ReelScripterPage.jsx
git commit -m "feat: extract ReelScripterApp to reelscripter directory, add wrapper page"
```

---

### Task 27: Create new App.jsx router

**Files:**
- Modify: `src/App.jsx`

**Step 1: Replace App.jsx with path-based router**

Replace the entire contents of `src/App.jsx`:

```jsx
import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith('/reelscripter')) {
    return <ReelScripterPage />;
  }

  return <HomePage />;
}
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: replace App.jsx with path-based router for main site vs Reel Scripter"
```

---

### Task 28: Update main.jsx entry point

**Files:**
- Modify: `src/main.jsx`

**Step 1: Update main.jsx**

Import brand tokens and global styles. Keep service worker registration for Reel Scripter:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/brand.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Reel Scripter PWA service worker
if ("serviceWorker" in navigator && window.location.pathname.startsWith('/reelscripter')) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/reelscripter/sw.js").catch(() => {});
  });
}
```

**Step 2: Commit**

```bash
git add src/main.jsx
git commit -m "feat: update main.jsx to import brand tokens and global styles"
```

---

## Phase 6: Build Verification & Fixes

### Task 29: Run dev server and verify main site renders

**Step 1: Start dev server**

Run: `cd /c/Claude/redwards-media-site && npm run dev`

**Step 2: Open browser at http://localhost:5173/**

Verify:
- All sections render in order (Nav → Hero → TrustBar → Services → ... → Footer)
- Brand fonts load (Playfair Display for headings, DM Sans for body)
- Brand colors are correct (charcoal, redwood, warm-white)
- No console errors

**Step 3: Open http://localhost:5173/reelscripter/**

Verify:
- Reel Scripter still loads and works (password screen, etc.)
- No broken imports or errors

**Step 4: Fix any issues found**

Address any build errors, missing imports, or rendering issues.

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues from initial integration"
```

---

### Task 30: Verify responsive breakpoints

**Step 1: Test at 640px (mobile)**

Verify:
- Nav hamburger shows
- Hero stacks to single column
- Package cards stack to single column
- Gallery stacks to single column
- Footer stacks to single column

**Step 2: Test at 1024px (tablet)**

Verify:
- Hero stacks to single column
- Package cards show 2x2 grid
- Service cards stack
- About section stacks

**Step 3: Fix any responsive issues**

```bash
git add -A
git commit -m "fix: responsive layout adjustments"
```

---

### Task 31: Verify build succeeds for Vercel

**Step 1: Run production build**

Run: `cd /c/Claude/redwards-media-site && npm run build`

Expected: Build completes without errors, output in `dist/` directory.

**Step 2: Verify dist output**

Run: `ls dist/`

Expected: `index.html`, `assets/` directory with JS/CSS bundles, and `images/` directory.

Also verify Reel Scripter PWA assets:
Run: `ls dist/reelscripter/ 2>/dev/null || echo "No reelscripter dir (expected — PWA assets are in public/reelscripter/)"`

Note: The `public/reelscripter/` directory (manifest.json, sw.js, icons) is automatically copied to `dist/reelscripter/` by Vite.

**Step 3: Fix any build issues**

```bash
git add -A
git commit -m "fix: production build issues"
```

---

## Phase 7: Reel Scripter Brand Token Pass

### Task 32: Add brand.css import to Reel Scripter

**Files:**
- Modify: `src/components/reelscripter/ReelScripterApp.jsx`

**Step 1: Replace hardcoded B color tokens with CSS custom property references**

In `ReelScripterApp.jsx`, the `B` object has hardcoded colors. Update these to reference CSS custom properties from `brand.css`:

Find the `B` object (near the top of the file) and update color values:

```javascript
const B = {
  bg: "var(--color-sand-light)",       // was "#FAF8F5"
  surface: "#FFFFFF",
  surfaceAlt: "var(--color-sand)",     // was "#F3EFE9"
  card: "#FFFFFF",
  cardHover: "#FEFDFB",
  cardBorder: "var(--color-cream)",    // was "#E8E2DA"
  charcoal: "var(--color-charcoal)",   // was "#2C2926"
  charcoalSoft: "var(--color-charcoal-light)", // was "#4A4541"
  redwood: "var(--color-redwood)",     // was "#AE4A3E"
  redwoodSoft: "var(--color-redwood-soft)", // was "#C47068"
  sage: "var(--color-sage)",           // was "#8B9E83" (FIXES wrong sage color)
  sageSoft: "var(--color-sage-soft)",  // was "#A8B8A1"
  warmWhite: "var(--color-warm-white)", // was "#FDFCFA"
  sand: "var(--color-sand)",           // was "#F5F0EB"
  cream: "var(--color-cream)",         // was "#EDE8E0"
  sans: "var(--font-body)",           // was "'DM Sans', ..."
  serif: "var(--font-display)",       // was "'Playfair Display', ..."
};
```

**Important note:** CSS custom properties used in inline `style` props must use the `var()` function syntax. Since the `B` object feeds into JSX inline styles, this will work because React passes `var(--color-charcoal)` as a string value to the style attribute.

**Step 2: Verify Reel Scripter still renders correctly**

Navigate to http://localhost:5173/reelscripter/ and verify:
- Colors are correct
- Fonts load correctly
- No broken styles

**Step 3: Commit**

```bash
git add src/components/reelscripter/ReelScripterApp.jsx
git commit -m "feat: replace Reel Scripter hardcoded colors with brand.css tokens"
```

---

## Phase 8: Final Polish & Deploy

### Task 33: Remove deprecated files

**Files:**
- Delete or archive: `site-root.html`
- Delete: `scripts/copy-site.mjs`

**Step 1: Remove files no longer needed**

```bash
cd /c/Claude/redwards-media-site
# Keep site-root.html for reference but mark as deprecated
git rm scripts/copy-site.mjs
git rm site-root.html
```

**Step 2: Commit**

```bash
git commit -m "chore: remove deprecated site-root.html and copy-site.mjs"
```

---

### Task 34: Final build and deploy verification

**Step 1: Full production build**

Run: `npm run build`
Expected: Clean build, no warnings.

**Step 2: Preview production build**

Run: `npm run preview`
Navigate to http://localhost:4173/ and verify:
- Main site loads with all sections
- Navigate to /reelscripter/ — Reel Scripter loads
- All images load
- Responsive breakpoints work
- Scroll reveal animations trigger
- All links work (anchor scrolls, external links)

**Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final polish and build verification"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-6 | Foundation: deps, tokens, global CSS, build config |
| 2 | 7-8 | Custom hooks: scroll reveal, media query |
| 3 | 9-14 | Shared components: Logo, Button, SectionHeader, Badge, Nav, Footer |
| 4 | 15-24 | Site sections: Hero, TrustBar, Services, FeaturedWork, About, Process, Packages, Testimonials, Gallery, CTA |
| 5 | 25-28 | Page composition & routing: HomePage, ReelScripterPage, App.jsx, main.jsx |
| 6 | 29-31 | Build verification & responsive fixes |
| 7 | 32 | Reel Scripter brand token pass |
| 8 | 33-34 | Cleanup deprecated files, final deploy verification |

**Total: 34 tasks across 8 phases**

Each phase produces working, committable code. The site is buildable after Phase 5 (all components exist) and fully polished by Phase 8.
