import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import StructuredData from './StructuredData';
import SkipLink from './SkipLink';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  image,
  type = 'website'
}) => {
  const location = useLocation();
  const url = `https://neurolab.cc${location.pathname}`;

  return (
    <>
      <SkipLink />
      <SEO
        title={title}
        description={description}
        image={image}
        url={url}
        type={type}
      />
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />
      <StructuredData type="WebPage" />
      <header role="banner">
        {/* Your header content */}
      </header>
      <nav role="navigation" aria-label="Main navigation">
        {/* Your navigation content */}
      </nav>
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <footer role="contentinfo">
        {/* Your footer content */}
      </footer>
    </>
  );
};

export default Layout; 