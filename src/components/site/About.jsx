import { useScrollReveal } from '../../hooks/useScrollReveal';
import './About.css';

export function About() {
  const ref = useScrollReveal();

  return (
    <section className="about section" id="about">
      <div className="about__inner container reveal" ref={ref}>
        <div className="about__image">
          <img src="/images/headshot.jpg" alt="Rohan and Sahn Edwards — the Edwards Brothers, Redwards Media" loading="lazy" />
        </div>
        <div className="about__text">
          <span className="section-tag">The Edwards Brothers</span>
          <h2 className="section-title">We're here to bring out <em>your best.</em></h2>
          <p>
            <strong>Rohan</strong> brings eight-plus years behind the camera as a videographer, marketer, and creative — three spent exclusively in real estate media. He leads every shoot, directing the on-site experience so it's stress-free, efficient, and built around you.
          </p>
          <p>
            <strong>Sahn</strong> runs post-production — color grading, editing, AI enhancements, virtual staging, and everything that turns raw footage into the polished final product. Together, we've streamlined the pipeline so your content lands faster without cutting corners.
          </p>
          <p>
            Every photo, every reel, every piece of content is tailored to the client, the brand, and the property. No templates. No recycled edits. Just work that presents you in the best possible light.
          </p>
          <p className="about__tease">
            Beyond listing media, we help agents build brands that compound.
          </p>
        </div>
      </div>
    </section>
  );
}
