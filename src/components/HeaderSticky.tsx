import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/config/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-tight flex h-35 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={`${site.basePath}/logo.png`}
            alt={`${site.name} logo`}
            width={85}
            height={85}
            priority
            className="h-[85px] w-[85px] rounded-lg object-contain"
          />
          {/* <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              {site.name}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Landscapings
            </span>
          </span> */}
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <div className="group relative">
            <Link href="/services" className="hover:text-brand-700">Services</Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="w-72 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}/`}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-brand-50 hover:text-brand-700"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about" className="hover:text-brand-700">About</Link>
          <Link href="/contact" className="hover:text-brand-700">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${site.phone}`} className="hidden text-sm font-semibold text-brand-700 sm:inline">
            {site.phoneDisplay}
          </a>
          <Link href="/contact/" className="btn-primary text-xs sm:text-sm">
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
