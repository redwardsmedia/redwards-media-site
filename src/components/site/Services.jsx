import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    image: '/images/gallery-kitchen.jpg',
    alt: 'Professional kitchen real estate photo',
    title: 'Photography',
    description: "Clean, bright, true-to-life listing photos. Drone aerials. Twilight exteriors. Edited, color-corrected, and MLS-ready — usually back in your hands within 24 hours.",
  },
  {
    image: '/images/showcase-living.jpg',
    alt: 'Cinematic video still of luxury living room',
    title: 'Cinematic Video',
    description: "Signature reels tailored to you, your brand, and the property — not a template. Property tours, social clips, and content with real personality. Every frame intentional, every edit polished.",
  },
  {
    image: '/images/gallery-openplan.jpg',
    alt: 'Wide-angle interior for virtual tour',
    title: 'Virtual Tours & More',
    description: "360 virtual tours, interactive floorplans, and property websites. The full digital package for listings that need to stand out online.",
  },
];

export function Services() {
  const ref = useScrollReveal();

  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHeader
          tag="What We Do"
          title="Everything your listing needs. Nothing it doesn't."
          description="Every package is built around what actually sells homes — not a checklist of extras you'll never use."
        />
        <div className="services__grid reveal" ref={ref}>
          {SERVICES.map((service) => (
            <div className="services__card" key={service.title}>
              <div className="services__thumb">
                <img src={service.image} alt={service.alt} loading="lazy" />
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
