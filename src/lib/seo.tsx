import type { Metadata } from 'next';
import { site } from '@/config/site';

export function absUrl(path: string = '/'): string {
  const base = site.url.replace(/\/$/, '');
  if (!path.startsWith('/')) path = '/' + path;
  return base + path;
}

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = absUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: opts.title,
      description: opts.description,
      siteName: site.name,
      images: opts.ogImage ? [{ url: opts.ogImage }] : undefined,
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: opts.ogImage ? [opts.ogImage] : undefined,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absUrl('/#business'),
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: absUrl('/og.jpg'),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.areaServed.map((a) => ({ '@type': 'City', name: a })),
    openingHours: 'Mo-Sa 07:00-19:00',
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  area?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': absUrl('/#business') },
    areaServed: { '@type': 'City', name: opts.area || 'Calgary' },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
