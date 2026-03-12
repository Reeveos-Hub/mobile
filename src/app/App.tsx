/**
 * ReeveOS Mobile — App Root
 * Flow: GDPR Consent → Router (Splash → Onboarding → Login → Home)
 */

import React, { useState } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './lib/AuthContext';
import { GdprConsent } from './components/GdprConsent';
import { router } from './routes';

export default function App() {
  const [hasConsented, setHasConsented] = useState(false);

  if (!hasConsented) {
    return <GdprConsent onConsent={() => setHasConsented(true)} />;
  }

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
