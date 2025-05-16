import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  image = '/logo.png',
  url,
  type = 'website',
}: SEOProps) {
  const { t } = useTranslation();
  const siteTitle = t('site.title');
  const siteDescription = t('site.description');
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://neurolab.cc';

  const seo = {
    title: title ? `${title} | ${siteTitle}` : siteTitle,
    description: description || siteDescription,
    image: image.startsWith('http') ? image : `${siteUrl}${image}`,
    url: url ? `${siteUrl}${url}` : siteUrl,
    type,
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
} 