import { MapPin } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ServiceArea.css';

const REGIONS = [
  {
    name: 'Greater Boston',
    towns: ['Boston', 'Cambridge', 'Somerville', 'Newton', 'Brookline', 'Watertown', 'Belmont', 'Arlington'],
  },
  {
    name: 'North Shore',
    towns: ['Salem', 'Beverly', 'Marblehead', 'Swampscott', 'Lynnfield', 'Peabody', 'Danvers', 'Saugus'],
  },
  {
    name: 'South Shore',
    towns: ['Quincy', 'Milton', 'Hingham', 'Cohasset', 'Scituate', 'Weymouth', 'Braintree'],
  },
  {
    name: 'Metro West & Beyond',
    towns: ['Wellesley', 'Weston', 'Wayland', 'Sudbury', 'Concord', 'Framingham', 'Natick', 'Southern NH'],
  },
];

export function ServiceArea() {
  const ref = useScrollReveal();

  return (
    <section className="service-area section" id="service-area">
      <div className="container">
        <SectionHeader
          tag="Service Area"
          title="Where we shoot."
        />
        <p className="service-area__lede">
          Based in Cambridge, serving Greater Boston and surrounding regions. If your town isn't listed, ask — chances are we cover it.
        </p>

        <div className="service-area__grid reveal" ref={ref}>
          {REGIONS.map((region) => (
            <div className="service-area__region" key={region.name}>
              <div className="service-area__region-head">
                <MapPin size={16} strokeWidth={1.8} />
                <h3 className="service-area__region-name">{region.name}</h3>
              </div>
              <ul className="service-area__towns">
                {region.towns.map((town) => (
                  <li key={town} className="service-area__town">{town}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="service-area__note">
          Outside this radius? <a href="mailto:rohan@redwardsmedia.com">Email us</a> — we travel for the right project.
        </p>
      </div>
    </section>
  );
}
