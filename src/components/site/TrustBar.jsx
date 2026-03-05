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
