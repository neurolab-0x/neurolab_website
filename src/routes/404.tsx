import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import SEO from '../components/SEO';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('404.title')}
        description={t('404.description')}
        type="website"
      />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-8">404</h1>
        <h2 className="text-3xl font-semibold mb-4">{t('404.title')}</h2>
        <p className="text-lg mb-8">{t('404.description')}</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          {t('404.backHome')}
        </Link>
      </div>
    </>
  );
} 