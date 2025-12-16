import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './features/public/Landing';
import Manifesto from './features/public/Manifesto';
import CapitalPage from './features/public/CapitalPage';
import EpistemePage from './features/public/EpistemePage';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { AuthGuard } from './features/auth/AuthGuard';
import { AppShell } from './layouts/AppShell';
import { InvestorDashboard } from './features/investor/InvestorDashboard';
import { TraderDashboard } from './features/trader/TraderDashboard';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/capital" element={<CapitalPage />} />
        <Route path="/episteme" element={<EpistemePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

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
