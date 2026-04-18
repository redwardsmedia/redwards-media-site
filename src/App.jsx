import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useGlobalScrollReveal } from './hooks/useGlobalScrollReveal';

function resolvePage(path) {
  if (path.startsWith('/reelscripter')) return <ReelScripterPage />;
  if (path === '/privacy' || path === '/privacy/') return <PrivacyPage />;
  if (path === '/terms' || path === '/terms/') return <TermsPage />;
  if (path === '/' || path === '') return <HomePage />;
  return <NotFoundPage />;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useGlobalScrollReveal();

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <>
      {resolvePage(path)}
      <Analytics />
    </>
  );
}
