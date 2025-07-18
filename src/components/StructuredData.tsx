import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebPage';
  data?: OrganizationData;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const { i18n } = useTranslation();

  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: data?.name || 'Neurolab',
          url: data?.url || 'https://neurolab.cc',
          logo: data?.logo || 'https://neurolab.cc/logo.png',
          sameAs: data?.sameAs || [
            'https://twitter.com/neurolab',
            'https://linkedin.com/company/neurolab-cc',
            'https://facebook.com/neurolab'
          ]
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Neurolab',
          url: 'https://neurolab.cc',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://neurolab.cc/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        };

      case 'WebPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Neurolab - Innovative Solutions',
          description: 'Neurolab provides cutting-edge solutions in neuroscience and technology.',
          url: 'https://neurolab.cc',
          inLanguage: i18n.language
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData; 