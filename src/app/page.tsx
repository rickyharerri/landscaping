import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { services, site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: `Calgary Landscaping & Snow Removal | ${site.name}`,
  description:
    'Calgary landscaping company offering lawn care, sod, mulch, fences, decks, snow removal & yard cleanups. Free quotes from a trusted local crew.',
  path: '/',
});

const homeFaqs = [
  {
    q: 'What areas do you serve around Calgary?',
    a: `We serve all Calgary quadrants (NW, NE, SW, SE) plus surrounding communities like ${site.areaServed.slice(1).join(', ')}. Tell us your address and we’ll confirm same-day.`,
  },
  {
    q: 'How fast can I get a free quote?',
    a: 'Most quotes are returned within 24 hours. Smaller jobs are often quoted on the spot by phone or photo.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes — we are fully insured and our crews are trained, professional, and on-time. Insurance certificates are available on request for property managers.',
  },
  {
    q: 'Do you offer year-round service contracts?',
    a: 'Yes. We bundle lawn care in summer with snow removal in winter so your property looks great every season — and you get priority response when storms hit.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title={
          <>
            Calgary Landscaping <span className="text-brand-700">that simply gets done.</span>
          </>
        }
        subtitle="From weekly lawn care and fresh sod to fences, decks, and reliable winter snow removal — one trusted Calgary crew for your whole property, all year."
        secondaryCta={{ href: '/services/', label: 'See all services' }}
      />

      <section className="section">
        <div className="container-tight">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-2 h2">Full-service Calgary landscaping</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Whether it’s a single sod install or a full property maintenance plan, our crews show up on time and leave your yard looking better than we found it.
              </p>
            </div>
            <Link href="/services/" className="btn-secondary">View all services →</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 className="mt-2 h2">A Calgary crew that actually shows up.</h2>
            <p className="mt-4 lead">
              We know Calgary yards — chinooks, clay soil, alkaline water, sudden snow. Every service we offer is tuned to local conditions so your investment lasts.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['🕒', 'On-time crews, every visit'],
                ['🌱', 'Calgary-tough plants & sod'],
                ['💬', 'Clear, written quotes'],
                ['🛡️', 'Fully insured + WCB'],
                ['❄️', 'Snow contracts available'],
                ['⭐', '5-star local reviews'],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { n: '500+', l: 'Calgary properties served' },
              { n: '24h', l: 'Average quote turnaround' },
              { n: '4.9★', l: 'Average customer rating' },
              { n: '12+', l: 'Years combined experience' },
            ].map((s) => (
              <div key={s.l} className="card text-center">
                <div className="text-3xl font-extrabold text-brand-700">{s.n}</div>
                <div className="mt-1 text-sm text-slate-600">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 h2">Three simple steps</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['1', 'Tell us about your yard', 'Send a quick form or call. Photos help, but aren’t required.'],
              ['2', 'Get a free written quote', 'We respond within 24 hours with clear, fixed pricing.'],
              ['3', 'We get to work', 'Friendly crew arrives on schedule and leaves it spotless.'],
            ].map(([n, t, d]) => (
              <div key={n} className="card">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white font-bold">{n}</div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={homeFaqs} />
      <CTASection />
    </>
  );
}
