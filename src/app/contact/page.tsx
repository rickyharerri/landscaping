import { QuoteForm } from '@/components/QuoteForm';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata = buildMetadata({
  title: `Contact ${site.name} | Free Calgary Landscaping Quote`,
  description: `Call ${site.phoneDisplay} or send a message for a free, no-obligation Calgary landscaping or snow removal quote. Most replies within 24 hours.`,
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-tight py-14 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-2 h1">Get a free Calgary landscaping quote.</h1>
          <p className="mt-4 lead max-w-2xl">
            Tell us a bit about your property and what you need done. Most quotes are returned within 24 hours.
          </p>
        </div>
      </section>

      <section className="section -mt-8">
        <div className="container-tight grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuoteForm />
          </div>
          <aside className="lg:col-span-2 space-y-4">
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900">Talk to a person</h2>
              <p className="mt-1 text-sm text-slate-600">Faster than email, especially in peak season.</p>
              <a href={`tel:${site.phone}`} className="btn-primary mt-4 w-full justify-center">
                📞 {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="btn-secondary mt-2 w-full justify-center">
                ✉️ {site.email}
              </a>
            </div>
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900">Hours</h2>
              <p className="mt-2 text-sm text-slate-600">{site.hours}</p>
              <p className="mt-1 text-sm text-slate-600">Snow removal: 24/7 during storm events for contract clients.</p>
            </div>
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900">Service area</h2>
              <p className="mt-2 text-sm text-slate-600">
                {site.areaServed.join(', ')}.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-tight">
          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <iframe
              title="Calgary service area map"
              src="https://www.google.com/maps?q=Calgary%2C+AB&output=embed"
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
