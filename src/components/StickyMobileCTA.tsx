import Link from 'next/link';
import { site } from '@/config/site';

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a href={`tel:${site.phone}`} className="btn-secondary justify-center">
          📞 Call
        </a>
        <Link href="/contact/" className="btn-primary justify-center">
          Free Quote
        </Link>
      </div>
    </div>
  );
}
