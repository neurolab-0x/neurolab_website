import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import { HelmetProvider } from 'react-helmet-async';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </I18nextProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 