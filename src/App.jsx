import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (path.startsWith('/reelscripter')) {
    return <ReelScripterPage />;
  }

  return <HomePage />;
}
