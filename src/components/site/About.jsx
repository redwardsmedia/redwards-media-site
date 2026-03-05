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
            I'm a videographer and photographer based in Cambridge, MA. For the past eight-plus years, I've been helping real estate agents discover and showcase the best version of themselves — on camera, on social, and in every piece of content they put out there.
          </p>
          <p>
            My philosophy is simple — every video is an ad. No filler. No throwaway content. Every frame should have depth, personality, and lasting value.
          </p>
          <p>
            Most agents are nervous on camera — that's normal. I don't do scripted lines or forced poses. I create a space where your real personality comes through, and the final product always makes you feel like you nailed it.
          </p>
        </div>
      </div>
    </section>
  );
}
