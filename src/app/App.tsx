/**
 * ReeveOS Mobile — App Root
 *
 * Entry point for the entire application.
 * Flow: GDPR Consent → Login → App (protected by AuthGuard)
 *
 * AuthProvider wraps everything so any screen can call useAuth().
 * GDPR consent is tracked in memory (per session, not persisted).
 */

import React, { useState } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './lib/AuthContext';
import { GdprConsent } from './components/GdprConsent';
import { router } from './routes';

export default function App() {
  // GDPR consent tracked in memory — resets each session (intentional)
  const [hasConsented, setHasConsented] = useState(false);

  // Must consent before seeing anything else
  if (!hasConsented) {
    return <GdprConsent onConsent={() => setHasConsented(true)} />;
  }

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
