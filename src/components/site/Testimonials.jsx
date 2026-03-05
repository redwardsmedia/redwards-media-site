import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: "Rohan made me feel like I actually knew what I was doing on camera. The content he creates isn't just good — it's me, but better.",
    name: 'Placeholder Client',
    title: 'Real Estate Agent',
  },
  {
    quote: "24 hours. That's all it took to get back the most incredible listing photos I've ever had. I send every single listing to Redwards now.",
    name: 'Placeholder Client',
    title: 'Listing Agent, Greater Boston',
  },
  {
    quote: "The Signature Reel changed everything for my brand. People recognize me from my videos before I even introduce myself.",
    name: 'Placeholder Client',
    title: 'Luxury Real Estate Agent',
  },
];

const STATS = [
  { number: '500+', label: 'Properties Delivered' },
  { number: '24hr', label: 'Standard Turnaround' },
  { number: '8+', label: 'Years in Real Estate Media' },
];

export function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="testimonials section">
      <div className="container">
        <SectionHeader
          tag="What Agents Say"
          title="Built on real relationships."
        />

        <div className="testimonials__grid reveal" ref={ref}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonials__card" key={i}>
              <blockquote className="testimonials__quote">"{t.quote}"</blockquote>
              <div className="testimonials__author">
                <span className="testimonials__name">{t.name}</span>
                <span className="testimonials__title">{t.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__stats">
          {STATS.map((stat, i) => (
            <div className="testimonials__stat" key={i}>
              <span className="testimonials__stat-number">{stat.number}</span>
              <span className="testimonials__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
