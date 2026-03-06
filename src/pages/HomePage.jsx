import { Nav } from '../components/shared/Nav';
import { Hero } from '../components/site/Hero';
import { TrustBar } from '../components/site/TrustBar';
import { TrustLogos } from '../components/site/TrustLogos';
import { Services } from '../components/site/Services';
import { FeaturedWork } from '../components/site/FeaturedWork';
import { About } from '../components/site/About';
import { Process } from '../components/site/Process';
import { ValueProposition } from '../components/site/ValueProposition';
import { FAQ } from '../components/site/FAQ';
import { Testimonials } from '../components/site/Testimonials';
import { Gallery } from '../components/site/Gallery';
import { InstagramFeed } from '../components/site/InstagramFeed';
import { ContactForm } from '../components/site/ContactForm';
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
      <ValueProposition />
      <FAQ />
      <Testimonials />
      <Gallery />
      <InstagramFeed />
      <ContactForm />
      <CTASection />
      <Footer />
    </>
  );
}
