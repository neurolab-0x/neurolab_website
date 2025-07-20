import { Outlet } from '@remix-run/react';
import Footer from './Footer';
import SkipLink from './SkipLink';
import SEO from './SEO';
import StructuredData from './StructuredData';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {

  return (
    <>
      <SEO />
      <SkipLink />
      <StructuredData type="Organization" />
      <div className="min-h-screen flex flex-col">
        <main id="main-content" className="flex-grow">
          {children || <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
} 