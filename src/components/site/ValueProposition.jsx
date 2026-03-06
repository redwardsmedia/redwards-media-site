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
            Every package comes loaded — AI editing, virtual staging, clutter removal, twilight enhancements, and drone aerials are all built in. No add-on menus, no a-la-carte surprises. You book, we handle the rest.
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
