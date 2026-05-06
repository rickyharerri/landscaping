import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/config/site';

export function Hero({
  eyebrow = 'Urbanroots Landscaping & Snow Removal',
  title,
  subtitle,
  primaryCta = { href: '/contact/', label: 'Get Free Quote' },
  secondaryCta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="container-tight grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 h1">{title}</h1>
          <p className="mt-5 lead">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>
            <a href={`tel:${site.phone}`} className="btn-secondary">📞 {site.phoneDisplay}</a>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-ghost">{secondaryCta.label}</Link>
            )}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-600 sm:grid-cols-3">
            <li className="flex items-center gap-2">✅ Locally owned</li>
            <li className="flex items-center gap-2">✅ Free quotes</li>
            <li className="flex items-center gap-2">✅ Fully insured</li>
            <li className="flex items-center gap-2">✅ 5-star service</li>
            <li className="flex items-center gap-2">✅ On-time crews</li>
            <li className="flex items-center gap-2">✅ Year-round</li>
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-200">
            <Image
              src={`${site.basePath}/hero-with-brand.webp`}
              alt={`${site.name} — Calgary landscaping & snow removal`}
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200 sm:block">
            <p className="text-xs uppercase tracking-wider text-slate-500">Today</p>
            <p className="text-lg font-bold text-brand-700">Free Quotes Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
