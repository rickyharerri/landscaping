import Link from 'next/link';
import { site, services } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-tight grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-lg text-white">🌿</span>
            <span className="text-lg font-extrabold text-slate-900">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-600">{site.tagline}. Locally owned and operated in {site.address.locality}, {site.address.region}.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="hover:text-brand-700">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/about/" className="hover:text-brand-700">About</Link></li>
            <li><Link href="/services/" className="hover:text-brand-700">All Services</Link></li>
            <li><Link href="/contact/" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-brand-700">{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-700">{site.email}</a>
            </li>
            <li>{site.hours}</li>
            <li>Serving {site.areaServed.slice(0, 4).join(', ')} & area</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <p>Built by <a href="https://www.getlogix.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-800">GetLogix Inc.</a> in Calgary, AB.</p>
        </div>
      </div>
    </footer>
  );
}
