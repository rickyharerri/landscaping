import type { MetadataRoute } from 'next';
import { allServiceContent } from '@/content/services';
import { absUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['/', '/about/', '/contact/', '/services/'];
  const serviceRoutes = allServiceContent.map((s) => `/services/${s.slug}/`);
  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: absUrl(path),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1.0 : 0.8,
  }));
}
