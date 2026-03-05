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
            Cinematic photography, video, and content tailored to you, your brand, and your listings — with every AI enhancement built in. No add-ons, no stress, no wasted time.
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
