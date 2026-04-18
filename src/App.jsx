import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';
import { useGlobalScrollReveal } from './hooks/useGlobalScrollReveal';

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
      {path.startsWith('/reelscripter') ? <ReelScripterPage /> : <HomePage />}
      <Analytics />
    </>
  );
}
