import { Camera, Video, View } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    icon: Camera,
    title: 'Photography',
    description: "Clean, bright, true-to-life listing photos. Drone aerials. Twilight exteriors. Edited, color-corrected, and MLS-ready — usually back in your hands within 24 hours.",
  },
  {
    icon: Video,
    title: 'Cinematic Video',
    description: "Signature reels built around you, not a template. Property tours, social clips, and content with real personality — every frame intentional, every edit polished.",
  },
  {
    icon: View,
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
              <div className="services__icon">
                <service.icon size={24} strokeWidth={1.8} color="#FDFCFA" />
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
