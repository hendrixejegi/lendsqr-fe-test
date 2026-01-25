import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App.tsx';
import { AuthLayout } from './components/AuthLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AuthLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
