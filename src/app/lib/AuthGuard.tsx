/**
 * ReeveOS Mobile — Auth Guard
 *
 * Wrap any route with this component to block access for unauthenticated users.
 * - If still checking auth: shows a branded loading spinner
 * - If not logged in: redirects to /login
 * - If logged in: renders the child route normally
 *
 * Used in routes.tsx to protect the main app shell.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from './AuthContext';
import { BRAND } from './brand';

export function AuthGuard() {
  const { isAuthenticated, loading } = useAuth();

  // Still checking if user has a valid session — show loading
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          backgroundColor: BRAND.white,
          fontFamily: "'Figtree', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${BRAND.grey200}`,
            borderTopColor: BRAND.gold,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: BRAND.grey500,
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  // Not logged in — send to login
  if (!isAuthenticated) {
    return <Navigate to="/splash" replace />;
  }

  // Logged in — render the protected content
  return <Outlet />;
}
