import React from 'react';
import { NotificationProvider } from '../contexts/NotificationContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { initSentry } from '../lib/sentry';
import { initAnalytics } from '../lib/analytics';
import { HelmetProvider } from 'react-helmet-async';

// Initialize third-party services
if (typeof window !== 'undefined') {
  initSentry();
  initAnalytics();
}

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
} 