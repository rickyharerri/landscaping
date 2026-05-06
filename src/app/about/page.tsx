import { CTASection } from '@/components/CTASection';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: `About ${site.name} | Calgary Landscaping Company`,
  description: `${site.name} is a locally-owned Calgary landscaping and snow removal company. Meet the crew, our values, and the neighbourhoods we serve.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">About us</p>
          <h1 className="mt-2 h1">A Calgary crew that treats your yard like our own.</h1>
          <p className="mt-5 lead max-w-3xl">
            {site.name} was started with one goal: be the landscaping company Calgary homeowners actually look forward to seeing in their driveway. We&apos;re local, we&apos;re reliable, and we sweat the small stuff.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          <div className="prose max-w-none">
            <h2>Built locally for Calgary yards</h2>
            <p>
              From hailstorms in July to polar vortex weeks in January, Calgary properties take a beating. Generic lawn programs don&apos;t cut it here. Every service we offer — from sod selection to mulch depth to snow-stake placement — is tuned to our climate, our soil, and our weather swings.
            </p>
            <h2>Our values</h2>
            <ul>
              <li><strong>Show up.</strong> If we&apos;re booked for Tuesday, we&apos;re there Tuesday.</li>
              <li><strong>Quote it clearly.</strong> Written, fixed-price quotes. No surprise add-ons.</li>
              <li><strong>Leave it cleaner than we found it.</strong> Always.</li>
              <li><strong>Make it last.</strong> Quality materials, careful prep, honest advice.</li>
            </ul>
            <h2>Service area</h2>
            <p>
              We serve {site.areaServed.join(', ')}. If you&apos;re nearby, get in touch — we often add neighbours to existing routes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card">
              <h3 className="text-lg font-bold text-slate-900">By the numbers</h3>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-slate-500">Properties served</dt><dd className="text-2xl font-extrabold text-brand-700">500+</dd></div>
                <div><dt className="text-slate-500">Avg. rating</dt><dd className="text-2xl font-extrabold text-brand-700">4.9★</dd></div>
                <div><dt className="text-slate-500">Quote turnaround</dt><dd className="text-2xl font-extrabold text-brand-700">24h</dd></div>
                <div><dt className="text-slate-500">Insured</dt><dd className="text-2xl font-extrabold text-brand-700">Yes</dd></div>
              </dl>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold text-slate-900">Memberships & trust</h3>
              <p className="mt-2 text-sm text-slate-600">Fully insured, WCB-covered crews. Insurance certificates available for property managers and stratas on request.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Want to see what we can do for your yard?" subtitle="Free, no-pressure quotes — usually back to you within 24 hours." />
    </>
  );
}
