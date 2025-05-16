import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';

// Import pages
import LandingPage from './page/Landing';
import PartnerRequestPage from './page/partnerRequest';
import AdminDashboard from './page/adminDashboard';
import LoginPage from './page/login';
import RegisterPage from './page/register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

const AppRoutes: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set RTL direction for Arabic language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className={`font-sans bg-gray-50 min-h-screen ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/request-partnership" element={<PartnerRequestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={
          localStorage.getItem('token') ? <AdminDashboard /> : <Navigate to="/" />
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/support" element={<Support />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </div>
  );
};

export default AppRoutes; 