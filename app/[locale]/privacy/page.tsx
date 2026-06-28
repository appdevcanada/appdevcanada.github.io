import { Nav } from '@/components/Nav';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — App Dev Canada',
  description: 'How App Dev Canada handles information submitted through this website.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-border">
      <p className="section-label mb-3">{title}</p>
      <div className="space-y-3 text-[14px] text-label leading-relaxed">{children}</div>
    </div>
  );
}

export default function SitePrivacyPage() {
  return (
    <>
      <Nav />

      <div className="hero-gradient relative py-16 sm:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
        <div className="relative z-10">
          <p className="section-label mb-3">App Dev Canada</p>
          <h1 className="text-copy text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted text-[13px] mt-3">Last updated: June 2026</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pb-20">

        <div className="card-gradient border border-border rounded-2xl px-6 py-5 my-8 text-[14px] text-label leading-relaxed">
          <strong className="text-copy font-semibold">Short version: </strong>
          We only collect what you send us through the contact form. We don't track you, we don't use analytics, and we don't share your data with anyone.
        </div>

        <Section title="Who we are">
          <p>
            App Dev Canada (Application Development Canada) is an independent mobile app studio based in Canada. This policy applies to the <strong className="text-copy font-medium">appdevcanada.ca</strong> website.
          </p>
        </Section>

        <Section title="Information we collect">
          <p>
            We collect information only when you voluntarily contact us through the form on this website. This includes your name, email address, and the message you write. We use this information solely to respond to your inquiry.
          </p>
          <p>
            We do not collect any other personal data. We do not use analytics tools, cookies, or any form of behavioural tracking on this website.
          </p>
        </Section>

        <Section title="How we use your information">
          <p>Your contact form submission is used exclusively to:</p>
          <ul className="mt-2 space-y-1">
            {[
              'Read and respond to your message.',
              'Follow up on your project or question if you request it.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-muted mt-0.5 flex-shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>We will never use your email address to send unsolicited messages.</p>
        </Section>

        <Section title="Data storage">
          <p>
            Messages submitted through the contact form are delivered to our email inbox and are not stored in any external database. We retain email correspondence only as long as necessary to handle your request.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            This website does not integrate with any advertising, social media, or analytics platforms. We do not share your data with any third party.
          </p>
          <p>
            If you submit the contact form, it may be processed through a form delivery service (Formspree) solely to route the message to our inbox. Formspree's own privacy policy applies to that transit.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You may request access to, correction of, or deletion of any personal information you have submitted to us. To make such a request, contact us at the address below.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we make changes to this policy we will update the "Last updated" date at the top of this page. Continued use of the website after any changes constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this privacy policy can be directed to{' '}
            <a href="mailto:compliance@appdevcanada.ca" className="text-accent hover:underline">
              compliance@appdevcanada.ca
            </a>.
          </p>
        </Section>

        <div className="pt-8 border-t border-border">
          <Link href="/" className="text-[13px] text-muted hover:text-label transition-colors duration-150">
            ← Back
          </Link>
        </div>

      </main>
    </>
  );
}
