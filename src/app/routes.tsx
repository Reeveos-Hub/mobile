/**
 * ReeveOS Mobile — Routes
 *
 * Route structure:
 *   /login    → Login screen (no auth required)
 *   /         → AuthGuard → MobileFrame → AppShell → all app screens
 *
 * AuthGuard checks if the user is logged in:
 *   - Not logged in → redirects to /login
 *   - Logged in → renders the app normally
 */

import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AuthGuard } from './lib/AuthGuard';
import { MobileFrame } from './components/MobileFrame';
import { AppShell } from './components/AppShell';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './pages/Dashboard';
import { CalendarView } from './pages/CalendarView';
import { AIHub } from './pages/AIHub';
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

export const router = createBrowserRouter([
  // Login — accessible without authentication
  {
    path: '/login',
    Component: LoginScreen,
  },

  // Main app — protected by AuthGuard
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
              { index: true, Component: Dashboard },
              { path: 'calendar', Component: CalendarView },
              { path: 'ai', Component: AIHub },
              { path: 'menu', Component: Menu },

              // Menu sub-pages
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

  // Catch-all — send unknown routes to root (AuthGuard decides login or app)
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
], { basename: '/app' });
