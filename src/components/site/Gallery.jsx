import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Gallery.css';

const GALLERY_ITEMS = [
  { src: '/images/gallery-drone.jpg', alt: 'Drone aerial of luxury property', span: true },
  { src: '/images/gallery-exterior.jpg', alt: 'Twilight exterior photography' },
  { src: '/images/gallery-kitchen.jpg', alt: 'Modern kitchen interior' },
  { src: '/images/gallery-living.jpg', alt: 'Living room natural light', span: true },
  { src: '/images/gallery-openplan.jpg', alt: 'Open plan living and dining' },
];

export function Gallery() {
  const ref = useScrollReveal();

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <SectionHeader
          tag="Portfolio"
          title="See the difference."
        />
        <div className="gallery__grid reveal" ref={ref}>
          {GALLERY_ITEMS.map((item, i) => (
            <div className={`gallery__item ${item.span ? 'gallery__item--span' : ''}`} key={i}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
