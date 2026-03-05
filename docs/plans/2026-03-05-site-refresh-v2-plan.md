# Site Refresh v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix bugs, replace pricing with value-first section, update copy/stats, and add parallax + visual signature design elements to the Redwards Media site.

**Architecture:** All changes are to existing React components and CSS. One new hook (`useParallax`), one renamed component (`Packages` → `ValueProposition`). No new dependencies.

**Tech Stack:** React 19, Vite 6.2, CSS Custom Properties, Lucide React

**Note:** No test suite exists. Each task is verified via dev server preview and production build. Use `npm run build` to verify no build errors after each batch.

---

## Phase 1: Bug Fixes (Tasks 1-2)

### Task 1: Fix router — Nav disappears on back-navigation

**Files:**
- Modify: `src/App.jsx`

**Problem:** `App.jsx` reads `window.location.pathname` once on render. When user navigates to `/reelscripter/` and clicks browser back, React doesn't re-render because no state changed — the component still shows whatever it rendered for the old path.

**Step 1: Replace App.jsx with state-based router**

Replace the entire contents of `src/App.jsx` with:

```jsx
import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (path.startsWith('/reelscripter')) {
    return <ReelScripterPage />;
  }

  return <HomePage />;
}
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "fix: add popstate listener so Nav persists on back-navigation"
```

---

### Task 2: Fix Hero image loading

**Files:**
- Modify: `src/components/site/Hero.css`

**Problem:** The `.hero__image` container has no explicit sizing. If the image fails to load or is slow, the container collapses to 0 height. Also, the image may need `aspect-ratio` to reserve space.

**Step 1: Add defensive sizing to Hero image container**

In `src/components/site/Hero.css`, replace the `.hero__image` and `.hero__image img` rules:

Find:
```css
.hero__image {
  position: relative;
}

.hero__image img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}
```

Replace with:
```css
.hero__image {
  position: relative;
  min-height: 300px;
}

.hero__image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}
```

**Step 2: Verify** — Dev server, hero image should have reserved space even before image loads.

**Step 3: Commit**

```bash
git add src/components/site/Hero.css
git commit -m "fix: add aspect-ratio and min-height to hero image container"
```

---

## Phase 2: Content Updates (Tasks 3-7)

### Task 3: Update TrustBar stats

**Files:**
- Modify: `src/components/site/TrustBar.jsx`

**Step 1: Update STATS array**

In `src/components/site/TrustBar.jsx`, replace the STATS constant:

Find:
```javascript
const STATS = [
  { number: '500+', label: 'Properties Delivered' },
  { number: '24hr', label: 'Standard Turnaround' },
  { number: '8+', label: 'Years in Real Estate Media' },
];
```

Replace with:
```javascript
const STATS = [
  { number: '500+', label: 'Properties Delivered' },
  { number: '24hr', label: 'Standard Turnaround' },
  { number: '8+', label: 'Years as a Creative' },
];
```

**Step 2: Commit**

```bash
git add src/components/site/TrustBar.jsx
git commit -m "fix: correct TrustBar stat to '8+ Years as a Creative'"
```

---

### Task 4: Refresh About section copy

**Files:**
- Modify: `src/components/site/About.jsx`

**Step 1: Replace About component with updated copy**

Replace the entire contents of `src/components/site/About.jsx` with:

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
            Eight-plus years behind the camera as a videographer, marketer, and creative — three of those spent exclusively in real estate media. Every photo, every reel, every piece of content I produce is tailored to the client, the brand, and the property. No templates. No recycled edits. Just work that presents you in the best possible light.
          </p>
          <p>
            I prioritize speed and efficiency on-site so your shoot is stress-free and won't eat your whole day. AI-powered editing, virtual staging, clutter removal, and twilight enhancements are all built into every package — problems get solved before you even think to ask.
          </p>
          <p>
            Most agents are nervous on camera — that's normal. I create a space where your real personality comes through, and the final product always makes you feel like you nailed it.
          </p>
          <p className="about__tease">
            Beyond listing media, I help agents build brands that compound.
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add styling for the strategist tease line**

In `src/components/site/About.css`, add after the existing `.about__text p` rule:

```css
.about__tease {
  margin-top: var(--space-md);
  font-style: italic;
  color: var(--color-redwood);
  font-weight: 500;
}
```

**Step 3: Commit**

```bash
git add src/components/site/About.jsx src/components/site/About.css
git commit -m "feat: refresh About copy — creative, operator, strategist tease"
```

---

### Task 5: Replace Packages with ValueProposition section

**Files:**
- Create: `src/components/site/ValueProposition.jsx`
- Create: `src/components/site/ValueProposition.css`
- Delete: `src/components/site/Packages.jsx`
- Delete: `src/components/site/Packages.css`

**Step 1: Create ValueProposition.jsx**

Create `src/components/site/ValueProposition.jsx`:

```jsx
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ValueProposition.css';

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

const INCLUSIONS = [
  'Professional photo editing & color correction',
  'AI-powered virtual staging & clutter removal',
  'Drone aerials & virtual twilight enhancements',
  '24-hour standard turnaround on every package',
];

export function ValueProposition() {
  const ref = useScrollReveal();

  return (
    <section className="value section" id="pricing">
      <div className="value__inner container reveal" ref={ref}>
        <div className="value__text">
          <span className="section-tag">All-Inclusive Packages</span>
          <h2 className="section-title">Everything you need. Nothing extra to stress about.</h2>
          <p className="value__desc">
            Every package comes loaded — AI editing, virtual staging, clutter removal, twilight enhancements, and drone aerials are all built in. No add-on menus, no a-la-carte surprises. You book, I handle the rest.
          </p>
          <ul className="value__list">
            {INCLUSIONS.map((item) => (
              <li key={item} className="value__item">
                <span className="value__check">
                  <Check size={14} strokeWidth={2.5} color="#FDFCFA" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="value__cta-block">
          <div className="value__price-anchor">
            <span className="value__price-label">All-inclusive packages start at</span>
            <span className="value__price">$400</span>
          </div>
          <Button variant="cta" href={BOOKING_URL}>
            View Packages & Book <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
          <p className="value__subtext">Enter your address to see full pricing and availability.</p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create ValueProposition.css**

Create `src/components/site/ValueProposition.css`:

```css
.value {
  background: var(--color-sand-light);
}

.value__inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

.value__desc {
  margin-top: var(--space-sm);
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-charcoal-light);
  max-width: 540px;
}

.value__list {
  margin-top: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.value__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-charcoal);
  font-weight: 500;
}

.value__check {
  width: 22px;
  height: 22px;
  min-width: 22px;
  background: var(--color-redwood);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.value__cta-block {
  text-align: center;
  background: var(--color-warm-white);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  box-shadow: var(--shadow-md);
}

.value__price-anchor {
  margin-bottom: var(--space-lg);
}

.value__price-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-charcoal-light);
  margin-bottom: var(--space-xs);
}

.value__price {
  display: block;
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-charcoal);
}

.value__subtext {
  margin-top: var(--space-sm);
  font-size: 0.78rem;
  color: var(--color-charcoal-light);
}

@media (max-width: 1024px) {
  .value__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .value__desc {
    max-width: 100%;
  }

  .value__list {
    align-items: center;
  }

  .value__cta-block {
    max-width: 400px;
    margin: 0 auto;
  }
}
```

**Step 3: Delete old Packages files**

```bash
git rm src/components/site/Packages.jsx src/components/site/Packages.css
```

**Step 4: Commit**

```bash
git add src/components/site/ValueProposition.jsx src/components/site/ValueProposition.css
git commit -m "feat: replace Packages pricing grid with ValueProposition section"
```

---

### Task 6: Update HomePage to use ValueProposition

**Files:**
- Modify: `src/pages/HomePage.jsx`

**Step 1: Swap Packages for ValueProposition**

In `src/pages/HomePage.jsx`:

Find:
```javascript
import { Packages } from '../components/site/Packages';
```
Replace with:
```javascript
import { ValueProposition } from '../components/site/ValueProposition';
```

Find:
```jsx
      <Packages />
```
Replace with:
```jsx
      <ValueProposition />
```

**Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: swap Packages for ValueProposition in HomePage"
```

---

### Task 7: Update Nav and Footer links

**Files:**
- Modify: `src/components/shared/Nav.jsx`
- Modify: `src/components/shared/Footer.jsx`

**Step 1: Update Nav links — remove Packages, link to pricing anchor**

In `src/components/shared/Nav.jsx`, replace the NAV_LINKS constant:

Find:
```javascript
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
];
```

Replace with:
```javascript
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
];
```

**Step 2: Update Footer links — remove Packages reference**

In `src/components/shared/Footer.jsx`, replace the FOOTER_LINKS constant:

Find:
```javascript
const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
  { label: 'Book a Shoot', href: 'https://book.aryeo.com/order/redwards-media' },
];
```

Replace with:
```javascript
const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
  { label: 'Book a Shoot', href: 'https://book.aryeo.com/order/redwards-media' },
];
```

**Step 3: Commit**

```bash
git add src/components/shared/Nav.jsx src/components/shared/Footer.jsx
git commit -m "feat: remove Packages nav link, update Footer links"
```

---

## Phase 3: Design Upgrades (Tasks 8-13)

### Task 8: Create useParallax hook

**Files:**
- Create: `src/hooks/useParallax.js`

**Step 1: Create the hook**

Create `src/hooks/useParallax.js`:

```javascript
import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const viewH = window.innerHeight;
          if (rect.bottom > 0 && rect.top < viewH) {
            const offset = (rect.top - viewH / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useParallax.js
git commit -m "feat: add useParallax hook for scroll-driven parallax"
```

---

### Task 9: Add parallax to Hero image

**Files:**
- Modify: `src/components/site/Hero.jsx`
- Modify: `src/components/site/Hero.css`

**Step 1: Add parallax to hero image**

In `src/components/site/Hero.jsx`, add the import:

Find:
```javascript
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
```

Replace with:
```javascript
import { Button } from '../shared/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
```

Then add the parallax ref. Find:
```javascript
export function Hero() {
  const ref = useScrollReveal();
```

Replace with:
```javascript
export function Hero() {
  const ref = useScrollReveal();
  const parallaxRef = useParallax(0.15);
```

Then apply it to the image. Find:
```jsx
          <img src="/images/hero-exterior.jpg" alt="Premium property exterior photography by Redwards Media" loading="eager" />
```

Replace with:
```jsx
          <img ref={parallaxRef} src="/images/hero-exterior.jpg" alt="Premium property exterior photography by Redwards Media" loading="eager" />
```

**Step 2: Add overflow hidden to hero image container**

In `src/components/site/Hero.css`, find:

```css
.hero__image {
  position: relative;
  min-height: 300px;
}
```

Replace with:
```css
.hero__image {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  border-radius: var(--radius-lg);
}
```

And update the img rule to remove duplicate border-radius (now on container):

Find:
```css
.hero__image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}
```

Replace with:
```css
.hero__image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  will-change: transform;
}
```

Move box-shadow to the container. Find:
```css
.hero__image {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  border-radius: var(--radius-lg);
}
```

Replace with:
```css
.hero__image {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
```

**Step 3: Commit**

```bash
git add src/components/site/Hero.jsx src/components/site/Hero.css
git commit -m "feat: add subtle parallax effect to hero image"
```

---

### Task 10: Add angled section dividers

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/site/Hero.css`
- Modify: `src/components/site/About.css`
- Modify: `src/components/site/ValueProposition.css`

**Step 1: Add angled divider utility classes to global.css**

In `src/styles/global.css`, add before the `/* Responsive */` comment (before line 142):

```css
/* Angled Section Dividers */
.section-angle-bottom {
  position: relative;
}

.section-angle-bottom::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: inherit;
  clip-path: polygon(0 0, 100% 40%, 100% 100%, 0 100%);
  z-index: 1;
}

.section-angle-top {
  position: relative;
}

.section-angle-top::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
  z-index: 1;
}
```

**Step 2: Apply angle to Hero bottom**

In `src/components/site/Hero.css`, find:
```css
.hero {
  padding: var(--space-3xl) 0;
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top right, rgba(174, 74, 62, 0.06), transparent 70%);
}
```

Replace with:
```css
.hero {
  padding: var(--space-3xl) 0;
  padding-bottom: calc(var(--space-3xl) + 40px);
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top right, rgba(174, 74, 62, 0.06), transparent 70%);
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--color-sand-light);
  clip-path: polygon(0 60%, 100% 0, 100% 100%, 0 100%);
}
```

**Step 3: Apply angle to About section**

In `src/components/site/About.css`, find:
```css
.about {
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top left, rgba(139, 158, 131, 0.08), transparent 70%);
}
```

Replace with:
```css
.about {
  background: var(--color-warm-white);
  background-image: radial-gradient(ellipse at top left, rgba(139, 158, 131, 0.08), transparent 70%);
  position: relative;
}

.about::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--color-warm-white);
  clip-path: polygon(0 0, 100% 50%, 100% 100%, 0 100%);
}
```

**Step 4: Commit**

```bash
git add src/styles/global.css src/components/site/Hero.css src/components/site/About.css
git commit -m "feat: add angled section dividers for visual flow"
```

---

### Task 11: Add redwood accent lines

**Files:**
- Modify: `src/components/shared/SectionHeader.css`
- Modify: `src/components/site/About.css`

**Step 1: Add accent line to SectionHeader**

Read `src/components/shared/SectionHeader.css` first, then add a redwood accent line above the tag. In `src/components/shared/SectionHeader.css`, find the `.section-tag` styling (if it uses the global class) or add to the `.section-header` block. Add:

```css
.section-header::before {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--color-redwood);
  border-radius: 2px;
  margin-bottom: var(--space-sm);
}

.section-header--center::before {
  margin-left: auto;
  margin-right: auto;
}
```

**Step 2: Add accent line to About section text**

In `src/components/site/About.css`, add:

```css
.about__text::before {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--color-redwood);
  border-radius: 2px;
  margin-bottom: var(--space-sm);
}

@media (max-width: 1024px) {
  .about__text::before {
    margin-left: auto;
    margin-right: auto;
  }
}
```

**Step 3: Commit**

```bash
git add src/components/shared/SectionHeader.css src/components/site/About.css
git commit -m "feat: add redwood accent lines to section headers and About"
```

---

### Task 12: Add gradient fade transitions between sections

**Files:**
- Modify: `src/components/site/TrustBar.css`
- Modify: `src/components/site/Services.css`

**Step 1: Add gradient top to TrustBar (sand-light fades from hero's warm-white)**

In `src/components/site/TrustBar.css`, find:
```css
.trust-bar {
  background: var(--color-sand-light);
  padding: var(--space-xl) 0;
}
```

Replace with:
```css
.trust-bar {
  background: var(--color-sand-light);
  padding: var(--space-xl) 0;
  padding-top: calc(var(--space-xl) + 30px);
}
```

**Step 2: Add soft gradient blend at top of Services**

In `src/components/site/Services.css`, find:
```css
.services {
  background: var(--color-warm-white);
}
```

Replace with:
```css
.services {
  background: linear-gradient(to bottom, var(--color-sand-light) 0%, var(--color-warm-white) 8%, var(--color-warm-white) 100%);
}
```

**Step 3: Commit**

```bash
git add src/components/site/TrustBar.css src/components/site/Services.css
git commit -m "feat: add gradient fade transitions between sections"
```

---

### Task 13: Upgrade Services cards with thumbnail images

**Files:**
- Modify: `src/components/site/Services.jsx`
- Modify: `src/components/site/Services.css`

**Step 1: Replace Lucide icons with thumbnail images**

Replace the entire contents of `src/components/site/Services.jsx` with:

```jsx
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    image: '/images/gallery-kitchen.jpg',
    alt: 'Professional kitchen real estate photo',
    title: 'Photography',
    description: "Clean, bright, true-to-life listing photos. Drone aerials. Twilight exteriors. Edited, color-corrected, and MLS-ready — usually back in your hands within 24 hours.",
  },
  {
    image: '/images/showcase-living.jpg',
    alt: 'Cinematic video still of luxury living room',
    title: 'Cinematic Video',
    description: "Signature reels tailored to you, your brand, and the property — not a template. Property tours, social clips, and content with real personality. Every frame intentional, every edit polished.",
  },
  {
    image: '/images/gallery-openplan.jpg',
    alt: 'Wide-angle interior for virtual tour',
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
              <div className="services__thumb">
                <img src={service.image} alt={service.alt} loading="lazy" />
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

**Step 2: Update Services CSS — replace icon styles with thumbnail styles**

In `src/components/site/Services.css`, find and remove the `.services__icon` block:

```css
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
```

Replace with:
```css
.services__thumb {
  border-radius: var(--radius-base);
  overflow: hidden;
  margin-bottom: var(--space-md);
  aspect-ratio: 16 / 10;
}

.services__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-interact);
}

.services__card:hover .services__thumb img {
  transform: scale(1.05);
}
```

**Step 3: Remove Lucide Camera/Video/View imports** (no longer needed — the new JSX doesn't import them)

**Step 4: Commit**

```bash
git add src/components/site/Services.jsx src/components/site/Services.css
git commit -m "feat: replace Services icon cards with property thumbnail images"
```

---

### Task 14: Enhance scroll reveal animations

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Make reveal animation slightly more dramatic**

In `src/styles/global.css`, find:
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-reveal), transform 0.7s var(--ease-reveal);
}
```

Replace with:
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s var(--ease-reveal), transform 0.8s var(--ease-reveal);
}
```

**Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: enhance scroll reveal animation distance and duration"
```

---

## Phase 4: Copy Polish (Task 15)

### Task 15: Polish Hero and Services copy

**Files:**
- Modify: `src/components/site/Hero.jsx`

**Step 1: Update Hero description to weave in friction-free and tailored messaging**

In `src/components/site/Hero.jsx`, find:
```jsx
          <p className="hero__desc reveal stagger-3">
            I help ambitious agents and teams discover and showcase the best version of themselves — through cinematic photography, video, and content that actually converts.
          </p>
```

Replace with:
```jsx
          <p className="hero__desc reveal stagger-3">
            Cinematic photography, video, and content tailored to you, your brand, and your listings — with every AI enhancement built in. No add-ons, no stress, no wasted time.
          </p>
```

**Step 2: Commit**

```bash
git add src/components/site/Hero.jsx
git commit -m "feat: polish Hero copy with friction-free and tailored messaging"
```

---

## Phase 5: Verification (Tasks 16-17)

### Task 16: Dev server visual verification

**Steps:**
1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5174/`
3. Verify each section renders:
   - Nav (no "Packages" link)
   - Hero with parallax image, updated copy
   - TrustBar with "8+ Years as a Creative"
   - Services with thumbnail images instead of icons
   - FeaturedWork (unchanged)
   - About with refreshed copy and accent line
   - Process (unchanged)
   - ValueProposition section (price anchor, inclusions list)
   - Testimonials (unchanged)
   - Gallery (unchanged)
   - CTA (unchanged)
   - Footer (no "Packages" link)
4. Verify angled dividers between hero/trustbar and about/process
5. Navigate to `/reelscripter/`, click browser back — verify Nav reappears
6. Check browser console for errors

### Task 17: Production build verification

**Steps:**
1. Run `npm run build`
2. Verify clean output, no errors
3. If any issues, fix and commit with `"chore: final build fixes"`

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-2 | Bug fixes (router, hero image) |
| 2 | 3-7 | Content updates (stats, about, value section, nav/footer) |
| 3 | 8-14 | Design upgrades (parallax, dividers, accents, gradients, thumbnails, animations) |
| 4 | 15 | Copy polish |
| 5 | 16-17 | Verification |

**Total: 17 tasks, ~15 files touched**
