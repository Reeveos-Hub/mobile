/**
 * ReeveOS Mobile — Routes
 * Splash handled in App.tsx
 * Flow: /login → /gdpr → /onboarding → / (home)
 */

import React from 'react';
import { createBrowserRouter, Navigate, useNavigate } from 'react-router';
import { AuthGuard } from './lib/AuthGuard';
import { MobileFrame } from './components/MobileFrame';
import { AppShell } from './components/AppShell';
import { LoginScreen } from './components/LoginScreen';
import { GdprConsent } from './components/GdprConsent';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { CalendarView } from './pages/CalendarView';
import { CalendarScreen } from './components/CalendarScreen';
import { AIHub } from './pages/AIHub';
import { AIChatScreen } from './components/AIChatScreen';
import { Menu } from './pages/Menu';
import { ClientsScreen } from './components/ClientsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ShopScreen } from './components/ShopScreen';
import { ServicesScreen } from './pages/ServicesScreen';
import { ReportsScreen } from './pages/ReportsScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { HelpScreen } from './pages/HelpScreen';

function GdprRoute() {
  const navigate = useNavigate();
  return <GdprConsent onConsent={() => navigate('/onboarding', { replace: true })} />;
}

export const router = createBrowserRouter([
  { path: '/login', Component: LoginScreen },
  { path: '/gdpr', Component: GdprRoute },
  { path: '/onboarding', Component: OnboardingScreen },

  // Main app — protected
  {
    path: '/',
    Component: AuthGuard,
    children: [
      {
        Component: MobileFrame,
        children: [
          {
            Component: AppShell,
            children: [
              { index: true, Component: HomeScreen },
              { path: 'calendar', Component: CalendarView },
              { path: 'ai', Component: AIHub },
              { path: 'menu', Component: Menu },
              { path: 'profile', Component: ProfileScreen },
              { path: 'services', Component: ServicesScreen },
              { path: 'clients', Component: ClientsScreen },
              { path: 'reports', Component: ReportsScreen },
              { path: 'payment', Component: PaymentScreen },
              { path: 'notifications', Component: NotificationsScreen },
              { path: 'settings', Component: SettingsScreen },
              { path: 'help', Component: HelpScreen },
              { path: 'shop', Component: ShopScreen },
              { path: '*', element: <Navigate to="/" replace /> },
            ],
          },
        ],
      },
    ],
  },

  { path: '*', element: <Navigate to="/login" replace /> },
]);
