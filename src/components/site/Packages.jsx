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
