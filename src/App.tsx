import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProviders from './providers/AppProviders';
import { Layout } from './components/Layout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AppProviders>
  );
};

export default App;
