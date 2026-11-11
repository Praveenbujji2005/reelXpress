import { SITE_CONFIG } from '@/config/site';

export default function robots() {
  const baseUrl = SITE_CONFIG.canonicalUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
