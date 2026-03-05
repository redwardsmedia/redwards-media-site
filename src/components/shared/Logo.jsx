import './Logo.css';

export function Logo({ variant = 'light' }) {
  return (
    <a href="/" className={`logo logo--${variant}`}>
      REDWARDS <span className="logo__accent">MEDIA</span>
    </a>
  );
}
