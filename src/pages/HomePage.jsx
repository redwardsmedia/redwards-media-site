import { Nav } from '../components/shared/Nav';
import { Hero } from '../components/site/Hero';
import { TrustBar } from '../components/site/TrustBar';
import { Services } from '../components/site/Services';
import { FeaturedWork } from '../components/site/FeaturedWork';
import { About } from '../components/site/About';
import { Process } from '../components/site/Process';
import { Packages } from '../components/site/Packages';
import { Testimonials } from '../components/site/Testimonials';
import { Gallery } from '../components/site/Gallery';
import { CTASection } from '../components/site/CTASection';
import { Footer } from '../components/shared/Footer';

export function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedWork />
      <About />
      <Process />
      <Packages />
      <Testimonials />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}
