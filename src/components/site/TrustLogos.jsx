import { useScrollReveal } from '../../hooks/useScrollReveal';
import './TrustLogos.css';

const BROKERAGES = [
  'SERHANT.',
  'EVO',
  'REAL',
  'Compass',
  'Reference Real Estate',
  'Lyv Realty',
  'The Wilson Group',
];

export function TrustLogos() {
  const ref = useScrollReveal();

  return (
    <div className="trust-logos reveal" ref={ref}>
      <div className="trust-logos__inner container">
        <span className="trust-logos__label">Trusted by agents at</span>
        <div className="trust-logos__row">
          {BROKERAGES.map((name) => (
            <span className="trust-logos__name" key={name}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
