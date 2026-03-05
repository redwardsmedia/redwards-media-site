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
