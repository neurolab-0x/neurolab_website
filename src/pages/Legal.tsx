import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    body:
      'Neurolab collects only the information required to operate the site, respond to inquiries, and support product or platform requests. We do not use personal data for unrelated purposes without notice.',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    body:
      'Use of the Neurolab website and documentation is subject to applicable law and our service terms. Product access, commercial deployment, and clinical use may require separate written agreements.',
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    body:
      'We use essential cookies for site functionality and may use analytics-related cookies to understand usage patterns. You can manage consent through the cookie banner shown in the application.',
  },
];

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Legal"
        description="Neurolab legal information, including privacy, terms of service, and cookie policy details."
        canonical="/legal"
      />
      <Navbar />
      <main className="pt-12">
        <section className="px-6">
          <div className="mx-auto max-w-4xl py-28 sm:py-36">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Legal
            </p>
            <h1 className="text-[clamp(36px,6vw,64px)] font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
              Policies and terms
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This page groups the legal sections currently referenced throughout the site so footer navigation resolves to real destinations.
            </p>
          </div>
          <div className="mx-auto max-w-4xl" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} />
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-m-24">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
