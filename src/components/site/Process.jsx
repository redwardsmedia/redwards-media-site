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
