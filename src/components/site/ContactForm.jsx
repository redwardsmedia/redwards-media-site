import { useState } from 'react';
import { Send } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ContactForm.css';

export function ContactForm() {
  const ref = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // mailto fallback — works immediately, no backend needed
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    setSending(true);
    window.location.href = `mailto:rohan@redwardsmedia.com?subject=${subject}&body=${body}`;

    // Show success state after short delay
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <SectionHeader
          tag="Get in Touch"
          title="Not ready to book? Let's talk."
        />

        <div className="contact__wrap reveal" ref={ref}>
          {submitted ? (
            <div className="contact__success">
              <p className="contact__success-text">
                Your email client should have opened with the message. If it didn't, feel free to email us directly at{' '}
                <a href="mailto:rohan@redwardsmedia.com">rohan@redwardsmedia.com</a>
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label className="contact__label" htmlFor="name">Name</label>
                  <input
                    className="contact__input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="email">Email</label>
                  <input
                    className="contact__input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="message">What can we help with?</label>
                <textarea
                  className="contact__input contact__textarea"
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your project, property, or what you're looking for..."
                  required
                />
              </div>
              <button className="contact__submit" type="submit" disabled={sending}>
                {sending ? 'Opening email...' : 'Send Message'} <Send size={15} strokeWidth={1.8} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
