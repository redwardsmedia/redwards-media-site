import './Button.css';

export function Button({ children, variant = 'primary', href, onClick, className = '' }) {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return <button className={cls} onClick={onClick}>{children}</button>;
}
