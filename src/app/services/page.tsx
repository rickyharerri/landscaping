import { ServiceCard } from '@/components/ServiceCard';
import { CTASection } from '@/components/CTASection';
import { buildMetadata } from '@/lib/seo';
import { services, site } from '@/config/site';

export const metadata = buildMetadata({
  title: `Calgary Landscaping Services | ${site.name}`,
  description:
    'Full list of Calgary landscaping services: lawn care, sod, mulch & rock, fences, decks, snow removal, and yard cleanups. Free quotes, local crews.',
  path: '/services/',
});

export default function ServicesIndexPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-tight py-14 sm:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-2 h1">Calgary landscaping &amp; snow services</h1>
          <p className="mt-4 lead max-w-3xl">
            One trusted local crew for everything outside your home — from spring cleanup and fresh sod, to summer mowing, to winter snow contracts.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
