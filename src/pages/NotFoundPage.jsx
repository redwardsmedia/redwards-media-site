import { Nav } from '../components/shared/Nav';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/shared/Button';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <>
      <Nav />
      <main className="notfound">
        <div className="notfound__inner container">
          <span className="notfound__code">404</span>
          <h1 className="notfound__title">This page got lost on the way.</h1>
          <p className="notfound__desc">
            The URL you tried doesn't exist — or doesn't anymore. Let's get you back on track.
          </p>
          <div className="notfound__ctas">
            <Button variant="primary" href="/">Back to Home</Button>
            <Button variant="text" href="mailto:rohan@redwardsmedia.com">Email Rohan</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
