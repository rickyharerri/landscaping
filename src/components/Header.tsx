'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/config/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Big size at top of page (overflows into hero); compact size after scroll.
  const LOGO_BIG = 160;
  const LOGO_SMALL = 72;
  const logoSize = scrolled ? LOGO_SMALL : LOGO_BIG;
  // When big, push the logo down so its bottom half overlaps the hero.
  const overflow = scrolled ? 0 : Math.round((LOGO_BIG - LOGO_SMALL) / 2 + 50);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-tight flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label={site.name} className="flex items-center">
          <span
            className="relative block self-center transition-all duration-300 ease-out"
            style={{
              width: logoSize,
              height: logoSize,
              marginBottom: -overflow,
            }}
          >
            <Image
              src={`${site.basePath}logo.png`}
              alt={`${site.name} logo`}
              fill
              priority
              sizes={`${LOGO_BIG}px`}
              className="rounded-lg object-contain"
            />
          </span>
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
