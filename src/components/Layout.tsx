import { Outlet } from '@remix-run/react';
import Header from './Header';
import Footer from './Footer';
import SkipLink from './SkipLink';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink />
      <SEO
        title={t('site.title')}
        description={t('site.description')}
        type="website"
      />
      <StructuredData type="Organization" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-grow">
          {children || <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
} 