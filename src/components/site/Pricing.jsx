import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Pricing.css';

const BOOKING_URL = 'https://book.aryeo.com/order/redwards-media';

const PACKAGES = [
  {
    name: 'Essentials',
    price: '$400',
    tagline: 'Everything you need to list with confidence.',
    features: [
      'Listing photos (interior + exterior)',
      'Aerial drone photography',
      'AI virtual staging, twilight & decluttering',
      '2D floorplan',
      'Property website',
    ],
    featured: false,
  },
  {
    name: 'Signature',
    price: '$1,100',
    tagline: 'The full listing presentation — including a Signature Reel with you on camera.',
    features: [
      'Everything in Essentials',
      '360° virtual tour',
      'Signature Agent Reel (you on camera)',
    ],
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Premier',
    price: '$1,500',
    tagline: 'Listing media plus brand-building content built around the property.',
    features: [
      'Everything in Signature',
      'B-roll library (color-graded selects)',
      'Neighborhood / community edit',
      'Property website video header',
      'Social media cut-downs (2-3 teaser clips)',
    ],
    featured: false,
  },
];

export function Pricing() {
  const ref = useScrollReveal();

  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        <SectionHeader
          tag="Pricing"
          title="Three packages. All-inclusive. No surprises."
        />
        <p className="pricing__subtitle">
          Every package comes loaded — AI editing, virtual staging, decluttering, twilight enhancements, and drone aerials are all built in. 24-hour photo turnaround on every shoot.
        </p>

        <div className="pricing__grid reveal" ref={ref}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`pricing__card ${pkg.featured ? 'pricing__card--featured' : ''}`}
            >
              {pkg.badge && (
                <span className="pricing__badge">{pkg.badge}</span>
              )}
              <h3 className="pricing__name">{pkg.name}</h3>
              <div className="pricing__price">{pkg.price}</div>
              <p className="pricing__tagline">{pkg.tagline}</p>

              <ul className="pricing__features">
                {pkg.features.map((f) => (
                  <li key={f} className="pricing__feature">
                    <span className="pricing__check">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.featured ? 'cta' : 'primary'}
                href={BOOKING_URL}
                className="pricing__cta"
              >
                Book a Shoot <ArrowRight size={15} strokeWidth={1.5} />
              </Button>
            </div>
          ))}
        </div>

        <p className="pricing__footnote">
          Need something custom — luxury listings, brand video, or recurring content?{' '}
          <a href="mailto:rohan@redwardsmedia.com">Reach out</a> and we'll put something together.
        </p>
      </div>
    </section>
  );
}
