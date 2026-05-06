import Link from 'next/link';
import { ServiceMeta } from '@/config/site';

export function ServiceCard({ service }: { service: ServiceMeta }) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="card group flex flex-col transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="text-3xl">{service.icon}</div>
      <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-brand-700">{service.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700">
        Learn more <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
