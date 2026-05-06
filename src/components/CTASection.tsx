import Link from 'next/link';
import { site } from '@/config/site';

export function CTASection({
  title = 'Ready for a greener yard?',
  subtitle = 'Get a free, no-obligation quote today. Most quotes returned within 24 hours.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section">
      <div className="container-tight">
        <div className="overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 text-white shadow-lg sm:px-12 sm:py-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-2 max-w-2xl text-brand-50/90">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${site.phone}`} className="btn bg-white text-brand-700 hover:bg-brand-50">
                📞 {site.phoneDisplay}
              </a>
              <Link href="/contact/" className="btn bg-brand-500 text-white hover:bg-brand-400">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
