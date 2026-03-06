import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FAQ.css';

const QUESTIONS = [
  {
    q: 'How fast will I get my content back?',
    a: 'Standard turnaround is 24 hours for photos and 48–72 hours for video. Rush delivery is available if you need it sooner — just let us know when you book.',
  },
  {
    q: 'What areas do you cover?',
    a: 'We serve Greater Boston and surrounding areas — including the North Shore, South Shore, Metro West, and parts of Southern NH. If you\'re unsure, just ask. We\'ll make it work.',
  },
  {
    q: 'Do I need to prep the property before the shoot?',
    a: 'We\'ll send you a simple prep checklist when you book. The basics: lights on, blinds open, counters clear. We handle the rest on set — including repositioning furniture, staging small details, and directing the shoot.',
  },
  {
    q: 'What if I\'m not happy with the final product?',
    a: 'We\'ll make it right. If something doesn\'t look the way you expected, we offer revisions at no extra charge. Our goal is content you\'re proud to put your name on.',
  },
  {
    q: 'Can you shoot video and photos in one visit?',
    a: 'Absolutely — most of our packages bundle both. One visit, one setup, and you walk away with everything you need. It\'s more efficient for you and for us.',
  },
  {
    q: 'Do you offer packages for agents who list frequently?',
    a: 'Yes. We work with a number of agents on an ongoing basis with preferred pricing and priority scheduling. Reach out and we\'ll put something together that fits your volume.',
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button className="faq__trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="faq__question">{question}</span>
        <ChevronDown size={18} strokeWidth={1.8} className="faq__icon" />
      </button>
      <div className="faq__answer-wrap">
        <p className="faq__answer">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const ref = useScrollReveal();

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <SectionHeader
          tag="FAQ"
          title="Questions we hear all the time."
        />
        <div className="faq__list reveal" ref={ref}>
          {QUESTIONS.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
