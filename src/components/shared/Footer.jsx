import { Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';
import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reel Scripter', href: '/reelscripter/' },
  { label: 'Book a Shoot', href: 'https://book.aryeo.com/order/redwards-media' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo variant="dark" />
          <p className="footer__tagline">Premium real estate content in Greater Boston.</p>
        </div>

        <div className="footer__links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
          ))}
        </div>

        <div className="footer__contact">
          <a href="mailto:rohan@redwardsmedia.com" className="footer__contact-link">
            <Mail size={16} strokeWidth={1.5} /> rohan@redwardsmedia.com
          </a>
          <a href="tel:+16179218530" className="footer__contact-link">
            <Phone size={16} strokeWidth={1.5} /> (617) 921-8530
          </a>
          <a href="https://instagram.com/redwardsmedia" className="footer__contact-link" target="_blank" rel="noopener noreferrer">
            @redwardsmedia
          </a>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>&copy; 2026 Redwards Media. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
