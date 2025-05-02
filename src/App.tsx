import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './page/Landing';
import PartnerRequestPage from './page/partnerRequest';
import AdminDashboard from './page/adminDashboard';
import LoginPage from './page/login';
import RegisterPage from './page/register';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
