import { Instagram } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './InstagramFeed.css';

const INSTAGRAM_URL = 'https://instagram.com/redwardsmedia';

// Static grid — replace images with actual IG post screenshots when available
const GRID_IMAGES = [
  { src: '/images/gallery-drone.jpg', alt: 'Drone aerial photography' },
  { src: '/images/showcase-exterior.jpg', alt: 'Luxury exterior shoot' },
  { src: '/images/gallery-kitchen.jpg', alt: 'Kitchen interior photography' },
  { src: '/images/hero-kitchen.jpg', alt: 'Real estate content creation' },
  { src: '/images/gallery-living.jpg', alt: 'Living room photography' },
  { src: '/images/gallery-openplan.jpg', alt: 'Open floor plan photography' },
];

export function InstagramFeed() {
  const ref = useScrollReveal();

  return (
    <section className="ig section">
      <div className="container">
        <div className="ig__header reveal" ref={ref}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ig__handle"
          >
            <Instagram size={20} strokeWidth={1.5} />
            <span>@redwardsmedia</span>
          </a>
          <p className="ig__subtitle">Follow along for behind-the-scenes, recent work, and real estate content tips.</p>
        </div>
        <div className="ig__grid reveal">
          {GRID_IMAGES.map((img, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig__item"
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="ig__overlay">
                <Instagram size={24} strokeWidth={1.5} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
