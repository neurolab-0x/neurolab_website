import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '../components/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default AppProviders; 