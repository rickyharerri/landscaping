import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allServiceContent, serviceContentBySlug } from '@/content/services';
import { services, site, serviceBySlug } from '@/config/site';
import {
  buildMetadata,
  JsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  absUrl,
} from '@/lib/seo';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { QuoteForm } from '@/components/QuoteForm';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return allServiceContent.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = serviceContentBySlug(params.slug);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/services/${c.slug}/`,
  });
}

export const dynamicParams = false;

export default function ServicePage({ params }: { params: Params }) {
  const content = serviceContentBySlug(params.slug);
  const meta = serviceBySlug(params.slug);
  if (!content || !meta) return notFound();

  const url = absUrl(`/services/${content.slug}/`);
  const related = (content.related || [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: `${content.name} ${content.city}`,
            description: content.metaDescription,
            url,
            area: content.city,
          }),
          faqJsonLd(content.faqs),
          breadcrumbJsonLd([
            { name: 'Home', url: absUrl('/') },
            { name: 'Services', url: absUrl('/services/') },
            { name: content.name, url },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-tight py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services/" className="hover:text-brand-700">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{content.name}</span>
          </nav>
          <p className="eyebrow">Calgary Service</p>
          <h1 className="mt-2 h1">{content.h1}</h1>
          <p className="mt-5 lead max-w-3xl">{content.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact/" className="btn-primary">Get Free Quote</Link>
            <a href={`tel:${site.phone}`} className="btn-secondary">📞 {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <h2 className="h2">What’s included</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {content.included.map((it) => (
                <li key={it} className="flex items-start gap-2 rounded-lg bg-brand-50/60 p-3 text-sm text-slate-700 ring-1 ring-brand-100">
                  <span className="mt-0.5 text-brand-700">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div className="prose prose-slate mt-12 max-w-none prose-headings:scroll-mt-24 prose-h2:h2 prose-h2:mt-12 prose-h2:mb-4 prose-h3:h3">
              {content.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2>{sec.heading}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}

              <section>
                <h2>{content.pricing.title}</h2>
                <ul>
                  {content.pricing.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500">
                  Prices are guidance only. Every Calgary property is different — your free written quote will reflect your exact yard and scope.
                </p>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-bold text-slate-900">Get a free quote</h3>
              <p className="mt-1 text-sm text-slate-600">
                Most quotes returned within 24 hours.
              </p>
              <div className="mt-4">
                <QuoteForm defaultService={meta.name} />
              </div>
            </div>
            {related.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-bold text-slate-900">Related services</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/services/${r.slug}/`} className="text-brand-700 hover:underline">
                        {r.icon} {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <FAQ items={content.faqs} title={`${content.name} — frequently asked questions`} />
      <CTASection />
    </>
  );
}
