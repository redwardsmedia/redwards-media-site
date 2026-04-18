import { Nav } from '../components/shared/Nav';
import { Hero } from '../components/site/Hero';
import { TrustBar } from '../components/site/TrustBar';
import { TrustLogos } from '../components/site/TrustLogos';
import { Services } from '../components/site/Services';
import { FeaturedWork } from '../components/site/FeaturedWork';
import { About } from '../components/site/About';
import { Process } from '../components/site/Process';
import { Pricing } from '../components/site/Pricing';
import { FAQ } from '../components/site/FAQ';
import { Testimonials } from '../components/site/Testimonials';
import { Gallery } from '../components/site/Gallery';
import { InstagramFeed } from '../components/site/InstagramFeed';
import { CTASection } from '../components/site/CTASection';
import { Footer } from '../components/shared/Footer';

export function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <TrustLogos />
      <Services />
      <FeaturedWork />
      <About />
      <Process />
      <Pricing />
      <FAQ />
      <Testimonials />
      <Gallery />
      <InstagramFeed />
      <CTASection />
      <Footer />
    </>
  );
}
