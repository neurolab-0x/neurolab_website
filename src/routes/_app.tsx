import { Outlet } from '@remix-run/react';
import AppProviders from '../providers/AppProviders';

export default function App() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
} 