import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/og-image.jpg',
  url = 'https://neurolab.cc',
  type = 'website'
}) => {
  const { i18n } = useTranslation();
  const defaultTitle = 'Neurolab - AI Neuroscience Solutions for Tomorrow';
  const defaultDescription = 'Neurolab is a leading provider of AI neuroscience solutions. Our cutting-edge technology helps researchers and clinicians advance neuroscience research and improve patient care.';

  const seoTitle = title ? `${title} | Neurolab` : defaultTitle;
  const seoDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="language" content={i18n.language} />
      <link rel="alternate" hrefLang="en" href="https://neurolab.cc/en" />
      <link rel="alternate" hrefLang="es" href="https://neurolab.cc/es" />
      <link rel="alternate" hrefLang="fr" href="https://neurolab.cc/fr" />
      <link rel="alternate" hrefLang="de" href="https://neurolab.cc/de" />
      <link rel="alternate" hrefLang="zh" href="https://neurolab.cc/zh" />
      <link rel="alternate" hrefLang="ar" href="https://neurolab.cc/ar" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Neurolab" />
      <meta property="og:locale" content={i18n.language} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#030329" />
    </Helmet>
  );
};

export default SEO; 