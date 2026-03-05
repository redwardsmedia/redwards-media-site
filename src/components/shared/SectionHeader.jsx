import { useScrollReveal } from '../../hooks/useScrollReveal';
import './SectionHeader.css';

export function SectionHeader({ tag, title, description, align = 'center' }) {
  const ref = useScrollReveal();

  return (
    <div className={`section-header section-header--${align} reveal`} ref={ref}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
