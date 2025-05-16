import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const languages = ['en', 'es', 'fr', 'de', 'zh', 'ar'];
const baseUrl = 'https://neurolab.com';

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/products', changefreq: 'weekly', priority: 0.8 },
  { url: '/team', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.3 },
  { url: '/terms-of-service', changefreq: 'monthly', priority: 0.3 },
  { url: '/documentation', changefreq: 'weekly', priority: 0.5 },
  { url: '/support', changefreq: 'weekly', priority: 0.6 }
];

export const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: baseUrl });
  const links: any[] = [];

  // Add default language routes
  routes.forEach(route => {
    links.push({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: new Date().toISOString()
    });
  });

  // Add language-specific routes
  languages.forEach(lang => {
    routes.forEach(route => {
      links.push({
        url: `/${lang}${route.url}`,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString()
      });
    });
  });

  return streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString());
}; 