import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './features/public/Landing';
import Manifesto from './features/public/Manifesto';
import CapitalPage from './features/public/CapitalPage';
import EpistemePage from './features/public/EpistemePage';
import Contacts from './features/public/Contacts';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { AuthGuard } from './features/auth/AuthGuard';
import { AppShell } from './layouts/AppShell';
import { InvestorDashboard } from './features/investor/InvestorDashboard';
import { TraderDashboard } from './features/trader/TraderDashboard';
import WorkWithUs from './features/partnership/WorkWithUs';
import Career from './features/partnership/Career';
import Agents from './features/partnership/Agents';
import Referral from './features/partnership/Referral';
import PropTrading from './features/proptrading/PropTrading';
import TheoryProduct from './features/products/TheoryProduct';
import ToolsProduct from './features/products/ToolsProduct';
import ConsultingProduct from './features/products/ConsultingProduct';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/capital" element={<CapitalPage />} />
        <Route path="/episteme" element={<EpistemePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Partnership Routes */}
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/proptrading" element={<PropTrading />} />

        {/* Product Routes */}
        <Route path="/products/theory" element={<TheoryProduct />} />
        <Route path="/products/tools" element={<ToolsProduct />} />
        <Route path="/products/consulting" element={<ConsultingProduct />} />

        {/* Protected Investor Routes */}
        <Route
          path="/app/investor"
          element={
            <AuthGuard requireRole="investor">
              <AppShell>
                <InvestorDashboard />
              </AppShell>
            </AuthGuard>
          }
        />

        {/* Protected Trader Routes */}
        <Route
          path="/app/trader"
          element={
            <AuthGuard requireRole="trader">
              <AppShell>
                <TraderDashboard />
              </AppShell>
            </AuthGuard>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
