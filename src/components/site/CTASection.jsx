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
