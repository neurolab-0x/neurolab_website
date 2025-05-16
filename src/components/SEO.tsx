import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

export default function SEO({
  title = "Neurolab - AI-Powered EEG Analysis Platform",
  description = "Transform your EEG research with Neurolab's AI-powered platform. Advanced signal processing, automated analysis, and real-time insights for neuroscience research and clinical applications.",
  image = '/logo.png',
  url = 'https://neurolab.cc',
  type = 'website',
  keywords = [
    'EEG analysis',
    'AI neuroscience',
    'brain data processing',
    'clinical research',
    'neuroscience platform',
    'EEG signal processing',
    'brain research tools',
    'neural data analysis'
  ],
}: SEOProps) {
  const siteTitle = "Neurolab - AI-Powered EEG Analysis Platform";
  const siteDescription = "Transform your EEG research with Neurolab's AI-powered platform. Advanced signal processing, automated analysis, and real-time insights for neuroscience research and clinical applications.";
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://neurolab.cc';

  const seo = {
    title: title ? `${siteTitle}` : siteTitle,
    description: description || siteDescription,
    image: image.startsWith('http') ? image : `${siteUrl}${image}`,
    url: url ? `${siteUrl}${url}` : siteUrl,
    type,
    keywords: keywords.join(', '),
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Neurolab" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#030329" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@neurolab" />
      <meta name="twitter:creator" content="@neurolab" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={seo.url} />

      {/* Language alternates */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
}