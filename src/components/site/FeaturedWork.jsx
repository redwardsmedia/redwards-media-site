import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedWork.css';

const REELS = [
  {
    thumbnail: '/images/showcase-exterior.jpg',
    embedUrl: 'https://player.vimeo.com/video/1170881128',
    label: 'Listing Tour',
    alt: 'Signature listing tour reel by Redwards Media',
  },
  {
    thumbnail: '/images/hero-kitchen.jpg',
    linkUrl: 'https://vimeo.com/showcase/12111453',
    label: 'Lifestyle',
    alt: 'Lifestyle real estate video showcase',
  },
  {
    thumbnail: '/images/hero-exterior.jpg',
    linkUrl: 'https://vimeo.com/showcase/12110870',
    label: 'Branding',
    alt: 'Agent branding video showcase',
  },
];

const FEATURED_VIDEO = {
  thumbnail: '/images/showcase-living.jpg',
  linkUrl: 'https://vimeo.com/showcase/12111453',
  alt: 'Lifestyle cinematic real estate video by Redwards Media',
};

function VideoCard({ video, aspect = 'landscape' }) {
  const [playing, setPlaying] = useState(false);

  // Inline Vimeo embed
  if (playing && video.embedUrl) {
    const separator = video.embedUrl.includes('?') ? '&' : '?';
    return (
      <div className={`featured-work__video featured-work__video--${aspect}`}>
        <iframe
          src={`${video.embedUrl}${separator}autoplay=1&title=0&byline=0&portrait=0`}
          title={video.alt}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  const handleClick = () => {
    if (video.embedUrl) {
      setPlaying(true);
    } else if (video.linkUrl) {
      window.open(video.linkUrl, '_blank', 'noopener');
    }
  };

  return (
    <div
      className={`featured-work__video featured-work__video--${aspect}`}
      onClick={handleClick}
    >
      <img src={video.thumbnail} alt={video.alt} loading="lazy" />
      {video.label && <span className="featured-work__label">{video.label}</span>}
      <button className="featured-work__play" aria-label="Play video">
        {video.linkUrl && !video.embedUrl ? (
          <ExternalLink size={22} strokeWidth={1.8} />
        ) : (
          <Play size={28} strokeWidth={1.8} fill="currentColor" />
        )}
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
          <div className="featured-work__reels">
            {REELS.map((reel, i) => (
              <VideoCard key={i} video={reel} aspect="portrait" />
            ))}
          </div>
          <VideoCard video={FEATURED_VIDEO} aspect="landscape" />
        </div>
      </div>
    </section>
  );
}
