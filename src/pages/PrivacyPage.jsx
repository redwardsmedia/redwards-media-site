import { LegalPage } from '../components/shared/LegalPage';

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="April 17, 2026">
      <p>
        Redwards Media ("we," "us") respects your privacy. This page explains what we collect, why, and what choices you have. Questions? Email <a href="mailto:rohan@redwardsmedia.com">rohan@redwardsmedia.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Contact and booking details</strong> you provide when you book a shoot or get in touch — name, email, phone, property address, and anything you tell us about the project.</li>
        <li><strong>Analytics</strong> via Vercel Analytics — aggregated, cookieless page views and basic device info used to improve the site.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and deliver the services you book.</li>
        <li>To send you scheduling, delivery, and follow-up communication related to your shoot.</li>
        <li>To improve the site experience.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We don't sell your data. We share only what's necessary with the tools that help us run the business:
      </p>
      <ul>
        <li><strong>Aryeo</strong> — for booking, scheduling, and media delivery.</li>
        <li><strong>Vercel</strong> — for hosting and analytics.</li>
        <li><strong>Service partners</strong> directly involved in delivering your project (e.g., editors, drone operators).</li>
      </ul>

      <h2>Cookies and tracking</h2>
      <p>
        We don't use marketing cookies or cross-site tracking. Vercel Analytics is cookieless. The /reelscripter/ tool uses a session cookie strictly for keeping you signed in.
      </p>

      <h2>Your choices</h2>
      <p>
        You can request access to or deletion of your data at any time by emailing <a href="mailto:rohan@redwardsmedia.com">rohan@redwardsmedia.com</a>. We'll respond within a reasonable timeframe.
      </p>

      <h2>Changes</h2>
      <p>
        If we update this policy, we'll change the "last updated" date above. Material changes will be communicated to active clients directly.
      </p>
    </LegalPage>
  );
}
