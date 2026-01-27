import './scss/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';

import App from './App.tsx';
import { AuthLayout } from './components/AuthLayout.tsx';
import AuthProvider from './components/AuthProvider.tsx';
import { DashboardLayout } from './components/DashboardLayout.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { UsersPage } from './components/UsersPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AuthLayout />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index path="users" element={<UsersPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
);
