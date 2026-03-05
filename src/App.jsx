import { HomePage } from './pages/HomePage';
import { ReelScripterPage } from './pages/ReelScripterPage';

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith('/reelscripter')) {
    return <ReelScripterPage />;
  }

  return <HomePage />;
}
