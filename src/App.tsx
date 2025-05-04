import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './page/Landing';
import PartnerRequestPage from './page/partnerRequest';
import AdminDashboard from './page/adminDashboard';
import LoginPage from './page/login';
import RegisterPage from './page/register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Documentation from './pages/Documentation';
import Support from './pages/Support';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen">
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
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
};

export default App;
