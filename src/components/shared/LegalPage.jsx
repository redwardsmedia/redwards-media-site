import { Nav } from './Nav';
import { Footer } from './Footer';
import './LegalPage.css';

export function LegalPage({ title, lastUpdated, children }) {
  return (
    <>
      <Nav />
      <article className="legal-page">
        <div className="legal-page__inner container">
          <header className="legal-page__header">
            <h1 className="legal-page__title">{title}</h1>
            {lastUpdated && (
              <p className="legal-page__updated">Last updated: {lastUpdated}</p>
            )}
          </header>
          <div className="legal-page__body">
            {children}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
