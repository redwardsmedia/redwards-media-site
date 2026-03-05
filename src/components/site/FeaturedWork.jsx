import { useState } from 'react';
import { Play } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedWork.css';

const FEATURED_VIDEO = {
  thumbnail: '/images/showcase-living.jpg',
  embedUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  alt: 'Featured property tour by Redwards Media',
};

const REELS = [
  { thumbnail: '/images/showcase-exterior.jpg', embedUrl: '', alt: 'Signature Reel 1' },
  { thumbnail: '/images/hero-kitchen.jpg', embedUrl: '', alt: 'Signature Reel 2' },
  { thumbnail: '/images/hero-exterior.jpg', embedUrl: '', alt: 'Signature Reel 3' },
];

function VideoCard({ video, aspect = 'landscape' }) {
  const [playing, setPlaying] = useState(false);

  if (playing && video.embedUrl) {
    return (
      <div className={`featured-work__video featured-work__video--${aspect}`}>
        <iframe
          src={`${video.embedUrl}?autoplay=1`}
          title={video.alt}
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`featured-work__video featured-work__video--${aspect}`}
      onClick={() => video.embedUrl && setPlaying(true)}
    >
      <img src={video.thumbnail} alt={video.alt} loading="lazy" />
      <button className="featured-work__play" aria-label="Play video">
        <Play size={28} strokeWidth={1.8} fill="currentColor" />
      </button>
    </div>
  );
}

export function FeaturedWork() {
  const ref = useScrollReveal();

  return (
    <section className="featured-work section" id="featured-work">
      <div className="container">
        <SectionHeader
          tag="Featured Work"
          title="See what intentional content looks like."
        />
        <div className="featured-work__grid reveal" ref={ref}>
          <VideoCard video={FEATURED_VIDEO} aspect="landscape" />
          <div className="featured-work__reels">
            {REELS.map((reel, i) => (
              <VideoCard key={i} video={reel} aspect="portrait" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
